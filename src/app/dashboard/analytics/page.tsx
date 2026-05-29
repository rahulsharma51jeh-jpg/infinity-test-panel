"use client";
import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { PerformanceAreaChart, MasteryRadar, DifficultyPie, BarMini } from "@/components/charts";
import { PERFORMANCE_TREND, SUBJECT_MASTERY, DIFFICULTY_SPLIT, WEAK_TOPICS } from "@/data/mock-user";
import { TrendingUp, AlertTriangle, Target, Brain } from "lucide-react";

const weeklyData = [
  { name: "Mon", value: 5 },
  { name: "Tue", value: 3 },
  { name: "Wed", value: 7 },
  { name: "Thu", value: 4 },
  { name: "Fri", value: 6 },
  { name: "Sat", value: 8 },
  { name: "Sun", value: 2 },
];

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Performance Analytics</h1>
          <p className="text-sm text-muted mt-1">Detailed insights into your learning patterns</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card glass><CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-success mb-1"><TrendingUp className="w-4 h-4" /><span className="text-xs">Improving</span></div>
            <div className="text-xl font-bold text-foreground">+8%</div>
            <div className="text-xs text-muted">vs last month</div>
          </CardContent></Card>
          <Card glass><CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-primary mb-1"><Target className="w-4 h-4" /><span className="text-xs">Accuracy</span></div>
            <div className="text-xl font-bold text-foreground">74%</div>
            <div className="text-xs text-muted">overall</div>
          </CardContent></Card>
          <Card glass><CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-warning mb-1"><AlertTriangle className="w-4 h-4" /><span className="text-xs">Weak Areas</span></div>
            <div className="text-xl font-bold text-foreground">5</div>
            <div className="text-xs text-muted">topics to improve</div>
          </CardContent></Card>
          <Card glass><CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-secondary mb-1"><Brain className="w-4 h-4" /><span className="text-xs">Questions</span></div>
            <div className="text-xl font-bold text-foreground">2,180</div>
            <div className="text-xs text-muted">attempted</div>
          </CardContent></Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Score Progression</CardTitle></CardHeader>
            <CardContent><PerformanceAreaChart data={PERFORMANCE_TREND} /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Subject Radar</CardTitle></CardHeader>
            <CardContent><MasteryRadar data={SUBJECT_MASTERY} /></CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader><CardTitle>Difficulty Distribution</CardTitle></CardHeader>
            <CardContent><DifficultyPie data={DIFFICULTY_SPLIT} /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Weekly Activity</CardTitle></CardHeader>
            <CardContent><BarMini data={weeklyData} dataKey="value" color="var(--color-secondary)" /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-warning" /> Weak Topics</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {WEAK_TOPICS.map(topic => (
                  <div key={topic.topic} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">{topic.topic}</p>
                      <p className="text-xs text-muted">{topic.subject}</p>
                    </div>
                    <Badge variant={topic.accuracy < 50 ? "danger" : "warning"}>{topic.accuracy}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
