import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Brain, Check, ArrowRight, ArrowLeft, Crown, Sparkles, TrendingUp, Linkedin } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — AutoEvolve" },
      { name: "description", content: "AutoEvolve Pro — $29/mo. Unlock clip downloads, LinkedIn publishing, and the full learning engine." },
    ],
  }),
  component: PricingPage,
});

const LEMMON_SQUEEZY_CHECKOUT = "https://autoevolve.lemonsqueezy.com/checkout/buy/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

function PricingPage() {
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
          <Link to="/try" className="text-sm text-muted-foreground transition hover:text-foreground">
            Try free analysis
          </Link>
        </div>
      </header>

      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
        <div className="mx-auto max-w-5xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1 text-xs text-[#22C55E]">
              <Sparkles className="size-3" /> Simple pricing
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
              One plan. <span className="text-gradient-green">Everything included.</span>
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              No feature gates, no per-video fees. One subscription unlocks the full AutoEvolve engine.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-12 max-w-sm"
          >
            <div className="rounded-2xl border border-[#22C55E]/30 bg-surface/40 p-8 backdrop-blur shadow-[0_0_40px_-12px_#22C55E40]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-3 py-1 text-xs font-medium text-[#22C55E]">
                <Crown className="size-3" /> Pro
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold tracking-tight">$29</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Unlimited video analyses",
                  "Save results to dashboard",
                  "Download rendered clips",
                  "Publish to LinkedIn",
                  "Track engagement metrics",
                  "Weekly GEPA prompt evolution",
                  "Priority processing",
                  "Cancel anytime",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="size-4 text-[#22C55E]" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href={LEMMON_SQUEEZY_CHECKOUT}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22C55E] px-5 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A]"
              >
                Subscribe now
                <ArrowRight className="size-4" />
              </a>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                No hidden fees. Cancel anytime.
              </p>
            </div>
          </motion.div>

          <div className="mt-16 text-center">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-3" /> Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
