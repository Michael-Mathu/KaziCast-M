"use client";

import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-near-black/82 backdrop-blur-md border-b border-white/7 flex items-center justify-between px-6 md:px-12">
      <Link href="/" className="flex items-center gap-0.5">
        <span className="text-2xl font-serif font-bold text-white tracking-tight">Kazi</span>
        <span className="text-2xl font-serif font-bold text-accent tracking-tight">Cast</span>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        <Link href="#hero" className="text-sm uppercase tracking-widest text-muted hover:text-white transition-colors">For Talent</Link>
        <Link href="#dual" className="text-sm uppercase tracking-widest text-muted hover:text-white transition-colors">For Directors</Link>
        <Link href="#how" className="text-sm uppercase tracking-widest text-muted hover:text-white transition-colors">How It Works</Link>
      </div>

      <button 
        onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-warm-white text-near-black px-6 py-2.5 text-sm font-bold uppercase tracking-tight hover:bg-accent transition-colors duration-300"
      >
        Join Waitlist
      </button>
    </nav>
  );
}
