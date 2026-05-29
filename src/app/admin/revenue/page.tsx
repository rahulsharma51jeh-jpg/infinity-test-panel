"use client";
import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { PerformanceAreaChart, BarMini } from "@/components/charts";
import { formatNumber } from "@/lib/utils";
import { DollarSign, TrendingUp, Users, CreditCard } from "lucide-react";

const revenueKpis = [
  { label: "Total Revenue", value: "18.9L", icon: DollarSign, change: "+18%", color: "text-success" },
  { label: "MRR", value: "3.2L", icon: TrendingUp, change: "+12%", color: "text-primary" },
  { label: "Paid Users", value: "1,420", icon: Users, change: "+8%", color: "text-secondary" },
  { label: "Avg Revenue/User", value: "224", icon: CreditCard, change: "+5%", color: "text-warning" },
];

const monthlyRevenue = [
  { month: "Jan", score: 92 },
  { month: "Feb", score: 108 },
  { month: "Mar", score: 120 },
  { month: "Apr", score: 135 },
  { month: "May", score: 148 },
  { month: "Jun", score: 156 },
  { month: "Jul", score: 168 },
  { month: "Aug", score: 175 },
  { month: "Sep", score: 182 },
  { month: "Oct", score: 189 },
  { month: "Nov", score: 195 },
  { month: "Dec", score: 210 },
];

const planDistribution = [
  { name: "Free", value: 1427 },
  { name: "Pro", value: 980 },
  { name: "Elite", value: 440 },
];

const recentTransactions = [
  { id: 1, user: "Priya Patel", plan: "Elite", amount: 499, date: "2024-12-10" },
  { id: 2, user: "Amit Kumar", plan: "Pro", amount: 199, date: "2024-12-10" },
  { id: 3, user: "Rahul Sharma", plan: "Pro", amount: 199, date: "2024-12-09" },
  { id: 4, user: "Kavya S.", plan: "Elite", amount: 499, date: "2024-12-09" },
  { id: 5, user: "Neha Gupta", plan: "Pro", amount: 199, date: "2024-12-08" },
];

export default function RevenuePage() {
  return (
    <AppShell admin>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Revenue Dashboard</h1>
          <p className="text-sm text-muted mt-1">Financial overview and subscription metrics</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {revenueKpis.map(kpi => (
            <Card key={kpi.label} glass>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  <Badge variant="success" className="text-[10px]">{kpi.change}</Badge>
                </div>
                <div className="text-xl font-bold text-foreground">{kpi.value}</div>
                <div className="text-xs text-muted">{kpi.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Monthly Revenue (in K)</CardTitle></CardHeader>
            <CardContent><PerformanceAreaChart data={monthlyRevenue} /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Plan Distribution</CardTitle></CardHeader>
            <CardContent><BarMini data={planDistribution} dataKey="value" color="var(--color-primary)" /></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.user}</p>
                    <p className="text-xs text-muted">{tx.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={tx.plan === "Elite" ? "primary" : "secondary"}>{tx.plan}</Badge>
                    <span className="text-sm font-semibold text-foreground">&#8377;{tx.amount}</span>
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
