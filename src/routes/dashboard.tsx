import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, Brain, Sparkles, TrendingUp, Upload,
  Flame, BarChart3, Play, Loader2, Lock, Linkedin, Crown, Check,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { API_ENDPOINTS } from "../config";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AutoEvolve" },
      { name: "description", content: "Your AutoEvolve workspace." },
    ],
  }),
  component: Dashboard,
});

type Analysis = {
  id: string;
  source_url: string;
  source_type: string;
  clips: { n: number; score: number; hook: string; reason: string; start: number; end: number }[];
  insights: string[];
  created_at: string;
};

type Features = {
  max_analyses: number;
  max_renders: number;
  max_publishes: number;
  save_results: boolean;
  render_clips: boolean;
  publish_linkedin: boolean;
  track_engagement: boolean;
  prompt_evolution: boolean;
  priority_processing: boolean;
};

const FREE_FEATURES: Features = {
  max_analyses: 3, max_renders: 0, max_publishes: 0,
  save_results: false, render_clips: false, publish_linkedin: false,
  track_engagement: false, prompt_evolution: false, priority_processing: false,
};

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [features, setFeatures] = useState<Features>(FREE_FEATURES);
  const [plan, setPlan] = useState("free");
  const [publishing, setPublishing] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { navigate({ to: "/signin" }); return; }

      // Fetch features
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.access_token) {
          fetch(API_ENDPOINTS.features, {
            headers: { Authorization: `Bearer ${session.access_token}` },
          }).then((r) => r.json()).then((d) => {
            if (d.features) setFeatures(d.features);
            if (d.plan) setPlan(d.plan);
          }).catch(() => {});
        }
      });

      // Fetch analyses
      supabase.from("analyses").select("*").eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) setAnalyses(data as Analysis[]);
          setLoading(false);
        });
    });
  }, []);

  const isPro = plan === "pro";
  const canPublish = features.publish_linkedin;

  const handlePublish = async (analysis: Analysis, clip: any) => {
    setPublishing(clip.hook);
    try {
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token;
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(API_ENDPOINTS.publish, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          hook: clip.hook,
          text: `${clip.hook}\n\n---\nPowered by AutoEvolve`,
          video_url: analysis.source_url,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Publish failed");
      if (data.post_url) window.open(data.post_url, "_blank");
    } catch (e: any) {
      alert("Publish failed: " + e.message);
    } finally {
      setPublishing(null);
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>;
  }

  const allClips = analyses.flatMap((a) => a.clips);
  const allInsights = [...new Set(analyses.flatMap((a) => a.insights))];
  const weekAgo = new Date(Date.now() - 7 * 86400000);
  const weeklyClips = allClips.filter((c) => {
    const a = analyses.find((x) => x.clips.includes(c));
    return a && new Date(a.created_at) > weekAgo;
  });
  const avgScore = allClips.length ? Math.round(allClips.reduce((s, c) => s + c.score, 0) / allClips.length) : 0;
  const lastAnalysis = analyses[0];
  const recentClips = lastAnalysis?.clips?.slice(0, 3) ?? [];

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
          <div className="flex items-center gap-3">
            {!isPro && (
              <Link to="/pricing"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1.5 text-xs font-medium text-[#22C55E] transition hover:bg-[#22C55E]/20"
              ><Crown className="size-3" /> Upgrade</Link>
            )}
            <Link to="/try"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90"
            ><Upload className="size-3.5" /> New video</Link>
          </div>
        </div>
      </header>

      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,black,transparent)]" />
        <div className="mx-auto max-w-7xl px-6 py-12">
          {!isPro && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-2xl border border-[#22C55E]/20 bg-gradient-to-r from-[#22C55E]/5 to-background p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-3 py-1 text-xs text-[#22C55E]"><Crown className="size-3" /> Pro feature</div>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">Unlock publishing & clip downloads</h3>
                  <p className="mt-1 text-sm text-muted-foreground">$29/mo — Publish to LinkedIn, render clips, track performance across all your analyses.</p>
                </div>
                <Link to="/pricing"
                  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-background shadow-[0_8px_30px_-6px_#22C55E80] transition hover:bg-[#16A34A]"
                >Upgrade now <ArrowRight className="size-4" /></Link>
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 text-xs text-[#22C55E]">
              <span className="size-1.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22C55E]" />
              Workspace ready
              {isPro && <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[10px] font-medium text-[#22C55E]"><Crown className="size-3" /> Pro</span>}
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Welcome to AutoEvolve.</h1>
            <p className="mt-2 text-sm text-muted-foreground">Your learning engine is live. Upload your next video to start improving.</p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface/40 p-5 backdrop-blur">
              <p className="text-xs text-muted-foreground">Clips this week</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="font-display text-3xl font-semibold tracking-tight">{weeklyClips.length}</p>
                {weeklyClips.length > 0 && <span className="inline-flex items-center gap-1 text-xs text-[#22C55E]"><TrendingUp className="size-3" /> +{weeklyClips.length}</span>}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/40 p-5 backdrop-blur">
              <p className="text-xs text-muted-foreground">Avg. engagement</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="font-display text-3xl font-semibold tracking-tight">{avgScore}%</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/40 p-5 backdrop-blur">
              <p className="text-xs text-muted-foreground">Learning profile</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="font-display text-3xl font-semibold tracking-tight">v{allInsights.length}</p>
                {allInsights.length > 0 && <span className="inline-flex items-center gap-1 text-xs text-[#22C55E]"><TrendingUp className="size-3" /> +{allInsights.length} insights</span>}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="size-4 text-[#22C55E]" /> Recent clips</div>
                <Link to="/try" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">Analyze new <ArrowUpRight className="size-3" /></Link>
              </div>
              {recentClips.length === 0 ? (
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  <p>No clips yet.</p>
                  <Link to="/try" className="mt-2 inline-flex items-center gap-1 text-[#22C55E] hover:underline">Upload your first video <ArrowRight className="size-3" /></Link>
                </div>
              ) : (
                <div className="mt-5 divide-y divide-border">
                  {recentClips.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 py-3">
                      <div className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-[#22C55E]/20 to-background"><Play className="size-3.5 fill-foreground" /></div>
                      <p className="flex-1 truncate text-sm">{c.hook}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-xs font-semibold text-[#22C55E]"><Flame className="size-3" /> {c.score}%</span>
                      {canPublish ? (
                        <button onClick={() => lastAnalysis && handlePublish(lastAnalysis, c)} disabled={publishing === c.hook}
                          className="inline-flex items-center gap-1 rounded-full bg-[#0A66C2]/10 px-2.5 py-1 text-[10px] font-medium text-[#0A66C2] transition hover:bg-[#0A66C2]/20 disabled:opacity-50"
                        >{publishing === c.hook ? <Loader2 className="size-3 animate-spin" /> : <Linkedin className="size-3" />} Post</button>
                      ) : (
                        <Link to="/pricing" className="inline-flex items-center gap-1 rounded-full bg-border/50 px-2.5 py-1 text-[10px] font-medium text-muted-foreground"><Lock className="size-3" /> Pro</Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold"><BarChart3 className="size-4 text-[#22C55E]" /> Learning profile</div>
              {allInsights.length === 0 ? (
                <p className="mt-8 text-center text-sm text-muted-foreground">Analyze a video to start building your learning profile.</p>
              ) : (
                <ul className="mt-5 space-y-3 text-sm">
                  {allInsights.slice(0, 6).map((insight, i) => (
                    <li key={i} className="flex items-start gap-2"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#22C55E]" />{insight}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {analyses.length > 1 && (
            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold tracking-tight">All analyses</h2>
              <div className="mt-4 space-y-3">
                {analyses.map((a) => (
                  <div key={a.id} className="rounded-2xl border border-border bg-surface/40 p-4 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{a.source_url}</p>
                        <p className="text-xs text-muted-foreground">{a.clips.length} clips · {new Date(a.created_at).toLocaleDateString()}</p>
                      </div>
                      {canPublish && a.clips.length > 0 && (
                        <button onClick={() => handlePublish(a, a.clips[0])} disabled={publishing !== null}
                          className="ml-4 inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2]/10 px-3 py-1.5 text-xs font-medium text-[#0A66C2] transition hover:bg-[#0A66C2]/20 disabled:opacity-50"
                        ><Linkedin className="size-3" /> Publish top clip</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
