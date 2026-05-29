"use client";
import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, MoreHorizontal } from "lucide-react";

const users = [
  { id: 1, name: "Rahul Sharma", email: "rahul@beu.ac.in", branch: "CSE", plan: "Pro", status: "active", tests: 87 },
  { id: 2, name: "Priya Patel", email: "priya@beu.ac.in", branch: "CSE", plan: "Elite", status: "active", tests: 124 },
  { id: 3, name: "Amit Kumar", email: "amit@beu.ac.in", branch: "CSE", plan: "Pro", status: "active", tests: 116 },
  { id: 4, name: "Sneha Reddy", email: "sneha@beu.ac.in", branch: "IT", plan: "Free", status: "active", tests: 108 },
  { id: 5, name: "Vikram Singh", email: "vikram@beu.ac.in", branch: "AI&DS", plan: "Pro", status: "inactive", tests: 98 },
  { id: 6, name: "Neha Gupta", email: "neha@beu.ac.in", branch: "CSE", plan: "Pro", status: "active", tests: 112 },
  { id: 7, name: "Arjun Nair", email: "arjun@beu.ac.in", branch: "ECE", plan: "Free", status: "active", tests: 95 },
  { id: 8, name: "Kavya Sharma", email: "kavya@beu.ac.in", branch: "CSE", plan: "Elite", status: "active", tests: 102 },
  { id: 9, name: "Rohit Das", email: "rohit@beu.ac.in", branch: "IT", plan: "Pro", status: "suspended", tests: 89 },
  { id: 10, name: "Ananya Joshi", email: "ananya@beu.ac.in", branch: "AI&DS", plan: "Free", status: "active", tests: 94 },
];

export default function AdminUsersPage() {
  return (
    <AppShell admin>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-sm text-muted mt-1">Manage all registered students</p>
          </div>
          <Button size="sm"><UserPlus className="w-4 h-4" /> Add User</Button>
        </div>

        <Card>
          <CardContent className="pt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input placeholder="Search users..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted text-left">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Branch</th>
                    <th className="pb-3 font-medium">Plan</th>
                    <th className="pb-3 font-medium">Tests</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-primary/5">
                      <td className="py-3">
                        <div><p className="text-foreground font-medium">{user.name}</p><p className="text-xs text-muted">{user.email}</p></div>
                      </td>
                      <td className="py-3"><Badge variant="outline">{user.branch}</Badge></td>
                      <td className="py-3"><Badge variant={user.plan === "Elite" ? "primary" : user.plan === "Pro" ? "secondary" : "outline"}>{user.plan}</Badge></td>
                      <td className="py-3 text-muted">{user.tests}</td>
                      <td className="py-3"><Badge variant={user.status === "active" ? "success" : user.status === "suspended" ? "danger" : "warning"}>{user.status}</Badge></td>
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
