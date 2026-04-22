import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 md:py-20 border-t border-white/8 bg-near-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-0.5">
          <span className="text-xl font-serif font-bold text-white tracking-tight">Kazi</span>
          <span className="text-xl font-serif font-bold text-accent tracking-tight">Cast</span>
        </div>

        <p className="text-muted text-[13px] tracking-wide text-center">
          Built in Nairobi · © 2025 KaziCast · All rights reserved
        </p>

        <div className="flex items-center gap-8">
          <Link href="#" className="text-muted text-xs uppercase tracking-widest hover:text-white transition-colors">Instagram</Link>
          <Link href="#" className="text-muted text-xs uppercase tracking-widest hover:text-white transition-colors">LinkedIn</Link>
          <Link href="#" className="text-muted text-xs uppercase tracking-widest hover:text-white transition-colors">X/Twitter</Link>
        </div>
      </div>
    </footer>
  );
}
