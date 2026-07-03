import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Brain, Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — AutoEvolve" },
      { name: "description", content: "Sign in to your AutoEvolve workspace." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate({ to: "/dashboard" });
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AuthHeader />
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md items-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur"
          >
            <h1 className="font-display text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your workspace.</p>

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

            <form className="space-y-3" onSubmit={handleSignIn}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                {loading ? "Signing in..." : "Sign in"}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              No account?{" "}
              <Link to="/try" className="text-foreground underline-offset-4 hover:underline">
                Try free analysis
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <div className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-[#4ade80] to-[#16a34a] shadow-[0_0_20px_-4px_#22c55e80]">
            <Brain className="size-4 text-background" strokeWidth={2.5} />
          </div>
          AutoEvolve
        </Link>
        <Link to="/try" className="text-sm text-muted-foreground transition hover:text-foreground">
          Try free analysis
        </Link>
      </div>
    </header>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 11v3.6h5.1c-.2 1.3-1.6 3.8-5.1 3.8-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.7 0 2.9.7 3.6 1.4l2.4-2.4C16.5 4.6 14.5 3.7 12 3.7 7.4 3.7 3.7 7.4 3.7 12s3.7 8.3 8.3 8.3c4.8 0 8-3.4 8-8.1 0-.5 0-.9-.1-1.2H12z" />
    </svg>
  );
}
