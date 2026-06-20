"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SKILLS_OPTIONS = [
  "Drama", "Comedy", "Action", "Voice Acting", "Stunts",
  "Dance", "Singing", "Martial Arts", "Improvisation", "Stage",
];

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say"];
const AGE_RANGES = ["Under 18", "18-25", "26-35", "36-45", "46-55", "56+"];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    stageName: "", bio: "", headshotUrl: "", location: "", gender: "", ageRange: "", skills: [] as string[],
    previousWorks: "", portfolioUrls: "",
  });
  const [profileId, setProfileId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") {
      fetch("/api/profile").then((r) => r.json()).then((data) => {
        if (data.profile) {
          setForm({
            stageName: data.profile.stageName ?? "",
            bio: data.profile.bio ?? "",
            headshotUrl: data.profile.headshotUrl ?? "",
            location: data.profile.location ?? "",
            gender: data.profile.gender ?? "",
            ageRange: data.profile.ageRange ?? "",
            skills: data.profile.skills ? JSON.parse(data.profile.skills) : [],
            previousWorks: data.profile.previousWorks ?? "",
            portfolioUrls: data.profile.portfolioUrls ?? "",
          });
          setProfileId(data.profile.id);
        }
        setLoading(false);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const toggleSkill = (skill: string) => {
    setForm((f) => ({
      ...f,
      skills: f.skills.includes(skill) ? f.skills.filter((s) => s !== skill) : [...f.skills, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      const d = await res.json();
      setError(d.error || "Failed to save.");
    }
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
        <header className="mb-10 border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs text-[#C8A97E] uppercase tracking-widest font-semibold mb-1">Dashboard / Profile</p>
            <h1 className="text-3xl font-serif font-semibold text-text-main">My Profile</h1>
            <p className="text-text-muted text-sm mt-2">This is how directors see you on the Talent Roster.</p>
          </div>
          {profileId && (
            <a 
              href={`/talent/${profileId}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-outline text-xs !py-2 !px-4 self-start md:self-auto"
            >
              View Public Profile ↗
            </a>
          )}
        </header>

        <form onSubmit={handleSubmit} className="space-y-7 bg-surface p-8 border border-border rounded-lg">
          {error && <div className="text-sm border border-danger bg-[#FCE8E6] text-danger p-3 rounded-md">{error}</div>}

          <Field label="Stage Name" hint="Leave blank to use your real name.">
            <input type="text" value={form.stageName} onChange={(e) => setForm({ ...form, stageName: e.target.value })}
              className="input-field" placeholder="Your stage or screen name" />
          </Field>

          <Field label="Headshot URL" hint="Paste a direct link to your headshot photo.">
            <input type="url" value={form.headshotUrl} onChange={(e) => setForm({ ...form, headshotUrl: e.target.value })}
              className="input-field" placeholder="https://..." />
            {form.headshotUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.headshotUrl} alt="Headshot preview" className="mt-3 w-24 h-24 object-cover border border-border rounded-lg" />
            )}
          </Field>

          <Field label="Location">
            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="input-field" placeholder="e.g. Nairobi, Kenya" />
          </Field>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Gender">
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="input-field bg-surface">
                <option value="">Select...</option>
                {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Age Range">
              <select value={form.ageRange} onChange={(e) => setForm({ ...form, ageRange: e.target.value })} className="input-field bg-surface">
                <option value="">Select...</option>
                {AGE_RANGES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Bio" hint="A short paragraph about yourself and your experience.">
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={4} className="input-field resize-none" placeholder="Tell directors who you are..." />
          </Field>

          <Field label="Skills">
            <div className="flex flex-wrap gap-2 mt-1">
              {SKILLS_OPTIONS.map((skill) => (
                <button key={skill} type="button" onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wide border transition-colors rounded-lg ${
                    form.skills.includes(skill)
                      ? "border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/10"
                      : "border-border text-text-muted hover:border-text-main"
                  }`}>
                  {skill}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Previous Works" hint="List your previous productions, roles, and years.">
            <textarea value={form.previousWorks} onChange={(e) => setForm({ ...form, previousWorks: e.target.value })}
              rows={4} className="input-field" placeholder="e.g. Volume (2024) - Supporting Role&#10;Single Kiasi (2023) - Main Character" />
          </Field>

          <Field label="Portfolio Links / Showreel URLs" hint="Enter links to your work, showreels, or portfolios (one URL per line).">
            <textarea value={form.portfolioUrls} onChange={(e) => setForm({ ...form, portfolioUrls: e.target.value })}
              rows={3} className="input-field" placeholder="e.g. https://vimeo.com/showreel&#10;https://instagram.com/mywork" />
          </Field>

          <div className="pt-4 flex items-center gap-4">
            <button type="submit" disabled={saving}
              className="bg-[#C8A97E] text-black font-bold uppercase tracking-widest px-8 py-3 hover:bg-[#b8966a] transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Save Profile"}
            </button>
            {saved && <span className="text-sm text-[#C8A97E]">✓ Saved successfully</span>}
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
