'use client';

import React, { useState } from 'react';
import { CalendarDays, Shield, Newspaper, Trophy, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: 'matches' | 'teams' | 'news' | 'standings' | 'search';
  onTabChange: (tabId: 'matches' | 'teams' | 'news' | 'standings' | 'search') => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [bouncingIcon, setBouncingIcon] = useState<string | null>(null);

  const tabs = [
    { id: 'matches', label: 'Matches', Icon: CalendarDays },
    { id: 'teams', label: 'Teams', Icon: Shield },
    { id: 'news', label: 'News', Icon: Newspaper },
    { id: 'standings', label: 'Standings', Icon: Trophy },
    { id: 'search', label: 'Search', Icon: Search }
  ] as const;

  const handleTabClick = (tabId: typeof tabs[number]['id']) => {
    setBouncingIcon(tabId);
    setTimeout(() => setBouncingIcon(null), 400);
    onTabChange(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-14 bg-surface border-t border-surface-light flex items-center justify-around pb-safe safe-bottom shadow-lg max-w-[430px] mx-auto sm:max-w-none">
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        const isBouncing = bouncingIcon === id;

        return (
          <motion.button
            key={id}
            onClick={() => handleTabClick(id)}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full relative select-none cursor-pointer outline-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset rounded-lg transition-all",
              isActive ? "text-primary" : "text-text-muted hover:text-text-secondary"
            )}
            aria-label={`Navigate to ${label} tab`}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Active Top border Underline */}
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute top-0 left-0 right-0 h-[3px] bg-primary rounded-full mx-6"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            {/* Icon */}
            <Icon size={20} className={cn("mb-0.5 transition-transform", isBouncing && "icon-bounce")} />

            {/* Label */}
            <span className="text-[10px] font-semibold tracking-wide uppercase">
              {label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
