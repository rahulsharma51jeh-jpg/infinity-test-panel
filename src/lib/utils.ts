import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1) + "K";
  return n.toString();
}
export function pct(value: number, total: number): number { if (!total) return 0; return Math.round((value / total) * 100); }
export function classForDifficulty(d: string): string {
  switch (d.toLowerCase()) {
    case "easy": return "text-success bg-success/10 border-success/20";
    case "medium": return "text-warning bg-warning/10 border-warning/20";
    case "hard": return "text-danger bg-danger/10 border-danger/20";
    default: return "text-secondary bg-secondary/10 border-secondary/20";
  }
}
