import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getActiveTest, setLastResult } from "../lib/session";
import { saveResult, type AnswerRecord, type TestResult } from "../lib/storage";
import { OPTION_KEYS, qOptions, qPrompt } from "../lib/qtext";
import { QUESTION_TYPE_LABEL_KEY } from "../data/types";
import type { TranslationKey } from "../i18n";

type Responses = Record<string, { index?: number; text?: string }>;

export default function TestRunner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const test = useMemo(() => getActiveTest(id), [id]);

  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [secondsLeft, setSecondsLeft] = useState<number>((test?.durationMin ?? 10) * 60);
  const startRef = useRef<number>(Date.now());
  const qStartRef = useRef<number>(Date.now());
  const timePerQ = useRef<Record<string, number>>({});

  // countdown timer
  useEffect(() => {
    if (!test) return;
    const iv = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(iv);
          handleSubmit(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test]);

  // accumulate time spent per question when navigating
  function recordTime(qid: string) {
    const delta = Math.round((Date.now() - qStartRef.current) / 1000);
    timePerQ.current[qid] = (timePerQ.current[qid] ?? 0) + delta;
    qStartRef.current = Date.now();
  }

  if (!test) {
    return (
      <div className="empty" style={{ paddingTop: 80 }}>
        <div className="emoji">🔍</div>
        <p>This test session has expired.</p>
        <button className="btn primary" onClick={() => navigate("/generate")}>
          🤖 {t("generateTest")}
        </button>
      </div>
    );
  }

  const q = test.questions[current];
  const opts = qOptions(q, lang);
  const isObjective = q.options != null && q.answerIndex != null;

  function selectOption(i: number) {
    setResponses((r) => ({ ...r, [q.id]: { ...r[q.id], index: i } }));
  }
  function setText(v: string) {
    setResponses((r) => ({ ...r, [q.id]: { ...r[q.id], text: v } }));
  }
  function clearResponse() {
    setResponses((r) => {
      const c = { ...r };
      delete c[q.id];
      return c;
    });
  }
  function toggleMark() {
    setMarked((m) => {
      const c = new Set(m);
      c.has(q.id) ? c.delete(q.id) : c.add(q.id);
      return c;
    });
  }
  function goto(i: number) {
    recordTime(q.id);
    setCurrent(i);
  }

  function handleSubmit(auto = false) {
    if (!auto && !window.confirm(t("confirmSubmit"))) return;
    recordTime(q.id);

    const answers: AnswerRecord[] = test!.questions.map((question) => {
      const resp = responses[question.id] ?? {};
      const objective = question.options != null && question.answerIndex != null;
      const attemptedObjective = resp.index != null;
      const attemptedText = (resp.text ?? "").trim().length > 0;
      const attempted = objective ? attemptedObjective : attemptedText;
      const correct = objective ? resp.index === question.answerIndex : false;
      return {
        questionId: question.id,
        chapterId: question.chapterId,
        topic: question.topic,
        correct,
        attempted,
        marks: question.marks,
        awarded: correct ? question.marks : 0,
        timeSpentSec: timePerQ.current[question.id] ?? 0,
        userIndex: resp.index,
        userText: resp.text,
        needsManualEval: !objective && attempted,
      };
    });

    const result: TestResult = {
      id: test!.id,
      createdAt: Date.now(),
      classId: test!.options.classId,
      subjectId: test!.options.subjectId,
      mode: test!.options.mode,
      difficulty: test!.options.difficulty,
      totalQuestions: test!.questions.length,
      totalMarks: test!.totalMarks,
      awardedMarks: answers.reduce((s, a) => s + a.awarded, 0),
      correctCount: answers.filter((a) => a.correct).length,
      attemptedCount: answers.filter((a) => a.attempted).length,
      durationSec: Math.round((Date.now() - startRef.current) / 1000),
      answers,
    };

    saveResult(result);
    setLastResult(result);
    navigate("/results");
  }

  const attemptedCount = Object.keys(responses).filter((k) => {
    const r = responses[k];
    return r.index != null || (r.text ?? "").trim().length > 0;
  }).length;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const warn = secondsLeft <= 60;

  return (
    <div className="fade-in">
      <div className="runner-header">
        <div className="brand">
          <span className="logo">∞</span>
          <strong>{t("appName")}</strong>
        </div>
        <div className={`timer ${warn ? "warn" : ""}`}>
          ⏱ {t("timeLeft")}: {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
        <button className="btn primary" onClick={() => handleSubmit(false)}>
          {t("submitTest")}
        </button>
      </div>

      <div className="runner">
        <div className="card pad runner-main">
          <div className="q-meta">
            <span className="badge type">
              {t(QUESTION_TYPE_LABEL_KEY[q.type] as TranslationKey)}
            </span>
            <span className={`badge ${q.difficulty}`}>{t(q.difficulty as TranslationKey)}</span>
            <span className="chip sm">
              {q.marks} {t("marks")}
            </span>
            {q.pyqYears && q.pyqYears.length > 0 && (
              <span className="badge pyq">PYQ {q.pyqYears.join(", ")}</span>
            )}
            <span className="muted" style={{ marginLeft: "auto", fontWeight: 700 }}>
              {t("question")} {current + 1}/{test.questions.length}
            </span>
          </div>

          <div className="q-prompt">{qPrompt(q, lang)}</div>

          {isObjective ? (
            <div className="options-list">
              {opts.map((o, i) => (
                <button
                  key={i}
                  className={`opt ${responses[q.id]?.index === i ? "selected" : ""}`}
                  onClick={() => selectOption(i)}
                >
                  <span className="opt-key">{OPTION_KEYS[i]}</span>
                  <span>{o}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="subjective-answer">
              <textarea
                placeholder={lang === "hi" ? "अपना उत्तर यहाँ लिखें..." : "Write your answer here..."}
                value={responses[q.id]?.text ?? ""}
                onChange={(e) => setText(e.target.value)}
                rows={6}
              />
              <p className="muted" style={{ margin: "8px 0 0", fontSize: "0.8rem" }}>
                ✍️ {lang === "hi"
                  ? "विषयनिष्ठ उत्तर — जमा करने के बाद आदर्श उत्तर देखें व स्वयं मूल्यांकन करें।"
                  : "Subjective answer — compare with the model answer and self-evaluate after submitting."}
              </p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 20,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              className="btn"
              disabled={current === 0}
              onClick={() => goto(current - 1)}
            >
              ← {t("previous")}
            </button>
            <button className="btn ghost" onClick={clearResponse}>
              {t("clearResponse")}
            </button>
            <button
              className={`btn ${marked.has(q.id) ? "primary" : "ghost"}`}
              onClick={toggleMark}
            >
              ⚑ {t("markReview")}
            </button>
            <div style={{ marginLeft: "auto" }}>
              {current < test.questions.length - 1 ? (
                <button className="btn primary" onClick={() => goto(current + 1)}>
                  {t("next")} →
                </button>
              ) : (
                <button className="btn primary" onClick={() => handleSubmit(false)}>
                  {t("submitTest")}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Palette */}
        <aside className="card pad palette">
          <strong>
            {attemptedCount}/{test.questions.length} {t("paletteAttempted")}
          </strong>
          <div className="palette-grid">
            {test.questions.map((qq, i) => {
              const r = responses[qq.id];
              const done = r && (r.index != null || (r.text ?? "").trim().length > 0);
              const cls = marked.has(qq.id)
                ? "review"
                : done
                ? "attempted"
                : "";
              return (
                <button
                  key={qq.id}
                  className={`palette-btn ${cls} ${i === current ? "current" : ""}`}
                  onClick={() => goto(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="legend">
            <span>
              <i className="dot attempted" /> {t("paletteAttempted")}
            </span>
            <span>
              <i className="dot review" /> {t("paletteReview")}
            </span>
            <span>
              <i className="dot notvisited" /> {t("paletteNotVisited")}
            </span>
          </div>
          <button
            className="btn primary block"
            style={{ marginTop: 14 }}
            onClick={() => handleSubmit(false)}
          >
            {t("submitTest")}
          </button>
        </aside>
      </div>
    </div>
  );
}
