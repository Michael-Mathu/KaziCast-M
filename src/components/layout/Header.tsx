'use client';

import React from 'react';
import { Search, Bell, BellOff } from 'lucide-react';
import { useUiStore } from '@/store/uiStore';

export default function Header() {
  const { activeTab, setActiveTab, notificationsEnabled, toggleNotifications } = useUiStore();

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-background/95 backdrop-blur-md border-b border-surface-light px-4 flex items-center justify-between">
      {/* Brand logo */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer select-none"
        onClick={() => setActiveTab('matches')}
      >
        <img src="/logo.png" alt="Ball-Ops Logo" className="w-10 h-10 object-contain shrink-0" />
        <span className="text-sm font-black tracking-tight text-white leading-tight uppercase">
          Ball-Ops <span className="text-primary text-[9px] block font-black uppercase tracking-widest leading-none mt-0.5">HQ</span>
        </span>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Search button */}
        <button
          onClick={() => setActiveTab('search')}
          className={`p-2 rounded-full transition-colors ${
            activeTab === 'search' 
              ? 'bg-surface text-primary' 
              : 'text-text-secondary hover:bg-surface hover:text-white'
          }`}
          aria-label="Search matches, teams, and players"
        >
          <Search size={20} />
        </button>

        {/* Notifications toggle */}
        <button
          onClick={toggleNotifications}
          className={`p-2 rounded-full transition-colors relative ${
            notificationsEnabled 
              ? 'text-primary hover:bg-surface' 
              : 'text-text-muted hover:bg-surface'
          }`}
          aria-label="Toggle live notification alerts"
        >
          {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
          {notificationsEnabled && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-red animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
}
