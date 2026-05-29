"use client";
import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, classForDifficulty } from "@/lib/utils";
import { getQuestionBank } from "@/data/questions";
import { SUBJECTS } from "@/data/subjects";
import { DIFFICULTIES } from "@/data/types";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export function QuestionBankManager() {
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [page, setPage] = useState(0);
  const perPage = 20;

  const allQuestions = useMemo(() => getQuestionBank(), []);

  const filtered = useMemo(() => {
    let qs = allQuestions;
    if (search) qs = qs.filter(q => q.text.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase()));
    if (filterSubject) qs = qs.filter(q => q.subjectId === filterSubject);
    if (filterDifficulty) qs = qs.filter(q => q.difficulty === filterDifficulty);
    return qs;
  }, [allQuestions, search, filterSubject, filterDifficulty]);

  const paged = filtered.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Question Bank</h1>
          <p className="text-sm text-muted mt-1">{filtered.length.toLocaleString()} questions total</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} placeholder="Search questions or topics..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted" />
            </div>
            <select value={filterSubject} onChange={e => { setFilterSubject(e.target.value); setPage(0); }} className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm">
              <option value="">All Subjects</option>
              {SUBJECTS.slice(0, 15).map(s => <option key={s.id} value={s.id}>{s.code} - {s.name}</option>)}
            </select>
            <select value={filterDifficulty} onChange={e => { setFilterDifficulty(e.target.value); setPage(0); }} className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm">
              <option value="">All Difficulties</option>
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted text-left">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Question</th>
                <th className="pb-3 font-medium">Subject</th>
                <th className="pb-3 font-medium">Topic</th>
                <th className="pb-3 font-medium">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((q, i) => (
                <tr key={q.id} className="border-b border-border last:border-0 hover:bg-primary/5">
                  <td className="py-3 text-muted text-xs">{page * perPage + i + 1}</td>
                  <td className="py-3 text-foreground max-w-[300px] truncate">{q.text}</td>
                  <td className="py-3"><Badge variant="outline" className="text-[10px]">{q.subjectId}</Badge></td>
                  <td className="py-3 text-xs text-muted">{q.topic}</td>
                  <td className="py-3"><Badge className={cn("text-[10px]", classForDifficulty(q.difficulty))}>{q.difficulty}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">Page {page + 1} of {totalPages}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}><ChevronLeft className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
}
