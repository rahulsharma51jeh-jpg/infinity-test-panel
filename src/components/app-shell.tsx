"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { LayoutDashboard, BookOpen, BarChart3, Trophy, Brain, FlaskConical, Settings, Users, CreditCard, FileText, Menu, X, ChevronLeft, LogOut } from "lucide-react";

export const STUDENT_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tests", href: "/tests", icon: FlaskConical },
  { label: "AI Tools", href: "/ai", icon: Brain },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Branches", href: "/branches", icon: BookOpen },
  { label: "Profile", href: "/dashboard/profile", icon: Settings },
];

export const ADMIN_NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Questions", href: "/admin/questions", icon: FileText },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Tests", href: "/admin/tests", icon: FlaskConical },
  { label: "Revenue", href: "/admin/revenue", icon: CreditCard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AppShell({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = admin ? ADMIN_NAV : STUDENT_NAV;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}>
        <div className="h-16 flex items-center px-4 border-b border-border justify-between">
          <Brand compact={collapsed} />
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} className="p-1.5 rounded-md hover:bg-primary/10">
              <ChevronLeft className="w-4 h-4 text-muted" />
            </button>
          )}
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active ? "gradient-brand text-white shadow-md" : "text-muted hover:text-foreground hover:bg-primary/5"
              )}>
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border flex items-center gap-2">
          <ThemeToggle />
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2 text-xs text-muted hover:text-danger transition-colors ml-auto">
              <LogOut className="w-3 h-3" /> Logout
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col">
            <div className="h-16 flex items-center px-4 border-b border-border justify-between">
              <Brand />
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-md hover:bg-primary/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
              {navItems.map(item => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    active ? "gradient-brand text-white shadow-md" : "text-muted hover:text-foreground hover:bg-primary/5"
                  )}>
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border flex items-center px-4 lg:px-6 gap-4 bg-card/80 backdrop-blur-sm">
          <button className="lg:hidden p-2 rounded-lg hover:bg-primary/10" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          {collapsed && (
            <button onClick={() => setCollapsed(false)} className="hidden lg:block p-1.5 rounded-md hover:bg-primary/10">
              <Menu className="w-4 h-4 text-muted" />
            </button>
          )}
          <div className="flex-1" />
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
