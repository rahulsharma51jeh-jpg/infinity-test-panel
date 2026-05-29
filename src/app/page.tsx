"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, Badge } from "@/components/ui/card";
import { BranchIcon } from "@/components/ui/icon";
import { BRANCHES } from "@/data/branches";
import { Brain, FlaskConical, BarChart3, Zap, Shield, Globe, Sparkles, BookOpen, Target, Users, ArrowRight, Check } from "lucide-react";

const stats = [
  { label: "Questions", value: "50,000+" },
  { label: "Branches", value: "9" },
  { label: "Students", value: "2,500+" },
  { label: "AI Tools", value: "12" },
];

const features = [
  { icon: FlaskConical, title: "Smart Test Engine", desc: "Adaptive tests with multiple question types, timed sessions, and instant results" },
  { icon: Brain, title: "AI-Powered Learning", desc: "Question generator, doubt solver, study planner, and personalized recommendations" },
  { icon: BarChart3, title: "Deep Analytics", desc: "Track performance, identify weak areas, and monitor improvement over time" },
  { icon: Target, title: "Topic Mastery", desc: "Unit-wise practice covering all topics with difficulty progression" },
  { icon: Users, title: "Leaderboard", desc: "Compete with peers, earn achievements, and climb the rankings" },
  { icon: Shield, title: "Exam Ready", desc: "University-pattern mock tests designed by subject matter experts" },
];

const aiTools = [
  { title: "Question Generator", desc: "Generate unlimited practice questions from any topic" },
  { title: "Doubt Solver", desc: "Get instant explanations for any concept or problem" },
  { title: "Study Planner", desc: "AI-generated personalized study schedules" },
  { title: "Topic Summarizer", desc: "Quick summaries of complex engineering topics" },
];

const pricing = [
  { name: "Free", price: "0", period: "forever", features: ["5 tests/day", "Basic analytics", "2 AI queries/day", "Community access"], cta: "Start Free" },
  { name: "Pro", price: "199", period: "/month", features: ["Unlimited tests", "Full analytics", "50 AI queries/day", "Priority support", "Performance reports", "Custom test builder"], cta: "Go Pro", popular: true },
  { name: "Elite", price: "499", period: "/month", features: ["Everything in Pro", "Unlimited AI", "1-on-1 mentoring", "Placement prep", "Certificate programs", "Admin dashboard"], cta: "Go Elite" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="primary" className="mb-4 px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-1" /> AI-Powered Platform
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gradient">Infinity</span>{" "}
              <span className="text-foreground">Test Panel</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto">
              The ultimate AI-powered exam preparation platform for BEU engineering students. Practice smarter, learn faster, score higher.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup"><Button size="lg"><Zap className="w-4 h-4" /> Start Practicing Free</Button></Link>
              <Link href="/branches"><Button variant="glass" size="lg"><BookOpen className="w-4 h-4" /> Explore Branches</Button></Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map(s => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Everything You Need to Excel</h2>
            <p className="text-muted mt-2">Comprehensive tools designed for engineering exam preparation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <Card glass className="h-full hover:border-primary/30 transition-colors group">
                  <CardContent className="pt-6">
                    <div className="w-10 h-10 rounded-lg gradient-brand flex items-center justify-center mb-4 group-hover:glow transition-shadow">
                      <f.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3"><Brain className="w-3 h-3 mr-1" /> AI Studio</Badge>
            <h2 className="text-3xl font-bold text-foreground">12 AI Tools at Your Fingertips</h2>
            <p className="text-muted mt-2">From question generation to personalized study plans</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiTools.map((tool, i) => (
              <motion.div key={tool.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <Card className="h-full hover:border-secondary/30 transition-colors">
                  <CardContent className="pt-6">
                    <h4 className="font-medium text-foreground text-sm mb-1">{tool.title}</h4>
                    <p className="text-xs text-muted">{tool.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/ai"><Button variant="secondary" size="md">Explore All AI Tools <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">9 Engineering Branches</h2>
            <p className="text-muted mt-2">Complete syllabus coverage for all BEU branches</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCHES.map((branch, i) => (
              <motion.div key={branch.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                <Link href={`/branches/${branch.id}`}>
                  <Card glass className="h-full hover:border-primary/30 transition-all hover:scale-[1.02] cursor-pointer">
                    <CardContent className="pt-6">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${branch.gradient} flex items-center justify-center mb-3`}>
                        <BranchIcon name={branch.icon} className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{branch.name}</h3>
                      <p className="text-xs text-muted mt-1">{branch.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="text-[10px]">{branch.code}</Badge>
                        <span className="text-[10px] text-muted">{branch.students} students</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Simple, Transparent Pricing</h2>
            <p className="text-muted mt-2">Start free and upgrade as you grow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricing.map(plan => (
              <Card key={plan.name} glass className={`relative ${plan.popular ? "border-primary ring-2 ring-primary/20" : ""}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge variant="primary">Most Popular</Badge></div>}
                <CardContent className="pt-8">
                  <h3 className="font-semibold text-foreground">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">&#8377;{plan.price}</span>
                    <span className="text-sm text-muted">{plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted">
                        <Check className="w-4 h-4 text-success shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link href="/signup"><Button variant={plan.popular ? "primary" : "outline"} className="w-full">{plan.cta}</Button></Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 gradient-brand opacity-5" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-foreground">Ready to Ace Your Exams?</h2>
              <p className="text-muted mt-3 max-w-lg mx-auto">Join thousands of BEU students already using Infinity Test Panel to prepare smarter.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup"><Button size="lg"><Zap className="w-4 h-4" /> Get Started Free</Button></Link>
                <Link href="/dashboard"><Button variant="glass" size="lg"><Globe className="w-4 h-4" /> View Demo</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
