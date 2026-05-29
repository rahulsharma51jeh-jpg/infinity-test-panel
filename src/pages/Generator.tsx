import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  CURRICULUM,
  getClass,
  getSubject,
  localizedChapterName,
  localizedSubjectName,
} from "../data/curriculum";
import { DIFFICULTIES, TEST_MODE_LABEL_KEY, type Difficulty, type TestMode } from "../data/types";
import { availableCount, generateTest } from "../lib/testGenerator";
import { setActiveTest } from "../lib/session";
import { getProfile, saveProfile } from "../lib/storage";
import type { TranslationKey } from "../i18n";

const MODES: TestMode[] = ["chapter", "topic", "full", "weekly", "board", "pyq", "revision"];
const DIFF_OPTIONS: (Difficulty | "mixed")[] = ["easy", "medium", "hard", "mixed"];

export default function Generator() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [classId, setClassId] = useState<number>(
    () => Number(params.get("class")) || getProfile().classId || 10
  );
  const subjects = getClass(classId)?.subjects ?? [];
  const [subjectId, setSubjectId] = useState<string>(
    () => params.get("subject") || subjects[0]?.id || "science"
  );
  const subject = getSubject(classId, subjectId);
  const [chapterIds, setChapterIds] = useState<string[]>(() => {
    const c = params.get("chapter");
    return c ? [c] : [];
  });
  const [difficulty, setDifficulty] = useState<Difficulty | "mixed">("mixed");
  const [mode, setMode] = useState<TestMode>((params.get("mode") as TestMode) || "chapter");
  const [count, setCount] = useState<number>(10);
  const [generating, setGenerating] = useState(false);

  // keep subject valid when class changes
  useEffect(() => {
    const subs = getClass(classId)?.subjects ?? [];
    if (!subs.find((s) => s.id === subjectId)) {
      setSubjectId(subs[0]?.id ?? "");
      setChapterIds([]);
    }
  }, [classId]); // eslint-disable-line react-hooks/exhaustive-deps

  const avail = useMemo(
    () => availableCount({ classId, subjectId, chapterIds, mode }),
    [classId, subjectId, chapterIds, mode]
  );

  const maxCount = Math.max(1, Math.min(30, avail || 1));
  const effectiveCount = Math.min(count, maxCount);

  function toggleChapter(id: string) {
    setChapterIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function handleGenerate() {
    if (avail === 0) return;
    setGenerating(true);
    // brief delay to convey the "AI is composing your paper" feel
    setTimeout(() => {
      const test = generateTest({
        classId,
        subjectId,
        chapterIds: mode === "full" ? [] : chapterIds,
        difficulty,
        mode,
        count: effectiveCount,
      });
      setActiveTest(test);
      // remember the student's class for next time
      const p = getProfile();
      saveProfile({ ...p, classId });
      setGenerating(false);
      navigate(`/test/${test.id}`);
    }, 650);
  }

  if (generating) {
    return (
      <div className="empty fade-in" style={{ paddingTop: 80 }}>
        <div className="spinner" />
        <h2>🤖 {t("generating")}</h2>
        <p>BSEB pattern · NCERT concepts · {t(("mode" + cap(mode)) as TranslationKey)}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="section-title" style={{ marginTop: 0 }}>
        <div>
          <h2>🤖 {t("generatorTitle")}</h2>
          <p className="muted" style={{ margin: 0 }}>
            {t("generatorSub")}
          </p>
        </div>
      </div>

      <div className="grid cols-2">
        <div className="card pad">
          {/* Class */}
          <div className="field">
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

          {/* Subject */}
          <div className="field">
            <label>{t("selectSubject")}</label>
            <div className="select-grid">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  className={`tile ${subjectId === s.id ? "active" : ""}`}
                  onClick={() => {
                    setSubjectId(s.id);
                    setChapterIds([]);
                  }}
                >
                  <span className="tile-icon">{s.icon}</span>
                  {localizedSubjectName(s, lang)}
                </button>
              ))}
            </div>
          </div>

          {/* Chapters */}
          {mode !== "full" && (
            <div className="field">
              <label>
                {t("selectChapters")}{" "}
                <span className="muted">({chapterIds.length || t("allChapters")})</span>
              </label>
              <div className="option-row">
                {subject?.chapters.map((ch) => (
                  <button
                    key={ch.id}
                    className={`chip ${chapterIds.includes(ch.id) ? "active" : ""}`}
                    onClick={() => toggleChapter(ch.id)}
                  >
                    {localizedChapterName(ch, lang)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card pad">
          {/* Mode */}
          <div className="field">
            <label>{t("testMode")}</label>
            <div className="option-row">
              {MODES.map((m) => (
                <button
                  key={m}
                  className={`chip ${mode === m ? "active" : ""}`}
                  onClick={() => setMode(m)}
                >
                  {t(TEST_MODE_LABEL_KEY[m] as TranslationKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="field">
            <label>{t("difficulty")}</label>
            <div className="option-row">
              {DIFF_OPTIONS.map((d) => (
                <button
                  key={d}
                  className={`chip ${difficulty === d ? "active" : ""}`}
                  onClick={() => setDifficulty(d)}
                  disabled={mode === "pyq"}
                >
                  {t(d as TranslationKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div className="field">
            <label>
              {t("numQuestions")}: <strong>{effectiveCount}</strong>{" "}
              <span className="muted">/ {avail} available</span>
            </label>
            <div className="range-row">
              <input
                type="range"
                min={1}
                max={maxCount}
                value={effectiveCount}
                onChange={(e) => setCount(Number(e.target.value))}
              />
              <span style={{ width: 28, textAlign: "right", fontWeight: 800 }}>
                {effectiveCount}
              </span>
            </div>
          </div>

          {avail === 0 ? (
            <p className="muted" style={{ color: "var(--hard)" }}>
              ⚠️ {t("noQuestionsFound")}
            </p>
          ) : (
            <p className="muted" style={{ fontSize: "0.85rem" }}>
              ≈ {Math.max(5, Math.round(effectiveCount * 1.25))} {t("minutes")} ·{" "}
              {DIFFICULTIES.includes(difficulty as Difficulty)
                ? t(difficulty as TranslationKey)
                : t("mixed")}{" "}
              · BSEB pattern
            </p>
          )}

          <button
            className="btn primary block"
            style={{ marginTop: 8 }}
            disabled={avail === 0}
            onClick={handleGenerate}
          >
            🤖 {t("generate")}
          </button>
        </div>
      </div>
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
