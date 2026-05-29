import type { GeneratedTest } from "./testGenerator";
import type { TestResult } from "./storage";

/**
 * In-memory + sessionStorage bridge so the generated test and the last result
 * survive navigation (and a page refresh) without a backend.
 */

const TEST_KEY = "itp.activeTest";
const RESULT_KEY = "itp.lastResult";

let activeTest: GeneratedTest | null = null;

export function setActiveTest(test: GeneratedTest) {
  activeTest = test;
  try {
    sessionStorage.setItem(TEST_KEY, JSON.stringify(test));
  } catch {
    /* ignore quota */
  }
}

export function getActiveTest(id?: string): GeneratedTest | null {
  if (activeTest && (!id || activeTest.id === id)) return activeTest;
  try {
    const raw = sessionStorage.getItem(TEST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GeneratedTest;
      if (!id || parsed.id === id) {
        activeTest = parsed;
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function setLastResult(result: TestResult) {
  try {
    sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
  } catch {
    /* ignore */
  }
}

export function getLastResult(): TestResult | null {
  try {
    const raw = sessionStorage.getItem(RESULT_KEY);
    return raw ? (JSON.parse(raw) as TestResult) : null;
  } catch {
    return null;
  }
}
