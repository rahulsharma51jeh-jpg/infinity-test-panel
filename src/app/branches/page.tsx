import Link from "next/link";
import { Card, CardContent, Badge } from "@/components/ui/card";
import { BranchIcon } from "@/components/ui/icon";
import { BRANCHES } from "@/data/branches";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Users } from "lucide-react";

export default function BranchesPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground">Engineering Branches</h1>
          <p className="text-muted mt-2">Explore curriculum and start practicing for your branch</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES.map(branch => (
            <Link key={branch.id} href={`/branches/${branch.id}`}>
              <Card glass className="h-full hover:border-primary/30 transition-all hover:scale-[1.02] cursor-pointer group">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${branch.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <BranchIcon name={branch.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">{branch.name}</h3>
                  <p className="text-sm text-muted mt-2">{branch.description}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <Badge variant="primary">{branch.code}</Badge>
                    <span className="text-xs text-muted flex items-center gap-1"><Users className="w-3 h-3" />{branch.students} students</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
