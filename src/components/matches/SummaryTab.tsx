'use client';

import React from 'react';
import { Match, MatchEvent } from '@/types';
import { cn } from '@/lib/utils';

interface SummaryTabProps {
  match: Match;
}

export default function SummaryTab({ match }: SummaryTabProps) {
  const { events } = match;

  // Render event icon representation
  const renderEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'GOAL':
        return <span className="text-sm">⚽</span>;
      case 'PENALTY':
        return <span className="text-sm font-bold text-primary">⚽ (P)</span>;
      case 'OWN_GOAL':
        return <span className="text-sm text-accent-red font-bold">⚽ (OG)</span>;
      case 'YELLOW_CARD':
        return <span className="w-3.5 h-5 bg-accent-yellow rounded-sm block shrink-0" />;
      case 'RED_CARD':
        return <span className="w-3.5 h-5 bg-accent-red rounded-sm block shrink-0" />;
      case 'SUBSTITUTION':
        return <span className="text-sm">↔️</span>;
      default:
        return null;
    }
  };

  const sortedEvents = [...events].sort((a, b) => b.minute - a.minute);

  return (
    <div className="p-4 bg-surface rounded-xl border border-surface-light/40 mx-4 my-3">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
        Match Timeline
      </h3>

      {sortedEvents.length > 0 ? (
        <div className="relative border-l-2 border-surface-light ml-4 pl-6 space-y-6">
          {sortedEvents.map((event) => {
            const isHome = event.team === 'home';
            const teamInfo = isHome ? match.homeTeam : match.awayTeam;

            return (
              <div key={event.id} className="relative flex items-start group select-none">
                
                {/* Event timeline node pointer */}
                <div className="absolute -left-[32px] top-0.5 w-4 h-4 rounded-full bg-background border-2 border-surface-light flex items-center justify-center text-[9px] group-hover:border-primary transition-colors">
                  <div className="w-1.5 h-1.5 bg-text-secondary rounded-full" />
                </div>

                {/* Event content box */}
                <div className="flex-1 bg-surface-light/30 border border-surface-light/40 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Event Type Icon */}
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shrink-0 shadow-inner">
                      {renderEventIcon(event.type)}
                    </div>

                    {/* Event Detail text */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-semibold",
                          event.type === 'GOAL' ? "text-primary font-bold" : "text-white"
                        )}>
                          {event.player}
                        </span>
                        {event.type === 'GOAL' && event.assist && (
                          <span className="text-xs text-text-secondary">
                            (assist: {event.assist})
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-text-muted mt-0.5 block">
                        {event.description || `${event.type.replace('_', ' ')} for ${teamInfo.name}`}
                      </span>
                    </div>
                  </div>

                  {/* Minute display */}
                  <span className="text-xs font-bold text-text-secondary tabular-nums bg-background/50 px-2 py-1 rounded border border-surface-light">
                    {event.minute}'
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center text-text-secondary">
          <span className="text-3xl mb-2">⏱️</span>
          <p className="text-xs">No key events have been logged for this match yet.</p>
        </div>
      )}

      {/* Half time indicator boundary */}
      {match.status !== 'SCHEDULED' && (
        <div className="mt-6 pt-4 border-t border-surface-light/40 flex items-center justify-between text-xs text-text-muted font-semibold">
          <span>Match Started</span>
          <span>Kickoff</span>
        </div>
      )}
    </div>
  );
}
