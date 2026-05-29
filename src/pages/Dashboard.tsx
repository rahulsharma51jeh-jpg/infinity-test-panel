import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getProfile, getResults } from "../lib/storage";
import { overview, weakChapters } from "../lib/analytics";
import { getSubject, localizedChapterName } from "../data/curriculum";

export default function Dashboard() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const profile = getProfile();
  const results = useMemo(() => getResults(), []);
  const ov = useMemo(() => overview(results), [results]);
  const weak = useMemo(() => weakChapters(results), [results]);

  const stats = [
    { icon: "📝", value: ov.testsTaken, label: t("testsTaken") },
    { icon: "🎯", value: `${ov.avgAccuracy}%`, label: t("avgAccuracy") },
    { icon: "✅", value: ov.questionsSolved, label: t("questionsSolved") },
    { icon: "🔥", value: `${ov.streakDays} ${t("days")}`, label: t("studyStreak") },
  ];

  return (
    <div className="fade-in">
      <section className="hero">
        <div className="deco" />
        <h1>
          {t("welcome")}, {profile.name}! 👋
        </h1>
        <p>{t("welcomeSub")}</p>
        <div className="hero-actions">
          <button className="btn primary" onClick={() => navigate("/generate")}>
            🤖 {t("generateTest")}
          </button>
          <button
            className="btn"
            onClick={() => navigate("/generate?mode=board")}
          >
            🎓 {t("boardMock")}
          </button>
          <button className="btn" onClick={() => navigate("/pyq")}>
            📜 {t("practicePyq")}
          </button>
        </div>
      </section>

      <div className="grid cols-4" style={{ marginTop: 18 }}>
        {stats.map((s, i) => (
          <div className="card stat" key={i}>
            <div className="stat-top">
              <span className="stat-icon">{s.icon}</span>
            </div>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="grid cols-2" style={{ marginTop: 18 }}>
        {/* Recent tests */}
        <div className="card pad">
          <div className="section-title" style={{ margin: "0 0 12px" }}>
            <h2>📋 {t("recentTests")}</h2>
            {results.length > 0 && (
              <button className="btn ghost" onClick={() => navigate("/analytics")}>
                {t("viewAnalytics")} →
              </button>
            )}
          </div>
          {results.length === 0 ? (
            <div className="empty">
              <div className="emoji">🚀</div>
              <p>{t("noTestsYet")}</p>
            </div>
          ) : (
            results.slice(0, 5).map((r) => {
              const subj = getSubject(r.classId, r.subjectId);
              const acc = r.attemptedCount
                ? Math.round((r.correctCount / r.attemptedCount) * 100)
                : 0;
              return (
                <div className="list-row" key={r.id}>
                  <div>
                    <strong>
                      {subj?.icon} Class {r.classId} · {subj?.name ?? r.subjectId}
                    </strong>
                    <div className="muted" style={{ fontSize: "0.8rem" }}>
                      {t(("mode" + cap(r.mode)) as any) ?? r.mode} ·{" "}
                      {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong>
                      {r.awardedMarks}/{r.totalMarks}
                    </strong>
                    <div
                      className="muted"
                      style={{ fontSize: "0.8rem", color: accColor(acc) }}
                    >
                      {acc}% {t("accuracy")}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Weak chapters / AI recommendation */}
        <div className="card pad">
          <div className="section-title" style={{ margin: "0 0 12px" }}>
            <h2>🧠 {t("weakChapters")}</h2>
          </div>
          {weak.length === 0 ? (
            <div className="empty">
              <div className="emoji">🌱</div>
              <p>{t("noWeakChapters")}</p>
            </div>
          ) : (
            weak.map((w) => (
              <div className="list-row" key={w.chapterId}>
                <div>
                  <strong>{localizedChapterName({ name: w.chapterName }, lang)}</strong>
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
                  {w.accuracy}% · {t("retake")}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function accColor(acc: number) {
  if (acc >= 75) return "var(--easy)";
  if (acc >= 50) return "var(--medium)";
  return "var(--hard)";
}
