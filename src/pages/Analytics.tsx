import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { clearResults, getResults } from "../lib/storage";
import {
  accuracyTrend,
  activityHeatmap,
  avgTimePerQuestion,
  overview,
  subjectStats,
  weakChapters,
} from "../lib/analytics";
import { BarChart, Heatmap, ProgressRow } from "../components/charts";

export default function Analytics() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const results = useMemo(() => getResults(), []);

  const ov = useMemo(() => overview(results), [results]);
  const trend = useMemo(() => accuracyTrend(results).slice(-12), [results]);
  const subjects = useMemo(() => subjectStats(results), [results]);
  const heat = useMemo(() => activityHeatmap(results), [results]);
  const weak = useMemo(() => weakChapters(results), [results]);
  const avgSec = useMemo(() => avgTimePerQuestion(results), [results]);

  if (results.length === 0) {
    return (
      <div className="empty" style={{ paddingTop: 70 }}>
        <div className="emoji">📊</div>
        <h2>{t("analyticsTitle")}</h2>
        <p>{t("noData")}</p>
        <button className="btn primary" onClick={() => navigate("/generate")}>
          🤖 {t("generateTest")}
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="section-title" style={{ marginTop: 0 }}>
        <div>
          <h2>📊 {t("analyticsTitle")}</h2>
          <p className="muted" style={{ margin: 0 }}>
            {t("analyticsSub")}
          </p>
        </div>
        <button
          className="btn ghost"
          onClick={() => {
            if (window.confirm("Clear all saved attempts? This cannot be undone.")) {
              clearResults();
              navigate(0);
            }
          }}
        >
          🗑 Reset data
        </button>
      </div>

      <div className="grid cols-4">
        <Stat icon="📝" value={`${ov.testsTaken}`} label={t("testsTaken")} />
        <Stat icon="🎯" value={`${ov.avgAccuracy}%`} label={t("avgAccuracy")} />
        <Stat icon="⚡" value={`${avgSec}s`} label={t("avgTimePerQ")} />
        <Stat icon="🔥" value={`${ov.streakDays}`} label={t("studyStreak")} />
      </div>

      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <div className="card pad">
          <h3>📈 {t("accuracyTrend")}</h3>
          <BarChart data={trend} />
        </div>
        <div className="card pad">
          <h3>📚 {t("subjectBreakdown")}</h3>
          {subjects.map((s) => (
            <ProgressRow
              key={s.subjectId}
              label={`${s.icon} ${s.subjectName}`}
              value={s.accuracy}
            />
          ))}
        </div>
      </div>

      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <div className="card pad">
          <h3>🗓 {t("activityHeatmap")}</h3>
          <Heatmap data={heat} />
          <p className="muted" style={{ fontSize: "0.78rem", marginTop: 10 }}>
            {t("activityHeatmap")} · last {Math.round(heat.length / 7)} weeks
          </p>
        </div>
        <div className="card pad">
          <h3>🧠 {t("weakChapters")}</h3>
          {weak.length === 0 ? (
            <p className="muted">{t("noWeakChapters")}</p>
          ) : (
            weak.map((w) => (
              <div className="list-row" key={w.chapterId}>
                <div>
                  <strong>{w.chapterName}</strong>
                  <div className="muted" style={{ fontSize: "0.8rem" }}>
                    {w.subjectName}
                  </div>
                </div>
                <button
                  className="chip active"
                  onClick={() =>
                    navigate(
                      `/generate?class=${w.classId}&subject=${w.subjectId}&chapter=${w.chapterId}`
                    )
                  }
                >
                  {w.accuracy}% → {t("retake")}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="card stat">
      <div className="stat-top">
        <span className="stat-icon">{icon}</span>
      </div>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
