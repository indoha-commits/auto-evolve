import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  Eye,
  EyeOff,
  Check,
  Linkedin,
  SkipForward,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { API_BASE } from "../config";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your workspace — AutoEvolve" },
      { name: "description", content: "Create a free AutoEvolve workspace in seconds." },
    ],
  }),
  component: SignupPage,
});

type Stage = "account" | "company" | "audience" | "goal" | "linkedin";

const ORDER: Stage[] = ["account", "company", "audience", "goal", "linkedin"];

function SignupPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("account");
  const [error, setError] = useState("");
  const [collected, setCollected] = useState({
    email: "",
    password: "",
    companyName: "",
    audience: "",
    goals: [] as string[],
  });

  const idx = ORDER.indexOf(stage);

  const goNext = () => {
    const i = ORDER.indexOf(stage);
    if (i < ORDER.length - 1) setStage(ORDER[i + 1]);
    else navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <div className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-[#4ade80] to-[#16a34a] shadow-[0_0_20px_-4px_#22c55e80]">
              <Brain className="size-4 text-background" strokeWidth={2.5} />
            </div>
            AutoEvolve
          </Link>
          {stage === "account" ? (
            <Link to="/signin" className="text-sm text-muted-foreground transition hover:text-foreground">
              Sign in
            </Link>
          ) : (
            <span className="text-xs text-muted-foreground">
              Step {idx} of {ORDER.length - 1}
            </span>
          )}
        </div>
      </header>

      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md items-center px-6 py-16">
          {stage !== "account" && (
            <div className="absolute left-0 right-0 top-14 h-0.5 bg-border">
              <div
                className="h-full bg-[#22C55E] transition-all"
                style={{ width: `${(idx / (ORDER.length - 1)) * 100}%` }}
              />
            </div>
          )}
          <AnimatePresence mode="wait">
            {stage === "account" && (
              <AccountStep
                key="a"
                error={error}
                setError={setError}
                onSignedUp={(email, password) => {
                  setCollected((p) => ({ ...p, email, password }));
                  goNext();
                }}
              />
            )}
            {stage === "company" && (
              <CompanyStep
                key="c"
                onNext={(name) => {
                  setCollected((p) => ({ ...p, companyName: name }));
                  goNext();
                }}
              />
            )}
            {stage === "audience" && (
              <AudienceStep
                key="b"
                onNext={(audience) => {
                  setCollected((p) => ({ ...p, audience }));
                  goNext();
                }}
              />
            )}
            {stage === "goal" && (
              <GoalStep
                key="g"
                onNext={(goals) => {
                  setCollected((p) => ({ ...p, goals }));
                  goNext();
                }}
              />
            )}
            {stage === "linkedin" && (
              <LinkedInStep
                key="l"
                collected={collected}
                onDone={() => navigate({ to: "/dashboard" })}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StepShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="w-full rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur"
    >
      {children}
    </motion.div>
  );
}

// ── Account Step (creates Supabase user) ────────────────────────────

function AccountStep({
  error,
  setError,
  onSignedUp,
}: {
  error: string;
  setError: (e: string) => void;
  onSignedUp: (email: string, password: string) => void;
}) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/dashboard" },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // No error means user created (or confirmation email sent)
    onSignedUp(email, password);
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
    if (error) setError(error.message);
  };

  return (
    <StepShell>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Create your workspace</h1>
      <p className="mt-1 text-sm text-muted-foreground">Free forever. Upgrade anytime.</p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        onClick={handleGoogle}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-5 py-3 text-sm font-medium transition hover:bg-background/70"
      >
        <GoogleIcon /> Continue with Google
      </button>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
      </div>

      <form className="space-y-3" onSubmit={handleSignUp}>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-[#22C55E]/60"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Password</span>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-border bg-background/40 px-4 py-2.5 pr-10 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-[#22C55E]/60"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22C55E] px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A] disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create workspace"}
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link to="/signin" className="text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </StepShell>
  );
}

// ── Company Step ────────────────────────────────────────────────────

function CompanyStep({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState("");
  return (
    <StepShell>
      <h2 className="font-display text-2xl font-semibold tracking-tight">What&apos;s your company called?</h2>
      <p className="mt-1 text-sm text-muted-foreground">We&apos;ll use this to set up your workspace.</p>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          onNext(name.trim());
        }}
      >
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Acme Inc."
          className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-[#22C55E]/60"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22C55E] px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          Continue
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </button>
      </form>
    </StepShell>
  );
}

// ── Audience Step ───────────────────────────────────────────────────

function AudienceStep({ onNext }: { onNext: (audience: string) => void }) {
  const opts = ["Founders", "Agencies", "Developers", "Operations", "Mining", "Energy", "Finance"];
  const [pick, setPick] = useState<string | null>(null);
  return (
    <StepShell>
      <h2 className="font-display text-2xl font-semibold tracking-tight">Who&apos;s your audience?</h2>
      <p className="mt-1 text-sm text-muted-foreground">The engine tunes hooks and topics to them.</p>
      <div className="mt-6 grid grid-cols-2 gap-2">
        {opts.map((o) => (
          <button
            key={o}
            onClick={() => setPick(o)}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
              pick === o
                ? "border-[#22C55E]/60 bg-[#22C55E]/10 text-foreground"
                : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <button
        onClick={() => pick && onNext(pick)}
        disabled={!pick}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22C55E] px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        Continue
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </button>
    </StepShell>
  );
}

// ── Goal Step ───────────────────────────────────────────────────────

function GoalStep({ onNext }: { onNext: (goals: string[]) => void }) {
  const goals = [
    "Generate clips",
    "Grow LinkedIn",
    "Automate publishing",
    "Understand audience",
    "All of the above",
  ];
  const [picks, setPicks] = useState<string[]>([]);
  const toggle = (g: string) =>
    setPicks((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]));

  return (
    <StepShell>
      <h2 className="font-display text-2xl font-semibold tracking-tight">What do you want from AutoEvolve?</h2>
      <p className="mt-1 text-sm text-muted-foreground">Pick any that apply.</p>
      <div className="mt-6 space-y-2">
        {goals.map((g) => {
          const on = picks.includes(g);
          return (
            <button
              key={g}
              onClick={() => toggle(g)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                on
                  ? "border-[#22C55E]/60 bg-[#22C55E]/10 text-foreground"
                  : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`grid size-5 place-items-center rounded-md border ${
                  on ? "border-[#22C55E] bg-[#22C55E] text-background" : "border-border"
                }`}
              >
                {on && <Check className="size-3" />}
              </div>
              {g}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => onNext(picks)}
        disabled={picks.length === 0}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22C55E] px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        Continue
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </button>
    </StepShell>
  );
}

// ── LinkedIn Step (saves profile to Supabase) ───────────────────────

function LinkedInStep({
  collected,
  onDone,
}: {
  collected: { email: string; companyName: string; audience: string; goals: string[] };
  onDone: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = async () => {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setSaving(false);
      return;
    }

    // Upsert profile in Supabase
    await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: collected.email,
        company_name: collected.companyName,
        audience: collected.audience,
        goals: collected.goals,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    // Mark onboarded
    await supabase.from("profiles").upsert(
      { id: user.id, onboarded: true, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );

    // Check for pending analysis from /try page
    const pending = localStorage.getItem("autoEvolve::pendingAnalysis");
    if (pending) {
      try {
        const { analysisId } = JSON.parse(pending);
        if (analysisId) {
          const session = await supabase.auth.getSession();
          const token = session.data.session?.access_token;
          if (token) {
            await fetch(`${API_BASE.replace(/\/+$/, "")}/api/associate-analysis`, {
              method: "POST",
              headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
              body: JSON.stringify({ analysis_id: analysisId }),
            });
          }
        }
      } catch (e) {
        console.error("Failed to associate analysis:", e);
      }
      localStorage.removeItem("autoEvolve::pendingAnalysis");
    }

    setSaving(false);
    setSaved(true);
  };

  return (
    <StepShell>
      <div className="grid size-12 place-items-center rounded-xl bg-[#0A66C2]/15 text-[#0A66C2]">
        <Linkedin className="size-6" />
      </div>
      <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight">Connect LinkedIn</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Auto-publish clips and pull real engagement data into your learning profile.
      </p>
      <button
        onClick={() => {
          handleSaveProfile();
          onDone();
        }}
        disabled={saving}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0958a8] disabled:opacity-50"
      >
        <Linkedin className="size-4" /> {saving ? "Saving..." : "Connect LinkedIn"}
      </button>
      <button
        onClick={() => {
          handleSaveProfile();
          onDone();
        }}
        disabled={saving}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-50"
      >
        <SkipForward className="size-4" /> {saving ? "Saving..." : "Skip for now"}
      </button>
      <Link
        to="/try"
        className="mt-6 inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Back
      </Link>
    </StepShell>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 11v3.6h5.1c-.2 1.3-1.6 3.8-5.1 3.8-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.7 0 2.9.7 3.6 1.4l2.4-2.4C16.5 4.6 14.5 3.7 12 3.7 7.4 3.7 3.7 7.4 3.7 12s3.7 8.3 8.3 8.3c4.8 0 8-3.4 8-8.1 0-.5 0-.9-.1-1.2H12z" />
    </svg>
  );
}
