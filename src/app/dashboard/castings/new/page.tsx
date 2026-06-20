"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ROLE_TYPES = ["Lead", "Supporting", "Background", "Voiceover", "Stunts"];
const PROD_TYPES = ["Feature Film", "Short Film", "Web Series", "Commercial", "Documentary", "Voiceover"];
const RATES = ["Paid", "Deferred", "Unpaid/Copy", "TBD"];
const GENDERS = ["Any", "Male", "Female", "Non-binary"];
const AGE_RANGES = ["Any", "Under 18", "18-25", "26-35", "36-45", "46-55", "56+"];

export default function NewCastingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", description: "", roleType: "Lead", gender: "Any", ageRange: "Any",
    location: "", productionType: "Feature Film", rate: "Paid", rateAmount: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/castings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/castings/${data.casting.id}`);
    } else {
      const d = await res.json();
      setError(d.error || "Failed to create casting.");
      setLoading(false);
    }
  };

  // Min deadline: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <main className="min-h-screen text-text-main font-sans">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <header className="mb-10 border-b border-border pb-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-[#C8A97E] bg-surface hover:bg-surface-variant hover:text-text-main transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-semibold mt-4 text-text-main">Post a Casting</h1>
          <p className="text-text-muted text-sm mt-2">Your casting will be visible to all verified talent on the platform.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-8 border border-border rounded-lg">
          {error && <div className="text-sm border border-danger bg-[#FCE8E6] text-danger p-3 rounded-md">{error}</div>}

          <Field label="Role Title" hint="e.g. Lead Actor – Nairobi Crime Drama">
            <input required type="text" value={form.title} onChange={(e) => set("title", e.target.value)}
              className="input-field" placeholder="Lead Actor – [Your Production]" />
          </Field>

          <Field label="Description" hint="Describe the character, the production, shooting schedule, and any special requirements.">
            <textarea required rows={6} value={form.description} onChange={(e) => set("description", e.target.value)}
              className="input-field resize-none" placeholder="Tell talent about this role and production..." />
          </Field>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Role Type">
              <select value={form.roleType} onChange={(e) => set("roleType", e.target.value)} className="input-field bg-surface">
                {ROLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Production Type">
              <select value={form.productionType} onChange={(e) => set("productionType", e.target.value)} className="input-field bg-surface">
                {PROD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Preferred Gender">
              <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className="input-field bg-surface">
                {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Age Range">
              <select value={form.ageRange} onChange={(e) => set("ageRange", e.target.value)} className="input-field bg-surface">
                {AGE_RANGES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Location">
            <input required type="text" value={form.location} onChange={(e) => set("location", e.target.value)}
              className="input-field" placeholder="e.g. Nairobi, Kenya or Remote" />
          </Field>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Rate">
              <select value={form.rate} onChange={(e) => set("rate", e.target.value)} className="input-field bg-surface">
                {RATES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Rate Amount (optional)">
              <input type="text" value={form.rateAmount} onChange={(e) => set("rateAmount", e.target.value)}
                className="input-field" placeholder="e.g. KES 5,000/day" />
            </Field>
          </div>

          <Field label="Application Deadline">
            <input required type="date" min={minDate} value={form.deadline} onChange={(e) => set("deadline", e.target.value)}
              className="input-field" />
          </Field>

          <div className="pt-4">
            <button type="submit" disabled={loading}
              className="bg-[#C8A97E] text-black font-bold uppercase tracking-widest px-8 py-3 hover:bg-[#b8966a] transition-colors disabled:opacity-50">
              {loading ? "Posting..." : "Post Casting"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-text-muted font-semibold">{label}</label>
      {hint && <p className="text-xs text-text-muted">{hint}</p>}
      {children}
    </div>
  );
}
