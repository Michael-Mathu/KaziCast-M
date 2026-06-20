"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="font-bold text-lg text-text-main tracking-tight">
          KaziCast
        </Link>
        
        {status === "authenticated" && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">
              Dashboard
            </Link>
            <Link href="/castings" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">
              Castings
            </Link>
            <Link href="/talent" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">
              Talent Roster
            </Link>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {status === "loading" ? (
          <div className="w-8 h-8 rounded-full bg-surface-variant animate-pulse" />
        ) : status === "authenticated" ? (
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-surface-variant transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs uppercase">
                {session.user?.name?.[0] || session.user?.email?.[0] || "?"}
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 card py-2 shadow-lg z-50 animate-slide-in origin-top-right">
                <div className="px-4 py-2 border-b border-border mb-2">
                  <p className="text-sm font-semibold text-text-main truncate">{session.user?.name}</p>
                  <p className="text-xs text-text-muted truncate">{session.user?.email}</p>
                </div>
                <Link 
                  href="/dashboard/profile" 
                  className="block px-4 py-2 text-sm text-text-main hover:bg-surface-variant transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link 
                  href="/help" 
                  className="block px-4 py-2 text-sm text-text-main hover:bg-surface-variant transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Help Center
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-surface-variant transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="btn-primary !py-1.5 !px-4 !text-sm">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
