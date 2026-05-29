"use client";
import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { PerformanceAreaChart, MasteryRadar, DifficultyPie } from "@/components/charts";
import { STUDENT, PERFORMANCE_TREND, SUBJECT_MASTERY, DIFFICULTY_SPLIT, RECENT_TESTS, STREAK_DAYS, LEADERBOARD } from "@/data/mock-user";
import { formatNumber, pct } from "@/lib/utils";
import { Trophy, Flame, Target, TrendingUp, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const kpis = [
    { label: "Tests Completed", value: STUDENT.testsCompleted, icon: Target, color: "text-primary" },
    { label: "Average Score", value: `${STUDENT.avgScore}%`, icon: TrendingUp, color: "text-success" },
    { label: "Current Rank", value: `#${STUDENT.rank}`, icon: Trophy, color: "text-warning" },
    { label: "Day Streak", value: STREAK_DAYS, icon: Flame, color: "text-danger" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {STUDENT.name.split(" ")[0]}!</h1>
          <p className="text-sm text-muted mt-1">Here is your learning progress overview</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(kpi => (
            <Card key={kpi.label} glass>
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${kpi.color}`}>
                  <kpi.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{kpi.value}</div>
                  <div className="text-xs text-muted">{kpi.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Performance Trend</CardTitle></CardHeader>
            <CardContent>
              <PerformanceAreaChart data={PERFORMANCE_TREND} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Subject Mastery</CardTitle></CardHeader>
            <CardContent>
              <MasteryRadar data={SUBJECT_MASTERY} />
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader><CardTitle>Difficulty Split</CardTitle></CardHeader>
            <CardContent>
              <DifficultyPie data={DIFFICULTY_SPLIT} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Tests</CardTitle>
              <Link href="/tests" className="text-xs text-primary hover:underline">View all</Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {RECENT_TESTS.map(test => (
                  <div key={test.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{test.name}</p>
                        <p className="text-xs text-muted">{test.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={test.score >= 80 ? "success" : test.score >= 60 ? "warning" : "danger"}>
                        {pct(test.score, test.total)}%
                      </Badge>
                      <span className="text-xs text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{test.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Leaderboard</CardTitle>
            <Link href="/dashboard/leaderboard" className="text-xs text-primary hover:underline">View full</Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {LEADERBOARD.slice(0, 5).map(entry => (
                <div key={entry.rank} className={`flex items-center justify-between py-2 px-3 rounded-lg ${entry.name === STUDENT.name ? "bg-primary/5 border border-primary/20" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${entry.rank <= 3 ? "gradient-brand text-white" : "bg-card border border-border text-muted"}`}>
                      {entry.rank}
                    </span>
                    <span className="text-sm font-medium text-foreground">{entry.name}</span>
                    <Badge variant="outline" className="text-[10px]">{entry.branch}</Badge>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{entry.score}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
