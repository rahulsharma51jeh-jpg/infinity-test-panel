"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUBJECTS } from "@/data/subjects";
import { Brain, Sparkles, BookOpen, Target, FileText, Calculator, Lightbulb, MessageSquare, Calendar, BarChart3, Microscope, Wand2, Send, ArrowLeft } from "lucide-react";

const AI_TOOLS = [
  { id: "qgen", name: "Question Generator", desc: "Generate unlimited practice questions", icon: Sparkles, color: "text-primary", available: true },
  { id: "doubt", name: "Doubt Solver", desc: "Get instant explanations", icon: MessageSquare, color: "text-secondary", available: true },
  { id: "planner", name: "Study Planner", desc: "AI study schedule", icon: Calendar, color: "text-success", available: true },
  { id: "summary", name: "Topic Summarizer", desc: "Quick concept summaries", icon: FileText, color: "text-warning", available: false },
  { id: "formula", name: "Formula Sheet", desc: "Auto-generated formula sheets", icon: Calculator, color: "text-accent", available: false },
  { id: "tips", name: "Exam Tips", desc: "Smart exam strategies", icon: Lightbulb, color: "text-primary", available: false },
  { id: "analyzer", name: "Answer Analyzer", desc: "Analyze your answer patterns", icon: BarChart3, color: "text-secondary", available: false },
  { id: "concept", name: "Concept Maps", desc: "Visual topic connections", icon: Brain, color: "text-success", available: false },
  { id: "practice", name: "Targeted Practice", desc: "Focus on weak areas", icon: Target, color: "text-warning", available: false },
  { id: "notes", name: "Smart Notes", desc: "AI-enhanced note taking", icon: BookOpen, color: "text-accent", available: false },
  { id: "lab", name: "Virtual Lab", desc: "Simulated experiments", icon: Microscope, color: "text-primary", available: false },
  { id: "magic", name: "Magic Solve", desc: "Step-by-step solutions", icon: Wand2, color: "text-secondary", available: false },
];

type ActiveTool = null | "qgen" | "doubt" | "planner";

