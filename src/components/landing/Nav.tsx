import React from 'react';
import Link from 'next/link';
export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface border-b border-border flex items-center justify-between px-6 md:px-8">
      <Link href="/" className="flex items-center gap-1">
        <span className="text-xl font-bold text-text-main tracking-tight">KaziCast</span>
        <span className="badge badge-accent ml-2 hidden sm:inline-flex">Labs</span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link href="#hero" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">For Talent</Link>
        <Link href="#dual" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">For Directors</Link>
        <Link href="#how" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">How It Works</Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="!py-2 !px-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black/90 transition-colors"
        >
          Log In
        </Link>
        <Link
          href="/register"
          className="btn-primary !py-2 !px-4"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
