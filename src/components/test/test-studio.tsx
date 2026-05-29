"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, classForDifficulty } from "@/lib/utils";
import { getMcqsForTest } from "@/data/questions";
import { SUBJECTS } from "@/data/subjects";
import { BRANCHES } from "@/data/branches";
import { Difficulty, Question } from "@/data/types";
import { Clock, CheckCircle2, XCircle, Play, RotateCcw, ChevronLeft, ChevronRight, Flag, BookOpen } from "lucide-react";

type Mode = "config" | "running" | "result";

const PRESETS = [
  { name: "Quick Practice", questions: 10, time: 15, difficulty: undefined as Difficulty | undefined },
  { name: "Medium Test", questions: 25, time: 35, difficulty: undefined as Difficulty | undefined },
  { name: "Full Mock", questions: 40, time: 60, difficulty: undefined as Difficulty | undefined },
  { name: "Easy Warm-up", questions: 15, time: 20, difficulty: "Easy" as Difficulty },
  { name: "Hard Challenge", questions: 20, time: 30, difficulty: "Hard" as Difficulty },
];

export function TestStudio() {
  const [mode, setMode] = useState<Mode>("config");
  const [selectedSubject, setSelectedSubject] = useState("dsa");
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(15);
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);

  const startTest = useCallback(() => {
    const qs = getMcqsForTest(selectedSubject, questionCount, difficulty);
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers({});
    setFlagged(new Set());
    setTimeLeft(timeLimit * 60);
    setMode("running");
  }, [selectedSubject, questionCount, timeLimit, difficulty]);

  useEffect(() => {
    if (mode !== "running" || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setMode("result"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, timeLeft]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const score = questions.reduce((acc, q, i) => acc + (answers[i] === (typeof q.correctAnswer === "number" ? q.correctAnswer : -1) ? 1 : 0), 0);

  if (mode === "config") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Test Studio</h1>
          <p className="text-sm text-muted mt-1">Configure and start your practice test</p>
        </div>

        {/* Presets */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Quick Start Presets</h3>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {PRESETS.map(p => (
              <button key={p.name} onClick={() => { setQuestionCount(p.questions); setTimeLimit(p.time); setDifficulty(p.difficulty); }} className="p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors text-left">
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted">{p.questions}Q &bull; {p.time}min</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom builder */}
        <Card>
          <CardHeader><CardTitle>Custom Test Builder</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Subject</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {SUBJECTS.filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i).slice(0, 12).map(s => (
                  <button key={s.id} onClick={() => setSelectedSubject(s.id)} className={cn("px-3 py-2 rounded-lg text-xs border transition-colors", selectedSubject === s.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/30")}>
                    {s.name.length > 25 ? s.code : s.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Questions: {questionCount}</label>
                <input type="range" min="5" max="50" value={questionCount} onChange={e => setQuestionCount(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Time: {timeLimit} min</label>
                <input type="range" min="5" max="90" value={timeLimit} onChange={e => setTimeLimit(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Difficulty</label>
              <div className="flex gap-2">
                {[undefined, "Easy", "Medium", "Hard"].map(d => (
                  <button key={d || "all"} onClick={() => setDifficulty(d as Difficulty | undefined)} className={cn("px-3 py-1.5 rounded-lg text-xs border transition-colors", difficulty === d ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/30")}>
                    {d || "All"}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={startTest} size="lg" className="w-full sm:w-auto"><Play className="w-4 h-4" /> Start Test</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === "running" && questions.length > 0) {
    const q = questions[currentIdx];
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="primary">Q {currentIdx + 1}/{questions.length}</Badge>
            <Badge variant={timeLeft < 60 ? "danger" : "outline"} className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatTime(timeLeft)}</Badge>
          </div>
          <Button variant="danger" size="sm" onClick={() => setMode("result")}>Submit Test</Button>
        </div>

        {/* Question */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <Badge className={classForDifficulty(q.difficulty)}>{q.difficulty}</Badge>
              <button onClick={() => { const nf = new Set(flagged); nf.has(currentIdx) ? nf.delete(currentIdx) : nf.add(currentIdx); setFlagged(nf); }} className={cn("p-1.5 rounded-md", flagged.has(currentIdx) ? "text-warning bg-warning/10" : "text-muted hover:text-warning")}>
                <Flag className="w-4 h-4" />
              </button>
            </div>
            <p className="text-foreground font-medium mb-6">{q.text}</p>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => setAnswers({ ...answers, [currentIdx]: i })} className={cn("w-full text-left p-3 rounded-xl border transition-colors text-sm", answers[currentIdx] === i ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/30 text-foreground")}>
                  <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}><ChevronLeft className="w-4 h-4" /> Prev</Button>
          <Button variant="ghost" size="sm" onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))} disabled={currentIdx === questions.length - 1}>Next <ChevronRight className="w-4 h-4" /></Button>
        </div>

        {/* Palette */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted mb-2">Question Palette</p>
            <div className="flex flex-wrap gap-1.5">
              {questions.map((_, i) => (
                <button key={i} onClick={() => setCurrentIdx(i)} className={cn("w-7 h-7 rounded-md text-xs font-medium transition-colors", i === currentIdx ? "gradient-brand text-white" : answers[i] !== undefined ? "bg-success/20 text-success border border-success/30" : flagged.has(i) ? "bg-warning/20 text-warning border border-warning/30" : "bg-card border border-border text-muted hover:border-primary/30")}>
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-3 text-[10px] text-muted">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-success/20 border border-success/30" /> Answered</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-warning/20 border border-warning/30" /> Flagged</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-card border border-border" /> Not visited</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Result mode
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">{Math.round((score / questions.length) * 100)}%</span>
        </div>
        <h2 className="text-xl font-bold text-foreground">Test Complete!</h2>
        <p className="text-sm text-muted mt-1">You scored {score} out of {questions.length} questions</p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <Card glass><CardContent className="pt-4 pb-4 text-center">
          <CheckCircle2 className="w-5 h-5 text-success mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">{score}</div>
          <div className="text-xs text-muted">Correct</div>
        </CardContent></Card>
        <Card glass><CardContent className="pt-4 pb-4 text-center">
          <XCircle className="w-5 h-5 text-danger mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">{Object.keys(answers).length - score}</div>
          <div className="text-xs text-muted">Wrong</div>
        </CardContent></Card>
        <Card glass><CardContent className="pt-4 pb-4 text-center">
          <Clock className="w-5 h-5 text-muted mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">{questions.length - Object.keys(answers).length}</div>
          <div className="text-xs text-muted">Skipped</div>
        </CardContent></Card>
      </div>

      <div className="flex justify-center gap-3">
        <Button onClick={() => setMode("config")} variant="outline"><RotateCcw className="w-4 h-4" /> New Test</Button>
      </div>

      {/* Explanations */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> Solutions</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {questions.map((q, i) => {
            const correct = typeof q.correctAnswer === "number" ? q.correctAnswer : -1;
            const userAnswer = answers[i];
            const isCorrect = userAnswer === correct;
            return (
              <div key={q.id} className="p-4 rounded-xl border border-border">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-muted">Q{i + 1}</span>
                  {isCorrect ? <Badge variant="success">Correct</Badge> : <Badge variant="danger">Wrong</Badge>}
                </div>
                <p className="text-sm text-foreground mb-3">{q.text}</p>
                <div className="space-y-1.5 mb-3">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className={cn("text-xs px-3 py-1.5 rounded-lg", oi === correct ? "bg-success/10 text-success" : oi === userAnswer && oi !== correct ? "bg-danger/10 text-danger" : "text-muted")}>
                      {String.fromCharCode(65 + oi)}. {opt}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted bg-card p-2 rounded-lg">{q.explanation}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
