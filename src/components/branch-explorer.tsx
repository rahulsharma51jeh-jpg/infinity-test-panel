"use client";
import { useState } from "react";
import { Card, CardContent, Badge } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getSubjectsForBranch } from "@/data/subjects";
import { SEMESTERS } from "@/data/branches";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";

export function BranchExplorer({ branchId }: { branchId: string }) {
  const [activeSem, setActiveSem] = useState(1);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const subjects = getSubjectsForBranch(branchId, activeSem);

  return (
    <div className="space-y-6">
      {/* Semester tabs */}
      <div className="flex flex-wrap gap-2">
        {SEMESTERS.map(sem => (
          <button key={sem.number} onClick={() => { setActiveSem(sem.number); setExpandedSubject(null); }} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", activeSem === sem.number ? "gradient-brand text-white shadow-md" : "bg-card border border-border text-muted hover:text-foreground hover:border-primary/30")}>
            Sem {sem.number}
          </button>
        ))}
      </div>

      {/* Subjects */}
      {subjects.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-muted"><BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" /><p className="text-sm">No subjects found for this semester</p></CardContent></Card>
      ) : (
        <div className="space-y-3">
          {subjects.map(subject => (
            <Card key={subject.id} className="overflow-hidden">
              <button onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><BookOpen className="w-4 h-4 text-primary" /></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{subject.name}</p>
                    <p className="text-xs text-muted">{subject.code} &bull; {subject.credits} Credits &bull; {subject.units.length} Units</p>
                  </div>
                </div>
                {expandedSubject === subject.id ? <ChevronDown className="w-4 h-4 text-muted" /> : <ChevronRight className="w-4 h-4 text-muted" />}
              </button>
              {expandedSubject === subject.id && (
                <div className="px-4 pb-4 border-t border-border">
                  <div className="space-y-3 pt-4">
                    {subject.units.map((unit, i) => (
                      <div key={unit.id} className="p-3 rounded-lg bg-card border border-border">
                        <p className="text-sm font-medium text-foreground mb-2">Unit {i + 1}: {unit.name}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {unit.topics.map(topic => (
                            <Badge key={topic} variant="outline" className="text-[10px]">{topic}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
