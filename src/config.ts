export const API_BASE =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE) ||
  "https://hermes.indataflow.com";

export const SUPABASE_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SUPABASE_URL) ||
  "";

export const SUPABASE_ANON_KEY =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) ||
  "";

export const API_ENDPOINTS = {
  analyze: `${API_BASE}/api/analyze`,
  associateAnalysis: `${API_BASE}/api/associate-analysis`,
  publish: `${API_BASE}/api/publish`,
  renderClips: `${API_BASE}/api/render-clips`,
  features: `${API_BASE}/api/features`,
} as const;
