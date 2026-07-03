import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Sparkles,
  Send,
  TrendingUp,
  Brain,
  Check,
  Plus,
  Minus,
  Play,
  Zap,
  BarChart3,
  Target,
  Activity,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
      <Nav />
      <Hero />
      <LogoStrip />
      <HowItWorks />
      <LearningEngine />
      <CaseStudies />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass mx-auto mt-4 flex w-[min(1200px,calc(100%-2rem))] items-center justify-between rounded-full px-5 py-2.5">
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-[15px] font-semibold tracking-tight">AutoEvolve</span>
        </div>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#how" className="transition hover:text-foreground">How it works</a>
          <a href="#engine" className="transition hover:text-foreground">Engine</a>
          <a href="#pricing" className="transition hover:text-foreground">Pricing</a>
          <a href="#faq" className="transition hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/signin" className="hidden text-sm text-muted-foreground transition hover:text-foreground sm:inline">Sign in</Link>
          <Link to="/try" className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90">
            Try Free Analysis
            <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-[#4ade80] to-[#16a34a] shadow-[0_0_20px_-4px_#22c55e80]">
      <Brain className="size-4 text-background" strokeWidth={2.5} />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36">
      <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.72 0.19 145 / 0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 30%, oklch(0.64 0.19 255 / 0.10), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <a
            href="#engine"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur transition hover:text-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22C55E]" />
              <span className="font-medium text-foreground">New</span>
            </span>
            Learning Engine v15 — 22% lift on founder hooks
            <ArrowRight className="size-3" />
          </a>
          <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[64px] md:text-[76px]">
            <span className="text-gradient">Your Content</span>
            <br />
            <span className="text-gradient-green">Learns</span>{" "}
            <span className="text-gradient">Every Week.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Upload one video. AutoEvolve creates content, publishes it, tracks performance,
            and improves future content — automatically.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/try"
              className="group inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A]"
            >
              Try Free Analysis
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:bg-surface"
            >
              <Play className="size-3.5 fill-current" />
              Book Demo
            </a>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            14-day free trial · No credit card · Cancel anytime
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl md:mt-20"
        >
          <FlowDiagram />
        </motion.div>
      </div>
    </section>
  );
}

/* ----- HERO FLOW DIAGRAM ----- */
function FlowDiagram() {
  const nodes = [
    { icon: Upload, label: "Upload", sub: "1 video" },
    { icon: Sparkles, label: "Generate", sub: "Clips & posts" },
    { icon: Send, label: "Publish", sub: "Multi-channel" },
    { icon: BarChart3, label: "Analytics", sub: "Real signals" },
    { icon: Brain, label: "Learn", sub: "Strategy v+1" },
  ];
  return (
    <div className="relative rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-xl md:p-10">
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, oklch(0.72 0.19 145 / 0.12), transparent 70%)",
        }}
      />
      {/* Central brain */}
      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-3">
          {nodes.slice(0, 2).map((n, i) => (
            <FlowNode key={n.label} {...n} delay={i * 0.15} align="right" />
          ))}
        </div>
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative grid size-32 place-items-center rounded-3xl border border-[#22C55E]/30 bg-gradient-to-br from-[#22C55E]/20 to-[#16A34A]/5 shadow-[0_0_60px_-10px_#22C55E80] md:size-40"
          >
            <div className="absolute inset-0 animate-flow rounded-3xl bg-[#22C55E]/10 blur-2xl" />
            <Brain className="relative size-12 text-[#4ade80] md:size-16" strokeWidth={1.5} />
            <span className="absolute -bottom-3 rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Engine
            </span>
          </motion.div>
        </div>
        <div className="flex flex-col gap-3">
          {nodes.slice(2).map((n, i) => (
            <FlowNode key={n.label} {...n} delay={(i + 2) * 0.15} align="left" />
          ))}
        </div>
      </div>
      {/* connecting svg lines (decorative) */}
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" aria-hidden>
        <defs>
          <linearGradient id="lineGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0" />
            <stop offset="50%" stopColor="#22C55E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function FlowNode({
  icon: Icon,
  label,
  sub,
  delay,
  align,
}: {
  icon: typeof Upload;
  label: string;
  sub: string;
  delay: number;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "right" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`flex items-center gap-3 rounded-2xl border border-border bg-surface/80 p-3 backdrop-blur ${align === "right" ? "md:flex-row-reverse md:text-right" : ""}`}
    >
      <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background">
        <Icon className="size-4 text-[#22C55E]" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="font-mono text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </motion.div>
  );
}

