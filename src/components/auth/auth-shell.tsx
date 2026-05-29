import { Infinity } from "lucide-react";
import Link from "next/link";

export function AuthShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 gradient-brand relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative text-center text-white space-y-6 max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
            <Infinity className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold">Infinity Test Panel</h1>
          <p className="text-white/80 text-lg">AI-powered exam preparation for BEU engineering students. Practice smarter, score higher.</p>
          <div className="flex items-center justify-center gap-8 pt-4">
            <div><div className="text-2xl font-bold">50K+</div><div className="text-sm text-white/60">Questions</div></div>
            <div><div className="text-2xl font-bold">9</div><div className="text-sm text-white/60">Branches</div></div>
            <div><div className="text-2xl font-bold">AI</div><div className="text-sm text-white/60">Powered</div></div>
          </div>
        </div>
      </div>
      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <Infinity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-foreground">Infinity Test Panel</span>
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="text-sm text-muted mt-1">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
