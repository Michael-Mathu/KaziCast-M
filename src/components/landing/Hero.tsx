"use client";

import React, { useState } from 'react';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for Google Forms submission logic
    setSubmitted(true);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 md:px-12 pt-20">
      <div className="max-w-7xl w-full">
        <span className="block text-accent uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-8 animate-fade-up" style={{ animationDelay: '0ms' }}>
          East Africa's Film Industry Platform
        </span>

        <h1 className="font-serif font-light leading-[1.1] tracking-[-0.04em] text-[clamp(40px,6vw,84px)] text-warm-white mb-10 max-w-5xl animate-fade-up" style={{ animationDelay: '80ms' }}>
          Directors find talent<br />
          on WhatsApp.<br />
          KaziCast is the <span className="italic text-accent">infrastructure</span><br />
          East Africa's film industry<br />
          has been missing.
        </h1>

        <p className="text-[#aaaaaa] text-lg md:text-[17px] leading-relaxed max-w-[560px] mb-12 animate-fade-up" style={{ animationDelay: '160ms' }}>
          Built for actors, models, voice artists, and filmmakers across Kenya, Uganda, Tanzania, and beyond. One professional platform for the entire industry.
        </p>

        <div className="animate-fade-up" style={{ animationDelay: '240ms' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mb-6">
              <input 
                type="email" 
                placeholder="your@email.com" 
                required
                value={email}
                onChange={(e) => setEmail(email)}
                className="bg-black/40 border border-white/10 px-6 py-4 outline-none focus:border-accent/50 transition-colors flex-grow text-warm-white"
              />
              <button 
                type="submit"
                className="bg-accent text-near-black px-8 py-4 font-bold uppercase tracking-tight hover:brightness-110 transition-all whitespace-nowrap"
              >
                Join the Waitlist →
              </button>
            </form>
          ) : (
            <div className="bg-accent/10 border border-accent/20 px-8 py-6 max-w-md mb-6">
              <p className="text-accent font-bold">You're on the list. We'll be in touch.</p>
            </div>
          )}
          
          <p className="text-[10px] md:text-xs text-muted uppercase tracking-widest">
            Waitlist open · No spam · Built in Nairobi
          </p>
        </div>
      </div>

      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-muted text-[10px] tracking-[0.4em] font-medium opacity-40">
        EST. MMXXV
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