/* ---------------- LOGOS ---------------- */
function LogoStrip() {
  const logos = ["Anthrogen", "Northwind", "Vector", "Helios", "Mercury", "Pulsar"];
  return (
    <section className="border-y border-border/60 bg-surface/30 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by content teams shipping daily
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-4 opacity-60 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((l) => (
            <div key={l} className="text-center font-display text-lg font-semibold tracking-tight text-muted-foreground">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: Upload,
      title: "Upload",
      desc: "Drop a long-form video. Podcast, keynote, founder interview — anything.",
      visual: <UploadVisual />,
    },
    {
      n: "02",
      icon: Sparkles,
      title: "Generate",
      desc: "AI extracts hooks, archetypes, and high-signal clips ready to ship.",
      visual: <GenerateVisual />,
    },
    {
      n: "03",
      icon: Send,
      title: "Publish",
      desc: "Schedule across LinkedIn, X, TikTok, YouTube, and Instagram in one click.",
      visual: <PublishVisual />,
    },
    {
      n: "04",
      icon: Brain,
      title: "Learn",
      desc: "Your strategy evolves automatically based on what actually performs.",
      visual: <LearnVisual />,
    },
  ];
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How it works"
          title="A loop that compounds."
          desc="Four steps that turn one video into a feedback engine for your content."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur transition hover:border-[#22C55E]/30 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#22C55E]">{s.n}</span>
                    <span className="h-px w-8 bg-border" />
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">{s.desc}</p>
                </div>
                <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background">
                  <s.icon className="size-4 text-[#22C55E]" />
                </div>
              </div>
              <div className="mt-8">{s.visual}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UploadVisual() {
  return (
    <div className="relative rounded-2xl border border-dashed border-border bg-background/50 p-6">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-surface-2">
          <Upload className="size-4 text-[#22C55E]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">founder-interview-q2.mp4</span>
            <span className="font-mono text-muted-foreground">487 MB</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "82%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[#22C55E] to-[#4ade80]"
            />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>Transcribing · AI analysis</span>
            <span>82%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenerateVisual() {
  const clips = [
    { t: "00:42", pred: "87%" },
    { t: "03:18", pred: "82%" },
    { t: "07:54", pred: "76%" },
    { t: "11:02", pred: "91%" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {clips.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-lg border border-border bg-background/60 p-2"
        >
          <div className="grid aspect-[9/12] place-items-center rounded-md bg-gradient-to-br from-surface-2 to-background">
            <Play className="size-4 text-muted-foreground" />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px]">
            <span className="font-mono text-muted-foreground">{c.t}</span>
            <span className="font-mono font-semibold text-[#22C55E]">{c.pred}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PublishVisual() {
  const channels = ["LinkedIn", "X", "TikTok", "YouTube", "Instagram"];
  return (
    <div className="space-y-2">
      {channels.map((ch, i) => (
        <motion.div
          key={ch}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2"
        >
          <div className="flex items-center gap-2.5">
            <div className="size-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
            <span className="text-sm font-medium">{ch}</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">Scheduled · Tue 9:00 AM</span>
        </motion.div>
      ))}
    </div>
  );
}

function LearnVisual() {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Strategy</span>
        <span className="font-mono text-[10px] text-[#22C55E]">+22% lift</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          { v: "v15", change: "More founder stories", lift: "+18%" },
          { v: "v14", change: "Add numeric data", lift: "+10%" },
          { v: "v13", change: "Stronger contrarian hooks", lift: "+22%" },
        ].map((r, i) => (
          <motion.div
            key={r.v}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg bg-surface-2/60 px-3 py-2"
          >
            <span className="font-mono text-xs text-muted-foreground">{r.v}</span>
            <span className="truncate text-xs text-foreground">{r.change}</span>
            <span className="font-mono text-xs font-semibold text-[#22C55E]">{r.lift}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- LEARNING ENGINE ---------------- */
function LearningEngine() {
  return (
    <section id="engine" className="relative py-24 md:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 50%, oklch(0.72 0.19 145 / 0.10), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="The Learning Engine"
          title="It gets sharper every week."
          desc="Every post becomes a data point. Every data point becomes a better prompt."
        />
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <EngineCard className="lg:col-span-7" title="Winning Hooks" icon={Target}>
            <HooksTable />
          </EngineCard>
          <EngineCard className="lg:col-span-5" title="Audience Insights" icon={Activity}>
            <AudienceChart />
          </EngineCard>
          <EngineCard className="lg:col-span-5" title="Best Topics" icon={TrendingUp}>
            <TopicsList />
          </EngineCard>
          <EngineCard className="lg:col-span-7" title="Prompt Evolution" icon={Zap}>
            <PromptEvolution />
          </EngineCard>
        </div>
      </div>
    </section>
  );
}

function EngineCard({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: typeof Target;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur md:p-8 ${className}`}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-lg border border-border bg-background">
            <Icon className="size-3.5 text-[#22C55E]" />
          </div>
          <h3 className="font-display text-base font-semibold tracking-tight">{title}</h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Live</span>
      </div>
      {children}
    </motion.div>
  );
}

function HooksTable() {
  const rows = [
    { h: "Most mining companies fail because…", lift: "2.1x" },
    { h: "I was losing $2M every week until…", lift: "1.8x" },
    { h: "The truth about permits no one says…", lift: "1.6x" },
    { h: "Stop doing this in 2026.", lift: "1.4x" },
  ];
  return (
    <div className="divide-y divide-border">
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto] items-center gap-4 py-2.5">
          <span className="truncate text-sm text-foreground">{r.h}</span>
          <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#22C55E]">
            {r.lift}
          </span>
        </div>
      ))}
    </div>
  );
}

function AudienceChart() {
  const platforms = [
    { name: "LinkedIn", pct: 72, color: "#3B82F6" },
    { name: "X (Twitter)", pct: 18, color: "#22C55E" },
    { name: "YouTube", pct: 10, color: "#F59E0B" },
  ];
  return (
    <div className="space-y-3">
      {platforms.map((p) => (
        <div key={p.name}>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: p.color }} />
              <span className="text-sm">{p.name}</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{p.pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${p.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: p.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TopicsList() {
  const topics = [
    { t: "Founder stories", n: 18 },
    { t: "Problem → cost → solution", n: 14 },
    { t: "Contrarian angles", n: 11 },
    { t: "Numeric data hooks", n: 9 },
  ];
  return (
    <div className="space-y-2">
      {topics.map((t) => (
        <div key={t.t} className="flex items-center justify-between rounded-xl bg-surface-2/50 px-3 py-2.5">
          <span className="text-sm">{t.t}</span>
          <span className="font-mono text-xs text-muted-foreground">{t.n} wins</span>
        </div>
      ))}
    </div>
  );
}

function PromptEvolution() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border bg-background/60 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Current · v15</span>
          <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 font-mono text-[10px] text-[#22C55E]">87% score</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          Focus on founder stories. Pattern: <span className="text-[#22C55E]">problem → cost → solution</span>.
          Lead with numeric data. Use contrarian angles for hooks.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { v: "v13", s: "65" },
          { v: "v14", s: "78" },
          { v: "v15", s: "87" },
        ].map((x, i) => (
          <div key={x.v} className="rounded-xl border border-border bg-background/60 p-3">
            <div className="font-mono text-[10px] text-muted-foreground">{x.v}</div>
            <div className="mt-1 font-display text-xl font-semibold">
              {x.s}
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <div className={`mt-1 font-mono text-[10px] ${i === 2 ? "text-[#22C55E]" : "text-muted-foreground"}`}>
              {i === 0 ? "baseline" : i === 1 ? "+13" : "+22"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- CASE STUDIES ---------------- */
function CaseStudies() {
  const cases = [
    {
      logo: "Mercury Mining",
      stat: "12.4M",
      label: "impressions in 90 days",
      quote: "We went from posting twice a month to shipping daily. Same team.",
      author: "Sarah Chen, CMO",
    },
    {
      logo: "Northwind",
      stat: "+340%",
      label: "qualified pipeline",
      quote: "AutoEvolve learned our audience faster than our agency ever did.",
      author: "Marcus Reid, Head of Growth",
    },
    {
      logo: "Helios Capital",
      stat: "86K",
      label: "engaged followers",
      quote: "The feedback loop is unfair. Every week we get measurably better.",
      author: "Priya Anand, Partner",
    },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Case studies"
          title="Built for teams that ship."
          desc="From seed-stage founders to public companies."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur md:p-8"
            >
              <div className="font-display text-sm font-semibold tracking-tight text-muted-foreground">{c.logo}</div>
              <div className="mt-6">
                <div className="text-gradient-green font-display text-5xl font-semibold tracking-tight">{c.stat}</div>
                <div className="mt-1 text-sm text-muted-foreground">{c.label}</div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-foreground">"{c.quote}"</p>
              <div className="mt-auto pt-4 font-mono text-[11px] text-muted-foreground">— {c.author}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: 99,
      desc: "For solo founders & creators.",
      features: ["4 videos / month", "100 generated clips", "2 channels", "Basic analytics"],
    },
    {
      name: "Growth",
      price: 249,
      desc: "For growing content teams.",
      features: ["12 videos / month", "500 clips", "All channels", "Learning Engine", "Priority support"],
      featured: true,
    },
    {
      name: "Agency",
      price: 499,
      desc: "For agencies & studios.",
      features: ["Unlimited videos", "Unlimited clips", "5 workspaces", "Custom prompts", "Dedicated CSM"],
    },
    {
      name: "White Label",
      price: 999,
      desc: "Resell as your own.",
      features: ["Everything in Agency", "Your brand & domain", "Multi-tenant", "API access", "SSO + SAML"],
    },
  ];
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Pricing"
          title="Compounding value, flat pricing."
          desc="No per-seat fees. No surprise overages."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative flex flex-col rounded-3xl border p-6 backdrop-blur md:p-7 ${
                t.featured
                  ? "border-[#22C55E]/40 bg-gradient-to-b from-[#22C55E]/10 to-surface/40 shadow-[0_0_40px_-10px_#22C55E60]"
                  : "border-border bg-surface/40"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-[#22C55E] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-background">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold tracking-tight">{t.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold tracking-tight">${t.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#22C55E]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-7 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  t.featured
                    ? "bg-[#22C55E] text-background hover:bg-[#16A34A]"
                    : "border border-border bg-surface text-foreground hover:bg-surface-2"
                }`}
              >
                Get started
                <ArrowRight className="size-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    {
      q: "How does the learning engine actually work?",
      a: "Every published post is tracked across platforms. We attribute performance back to the hook, topic, structure, and timing — then update your strategy prompt automatically. Each version is versioned, so you can see what changed and why.",
    },
    {
      q: "Which platforms do you publish to?",
      a: "LinkedIn, X, TikTok, YouTube Shorts, Instagram Reels, and Threads. You can connect any combination per workspace.",
    },
    {
      q: "Do I need to provide my own AI keys?",
      a: "No. AutoEvolve includes all generation, transcription, and analytics. You upload — we handle the rest.",
    },
    {
      q: "Can I keep my brand voice?",
      a: "Yes. We train a per-workspace voice model on your past content and the founder's spoken style from uploaded videos.",
    },
    {
      q: "Is there a free trial?",
      a: "14 days, no credit card required. Upload one video and watch the engine run end-to-end.",
    },
  ];
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered."
          desc="Still curious? Reach out to our team — we reply within hours."
          align="center"
        />
        <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-surface/40 backdrop-blur">
          {items.map((it, i) => (
            <FAQItem key={i} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((o) => !o)}
      className="group flex w-full items-start gap-4 px-6 py-5 text-left transition hover:bg-surface-2/30"
    >
      <div className="flex-1">
        <div className="font-display text-base font-medium text-foreground">{q}</div>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, marginTop: open ? 8 : 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
        >
          {a}
        </motion.div>
      </div>
      <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border bg-background">
        {open ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
      </div>
    </button>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="px-6 pb-24 md:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-surface/40 p-10 backdrop-blur md:p-16">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 0%, oklch(0.72 0.19 145 / 0.18), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 -z-10 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-6xl">
            <span className="text-gradient">Ship content that</span>{" "}
            <span className="text-gradient-green">compounds</span>
            <span className="text-gradient">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground">
            Start free. Upload one video. See the engine learn within a week.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/try"
              className="group inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A]"
            >
              Try Free Analysis
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
            >
              Book Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-sm font-semibold tracking-tight">AutoEvolve</span>
          </div>
          <p className="mt-3 max-w-xs text-xs text-muted-foreground">
            Self-learning content infrastructure for teams that ship.
          </p>
        </div>
        {[
          { h: "Product", l: ["How it works", "Pricing", "Changelog", "Roadmap"] },
          { h: "Company", l: ["About", "Customers", "Careers", "Contact"] },
          { h: "Resources", l: ["Docs", "Help center", "Status", "Security"] },
        ].map((col) => (
          <div key={col.h}>
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{col.h}</div>
            <ul className="mt-3 space-y-2">
              {col.l.map((x) => (
                <li key={x}>
                  <a href="#" className="text-sm text-foreground/80 transition hover:text-foreground">{x}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 AutoEvolve, Inc.</span>
          <span className="font-mono">Built for the long game.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- shared ---------------- */
function SectionHeader({
  eyebrow,
  title,
  desc,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#22C55E]">
        <span className="size-1 rounded-full bg-[#22C55E]" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-gradient sm:text-5xl">
        {title}
      </h2>
      {desc && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{desc}</p>}
    </div>
  );
}
