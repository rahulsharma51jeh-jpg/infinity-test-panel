import { useMemo, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getActiveTest, getLastResult, setLastResult } from "../lib/session";
import { updateResult, type TestResult } from "../lib/storage";
import { OPTION_KEYS, qExplanation, qOptions, qPrompt } from "../lib/qtext";
import { getSubject } from "../data/curriculum";
import type { Question } from "../data/types";
import type { TranslationKey } from "../i18n";

export default function Results() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(() => getLastResult());
  const test = useMemo(() => (result ? getActiveTest(result.id) : null), [result]);
  const [showReview, setShowReview] = useState(true);

  if (!result) {
    return (
      <div className="empty" style={{ paddingTop: 80 }}>
        <div className="emoji">📊</div>
        <p>No recent result to show.</p>
        <button className="btn primary" onClick={() => navigate("/generate")}>
          🤖 {t("generateTest")}
        </button>
      </div>
    );
  }

  const subj = getSubject(result.classId, result.subjectId);
  const scorePct = result.totalMarks
    ? Math.round((result.awardedMarks / result.totalMarks) * 100)
    : 0;
  const accuracy = result.attemptedCount
    ? Math.round((result.correctCount / result.attemptedCount) * 100)
    : 0;
  const avgSec = result.attemptedCount
    ? Math.round(result.durationSec / result.attemptedCount)
    : 0;

  const verdict =
    scorePct >= 75 ? t("greatJob") : scorePct >= 40 ? t("keepPracticing") : t("needsWork");

  // self-evaluation for subjective questions
  function selfEvaluate(questionId: string, correct: boolean) {
    if (!result) return;
    const q = test?.questions.find((x) => x.id === questionId);
    if (!q) return;
    const updated: TestResult = {
      ...result,
      answers: result.answers.map((a) =>
        a.questionId === questionId
          ? { ...a, correct, awarded: correct ? a.marks : 0, needsManualEval: false }
          : a
      ),
    };
    updated.awardedMarks = updated.answers.reduce((s, a) => s + a.awarded, 0);
    updated.correctCount = updated.answers.filter((a) => a.correct).length;
    setResult(updated);
    setLastResult(updated);
    updateResult(updated);
  }

  return (
    <div className="fade-in">
      <div className="card pad" style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: 4 }}>🎉 {t("resultTitle")}</h2>
        <p className="muted" style={{ marginTop: 0 }}>
          {subj?.icon} Class {result.classId} · {subj?.name ?? result.subjectId}
        </p>

        <div
          className="score-ring"
          style={{ "--val": scorePct } as CSSProperties}
        >
          <div className="inner">
            <div>
              <b>{scorePct}%</b>
              <span className="muted" style={{ fontSize: "0.78rem" }}>
                {result.awardedMarks}/{result.totalMarks} {t("marks")}
              </span>
            </div>
          </div>
        </div>

        <p style={{ fontWeight: 700, marginTop: 14 }}>{verdict}</p>

        <div className="grid cols-4" style={{ marginTop: 12 }}>
          <Mini label={t("correct")} value={`${result.correctCount}`} color="var(--easy)" />
          <Mini
            label={t("incorrect")}
            value={`${result.attemptedCount - result.correctCount}`}
            color="var(--hard)"
          />
          <Mini
            label={t("unattempted")}
            value={`${result.totalQuestions - result.attemptedCount}`}
            color="var(--muted)"
          />
          <Mini label={t("accuracy")} value={`${accuracy}%`} color="var(--brand)" />
        </div>

        <div className="grid cols-2" style={{ marginTop: 12 }}>
          <Mini
            label={t("timeTaken")}
            value={`${Math.floor(result.durationSec / 60)}m ${result.durationSec % 60}s`}
          />
          <Mini label={t("avgTimePerQ")} value={`${avgSec}s`} />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
          <button className="btn" onClick={() => setShowReview((s) => !s)}>
            {showReview ? "🙈" : "🔍"} {t("review")}
          </button>
          <button className="btn" onClick={() => navigate("/generate")}>
            🔁 {t("retake")}
          </button>
          <button className="btn primary" onClick={() => navigate("/")}>
            🏠 {t("backToDash")}
          </button>
        </div>
      </div>

      {showReview && test && (
        <div style={{ marginTop: 18 }}>
          <h3>🔍 {t("review")}</h3>
          {test.questions.map((q, i) => (
            <ReviewItem
              key={q.id}
              q={q}
              index={i}
              result={result}
              onSelfEval={selfEvaluate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Mini({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="card pad" style={{ padding: 12, textAlign: "center" }}>
      <div style={{ fontSize: "1.3rem", fontWeight: 800, color }}>{value}</div>
      <div className="muted" style={{ fontSize: "0.78rem" }}>
        {label}
      </div>
    </div>
  );
}

function ReviewItem({
  q,
  index,
  result,
  onSelfEval,
}: {
  q: Question;
  index: number;
  result: TestResult;
  onSelfEval: (id: string, correct: boolean) => void;
}) {
  const { t, lang } = useLanguage();
  const ans = result.answers.find((a) => a.questionId === q.id);
  const objective = q.options != null && q.answerIndex != null;
  const opts = qOptions(q, lang);
  const explanation = qExplanation(q, lang);

  const stateClass = !ans?.attempted ? "skipped" : ans.correct ? "correct" : "wrong";

  return (
    <div className={`review-item ${stateClass}`}>
      <div className="q-meta">
        <strong>
          {t("question")} {index + 1}
        </strong>
        <span className={`badge ${q.difficulty}`}>{t(q.difficulty as TranslationKey)}</span>
        {q.pyqYears && q.pyqYears.length > 0 && (
          <span className="badge pyq">PYQ {q.pyqYears.join(", ")}</span>
        )}
        <span style={{ marginLeft: "auto" }}>
          {!ans?.attempted ? "➖" : ans.correct ? "✅" : "❌"}
        </span>
      </div>
      <div className="q-prompt" style={{ fontSize: "1rem", margin: "6px 0 12px" }}>
        {qPrompt(q, lang)}
      </div>

      {objective ? (
        <div className="options-list">
          {opts.map((o, i) => {
            const isCorrect = i === q.answerIndex;
            const isChosen = ans?.userIndex === i;
            const cls = isCorrect ? "correct" : isChosen ? "wrong" : "";
            return (
              <div className={`opt ${cls}`} key={i}>
                <span className="opt-key">{OPTION_KEYS[i]}</span>
                <span>{o}</span>
                <span style={{ marginLeft: "auto", fontSize: "0.8rem", fontWeight: 700 }}>
                  {isCorrect ? `✓ ${t("correctAnswer")}` : isChosen ? t("yourAnswer") : ""}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="explain-box">
            <strong>{t("yourAnswer")}:</strong>
            <p style={{ margin: "4px 0 0", whiteSpace: "pre-wrap" }}>
              {ans?.userText?.trim() || <span className="muted">— {t("unattempted")} —</span>}
            </p>
          </div>
          {q.answerText && (
            <div className="explain-box" style={{ borderLeft: "3px solid var(--easy)" }}>
              <strong>{t("correctAnswer")}:</strong>
              <p style={{ margin: "4px 0 0", whiteSpace: "pre-wrap" }}>{q.answerText}</p>
            </div>
          )}
          {ans?.needsManualEval && (
            <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
              <span className="muted" style={{ fontSize: "0.85rem" }}>
                {lang === "hi" ? "स्वयं मूल्यांकन:" : "Self-evaluate:"}
              </span>
              <button className="chip" onClick={() => onSelfEval(q.id, true)}>
                ✅ {t("correct")}
              </button>
              <button className="chip" onClick={() => onSelfEval(q.id, false)}>
                ❌ {t("incorrect")}
              </button>
            </div>
          )}
        </>
      )}

      {q.solutionSteps && q.solutionSteps.length > 0 && (
        <div className="explain-box">
          <strong>🪜 {t("solution")}:</strong>
          <ol className="steps">
            {q.solutionSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      {explanation && (
        <div className="explain-box">
          <strong>💡 {t("explanation")}:</strong>
          <p style={{ margin: "4px 0 0" }}>{explanation}</p>
        </div>
      )}
    </div>
  );
}
