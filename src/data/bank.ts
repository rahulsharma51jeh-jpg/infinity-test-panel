import { QUESTIONS } from "./questions";
import type { Question } from "./types";

/**
 * The live question bank = built-in seed questions + teacher-added /
 * AI-approved questions stored in localStorage. Centralising access here means
 * the generator, PYQ browser and analytics all see the same pool.
 */

const CUSTOM_KEY = "itp.customQuestions";
const PENDING_KEY = "itp.pendingQuestions"; // AI suggestions awaiting review

export function getCustomQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    const parsed = raw ? (JSON.parse(raw) as Question[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getPendingQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    const parsed = raw ? (JSON.parse(raw) as Question[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addCustomQuestion(q: Question) {
  const all = getCustomQuestions();
  all.unshift(q);
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(all));
}

export function addPendingQuestion(q: Question) {
  const all = getPendingQuestions();
  all.unshift(q);
  localStorage.setItem(PENDING_KEY, JSON.stringify(all));
}

export function approvePending(id: string) {
  const pending = getPendingQuestions();
  const q = pending.find((x) => x.id === id);
  if (q) {
    addCustomQuestion({ ...q, aiSuggested: false });
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending.filter((x) => x.id !== id)));
  }
}

export function rejectPending(id: string) {
  const pending = getPendingQuestions();
  localStorage.setItem(PENDING_KEY, JSON.stringify(pending.filter((x) => x.id !== id)));
}

/** The full pool used by the test generator and browsers. */
export function getQuestions(): Question[] {
  return [...QUESTIONS, ...getCustomQuestions()];
}
