"use client";
import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { LEADERBOARD, STUDENT } from "@/data/mock-user";
import { Trophy, Medal, Award } from "lucide-react";

export default function LeaderboardPage() {
  const top3 = LEADERBOARD.slice(0, 3);
  const rest = LEADERBOARD.slice(3);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-sm text-muted mt-1">Top performers across all branches</p>
        </div>

        {/* Podium */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[top3[1], top3[0], top3[2]].map((entry, idx) => {
            const order = [2, 1, 3];
            const heights = ["h-28", "h-36", "h-24"];
            const icons = [Medal, Trophy, Award];
            const Icon = icons[idx];
            return (
              <div key={entry.rank} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-lg mb-2">
                  {entry.name.split(" ").map(n => n[0]).join("")}
                </div>
                <p className="text-sm font-semibold text-foreground text-center">{entry.name}</p>
                <p className="text-xs text-muted">{entry.branch}</p>
                <div className={`w-full ${heights[idx]} rounded-t-xl gradient-brand mt-3 flex flex-col items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white mb-1" />
                  <span className="text-white font-bold text-lg">{entry.score}%</span>
                  <span className="text-white/70 text-xs">#{order[idx]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full table */}
        <Card>
          <CardHeader><CardTitle>Full Rankings</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {LEADERBOARD.map(entry => (
                <div key={entry.rank} className={`flex items-center justify-between py-3 px-4 rounded-lg ${entry.name === STUDENT.name ? "bg-primary/5 border border-primary/20" : "hover:bg-card"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${entry.rank <= 3 ? "gradient-brand text-white" : "bg-card border border-border text-muted"}`}>
                      {entry.rank}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {entry.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{entry.name} {entry.name === STUDENT.name && <span className="text-xs text-primary">(You)</span>}</p>
                      <p className="text-xs text-muted">{entry.branch} &bull; {entry.tests} tests</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={entry.score >= 85 ? "success" : entry.score >= 75 ? "primary" : "warning"}>{entry.score}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
