'use client';

import React from 'react';
import { CalendarDays, Shield, Newspaper, Trophy, Search, Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

const sidebarTabs = [
  { id: 'matches', label: 'Matches', Icon: CalendarDays },
  { id: 'teams', label: 'Teams', Icon: Shield },
  { id: 'news', label: 'News', Icon: Newspaper },
  { id: 'standings', label: 'Standings', Icon: Trophy },
  { id: 'search', label: 'Search', Icon: Search }
] as const;

interface SidebarProps {
  activeTab: 'matches' | 'teams' | 'news' | 'standings' | 'search';
  onTabChange: (tabId: 'matches' | 'teams' | 'news' | 'standings' | 'search') => void;
  isLiveSimulationActive: boolean;
  notificationsEnabled: boolean;
  onToggleLiveSimulation: () => void;
  onToggleNotifications: () => void;
}

import SocialFooter from './SocialFooter';

export default function Sidebar({
  activeTab,
  onTabChange,
  isLiveSimulationActive,
  notificationsEnabled,
  onToggleLiveSimulation,
  onToggleNotifications
}: SidebarProps) {
  return (
    <aside className="hidden sm:flex flex-col w-[220px] shrink-0 border-r border-surface-light/60 p-4 sticky top-0 h-screen select-none">
      {/* Logo brand */}
      <div 
        className="flex items-center gap-3 mb-6 px-1 cursor-pointer" 
        onClick={() => onTabChange('matches')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onTabChange('matches')}
        aria-label="Go to matches"
      >
        <img src="/logo.png" alt="Ball-Ops Logo" className="w-16 h-16 object-contain shrink-0" />
        <span className="text-lg font-black tracking-tight text-white leading-tight uppercase">
          Ball-Ops <span className="text-primary block text-[11px] font-black tracking-widest uppercase mt-0.5">HQ</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1" role="navigation" aria-label="Main navigation">
        {sidebarTabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-lg transition-all text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset",
                isActive 
                  ? "bg-surface text-primary border border-surface-light/40" 
                  : "text-text-secondary hover:bg-surface/50 hover:text-white"
              )}
              aria-label={`Navigate to ${label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} className={isActive ? "text-primary" : "text-text-muted"} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Controls */}
      <div className="border-t border-surface-light/60 pt-4 space-y-3">
        <button
          onClick={onToggleLiveSimulation}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-text-secondary hover:text-white bg-surface/30 rounded-lg hover:bg-surface/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
          aria-label={isLiveSimulationActive ? 'Disable score simulation' : 'Enable score simulation'}
        >
          <span>Score Sim</span>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase",
            isLiveSimulationActive ? "bg-primary/20 text-primary border border-primary/30" : "bg-surface-light text-text-muted"
          )}>
            {isLiveSimulationActive ? 'Active' : 'Paused'}
          </span>
        </button>
        <button
          onClick={onToggleNotifications}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-text-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
          aria-label={notificationsEnabled ? 'Mute notifications' : 'Enable notifications'}
        >
          {notificationsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{notificationsEnabled ? 'Sound On' : 'Muted'}</span>
        </button>
        
        <SocialFooter />
      </div>
    </aside>
  );
}