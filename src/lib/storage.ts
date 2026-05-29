import type { Difficulty, TestMode } from "../data/types";

/** A single answered question within a completed attempt. */
export interface AnswerRecord {
  questionId: string;
  chapterId: string;
  topic?: string;
  correct: boolean;
  attempted: boolean;
  marks: number;
  awarded: number;
  timeSpentSec: number;
  /** chosen option index for objective questions */
  userIndex?: number;
  /** typed answer for subjective / numerical questions */
  userText?: string;
  /** subjective answers need student/teacher self-evaluation */
  needsManualEval?: boolean;
}

/** A completed test attempt, persisted to localStorage. */
export interface TestResult {
  id: string;
  createdAt: number;
  classId: number;
  subjectId: string;
  mode: TestMode;
  difficulty: Difficulty | "mixed";
  totalQuestions: number;
  totalMarks: number;
  awardedMarks: number;
  correctCount: number;
  attemptedCount: number;
  durationSec: number;
  answers: AnswerRecord[];
}

const RESULTS_KEY = "itp.results";
const PROFILE_KEY = "itp.profile";

export interface Profile {
  name: string;
  classId: number;
}

export function getProfile(): Profile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw) as Profile;
  } catch {
    /* ignore */
  }
  return { name: "Student", classId: 10 };
}

export function saveProfile(p: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export function getResults(): TestResult[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TestResult[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveResult(result: TestResult) {
  const all = getResults();
  all.unshift(result);
  // keep the most recent 100 attempts
  localStorage.setItem(RESULTS_KEY, JSON.stringify(all.slice(0, 100)));
}

/** Replace an existing result (e.g. after self-evaluating subjective answers). */
export function updateResult(result: TestResult) {
  const all = getResults().map((r) => (r.id === result.id ? result : r));
  localStorage.setItem(RESULTS_KEY, JSON.stringify(all));
}

export function clearResults() {
  localStorage.removeItem(RESULTS_KEY);
}
