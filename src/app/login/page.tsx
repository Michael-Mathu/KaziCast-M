"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setError("Invalid email or password.");
        setLoading(false);
      } else if (res?.ok) {
        window.location.href = callbackUrl;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row font-sans">
      <div className="hidden md:flex md:w-1/2 bg-surface text-text-main flex-col justify-between p-10 lg:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97E]/5 to-transparent" />
        <div className="relative z-10">
          <Link href="/" className="font-bold text-2xl tracking-tight">
            KaziCast
          </Link>
        </div>
        <div className="relative z-10 space-y-6 max-w-md">
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold leading-snug">
            The casting platform built for East Africa.
          </h2>
          <p className="text-text-muted leading-relaxed">
            Directors find verified talent. Artists control their likeness with an immutable consent ledger.
          </p>
        </div>
        <div className="relative z-10 text-xs text-text-muted">
          Trusted by production houses across Nairobi, Lagos, and Accra.
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 bg-surface-variant">
        <div className="w-full max-w-[420px]">
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

          <div className="card p-8 md:p-10 space-y-7">
            <header className="space-y-1">
              <h1 className="text-2xl font-bold text-text-main">Welcome back</h1>
              <p className="text-text-muted text-sm">Sign in to access your dashboard</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="text-sm border border-danger bg-[#FCE8E6] text-danger p-3.5 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-semibold text-text-main">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-text-main">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-2 flex items-center justify-center"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="text-center text-sm text-text-muted space-y-3 pt-1">
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="w-1 h-1 rounded-full bg-text-muted" />
                <span>Protected by NextAuth.js + bcrypt</span>
                <span className="w-1 h-1 rounded-full bg-text-muted" />
              </div>
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-accent font-semibold hover:text-accent-hover transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted mt-6">
            Need help?{" "}
            <Link href="/help" className="underline hover:text-text-main">
              Visit the Help Center
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
