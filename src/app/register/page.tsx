"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "TALENT" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Registration failed.");
      setLoading(false);
      return;
    }

    // Auto-login after register
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <main className="min-h-screen flex flex-col bg-surface-variant font-sans">
      <div className="flex-1 flex justify-center items-start pt-10 md:pt-16 p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-4 mb-10">
            <Link
              href="/"
              className="btn-outline !py-2 !px-3 text-xs inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back
            </Link>
            <Link href="/" className="font-bold text-xl tracking-tight text-text-main">
              KaziCast
            </Link>
          </div>
        </div>
        <div className="card max-w-md w-full p-8 md:p-10 space-y-8">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-text-main">Create a KaziCast Account</h1>
            <p className="text-text-muted text-sm mt-2">Enter your details to register</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-sm border border-danger bg-[#FCE8E6] text-danger p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-text-main">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="input-field"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-text-main">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="input-field"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-text-main">Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                className="input-field"
                placeholder="Min 8 characters"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-sm font-semibold text-text-main mb-2">I am a...</label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-surface-variant transition-colors">
                  <input 
                    type="radio" 
                    name="role" 
                    value="TALENT" 
                    checked={form.role === "TALENT"} 
                    onChange={() => set("role", "TALENT")}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="text-sm font-medium text-text-main">Actor / Talent</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-surface-variant transition-colors">
                  <input 
                    type="radio" 
                    name="role" 
                    value="DIRECTOR" 
                    checked={form.role === "DIRECTOR"} 
                    onChange={() => set("role", "DIRECTOR")}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="text-sm font-medium text-text-main">Director / Producer</span>
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <Link href="/login" className="text-sm text-accent font-semibold hover:text-accent-hover transition-colors">
                Sign in instead
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? "Creating..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
