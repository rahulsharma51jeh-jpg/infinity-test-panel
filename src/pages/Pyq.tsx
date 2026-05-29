import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getQuestions } from "../data/bank";
import {
  CURRICULUM,
  getClass,
  getChapter,
  localizedSubjectName,
} from "../data/curriculum";
import { qPrompt } from "../lib/qtext";
import { generateTest } from "../lib/testGenerator";
import { setActiveTest } from "../lib/session";
import { QUESTION_TYPE_LABEL_KEY } from "../data/types";
import type { TranslationKey } from "../i18n";

export default function Pyq() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [classId, setClassId] = useState(10);
  const subjects = getClass(classId)?.subjects ?? [];
  const [subjectId, setSubjectId] = useState("science");

  // keep subject valid for the class
  const validSubject = subjects.find((s) => s.id === subjectId) ? subjectId : subjects[0]?.id;

  const pyqs = useMemo(
    () =>
      getQuestions().filter(
        (q) =>
          q.classId === classId &&
          q.subjectId === validSubject &&
          q.pyqYears &&
          q.pyqYears.length > 0
      ).sort((a, b) => (b.pyqYears?.length ?? 0) - (a.pyqYears?.length ?? 0)),
    [classId, validSubject]
  );

  function startPyqTest() {
    const test = generateTest({
      classId,
      subjectId: validSubject!,
      chapterIds: [],
      difficulty: "mixed",
      mode: "pyq",
      count: Math.min(10, pyqs.length),
    });
    setActiveTest(test);
    navigate(`/test/${test.id}`);
  }

  return (
    <div className="fade-in">
      <div className="section-title" style={{ marginTop: 0 }}>
        <div>
          <h2>📜 {t("pyqTitle")}</h2>
          <p className="muted" style={{ margin: 0 }}>
            {t("pyqSub")}
          </p>
        </div>
        {pyqs.length > 0 && (
          <button className="btn primary" onClick={startPyqTest}>
            ▶ {t("modePyq")}
          </button>
        )}
      </div>

      <div className="card pad">
        <div className="field" style={{ marginBottom: 12 }}>
          <label>{t("selectClass")}</label>
          <div className="option-row">
            {CURRICULUM.map((c) => (
              <button
                key={c.id}
                className={`chip ${classId === c.id ? "active" : ""}`}
                onClick={() => setClassId(c.id)}
              >
                Class {c.id}
              </button>
            ))}
          </div>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>{t("selectSubject")}</label>
          <div className="option-row">
            {subjects.map((s) => (
              <button
                key={s.id}
                className={`chip ${validSubject === s.id ? "active" : ""}`}
                onClick={() => setSubjectId(s.id)}
              >
                {s.icon} {localizedSubjectName(s, lang)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        {pyqs.length === 0 ? (
          <div className="empty">
            <div className="emoji">🗂️</div>
            <p>{t("noData")}</p>
          </div>
        ) : (
          pyqs.map((q) => {
            const ch = getChapter(q.classId, q.subjectId, q.chapterId);
            const repeated = (q.pyqYears?.length ?? 0) >= 2;
            return (
              <div className="card pad" key={q.id} style={{ marginBottom: 12 }}>
                <div className="q-meta">
                  <span className="badge type">
                    {t(QUESTION_TYPE_LABEL_KEY[q.type] as TranslationKey)}
                  </span>
                  <span className={`badge ${q.difficulty}`}>
                    {t(q.difficulty as TranslationKey)}
                  </span>
                  {ch && <span className="chip sm">{ch.name}</span>}
                  {repeated && <span className="badge pyq">🔁 {t("repeated")}</span>}
                  <span className="muted" style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
                    {t("appearedIn")}: {q.pyqYears?.join(", ")}
                  </span>
                </div>
                <p style={{ margin: "8px 0 0", color: "var(--text)", whiteSpace: "pre-wrap" }}>
                  {qPrompt(q, lang)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
