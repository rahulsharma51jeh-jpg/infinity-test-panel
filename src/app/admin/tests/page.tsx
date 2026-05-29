"use client";
import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal } from "lucide-react";

const tests = [
  { id: 1, name: "DSA Mock Test 2024", subject: "DSA", questions: 40, duration: "60 min", status: "active", attempts: 892 },
  { id: 2, name: "OS Mid-Sem Practice", subject: "OS", questions: 25, duration: "35 min", status: "active", attempts: 654 },
  { id: 3, name: "DBMS Final Mock", subject: "DBMS", questions: 50, duration: "75 min", status: "draft", attempts: 0 },
  { id: 4, name: "CN Unit 3 Quiz", subject: "CN", questions: 15, duration: "20 min", status: "active", attempts: 423 },
  { id: 5, name: "ML Classification Test", subject: "ML", questions: 30, duration: "45 min", status: "scheduled", attempts: 0 },
  { id: 6, name: "Math-1 Calculus", subject: "MA101", questions: 20, duration: "30 min", status: "active", attempts: 1205 },
  { id: 7, name: "Physics Wave Optics", subject: "PH101", questions: 20, duration: "25 min", status: "archived", attempts: 567 },
  { id: 8, name: "SE Agile Quiz", subject: "SE", questions: 15, duration: "15 min", status: "active", attempts: 234 },
];

export default function AdminTestsPage() {
  return (
    <AppShell admin>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Test Management</h1>
            <p className="text-sm text-muted mt-1">Create and manage tests</p>
          </div>
          <Button size="sm"><Plus className="w-4 h-4" /> Create Test</Button>
        </div>

        <Card>
          <CardContent className="pt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input placeholder="Search tests..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted text-left">
                    <th className="pb-3 font-medium">Test Name</th>
                    <th className="pb-3 font-medium">Subject</th>
                    <th className="pb-3 font-medium">Questions</th>
                    <th className="pb-3 font-medium">Duration</th>
                    <th className="pb-3 font-medium">Attempts</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map(test => (
                    <tr key={test.id} className="border-b border-border last:border-0 hover:bg-primary/5">
                      <td className="py-3 font-medium text-foreground">{test.name}</td>
                      <td className="py-3"><Badge variant="outline">{test.subject}</Badge></td>
                      <td className="py-3 text-muted">{test.questions}</td>
                      <td className="py-3 text-muted">{test.duration}</td>
                      <td className="py-3 text-muted">{test.attempts.toLocaleString()}</td>
                      <td className="py-3">
                        <Badge variant={
                          test.status === "active" ? "success" :
                          test.status === "draft" ? "warning" :
                          test.status === "scheduled" ? "primary" : "secondary"
                        }>{test.status}</Badge>
                      </td>
                      <td className="py-3"><button className="p-1 rounded hover:bg-primary/10"><MoreHorizontal className="w-4 h-4 text-muted" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
