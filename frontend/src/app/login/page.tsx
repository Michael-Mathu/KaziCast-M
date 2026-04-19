"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Calls the NextAuth API route which calls our NestJS backend
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8 font-sans">
      <div className="max-w-md w-full border border-gray-800 p-8 space-y-8">
        <header className="border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-center">Platform Access</h1>
          <p className="text-gray-400 mt-2 text-xs uppercase tracking-wide text-center">Unparalleled Hermits</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-white text-xs border border-white p-2 text-center">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-gray-400">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-black border border-gray-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="talent@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-gray-400">Password</label>
            <input
              type="password"
              required
              className="w-full bg-black border border-gray-800 p-3 text-white focus:outline-none focus:border-white transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold uppercase tracking-widest p-3 hover:bg-gray-200 transition-colors"
          >
            Authenticate
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-800">
          <a href="/register" className="text-xs text-gray-500 hover:text-white transition-colors">Apply for Access</a>
        </div>
      </div>
    </main>
  );
}
