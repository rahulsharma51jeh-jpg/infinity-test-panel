"use client";
import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { PerformanceAreaChart, BarMini } from "@/components/charts";
import { formatNumber } from "@/lib/utils";
import { Users, FileText, DollarSign, Activity, Server, Database, Cpu, HardDrive } from "lucide-react";

const kpis = [
  { label: "Total Users", value: 2847, icon: Users, change: "+12%", color: "text-primary" },
  { label: "Questions", value: 52000, icon: FileText, change: "+5%", color: "text-secondary" },
  { label: "Revenue", value: 189000, icon: DollarSign, change: "+18%", color: "text-success" },
  { label: "Active Now", value: 342, icon: Activity, change: "+8%", color: "text-warning" },
];

const serverMetrics = [
  { name: "CPU", value: 42, icon: Cpu, max: 100, unit: "%" },
  { name: "Memory", value: 6.2, icon: HardDrive, max: 16, unit: " GB" },
  { name: "Storage", value: 180, icon: Database, max: 500, unit: " GB" },
  { name: "Uptime", value: 99.9, icon: Server, max: 100, unit: "%" },
];

const revenueData = [
  { month: "Jul", score: 120000 },
  { month: "Aug", score: 135000 },
  { month: "Sep", score: 142000 },
  { month: "Oct", score: 158000 },
  { month: "Nov", score: 171000 },
  { month: "Dec", score: 189000 },
];

const contentQueue = [
  { id: 1, title: "ML Unit 3 - 20 new questions", author: "Dr. Patel", status: "pending" },
  { id: 2, title: "DSA Graph theory corrections", author: "Prof. Kumar", status: "review" },
  { id: 3, title: "CN Unit 5 - Security module", author: "Dr. Singh", status: "approved" },
  { id: 4, title: "OS Virtual Memory update", author: "Prof. Gupta", status: "pending" },
];

const userActivity = [
  { name: "Mon", value: 420 },
  { name: "Tue", value: 380 },
  { name: "Wed", value: 510 },
  { name: "Thu", value: 460 },
  { name: "Fri", value: 390 },
  { name: "Sat", value: 580 },
  { name: "Sun", value: 320 },
];

export default function AdminPage() {
  return (
    <AppShell admin>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted mt-1">Platform overview and management</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(kpi => (
            <Card key={kpi.label} glass>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  <Badge variant="success" className="text-[10px]">{kpi.change}</Badge>
                </div>
                <div className="text-xl font-bold text-foreground">{typeof kpi.value === "number" ? formatNumber(kpi.value) : kpi.value}</div>
                <div className="text-xs text-muted">{kpi.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
            <CardContent>
              <PerformanceAreaChart data={revenueData.map(d => ({ month: d.month, score: d.score / 1000 }))} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Daily Active Users</CardTitle></CardHeader>
            <CardContent>
              <BarMini data={userActivity} dataKey="value" color="var(--color-secondary)" />
            </CardContent>
          </Card>
        </div>

        {/* Server monitoring + Content queue */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Server className="w-4 h-4" /> Server Monitoring</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serverMetrics.map(m => (
                  <div key={m.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground flex items-center gap-2"><m.icon className="w-3 h-3 text-muted" />{m.name}</span>
                      <span className="text-xs text-muted">{m.value}{m.unit} / {m.max}{m.unit}</span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div className="h-full rounded-full gradient-brand" style={{ width: `${(m.value / m.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Content Queue</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contentQueue.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm text-foreground">{item.title}</p>
                      <p className="text-xs text-muted">{item.author}</p>
                    </div>
                    <Badge variant={item.status === "approved" ? "success" : item.status === "review" ? "warning" : "secondary"}>{item.status}</Badge>
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
