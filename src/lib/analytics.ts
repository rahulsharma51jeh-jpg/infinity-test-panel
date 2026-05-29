import { getChapter, getSubject } from "../data/curriculum";
import type { TestResult } from "./storage";

export interface ChapterStat {
  classId: number;
  subjectId: string;
  chapterId: string;
  chapterName: string;
  subjectName: string;
  total: number;
  correct: number;
  accuracy: number; // 0..100
}

export interface SubjectStat {
  subjectId: string;
  subjectName: string;
  icon: string;
  total: number;
  correct: number;
  accuracy: number;
}

export interface Overview {
  testsTaken: number;
  questionsSolved: number;
  avgAccuracy: number;
  streakDays: number;
}

export function overview(results: TestResult[]): Overview {
  const testsTaken = results.length;
  const questionsSolved = results.reduce((s, r) => s + r.attemptedCount, 0);
  const totalCorrect = results.reduce((s, r) => s + r.correctCount, 0);
  const totalAttempted = results.reduce((s, r) => s + r.attemptedCount, 0);
  const avgAccuracy = totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  return { testsTaken, questionsSolved, avgAccuracy, streakDays: computeStreak(results) };
}

function computeStreak(results: TestResult[]): number {
  if (results.length === 0) return 0;
  const days = new Set(
    results.map((r) => new Date(r.createdAt).toDateString())
  );
  let streak = 0;
  const d = new Date();
  // Count consecutive days back from today (or yesterday if nothing today).
  if (!days.has(d.toDateString())) d.setDate(d.getDate() - 1);
  while (days.has(d.toDateString())) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

/** Aggregate per-chapter accuracy across all attempts. */
export function chapterStats(results: TestResult[]): ChapterStat[] {
  const map = new Map<string, ChapterStat>();
  for (const r of results) {
    for (const a of r.answers) {
      if (!a.attempted) continue;
      const key = `${r.classId}|${r.subjectId}|${a.chapterId}`;
      let stat = map.get(key);
      if (!stat) {
        const ch = getChapter(r.classId, r.subjectId, a.chapterId);
        const subj = getSubject(r.classId, r.subjectId);
        stat = {
          classId: r.classId,
          subjectId: r.subjectId,
          chapterId: a.chapterId,
          chapterName: ch?.name ?? a.chapterId,
          subjectName: subj?.name ?? r.subjectId,
          total: 0,
          correct: 0,
          accuracy: 0,
        };
        map.set(key, stat);
      }
      stat.total += 1;
      if (a.correct) stat.correct += 1;
    }
  }
  const out = [...map.values()];
  out.forEach((s) => (s.accuracy = s.total ? Math.round((s.correct / s.total) * 100) : 0));
  return out;
}

/** Chapters where accuracy is below threshold and the student has enough attempts. */
export function weakChapters(results: TestResult[], threshold = 60): ChapterStat[] {
  return chapterStats(results)
    .filter((s) => s.total >= 2 && s.accuracy < threshold)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 6);
}

export function subjectStats(results: TestResult[]): SubjectStat[] {
  const map = new Map<string, SubjectStat>();
  for (const r of results) {
    const subj = getSubject(r.classId, r.subjectId);
    const key = r.subjectId;
    let stat = map.get(key);
    if (!stat) {
      stat = {
        subjectId: r.subjectId,
        subjectName: subj?.name ?? r.subjectId,
        icon: subj?.icon ?? "📘",
        total: 0,
        correct: 0,
        accuracy: 0,
      };
      map.set(key, stat);
    }
    stat.total += r.attemptedCount;
    stat.correct += r.correctCount;
  }
  const out = [...map.values()];
  out.forEach((s) => (s.accuracy = s.total ? Math.round((s.correct / s.total) * 100) : 0));
  return out.sort((a, b) => b.accuracy - a.accuracy);
}

/** Accuracy of each attempt over time (oldest → newest) for the trend chart. */
export function accuracyTrend(results: TestResult[]): { label: string; value: number }[] {
  return [...results]
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((r, i) => ({
      label: `#${i + 1}`,
      value: r.attemptedCount ? Math.round((r.correctCount / r.attemptedCount) * 100) : 0,
    }));
}

/** Last 91 days of activity counts for the heatmap (newest last). */
export function activityHeatmap(results: TestResult[], weeks = 13): { date: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of results) {
    const key = new Date(r.createdAt).toDateString();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const days: { date: string; count: number }[] = [];
  const total = weeks * 7;
  const start = new Date();
  start.setDate(start.getDate() - (total - 1));
  for (let i = 0; i < total; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({ date: d.toDateString(), count: counts.get(d.toDateString()) ?? 0 });
  }
  return days;
}

/** Average seconds per question across attempts (speed analysis). */
export function avgTimePerQuestion(results: TestResult[]): number {
  let totalTime = 0;
  let totalQ = 0;
  for (const r of results) {
    for (const a of r.answers) {
      if (a.attempted) {
        totalTime += a.timeSpentSec;
        totalQ += 1;
      }
    }
  }
  return totalQ ? Math.round(totalTime / totalQ) : 0;
}
