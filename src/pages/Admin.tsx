import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  CURRICULUM,
  getClass,
  getSubject,
} from "../data/curriculum";
import {
  addCustomQuestion,
  addPendingQuestion,
  approvePending,
  getCustomQuestions,
  getPendingQuestions,
  getQuestions,
  rejectPending,
} from "../data/bank";
import { OPTION_KEYS } from "../lib/qtext";
import type { Difficulty, Question } from "../data/types";

export default function Admin() {
  const { t } = useLanguage();
  const [, force] = useState(0);
  const refresh = () => force((n) => n + 1);

  const [classId, setClassId] = useState(10);
  const subjects = getClass(classId)?.subjects ?? [];
  const [subjectId, setSubjectId] = useState("science");
  const subject = getSubject(classId, subjectId);
  const chapters = subject?.chapters ?? [];
  const [chapterId, setChapterId] = useState(chapters[0]?.id ?? "");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  const [explanation, setExplanation] = useState("");

  const all = getQuestions();
  const pending = getPendingQuestions();
  const custom = getCustomQuestions();

  const validSubjectId = subjects.find((s) => s.id === subjectId) ? subjectId : subjects[0]?.id;
  const validChapters = getSubject(classId, validSubjectId!)?.chapters ?? [];
  const validChapterId = validChapters.find((c) => c.id === chapterId)
    ? chapterId
    : validChapters[0]?.id ?? "";

  const canSave =
    prompt.trim().length > 3 && options.every((o) => o.trim().length > 0) && validChapterId;

  function saveQuestion() {
    if (!canSave) return;
    const q: Question = {
      id: `custom_${Date.now()}`,
      classId,
      subjectId: validSubjectId!,
      chapterId: validChapterId,
      type: "mcq",
      difficulty,
      marks: 1,
      prompt: prompt.trim(),
      options: options.map((o) => o.trim()),
      answerIndex: correct,
      explanation: explanation.trim() || undefined,
    };
    addCustomQuestion(q);
    setPrompt("");
    setOptions(["", "", "", ""]);
    setExplanation("");
    setCorrect(0);
    refresh();
  }

  // Simulates an AI suggestion for the chosen chapter (pending teacher review).
  function suggestWithAI() {
    const ch = getSubject(classId, validSubjectId!)?.chapters.find(
      (c) => c.id === validChapterId
    );
    const topic = ch?.topics[0] ?? ch?.name ?? "concept";
    const q: Question = {
      id: `ai_${Date.now()}`,
      classId,
      subjectId: validSubjectId!,
      chapterId: validChapterId,
      topic,
      type: "mcq",
      difficulty,
      marks: 1,
      aiSuggested: true,
      prompt: `[AI draft] Which statement best describes "${topic}" in ${ch?.name}? (Review & edit before approving.)`,
      options: [
        `${topic} — primary definition`,
        `${topic} — common misconception`,
        `Unrelated concept`,
        `None of the above`,
      ],
      answerIndex: 0,
      explanation: `AI-generated draft for ${ch?.name}. A teacher should verify accuracy and align wording to the BSEB pattern before approval.`,
    };
    addPendingQuestion(q);
    refresh();
  }

  return (
    <div className="fade-in">
      <div className="section-title" style={{ marginTop: 0 }}>
        <div>
          <h2>🧑‍🏫 {t("adminTitle")}</h2>
          <p className="muted" style={{ margin: 0 }}>
            {t("adminSub")}
          </p>
        </div>
      </div>

      <div className="grid cols-4">
        <Stat icon="📚" value={`${all.length}`} label={t("totalQuestions")} />
        <Stat icon="🧑‍🏫" value={`${custom.length}`} label="Teacher-added" />
        <Stat icon="🤖" value={`${pending.length}`} label={t("aiSuggested")} />
        <Stat icon="🏫" value={`${CURRICULUM.length}`} label="Classes covered" />
      </div>

      <div className="grid cols-2" style={{ marginTop: 16 }}>
        {/* Add question */}
        <div className="card pad">
          <h3>➕ {t("addQuestion")}</h3>

          <div className="field">
            <label>{t("selectClass")} / {t("selectSubject")}</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select value={classId} onChange={(e) => setClassId(Number(e.target.value))}>
                {CURRICULUM.map((c) => (
                  <option key={c.id} value={c.id}>
                    Class {c.id}
                  </option>
                ))}
              </select>
              <select value={validSubjectId} onChange={(e) => setSubjectId(e.target.value)}>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label>{t("selectChapters")}</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select value={validChapterId} onChange={(e) => setChapterId(e.target.value)}>
                {validChapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              >
                <option value="easy">{t("easy")}</option>
                <option value="medium">{t("medium")}</option>
                <option value="hard">{t("hard")}</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>{t("questionText")}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type the question..."
            />
          </div>

          <div className="field">
            <label>
              {t("options")} — {t("selectCorrect")}
            </label>
            {options.map((o, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <button
                  className={`chip ${correct === i ? "active" : ""}`}
                  onClick={() => setCorrect(i)}
                  title={t("selectCorrect")}
                  style={{ minWidth: 38 }}
                >
                  {OPTION_KEYS[i]}
                </button>
                <input
                  type="text"
                  value={o}
                  onChange={(e) =>
                    setOptions((prev) => prev.map((p, idx) => (idx === i ? e.target.value : p)))
                  }
                  placeholder={`Option ${OPTION_KEYS[i]}`}
                />
              </div>
            ))}
          </div>

          <div className="field">
            <label>{t("explanation")}</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Optional explanation shown after the test..."
            />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn primary" disabled={!canSave} onClick={saveQuestion}>
              💾 {t("saveQuestion")}
            </button>
            <button className="btn" onClick={suggestWithAI}>
              🤖 Suggest with AI
            </button>
          </div>
        </div>

        {/* Pending AI review + bank summary */}
        <div>
          <div className="card pad" style={{ marginBottom: 16 }}>
            <h3>🤖 {t("aiSuggested")}</h3>
            {pending.length === 0 ? (
              <p className="muted">
                No pending AI suggestions. Use "Suggest with AI" to draft one for the selected
                chapter.
              </p>
            ) : (
              pending.map((q) => (
                <div className="review-item" key={q.id} style={{ marginBottom: 10 }}>
                  <p style={{ margin: "0 0 8px", fontWeight: 600 }}>{q.prompt}</p>
                  <div className="muted" style={{ fontSize: "0.8rem", marginBottom: 8 }}>
                    Correct: {OPTION_KEYS[q.answerIndex ?? 0]} · {q.options?.[q.answerIndex ?? 0]}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="chip active"
                      onClick={() => {
                        approvePending(q.id);
                        refresh();
                      }}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="chip"
                      onClick={() => {
                        rejectPending(q.id);
                        refresh();
                      }}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="card pad">
            <h3>📊 {t("bankSummary")}</h3>
            {summarize(all).map((row) => (
              <div className="list-row" key={row.label}>
                <span>{row.label}</span>
                <strong>{row.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function summarize(all: Question[]) {
  const byClass = new Map<number, number>();
  for (const q of all) byClass.set(q.classId, (byClass.get(q.classId) ?? 0) + 1);
  return [...byClass.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([cls, count]) => ({ label: `Class ${cls}`, count }));
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