export function AiStudio() {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  if (!activeTool) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Studio</h1>
          <p className="text-sm text-muted mt-1">12 AI-powered tools to accelerate your learning</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_TOOLS.map(tool => (
            <Card key={tool.id} glass className={cn("hover:border-primary/30 transition-all cursor-pointer", !tool.available && "opacity-60")}>
              <CardContent className="pt-6" onClick={() => tool.available && setActiveTool(tool.id as ActiveTool)}>
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10", tool.color)}>
                    <tool.icon className="w-5 h-5" />
                  </div>
                  {!tool.available && <Badge variant="outline" className="text-[10px]">Coming Soon</Badge>}
                  {tool.available && <Badge variant="success" className="text-[10px]">Active</Badge>}
                </div>
                <h3 className="font-medium text-foreground text-sm">{tool.name}</h3>
                <p className="text-xs text-muted mt-1">{tool.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTool === "qgen") return <QuestionGenerator onBack={() => setActiveTool(null)} />;
  if (activeTool === "doubt") return <DoubtSolver onBack={() => setActiveTool(null)} />;
  if (activeTool === "planner") return <StudyPlanner onBack={() => setActiveTool(null)} />;
  return null;
}

function QuestionGenerator({ onBack }: { onBack: () => void }) {
  const [subject, setSubject] = useState("dsa");
  const [topic, setTopic] = useState("");
  const [generated, setGenerated] = useState<Array<{ q: string; options: string[]; answer: number; explanation: string }>>([]);

  const generate = () => {
    const sub = SUBJECTS.find(s => s.id === subject);
    const t = topic || sub?.units[0]?.topics[0] || "General";
    setGenerated([
      { q: `Explain the fundamental concept of ${t} and its applications in engineering.`, options: ["Definition and basic principles", "Advanced applications only", "Historical background", "None of the above"], answer: 0, explanation: `Understanding ${t} requires knowledge of its definition, principles, and how it applies in real-world engineering scenarios.` },
      { q: `Which of the following best describes ${t}?`, options: ["A theoretical framework", "A practical implementation method", "Both theory and practice", "Neither"], answer: 2, explanation: `${t} encompasses both theoretical foundations and practical implementations in the field.` },
      { q: `In the context of ${sub?.name || "this subject"}, what role does ${t} play?`, options: ["Foundational concept", "Advanced optimization", "Testing methodology", "Documentation standard"], answer: 0, explanation: `${t} serves as a foundational concept in ${sub?.name || "this subject"}, forming the basis for more advanced topics.` },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="w-4 h-4" /></Button>
        <div><h1 className="text-xl font-bold text-foreground">Question Generator</h1><p className="text-xs text-muted">Generate practice questions from any topic</p></div>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Subject</label>
            <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm">
              {SUBJECTS.slice(0, 12).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Topic (optional)</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Binary Search, Paging..." className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted" />
          </div>
          <Button onClick={generate}><Sparkles className="w-4 h-4" /> Generate Questions</Button>
        </CardContent>
      </Card>
      {generated.length > 0 && (
        <div className="space-y-3">
          {generated.map((g, i) => (
            <Card key={i}>
              <CardContent className="pt-4 pb-4">
                <p className="text-sm font-medium text-foreground mb-3">Q{i + 1}. {g.q}</p>
                <div className="space-y-1.5 mb-3">
                  {g.options.map((opt, oi) => (
                    <div key={oi} className={cn("text-xs px-3 py-1.5 rounded-lg", oi === g.answer ? "bg-success/10 text-success" : "text-muted")}>{String.fromCharCode(65 + oi)}. {opt}</div>
                  ))}
                </div>
                <p className="text-xs text-muted bg-card border border-border p-2 rounded-lg">{g.explanation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function DoubtSolver({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "Hello! I am your AI doubt solver. Ask me any engineering concept or problem and I will explain it step by step." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: `Great question about "${userMsg}"! Here is a clear explanation:\n\n1. **Core Concept**: This relates to fundamental engineering principles that form the basis of the topic.\n\n2. **Key Points**: The important aspects to remember are the definitions, properties, and applications.\n\n3. **Example**: Consider a practical scenario where this concept is applied in real-world engineering problems.\n\n4. **Summary**: Understanding this concept is crucial for exam preparation and practical applications.` }]);
    }, 800);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="w-4 h-4" /></Button>
        <div><h1 className="text-xl font-bold text-foreground">Doubt Solver</h1><p className="text-xs text-muted">Ask any engineering doubt</p></div>
      </div>
      <Card className="flex-1 flex flex-col min-h-[400px]">
        <CardContent className="flex-1 overflow-y-auto pt-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap", msg.role === "user" ? "gradient-brand text-white rounded-br-md" : "bg-card border border-border text-foreground rounded-bl-md")}>
                {msg.text}
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-4 border-t border-border flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask your doubt..." className="flex-1 px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted" />
          <Button size="icon" onClick={send}><Send className="w-4 h-4" /></Button>
        </div>
      </Card>
    </div>
  );
}

function StudyPlanner({ onBack }: { onBack: () => void }) {
  const [branch, setBranch] = useState("cse");
  const [hours, setHours] = useState("4");
  const [plan, setPlan] = useState<Array<{ time: string; subject: string; activity: string }>>([]);

  const generate = () => {
    setPlan([
      { time: "6:00 AM - 7:30 AM", subject: "Mathematics", activity: "Practice numerical problems from Unit 3" },
      { time: "8:00 AM - 9:30 AM", subject: "Data Structures", activity: "Revise Graph algorithms and solve 5 MCQs" },
      { time: "10:00 AM - 11:00 AM", subject: "Operating Systems", activity: "Study Process Scheduling concepts" },
      { time: "2:00 PM - 3:00 PM", subject: "DBMS", activity: "Practice SQL queries and normalization" },
      { time: "4:00 PM - 5:00 PM", subject: "Mock Test", activity: "Take a 25-question mixed subject test" },
      { time: "7:00 PM - 8:00 PM", subject: "Revision", activity: "Review weak topics identified in analytics" },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="w-4 h-4" /></Button>
        <div><h1 className="text-xl font-bold text-foreground">Study Planner</h1><p className="text-xs text-muted">AI-generated personalized study schedule</p></div>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Branch</label>
              <select value={branch} onChange={e => setBranch(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm">
                <option value="cse">CSE</option><option value="it">IT</option><option value="ece">ECE</option><option value="ee">EE</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Study hours/day</label>
              <input value={hours} onChange={e => setHours(e.target.value)} type="number" min="1" max="12" className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" />
            </div>
          </div>
          <Button onClick={generate}><Calendar className="w-4 h-4" /> Generate Plan</Button>
        </CardContent>
      </Card>
      {plan.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Your Study Plan for Today</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {plan.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg border border-border">
                  <div className="text-xs text-muted whitespace-nowrap min-w-[120px]">{item.time}</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.subject}</p>
                    <p className="text-xs text-muted">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
