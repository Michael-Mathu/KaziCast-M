'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Match } from '@/types';
import { cn, formatTimeOnly, getTeamFlagUrl } from '@/lib/utils';

interface RightPanelProps {
  liveMatches: Match[];
  favoriteMatches: Match[];
}

export default function RightPanel({ liveMatches, favoriteMatches }: RightPanelProps) {
  const router = useRouter();

  return (
    <aside className="hidden lg:flex flex-col w-[300px] shrink-0 p-4 sticky top-0 h-screen overflow-y-auto gap-4 select-none" role="complementary" aria-label="Live matches and favorites">
      {/* Live Simulator Widget */}
      <div className="bg-surface border border-surface-light/40 rounded-xl p-4 shadow-sm">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="live-dot" aria-hidden="true" />
          Live Simulation Feed
        </h2>
        {liveMatches.length > 0 ? (
          <div className="space-y-2.5" role="list" aria-label="Live matches">
            {liveMatches.slice(0, 3).map(match => (
              <div 
                key={match.id}
                onClick={() => router.push(`/matches/${match.id}`)}
                className="p-2.5 rounded-lg bg-surface-light/40 hover:bg-surface-light/80 transition-colors cursor-pointer border border-surface-light/20 flex items-center justify-between"
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && router.push(`/matches/${match.id}`)}
                aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}, ${match.score.home}-${match.score.away}`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <img 
                    src={getTeamFlagUrl(match.homeTeam.id)} 
                    alt="" 
                    className="w-[18px] h-[13px] rounded-sm object-cover shadow-sm border border-white/10 shrink-0" 
                  />
                  <span className="text-xs font-bold text-white truncate max-w-[65px]">{match.homeTeam.name}</span>
                  <span className="text-[9px] text-text-muted font-bold" aria-hidden="true">vs</span>
                  <span className="text-xs font-bold text-white truncate max-w-[65px]">{match.awayTeam.name}</span>
                  <img 
                    src={getTeamFlagUrl(match.awayTeam.id)} 
                    alt="" 
                    className="w-[18px] h-[13px] rounded-sm object-cover shadow-sm border border-white/10 shrink-0" 
                  />
                </div>
                <div className="flex flex-col items-end shrink-0 ml-1">
                  <span className="text-xs font-bold text-primary tabular-nums">{match.score.home}-{match.score.away}</span>
                  <span className="text-[9px] text-accent-red font-bold">{match.minute}'</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted">No live matches in progress right now.</p>
        )}
      </div>

      {/* Followed Favorites Widget */}
      <div className="bg-surface border border-surface-light/40 rounded-xl p-4 shadow-sm flex-1 overflow-y-auto">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Star size={14} className="text-primary fill-primary" aria-hidden="true" />
          Pinned Matches
        </h2>
        {favoriteMatches.length > 0 ? (
          <div className="space-y-2.5" role="list" aria-label="Pinned matches">
            {favoriteMatches.map(match => (
              <div 
                key={match.id}
                onClick={() => router.push(`/matches/${match.id}`)}
                className="p-2.5 rounded-lg bg-surface-light/40 hover:bg-surface-light/80 transition-colors cursor-pointer border border-surface-light/20 flex items-center justify-between"
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && router.push(`/matches/${match.id}`)}
                aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <img 
                    src={getTeamFlagUrl(match.homeTeam.id)} 
                    alt="" 
                    className="w-[18px] h-[13px] rounded-sm object-cover shadow-sm border border-white/10 shrink-0" 
                  />
                  <span className="text-xs font-bold text-white truncate">{match.homeTeam.name}</span>
                  <span className="text-[10px] text-text-muted" aria-hidden="true">v</span>
                  <span className="text-xs font-bold text-white truncate">{match.awayTeam.name}</span>
                  <img 
                    src={getTeamFlagUrl(match.awayTeam.id)} 
                    alt="" 
                    className="w-[18px] h-[13px] rounded-sm object-cover shadow-sm border border-white/10 shrink-0" 
                  />
                </div>
                <div className="text-xs font-bold text-white pl-2">
                  {match.status === 'LIVE' ? (
                    <span className="text-accent-red tabular-nums">{match.score.home}-{match.score.away}</span>
                  ) : match.status === 'FT' ? (
                    <span className="text-text-secondary tabular-nums">{match.score.home}-{match.score.away}</span>
                  ) : (
                    <span className="text-primary">{formatTimeOnly(match.startTime)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted">Tap the star bookmark on any match card to track it here in real-time!</p>
        )}
      </div>
    </aside>
  );
}