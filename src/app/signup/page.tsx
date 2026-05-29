"use client";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { BRANCHES } from "@/data/branches";
import Link from "next/link";
import { ArrowRight, ArrowLeft, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const steps = ["Account", "Academic", "Verify"];

  return (
    <AuthShell title="Create an account" subtitle="Join thousands of BEU students">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${i <= step ? "gradient-brand text-white" : "bg-card border border-border text-muted"}`}>{i + 1}</div>
            <span className={`text-xs ${i <= step ? "text-foreground" : "text-muted"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        {step === 0 && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">First Name</label>
                <input placeholder="Rahul" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted focus:border-primary outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Last Name</label>
                <input placeholder="Sharma" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted focus:border-primary outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
              <input type="email" placeholder="you@beu.ac.in" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted focus:border-primary outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
              <input type="password" placeholder="Min 8 characters" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted focus:border-primary outline-none" />
            </div>
            <Button className="w-full" onClick={() => setStep(1)}>Continue <ArrowRight className="w-4 h-4" /></Button>
          </>
        )}
        {step === 1 && (
          <>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Branch</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:border-primary outline-none">
                {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Semester</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:border-primary outline-none">
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Enrollment No.</label>
              <input placeholder="BEU2022CSE042" className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted focus:border-primary outline-none" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(0)}><ArrowLeft className="w-4 h-4" /> Back</Button>
              <Button className="flex-1" onClick={() => setStep(2)}>Continue <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="text-center py-4">
              <p className="text-sm text-muted mb-4">We have sent a 6-digit OTP to your email</p>
              <div className="flex gap-2 justify-center">
                {[1,2,3,4,5,6].map(i => (
                  <input key={i} maxLength={1} className="w-10 h-12 rounded-lg border border-border bg-card text-foreground text-center text-lg font-mono focus:border-primary outline-none" />
                ))}
              </div>
              <p className="text-xs text-muted mt-4">Did not receive? <button className="text-primary hover:underline">Resend OTP</button></p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4" /> Back</Button>
              <Link href="/dashboard" className="flex-1"><Button className="w-full"><UserPlus className="w-4 h-4" /> Create Account</Button></Link>
            </div>
          </>
        )}
      </form>
      <p className="text-sm text-muted text-center">
        Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
      </p>
    </AuthShell>
  );
}
