'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, MoreVertical, MapPin, CalendarDays, Share2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { TeamLogo } from '@/components/matches/MatchCard';
import SummaryTab from '@/components/matches/SummaryTab';
import StatsTab from '@/components/matches/StatsTab';
import LineupsTab from '@/components/matches/LineupsTab';
import H2HTab from '@/components/matches/H2HTab';
import { cn, formatDateHeading } from '@/lib/utils';

type SubTab = 'summary' | 'stats' | 'lineups' | 'h2h';

export default function MatchDetailPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = params.id as string;

  const { matches, toggleFavoriteMatch } = useAppStore();
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('summary');
  
  const match = matches.find(m => m.id === matchId);

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 select-none">
        <span className="text-4xl mb-4">⚠️</span>
        <h3 className="text-lg font-bold text-white mb-2">Match Not Found</h3>
        <p className="text-xs text-text-secondary mb-6 max-w-xs">
          The match you are looking for does not exist or may have been removed.
        </p>
        <button 
          onClick={() => router.push('/matches')}
          className="px-5 py-2.5 bg-primary text-black font-bold text-xs rounded-xl shadow-lg hover:bg-primary-dark transition-all active:scale-95"
        >
          Back to Match Schedule
        </button>
      </div>
    );
  }

  const subTabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'stats', label: 'Stats' },
    { id: 'lineups', label: 'Lineups' },
    { id: 'h2h', label: 'H2H' }
  ] as const;

  return (
    <div className="flex flex-col min-h-full bg-background pb-12 select-none">
      
      {/* Detail Header bar */}
      <div className="sticky top-0 z-30 w-full h-14 bg-background/90 backdrop-blur-md border-b border-surface-light px-4 flex items-center justify-between">
        <button 
          onClick={() => router.push('/matches')}
          className="p-2 -ml-2 rounded-full hover:bg-surface text-text-secondary hover:text-white transition-colors"
          aria-label="Go back to matches list"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-sm font-bold text-white uppercase tracking-wider">
          Match Details
        </span>

        <div className="flex items-center gap-1">
          {/* Favorite Toggle inside detail */}
          <button
            onClick={() => toggleFavoriteMatch(match.id)}
            className="p-2 rounded-full hover:bg-surface text-text-secondary transition-colors"
            aria-label="Toggle favorite"
          >
            <Star 
              size={18} 
              className={cn(
                "transition-all",
                match.isFavorite ? "fill-primary text-primary scale-110" : "fill-none text-text-secondary"
              )} 
            />
          </button>
          
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                  url: window.location.href
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="p-2 rounded-full hover:bg-surface text-text-secondary hover:text-white transition-colors"
            aria-label="Share match info"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Hero Scoreboard Section */}
      <div className="bg-surface border-b border-surface-light px-4 py-6 text-center shadow-md">
        
        {/* Match metadata */}
        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-text-secondary mb-5">
          <span className="flex items-center gap-1.5">
            <span className="text-base leading-none">🏆</span>
            <span>World Cup 2026 • {match.matchdayName}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-text-muted" />
            <span className="truncate max-w-[130px]">{match.venue.split(',')[0]}</span>
          </span>
        </div>

        {/* Big Teams & Scoreboard Row */}
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <TeamLogo 
              name={match.homeTeam.name} 
              color={match.homeTeam.color} 
              secondaryColor={match.homeTeam.secondaryColor}
              flag={match.homeTeam.flag}
              size={64}
            />
            <span className="text-sm font-semibold text-white mt-2.5 text-center line-clamp-1 w-full">
              {match.homeTeam.name}
            </span>
          </div>

          {/* Large Score Area */}
          <div className="flex flex-col items-center justify-center px-4 shrink-0">
            {match.status === 'SCHEDULED' ? (
              <div className="text-2xl font-black text-primary tabular-nums py-2.5">
                {match.startTime.split('T')[1].substring(0, 5)}
              </div>
            ) : (
              <div className="text-4xl font-extrabold text-white tracking-widest tabular-nums font-mono">
                {match.score.home} - {match.score.away}
              </div>
            )}

            {/* Match Status label */}
            <div className="mt-2.5">
              {match.status === 'LIVE' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-red/15 border border-accent-red/25 text-[10px] text-accent-red font-black uppercase tracking-wider animate-pulse">
                  LIVE {match.minute}'
                </span>
              )}
              {match.status === 'HALFTIME' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent-yellow/15 border border-accent-yellow/25 text-[10px] text-accent-yellow font-black uppercase tracking-wider">
                  HT
                </span>
              )}
              {match.status === 'FT' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-light border border-text-muted/20 text-[10px] text-text-secondary font-black uppercase tracking-wider">
                  FT
                </span>
              )}
              {match.status === 'POSTPONED' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-light text-[10px] text-text-muted font-bold uppercase tracking-wider">
                  PP
                </span>
              )}
              {match.status === 'CANCELLED' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-light text-[10px] text-text-muted font-bold uppercase tracking-wider line-through">
                  CAN
                </span>
              )}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <TeamLogo 
              name={match.awayTeam.name} 
              color={match.awayTeam.color} 
              secondaryColor={match.awayTeam.secondaryColor}
              flag={match.awayTeam.flag}
              size={64}
            />
            <span className="text-sm font-semibold text-white mt-2.5 text-center line-clamp-1 w-full">
              {match.awayTeam.name}
            </span>
          </div>
        </div>

        {/* Kickoff date info */}
        <div className="text-[11px] text-text-secondary flex items-center justify-center gap-1 mt-6">
          <CalendarDays size={12} className="text-text-muted" />
          <span>{formatDateHeading(match.startTime)}</span>
        </div>
      </div>

      {/* Sticky Sub-Tab Navigation */}
      <div className="sticky top-14 z-20 w-full h-11 bg-background border-b border-surface-light flex overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex px-4 min-w-full justify-between sm:justify-start sm:gap-6">
          {subTabs.map(({ id, label }) => {
            const isActive = activeSubTab === id;

            return (
              <button
                key={id}
                onClick={() => setActiveSubTab(id)}
                className={cn(
                  "flex items-center justify-center py-2 px-3 text-xs font-bold uppercase tracking-wider relative cursor-pointer",
                  isActive ? "text-white" : "text-text-muted hover:text-text-secondary"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSubTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render sub-tab views */}
      <div className="flex-1 mt-3">
        {activeSubTab === 'summary' && <SummaryTab match={match} />}
        {activeSubTab === 'stats' && <StatsTab match={match} />}
        {activeSubTab === 'lineups' && <LineupsTab match={match} />}
        {activeSubTab === 'h2h' && <H2HTab match={match} />}
      </div>
    </div>
  );
}
