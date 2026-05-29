import { getQuestions } from "../data/bank";
import type { Difficulty, Question, QuestionType, TestMode } from "../data/types";

export interface GenerateOptions {
  classId: number;
  subjectId: string;
  /** empty array = all chapters of the subject */
  chapterIds: string[];
  /** "mixed" balances across easy/medium/hard */
  difficulty: Difficulty | "mixed";
  mode: TestMode;
  count: number;
}

export interface GeneratedTest {
  id: string;
  options: GenerateOptions;
  questions: Question[];
  totalMarks: number;
  durationMin: number;
  createdAt: number;
}

/** deterministic-ish shuffle so results feel stable within a render */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * The "AI Auto Test Generator" engine.
 *
 * It filters the bank by class/subject/chapter, then balances the paper by
 * difficulty and question-type the way a BSEB paper-setter would. In
 * production this is where a call to an LLM would slot in to author fresh
 * questions; the rest of the app is agnostic to where questions come from.
 */
export function generateTest(opts: GenerateOptions): GeneratedTest {
  const { classId, subjectId, chapterIds, difficulty, mode, count } = opts;

  let pool = getQuestions().filter(
    (q) => q.classId === classId && q.subjectId === subjectId
  );

  // Chapter scope (empty => all chapters; "full" mode ignores chapter filter)
  if (mode !== "full" && chapterIds.length > 0) {
    pool = pool.filter((q) => chapterIds.includes(q.chapterId));
  }

  // PYQ mode: only previous-year questions
  if (mode === "pyq") {
    pool = pool.filter((q) => q.pyqYears && q.pyqYears.length > 0);
  }

  // Board mock leans on PYQs + harder questions but keeps everything available.
  const selected = balanceByDifficulty(pool, difficulty, count, mode);

  const questions = selected.map((q) => ({
    ...q,
    // shuffle MCQ options while keeping the correct answer mapped
    ...maybeShuffleOptions(q),
  }));

  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
  const durationMin = recommendedDuration(questions, mode);

  return {
    id: `test_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    options: opts,
    questions,
    totalMarks,
    durationMin,
    createdAt: Date.now(),
  };
}

function maybeShuffleOptions(q: Question): Partial<Question> {
  if (!q.options || q.answerIndex == null) return {};
  // Don't shuffle assertion-reason (fixed option order is conventional)
  if (q.type === "assertion") return {};
  const indices = shuffle(q.options.map((_, i) => i));
  const newOptions = indices.map((i) => q.options![i]);
  const newOptionsHi = q.optionsHi ? indices.map((i) => q.optionsHi![i]) : undefined;
  const newAnswerIndex = indices.indexOf(q.answerIndex);
  return { options: newOptions, optionsHi: newOptionsHi, answerIndex: newAnswerIndex };
}

function balanceByDifficulty(
  pool: Question[],
  difficulty: Difficulty | "mixed",
  count: number,
  mode: TestMode
): Question[] {
  if (pool.length === 0) return [];

  if (difficulty !== "mixed") {
    const exact = shuffle(pool.filter((q) => q.difficulty === difficulty));
    if (exact.length >= count) return exact.slice(0, count);
    // top up with the rest of the pool if not enough of the exact difficulty
    const rest = shuffle(pool.filter((q) => q.difficulty !== difficulty));
    return [...exact, ...rest].slice(0, count);
  }

  // Mixed / board: aim for a 40/35/25 easy/medium/hard split (board leans harder)
  const ratios =
    mode === "board"
      ? { easy: 0.3, medium: 0.4, hard: 0.3 }
      : { easy: 0.4, medium: 0.35, hard: 0.25 };

  const buckets: Record<Difficulty, Question[]> = {
    easy: shuffle(pool.filter((q) => q.difficulty === "easy")),
    medium: shuffle(pool.filter((q) => q.difficulty === "medium")),
    hard: shuffle(pool.filter((q) => q.difficulty === "hard")),
  };

  const target: Record<Difficulty, number> = {
    easy: Math.round(count * ratios.easy),
    medium: Math.round(count * ratios.medium),
    hard: Math.round(count * ratios.hard),
  };

  const picked: Question[] = [];
  (Object.keys(target) as Difficulty[]).forEach((d) => {
    picked.push(...buckets[d].slice(0, target[d]));
  });

  // Fill any shortfall from whatever remains
  if (picked.length < count) {
    const pickedIds = new Set(picked.map((q) => q.id));
    const remaining = shuffle(pool.filter((q) => !pickedIds.has(q.id)));
    picked.push(...remaining.slice(0, count - picked.length));
  }

  return shuffle(picked).slice(0, count);
}

function recommendedDuration(questions: Question[], mode: TestMode): number {
  if (mode === "board") return 180; // full board paper feel (3 hours)
  // ~1.25 min per mark, min 5 minutes
  const byMarks = questions.reduce((s, q) => s + q.marks, 0) * 1.25;
  return Math.max(5, Math.round(byMarks));
}

/** How many questions are available for a given selection (for UI hints). */
export function availableCount(opts: Omit<GenerateOptions, "count" | "difficulty">): number {
  let pool = getQuestions().filter(
    (q) => q.classId === opts.classId && q.subjectId === opts.subjectId
  );
  if (opts.mode !== "full" && opts.chapterIds.length > 0) {
    pool = pool.filter((q) => opts.chapterIds.includes(q.chapterId));
  }
  if (opts.mode === "pyq") {
    pool = pool.filter((q) => q.pyqYears && q.pyqYears.length > 0);
  }
  return pool.length;
}
