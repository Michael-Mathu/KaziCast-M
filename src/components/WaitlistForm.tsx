"use client";

import React, { useState } from 'react';

type Role = "Talent (Actor/Crew)" | "Director/Producer" | "Just curious";

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role | "">("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role: role || undefined }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to connect to the server.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center justify-center p-8 animate-in fade-in zoom-in duration-500 min-h-[400px]">
        <div className="w-20 h-20 border-2 border-[#C8A97E] rounded-full flex items-center justify-center text-[#C8A97E] mb-6 animate-scale-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
        <h3 className="font-serif text-4xl text-[#F7F4EF] mb-4 animate-fade-up" style={{ animationDelay: '100ms' }}>You&apos;re on the list.</h3>
        <p className="text-[#aaaaaa] leading-relaxed max-w-[320px] animate-fade-up" style={{ animationDelay: '200ms' }}>
          KaziCast is being built with you in mind — we&apos;ll be in touch before anyone else.
        </p>
        
        <style jsx>{`
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-fade-up { opacity: 0; animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-widest text-[#aaaaaa]">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Optional"
          className="bg-black/40 border border-white/10 px-6 py-4 outline-none focus:border-[#C8A97E]/50 transition-colors text-[#F7F4EF] rounded-sm font-sans"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-[#aaaaaa]">Email</label>
        <input
          id="email"
          type="email"
          required
          placeholder="john@example.com"
          className="bg-black/40 border border-white/10 px-6 py-4 outline-none focus:border-[#C8A97E]/50 transition-colors text-[#F7F4EF] rounded-sm font-sans"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <label htmlFor="role" className="text-[10px] uppercase font-bold tracking-widest text-[#aaaaaa]">Role</label>
        <select
          id="role"
          className="bg-black/40 border border-white/10 px-6 py-4 outline-none focus:border-[#C8A97E]/50 transition-colors text-[#F7F4EF] appearance-none rounded-sm font-sans cursor-pointer"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option value="" disabled className="bg-[#080808]">Select your role (Optional)</option>
          <option value="Talent (Actor/Crew)" className="bg-[#080808]">Talent (Actor/Crew)</option>
          <option value="Director/Producer" className="bg-[#080808]">Director/Producer</option>
          <option value="Just curious" className="bg-[#080808]">Just curious</option>
        </select>
        <div className="absolute right-6 bottom-5 pointer-events-none text-[#aaaaaa]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
        </div>
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center mt-2 animate-pulse">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-[#C8A97E] text-[#080808] px-8 py-5 font-bold uppercase tracking-tight hover:brightness-110 transition-all text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Securing...' : 'Secure My Spot →'}
      </button>
    </form>
  );
}
