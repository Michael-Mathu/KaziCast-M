'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

type MatchdayId = 'md-1' | 'md-2' | 'md-3' | 'md-16' | 'md-qf' | 'md-sf' | 'md-f';

interface MatchdayItem {
  id: MatchdayId;
  label: string;
  subLabel: string;
}

export default function DateScroller() {
  const { selectedMatchdayId, setSelectedMatchdayId } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const matchdays: MatchdayItem[] = [
    { id: 'md-1', label: 'Matchday 1', subLabel: 'Group Stage' },
    { id: 'md-2', label: 'Matchday 2', subLabel: 'Group Stage' },
    { id: 'md-3', label: 'Matchday 3', subLabel: 'Group Stage' },
    { id: 'md-16', label: 'Round of 16', subLabel: 'Knockout' },
    { id: 'md-qf', label: 'Quarter-finals', subLabel: 'Knockout' },
    { id: 'md-sf', label: 'Semi-finals', subLabel: 'Knockout' },
    { id: 'md-f', label: 'Finals', subLabel: 'Champion' }
  ];

  useEffect(() => {
    const activeEl = containerRef.current?.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedMatchdayId]);

  return (
    <div 
      ref={containerRef}
      className="sticky top-14 z-30 w-full h-16 bg-background/85 backdrop-blur-md border-b border-surface-light/50 flex items-center overflow-x-auto no-scrollbar snap-x snap-mandatory select-none"
    >
      <div className="flex px-4 gap-2.5 min-w-full py-2">
        {matchdays.map((md) => {
          const isActive = selectedMatchdayId === md.id;

          return (
            <button
              key={md.id}
              data-active={isActive}
              onClick={() => setSelectedMatchdayId(md.id)}
              className={cn(
                "relative flex flex-col items-center justify-center min-w-[105px] h-11 px-3.5 rounded-xl snap-center transition-all duration-200 cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-inset",
                isActive ? "text-primary scale-[1.03]" : "text-text-secondary hover:text-white hover:bg-surface-light/35"
              )}
              aria-label={`Select ${md.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Animated Glowing Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="activeMatchdayPill"
                  className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-xl -z-10 shadow-[0_0_12px_rgba(0,200,83,0.12)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}

              <span className="text-[11px] font-extrabold tracking-wide uppercase">
                {md.label}
              </span>
              <span className={cn(
                "text-[8px] mt-0.5 uppercase tracking-widest font-black transition-colors",
                isActive ? "text-primary/80" : "text-text-muted"
              )}>
                {md.subLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
