"use client";
import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { STUDENT, ACHIEVEMENTS, STREAK_DAYS } from "@/data/mock-user";
import { User, Mail, BookOpen, Calendar, Award, Flame, Crown, Star, Moon, Share2, Zap } from "lucide-react";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = { Zap, Crown, Flame, Star, Moon, Share2 };

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {STUDENT.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{STUDENT.name}</h2>
                  <p className="text-sm text-muted">{STUDENT.enrollmentNo}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted"><Mail className="w-4 h-4" />{STUDENT.email}</div>
                  <div className="flex items-center gap-2 text-sm text-muted"><BookOpen className="w-4 h-4" />Sem {STUDENT.semester}</div>
                  <div className="flex items-center gap-2 text-sm text-muted"><Calendar className="w-4 h-4" />Joined {STUDENT.joinedDate}</div>
                  <div className="flex items-center gap-2 text-sm text-muted"><Flame className="w-4 h-4 text-danger" />{STREAK_DAYS} day streak</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{STUDENT.plan} Plan</Badge>
                  <Badge variant="success">Rank #{STUDENT.rank}</Badge>
                  <Badge variant="secondary">{STUDENT.branch.toUpperCase()}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card glass><CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-foreground">{STUDENT.testsCompleted}</div>
            <div className="text-xs text-muted">Tests Completed</div>
          </CardContent></Card>
          <Card glass><CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-foreground">{STUDENT.avgScore}%</div>
            <div className="text-xs text-muted">Average Score</div>
          </CardContent></Card>
          <Card glass><CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-foreground">#{STUDENT.rank}</div>
            <div className="text-xs text-muted">of {STUDENT.totalStudents}</div>
          </CardContent></Card>
          <Card glass><CardContent className="pt-4 pb-4 text-center">
            <div className="text-2xl font-bold text-foreground">{STREAK_DAYS}</div>
            <div className="text-xs text-muted">Day Streak</div>
          </CardContent></Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-warning" /> Achievements</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map(a => {
                const Icon = iconMap[a.icon] || Star;
                return (
                  <div key={a.id} className={`p-4 rounded-xl border ${a.unlocked ? "border-primary/20 bg-primary/5" : "border-border bg-card opacity-50"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.unlocked ? "gradient-brand" : "bg-muted/20"}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">{a.title}</h4>
                    </div>
                    <p className="text-xs text-muted">{a.description}</p>
                    {a.unlocked && <Badge variant="success" className="mt-2 text-[10px]">Unlocked</Badge>}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Certificates placeholder */}
        <Card>
          <CardHeader><CardTitle>Certificates</CardTitle></CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted">
              <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Complete subject mastery to earn certificates</p>
              <p className="text-xs mt-1">Score 90%+ in all units of any subject</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
