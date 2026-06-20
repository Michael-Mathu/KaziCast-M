import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 bg-surface-variant border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold text-text-main tracking-tight">KaziCast</span>
          <p className="text-text-muted text-sm max-w-xs">
            East Africa's premier platform for talent discovery and production infrastructure.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-text-main">Legal</span>
            <div className="flex flex-col gap-2">
              <Link href="/legal/privacy" className="text-text-muted text-sm hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="text-text-muted text-sm hover:text-accent transition-colors">Terms of Service</Link>
              <Link href="/legal/cookies" className="text-text-muted text-sm hover:text-accent transition-colors">Cookie Policy</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-text-main">Safety</span>
            <div className="flex flex-col gap-2">
              <Link href="/legal/community" className="text-text-muted text-sm hover:text-accent transition-colors">Community Guidelines</Link>
              <Link href="/legal/data-rights" className="text-text-muted text-sm hover:text-accent transition-colors">Data Rights</Link>
              <Link href="/legal/minors" className="text-text-muted text-sm hover:text-accent transition-colors">Minor's Policy</Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-text-main">Support</span>
            <div className="flex flex-col gap-2">
              <Link href="/help" className="text-text-muted text-sm hover:text-accent transition-colors">Help Center</Link>
              <a href="mailto:support@kazicast.com" className="text-text-muted text-sm hover:text-accent transition-colors">Contact Support</a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-text-main">Social</span>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-text-muted text-sm hover:text-accent transition-colors">Instagram</Link>
              <Link href="#" className="text-text-muted text-sm hover:text-accent transition-colors">LinkedIn</Link>
              <Link href="#" className="text-text-muted text-sm hover:text-accent transition-colors">X/Twitter</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-text-muted text-sm">
          Built in Nairobi · © {new Date().getFullYear()} KaziCast · All rights reserved
        </p>
      </div>
    </footer>
  );
}
