'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Match } from '@/types';
import MatchCard from './MatchCard';

interface LeagueGroupProps {
  leagueId: string;
  leagueName: string;
  leagueLogo: string;
  matches: Match[];
  onMatchClick: (matchId: string) => void;
  defaultExpanded?: boolean;
}

export default function LeagueGroup({
  leagueId,
  leagueName,
  leagueLogo,
  matches,
  onMatchClick,
  defaultExpanded = true
}: LeagueGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  if (matches.length === 0) return null;

  return (
    <div className="mx-4 my-2.5 bg-surface border border-surface-light/40 rounded-xl overflow-hidden shadow-md">
      {/* Group Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-surface-light/40 transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${leagueName}`}
      >
        <div className="flex items-center gap-2">
          {/* League Logo (Emoji or Circular Badge) */}
          <span className="text-xl leading-none w-6 h-6 flex items-center justify-center bg-background rounded-md shadow-sm border border-surface-light">
            {leagueLogo}
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            {leagueName}
          </span>
        </div>

        {/* Expand / Collapse Chevron Indicator */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="text-text-secondary"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Collapsible Match List Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col border-t border-surface-light/40">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => onMatchClick(match.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
