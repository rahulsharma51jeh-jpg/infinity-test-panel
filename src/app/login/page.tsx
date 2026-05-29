"use client";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell title="Welcome back" subtitle="Log in to your Infinity Test Panel account">
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
          <input type="email" placeholder="you@beu.ac.in" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" className="rounded border-border" /> Remember me</label>
          <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
        </div>
        <Link href="/dashboard">
          <Button className="w-full" size="lg"><LogIn className="w-4 h-4" /> Log In</Button>
        </Link>
      </form>
      <p className="text-sm text-muted text-center">
        Do not have an account? <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
      </p>
    </AuthShell>
  );
}
