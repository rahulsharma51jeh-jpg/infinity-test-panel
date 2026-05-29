import type { Question } from "../data/types";
import type { Lang } from "../i18n";

export function qPrompt(q: Question, lang: Lang): string {
  return lang === "hi" && q.promptHi ? q.promptHi : q.prompt;
}

export function qOptions(q: Question, lang: Lang): string[] {
  if (lang === "hi" && q.optionsHi && q.optionsHi.length) return q.optionsHi;
  return q.options ?? [];
}

export function qExplanation(q: Question, lang: Lang): string | undefined {
  return lang === "hi" && q.explanationHi ? q.explanationHi : q.explanation;
}

export const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
