import { Infinity } from "lucide-react";
import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center group-hover:glow transition-shadow">
        <Infinity className="w-5 h-5 text-white" />
      </div>
      {!compact && (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground leading-tight">Infinity Test Panel</span>
          <span className="text-[10px] text-muted leading-tight">BEU Engineering</span>
        </div>
      )}
    </Link>
  );
}
