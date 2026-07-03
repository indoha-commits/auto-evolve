import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  Youtube,
  Link2,
  Check,
  Loader2,
  Sparkles,
  TrendingUp,
  Brain,
  Lock,
  Flame,
  Play,
  AlertCircle,
} from "lucide-react";
import { API_ENDPOINTS } from "../config";

export const Route = createFileRoute("/try")({
  head: () => ({
    meta: [
      { title: "Try Free Analysis — AutoEvolve" },
      { name: "description", content: "Upload a video and see what AutoEvolve learns from it. No signup required." },
      { property: "og:title", content: "Try Free Analysis — AutoEvolve" },
      { property: "og:description", content: "See AI-predicted viral clips and learning insights from your video in seconds." },
    ],
  }),
  component: TryPage,
});

type Step = "upload" | "processing" | "results" | "signup";

interface ClipData {
  n: number;
  score: number;
  hook: string;
  reason: string;
  start: number;
  end: number;
}

interface AnalysisResult {
  clips: ClipData[];
  insights: string[];
  source: string;
}

function TryPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("upload");
  const [source, setSource] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const pending = localStorage.getItem("autoEvolve::pendingAnalysis");
    if (pending) {
      try {
        const data = JSON.parse(pending);
        setResult(data.result);
        setAnalysisId(data.analysisId);
        setSource(data.source);
        setStep("results");
      } catch {}
    }
  }, []);

  const handleSubmit = async (videoUrl: string, fileName: string, videoFile?: File) => {
    setSource(fileName || videoUrl);
    setError("");
    setStep("processing");

    try {
      let res: Response;
      if (videoFile) {
        const form = new FormData();
        form.append("video", videoFile);
        res = await fetch(API_ENDPOINTS.analyze, { method: "POST", body: form });
      } else {
        res = await fetch(API_ENDPOINTS.analyze, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoUrl, fileName }),
        });
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "API error" }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const data: AnalysisResult & { analysis_id?: string } = await res.json();
      setResult(data);
      setAnalysisId(data.analysis_id || null);
      localStorage.setItem("autoEvolve::pendingAnalysis", JSON.stringify({
        result: data,
        analysisId: data.analysis_id || null,
        source: data.source || fileName || videoUrl,
      }));
      setStep("results");
    } catch (e: any) {
      setError(e.message || "Something went wrong");
      setStep("upload");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TryHeader />
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, oklch(0.72 0.19 145 / 0.15), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-24">
          <Stepper step={step} />
          <AnimatePresence mode="wait">
            {step === "upload" && (
              <UploadStep
                key="u"
                onSubmit={(url, name, file) => handleSubmit(url, name, file)}
                error={error}
              />
            )}
            {step === "processing" && (
              <ProcessingStep key="p" />
            )}
            {step === "results" && result && (
              <ResultsStep key="r" result={result} onContinue={() => setStep("signup")} />
            )}
            {step === "signup" && result && analysisId && (
              <SignupWallStep
                key="s"
                result={result}
                analysisId={analysisId}
                onDone={() => {
                  localStorage.removeItem("autoEvolve::pendingAnalysis");
                  navigate({ to: "/dashboard" });
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TryHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <div className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-[#4ade80] to-[#16a34a] shadow-[0_0_20px_-4px_#22c55e80]">
            <Brain className="size-4 text-background" strokeWidth={2.5} />
          </div>
          AutoEvolve
        </Link>
        <Link to="/signin" className="text-sm text-muted-foreground transition hover:text-foreground">
          Sign in
        </Link>
      </div>
    </header>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "upload", label: "Upload" },
    { key: "processing", label: "Analyze" },
    { key: "results", label: "Results" },
    { key: "signup", label: "Unlock" },
  ];
  const idx = steps.findIndex((s) => s.key === step);
  return (
    <div className="mx-auto mb-10 flex max-w-md items-center justify-between">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-2">
          <div
            className={`grid size-6 place-items-center rounded-full text-[10px] font-semibold transition ${
              i <= idx ? "bg-[#22C55E] text-background" : "bg-surface text-muted-foreground"
            }`}
          >
            {i < idx ? <Check className="size-3" /> : i + 1}
          </div>
          <span className={`text-xs ${i <= idx ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
          {i < steps.length - 1 && <div className={`mx-2 h-px w-8 ${i < idx ? "bg-[#22C55E]" : "bg-border"}`} />}
        </div>
      ))}
    </div>
  );
}

/* ------------ STEP 1: UPLOAD ------------ */
function UploadStep({ onSubmit, error }: { onSubmit: (url: string, name: string, file?: File) => void; error: string }) {
  const [tab, setTab] = useState<"file" | "youtube" | "loom">("youtube");
  const [value, setValue] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState<File | null>(null);

  const tabs = [
    { key: "file" as const, label: "Video File", icon: Upload },
    { key: "youtube" as const, label: "YouTube", icon: Youtube },
    { key: "loom" as const, label: "Loom", icon: Link2 },
  ];

  const canSubmit = tab === "file" ? !!fileName : value.trim().length > 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-2xl"
    >
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
          <span className="text-gradient">See what your content</span>{" "}
          <span className="text-gradient-green">could become.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Drop a video. We&apos;ll surface viral moments, predict engagement, and show what AutoEvolve learns.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur">
        <div className="flex gap-1 rounded-full border border-border bg-background/50 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setValue("");
                setFileName("");
              }}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${
                tab === t.key ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="size-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {tab === "file" ? (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-background/40 px-6 py-12 text-center transition hover:border-[#22C55E]/60 hover:bg-background/60">
              <div className="grid size-12 place-items-center rounded-full bg-[#22C55E]/10 text-[#22C55E]">
                <Upload className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium">{fileName || "Drop a video or click to upload"}</p>
                <p className="mt-1 text-xs text-muted-foreground">MP4, MOV, WebM · up to 50 MB</p>
              </div>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  setFileName(f?.name ?? "");
                  setFileData(f ?? null);
                }}
              />
            </label>
          ) : (
            <div>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={tab === "youtube" ? "https://youtube.com/watch?v=..." : "https://www.loom.com/share/..."}
                className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-[#22C55E]/60"
              />
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          disabled={!canSubmit}
          onClick={() => {
            if (tab === "file" && fileData) {
              onSubmit("", fileData.name, fileData);
            } else {
              onSubmit(value || fileName, fileName || value);
            }
          }}
          className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22C55E] px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          Run free analysis
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          No signup. No email. Results in ~30 seconds.
        </p>
      </div>
    </motion.div>
  );
}

/* ------------ STEP 2: PROCESSING ------------ */
function ProcessingStep() {
  const stages = [
    "Transcribing audio",
    "Analyzing structure",
    "Finding viral moments",
    "Predicting engagement",
    "Generating recommendations",
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active < stages.length) {
      const t = setTimeout(() => setActive(active + 1), 4000);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mx-auto max-w-xl rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur"
    >
      <div className="text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-[#22C55E]/10 text-[#22C55E]">
          <Loader2 className="size-5 animate-spin" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">Running learning pipeline</h2>
        <p className="mt-2 text-sm text-muted-foreground">AI is analyzing your video structure and content.</p>
      </div>
      <ul className="mt-8 space-y-3">
        {stages.map((s, i) => {
          const state = i < active ? "done" : i === active ? "loading" : "idle";
          return (
            <li
              key={s}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                state === "done"
                  ? "border-[#22C55E]/30 bg-[#22C55E]/5 text-foreground"
                  : state === "loading"
                  ? "border-border bg-background/40 text-foreground"
                  : "border-border/60 bg-background/20 text-muted-foreground"
              }`}
            >
              <div className="grid size-5 place-items-center">
                {state === "done" ? (
                  <Check className="size-4 text-[#22C55E]" />
                ) : state === "loading" ? (
                  <Loader2 className="size-4 animate-spin text-[#22C55E]" />
                ) : (
                  <div className="size-2 rounded-full bg-border" />
                )}
              </div>
              {s}
              {state === "done" && <span className="ml-auto text-xs text-[#22C55E]">✓</span>}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/* ------------ STEP 3: RESULTS ------------ */
function ResultsStep({ result, onContinue }: { result: AnalysisResult; onContinue: () => void }) {
  const clipCount = result.clips?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mx-auto max-w-4xl"
    >
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1 text-xs text-[#22C55E]">
          <Check className="size-3" /> Analysis complete
        </div>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          We found <span className="text-gradient-green">{clipCount} viral opportunities</span> in your video.
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">Source: {result.source}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {result.clips.map((c) => (
          <div
            key={c.n}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-5 backdrop-blur transition hover:border-[#22C55E]/40"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-[#22C55E]/20 via-background to-background">
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid size-10 place-items-center rounded-full bg-background/70 backdrop-blur">
                  <Play className="size-4 fill-foreground" />
                </div>
              </div>
              <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
                <Flame className="size-3 text-[#22C55E]" /> {c.score}%
              </div>
              <div className="absolute bottom-2 left-2 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-mono backdrop-blur">
                {fmtTime(c.start)} – {fmtTime(c.end)}
              </div>
            </div>
            <div className="mt-3 text-xs font-medium text-muted-foreground">Clip #{c.n}</div>
            <p className="mt-1 text-sm font-semibold leading-snug">"{c.hook}"</p>
            <p className="mt-2 text-xs text-muted-foreground">{c.reason}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Brain className="size-4 text-[#22C55E]" /> What the engine learned
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {result.insights.map((i) => (
            <li key={i} className="flex items-start gap-2 rounded-xl border border-border bg-background/40 px-4 py-3 text-sm">
              <Check className="mt-0.5 size-4 text-[#22C55E]" /> {i}
            </li>
          ))}
          {result.insights.length === 0 && (
            <li className="text-sm text-muted-foreground">Sign up to unlock full learning insights.</li>
          )}
        </ul>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onContinue}
          className="group inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-6 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A]"
        >
          Unlock clips & publishing
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </button>
        <p className="mt-3 text-xs text-muted-foreground">Free workspace · No credit card</p>
      </div>
    </motion.div>
  );
}

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ------------ STEP 4: SIGNUP WALL ------------ */
function SignupWallStep({
  result,
  analysisId,
  onDone,
}: {
  result: AnalysisResult;
  analysisId: string;
  onDone: () => void;
}) {
  const navigate = useNavigate();
  const perks = [
    { icon: TrendingUp, label: "Download clips" },
    { icon: Sparkles, label: "Publish content" },
    { icon: Brain, label: "Save learning profile" },
    { icon: Flame, label: "Track performance" },
  ];

  const handleEmail = () => {
    localStorage.setItem("autoEvolve::pendingAnalysis", JSON.stringify({ result, analysisId, source: result.source }));
    navigate({ to: "/signup" });
  };

  const handleGoogle = async () => {
    const { supabase } = await import("../lib/supabase");
    localStorage.setItem("autoEvolve::pendingAnalysis", JSON.stringify({ result, analysisId, source: result.source }));
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2"
    >
      <div className="rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
          <Lock className="size-3" /> One last step
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
          Create your free workspace
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Save this analysis and unlock the full learning engine.
        </p>
        <ul className="mt-6 space-y-3">
          {perks.map((p) => (
            <li key={p.label} className="flex items-center gap-3 text-sm">
              <div className="grid size-7 place-items-center rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                <p.icon className="size-3.5" />
              </div>
              {p.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur">
        <button
          onClick={handleEmail}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22C55E] px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A]"
        >
          Continue with email
          <ArrowRight className="size-4" />
        </button>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>
        <button
          onClick={handleGoogle}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-5 py-3 text-sm font-medium transition hover:bg-background/70"
        >
          <GoogleIcon /> Continue with Google
        </button>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={async () => {
              localStorage.setItem("autoEvolve::pendingAnalysis", JSON.stringify({ result, analysisId, source: result.source }));
              navigate({ to: "/signin" });
            }}
            className="text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </button>
        </p>
        <button
          onClick={onDone}
          className="mt-6 inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3" /> Skip for now
        </button>
      </div>
    </motion.div>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 11v3.6h5.1c-.2 1.3-1.6 3.8-5.1 3.8-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.7 0 2.9.7 3.6 1.4l2.4-2.4C16.5 4.6 14.5 3.7 12 3.7 7.4 3.7 3.7 7.4 3.7 12s3.7 8.3 8.3 8.3c4.8 0 8-3.4 8-8.1 0-.5 0-.9-.1-1.2H12z" />
    </svg>
  );
}
