import { BRANCHES } from "@/data/branches";
import { BranchIcon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/card";
import { BranchExplorer } from "@/components/branch-explorer";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return BRANCHES.map(b => ({ id: b.id }));
}

export default async function BranchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const branch = BRANCHES.find(b => b.id === id);
  if (!branch) return <div className="p-8 text-center text-muted">Branch not found</div>;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className={`rounded-3xl bg-gradient-to-br ${branch.gradient} p-8 md:p-12 text-white relative overflow-hidden mb-8`}>
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BranchIcon name={branch.icon} className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{branch.name}</h1>
              <p className="text-white/80 mt-2 max-w-xl">{branch.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge className="bg-white/20 text-white border-white/30">{branch.code}</Badge>
                <span className="text-sm text-white/70 flex items-center gap-1"><Users className="w-4 h-4" />{branch.students} students</span>
              </div>
            </div>
            <Link href="/tests">
              <Button variant="glass" className="border-white/30 text-white hover:bg-white/20">Start Test</Button>
            </Link>
          </div>
        </div>

        {/* Explorer */}
        <BranchExplorer branchId={id} />
      </div>
      <SiteFooter />
    </div>
  );
}
