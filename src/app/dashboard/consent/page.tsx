"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ConsentRecord = {
  id: string;
  type: string;
  description: string;
  grantedTo: string | null;
  status: string;
  createdAt: string;
  revokedAt: string | null;
};

export default function ConsentPage() {
  const { status } = useSession();
  const router = useRouter();
  const [consents, setConsents] = useState<ConsentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ type: "AI_TRAINING_OPTOUT", description: "", grantedTo: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchConsents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchConsents = () =>
    fetch("/api/consent").then((r) => r.json()).then((d) => {
      setConsents(d.consents || []);
      setLoading(false);
    });

  const hasAiOptout = consents.some(
    (c) => c.type === "AI_TRAINING_OPTOUT" && c.status === "ACTIVE"
  );

  const addConsent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ type: "AI_TRAINING_OPTOUT", description: "", grantedTo: "" });
    setShowForm(false);
    setAdding(false);
    fetchConsents();
  };

  const revokeConsent = async (id: string) => {
    await fetch(`/api/consent/${id}/revoke`, { method: "POST" });
    fetchConsents();
  };

  const addAiOptout = async () => {
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "AI_TRAINING_OPTOUT",
        description: "I DO NOT consent to my likeness, voice, or performance data being used for AI model training, fine-tuning, or synthetic media generation.",
      }),
    });
    fetchConsents();
  };

  if (loading || status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-text-muted text-sm">Loading...</div>;
  }

  return (
    <main className="min-h-screen text-text-main font-sans">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-[#C8A97E] bg-surface hover:bg-surface-variant hover:text-text-main transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Dashboard
          </Link>
        </div>
        <header className="mb-10 border-b border-border pb-6">
          <p className="text-xs text-[#C8A97E] uppercase tracking-widest font-semibold mb-1">Dashboard / Consent</p>
          <h1 className="text-3xl font-serif font-semibold text-text-main">Consent Ledger</h1>
          <p className="text-text-muted text-sm mt-2">
            Your consent records are <strong className="text-text-main">publicly visible</strong> on your profile.
            They are timestamped and permanent — revocation is also recorded.
          </p>
        </header>

        {/* AI Opt-Out Banner */}
        <div className={`border p-6 mb-8 ${hasAiOptout ? "border-[#C8A97E]/40 bg-[#C8A97E]/5" : "border-border"}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-[#C8A97E] mb-2">AI Training Opt-Out</p>
              <p className="text-sm text-text-main leading-relaxed">
                {hasAiOptout
                  ? "✓ You have opted out of AI training. This is publicly recorded on your profile."
                  : "Declare that you do not consent to your likeness being used for AI model training."}
              </p>
            </div>
            {!hasAiOptout && (
              <button
                onClick={addAiOptout}
                className="flex-shrink-0 bg-[#C8A97E] text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-[#b8966a] transition-colors"
              >
                Opt Out
              </button>
            )}
          </div>
        </div>

        {/* Consent Records List */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest text-text-muted font-semibold">All Consent Records</h2>
            <button onClick={() => setShowForm(!showForm)}
              className="text-xs border border-border px-4 py-2 text-text-muted hover:border-text-main hover:text-text-main transition-colors">
              + Add Record
            </button>
          </div>

          {consents.length === 0 && (
            <div className="text-center py-12 px-6 border border-dashed border-border bg-surface rounded-2xl max-w-md mx-auto my-4 animate-fade-up">
              <div className="w-12 h-12 bg-[#C8A97E]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C8A97E]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-text-main mb-1">
                No consent records yet
              </h3>
              <p className="text-sm text-text-muted">
                Start by opting out of AI training above to record your first consent.
              </p>
            </div>
          )}

          {consents.map((c) => (
            <div key={c.id} className={`border p-5 rounded-lg bg-surface ${c.status === "REVOKED" ? "border-border opacity-50" : "border-border"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 ${
                      c.type === "AI_TRAINING_OPTOUT" ? "bg-[#C8A97E]/20 text-[#C8A97E]" : "bg-surface-variant text-text-muted"
                    }`}>
                      {c.type.replace(/_/g, " ")}
                    </span>
                    <span className={`text-xs uppercase tracking-widest ${c.status === "ACTIVE" ? "text-success" : "text-text-muted"}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-main leading-relaxed mb-2">{c.description}</p>
                  {c.grantedTo && (
                    <p className="text-xs text-text-muted">Granted to: {c.grantedTo}</p>
                  )}
                  <p className="text-xs text-text-muted mt-2">
                    Recorded: {new Date(c.createdAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
                    {c.revokedAt && ` · Revoked: ${new Date(c.revokedAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}`}
                  </p>
                </div>
                {c.status === "ACTIVE" && (
                  <button onClick={() => revokeConsent(c.id)}
                    className="text-xs text-text-muted hover:text-danger transition-colors flex-shrink-0">
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Custom Consent Form */}
        {showForm && (
          <form onSubmit={addConsent} className="border border-border bg-surface rounded-lg p-6 space-y-5">
            <h3 className="text-sm uppercase tracking-widest text-text-muted font-semibold">New Consent Record</h3>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-text-muted">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-surface border border-border p-3 text-text-main text-sm focus:outline-none focus:border-[#C8A97E] transition-colors rounded-lg">
                <option value="AI_TRAINING_OPTOUT">AI Training Opt-Out</option>
                <option value="LIKENESS_USE">Likeness Use Consent</option>
                <option value="SHOWREEL_PUBLIC">Showreel Public Release</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-text-muted">Description</label>
              <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-surface border border-border p-3 text-text-main text-sm focus:outline-none focus:border-[#C8A97E] transition-colors resize-none rounded-lg"
                placeholder="Describe the consent or restriction in plain language..." />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-text-muted">Granted To (optional)</label>
              <input type="text" value={form.grantedTo} onChange={(e) => setForm({ ...form, grantedTo: e.target.value })}
                className="w-full bg-surface border border-border p-3 text-text-main text-sm focus:outline-none focus:border-[#C8A97E] transition-colors rounded-lg"
                placeholder="Production name, director, or company..." />
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={adding}
                className="bg-[#C8A97E] text-black font-bold uppercase tracking-widest px-6 py-2.5 text-xs hover:bg-[#b8966a] transition-colors disabled:opacity-50">
                {adding ? "Adding..." : "Add Record"}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="text-xs text-text-muted hover:text-text-main transition-colors px-4">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
