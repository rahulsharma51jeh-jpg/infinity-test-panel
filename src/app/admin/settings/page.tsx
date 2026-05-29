"use client";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Bell, Globe, Database, Save } from "lucide-react";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-border"}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5.5 left-0.5" : "left-0.5"}`} style={{ transform: enabled ? "translateX(20px)" : "translateX(0)" }} />
    </button>
  );
}

const roles = [
  { name: "Super Admin", permissions: "Full access", users: 2 },
  { name: "Content Manager", permissions: "Questions, Subjects", users: 5 },
  { name: "Moderator", permissions: "Users, Reports", users: 3 },
  { name: "Viewer", permissions: "Read-only", users: 8 },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [registration, setRegistration] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  return (
    <AppShell admin>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted mt-1">Platform configuration and roles</p>
        </div>

        {/* General */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="w-4 h-4" /> General Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-foreground">Email Notifications</p><p className="text-xs text-muted">Send emails for signups and payments</p></div>
              <Toggle enabled={notifications} onToggle={() => setNotifications(!notifications)} />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-foreground">Maintenance Mode</p><p className="text-xs text-muted">Temporarily disable the platform</p></div>
              <Toggle enabled={maintenance} onToggle={() => setMaintenance(!maintenance)} />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-foreground">Open Registration</p><p className="text-xs text-muted">Allow new user signups</p></div>
              <Toggle enabled={registration} onToggle={() => setRegistration(!registration)} />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-foreground">Analytics Tracking</p><p className="text-xs text-muted">Collect usage data for insights</p></div>
              <Toggle enabled={analytics} onToggle={() => setAnalytics(!analytics)} />
            </div>
          </CardContent>
        </Card>

        {/* Roles */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-4 h-4" /> Roles & Permissions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roles.map(role => (
                <div key={role.name} className="flex items-center justify-between py-3 px-4 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">{role.name}</p>
                    <p className="text-xs text-muted">{role.permissions}</p>
                  </div>
                  <Badge variant="outline">{role.users} users</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button><Save className="w-4 h-4" /> Save Changes</Button>
        </div>
      </div>
    </AppShell>
  );
}
