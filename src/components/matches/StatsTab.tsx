'use client';

import React from 'react';
import { Match } from '@/types';

interface StatsTabProps {
  match: Match;
}

export default function StatsTab({ match }: StatsTabProps) {
  const { stats } = match;

  const statItems = [
    { label: 'Ball Possession (%)', home: stats.possession.home, away: stats.possession.away, isPercentage: true },
    { label: 'Total Shots', home: stats.shots.home, away: stats.shots.away },
    { label: 'Shots on Target', home: stats.shotsOnTarget.home, away: stats.shotsOnTarget.away },
    { label: 'Corners', home: stats.corners.home, away: stats.corners.away },
    { label: 'Fouls Committed', home: stats.fouls.home, away: stats.fouls.away },
    { label: 'Yellow Cards', home: stats.yellowCards.home, away: stats.yellowCards.away },
    { label: 'Red Cards', home: stats.redCards.home, away: stats.redCards.away },
    { label: 'Offsides', home: stats.offsides.home, away: stats.offsides.away }
  ];

  return (
    <div className="p-4 bg-surface rounded-xl border border-surface-light/40 mx-4 my-3 space-y-5">
      <div className="flex justify-between items-center pb-2 border-b border-surface-light/40">
        <span className="text-xs font-bold text-primary uppercase tracking-wide">
          {match.homeTeam.name}
        </span>
        <span className="text-[10px] font-bold text-text-muted uppercase">
          Match Statistics
        </span>
        <span className="text-xs font-bold text-accent-blue uppercase tracking-wide">
          {match.awayTeam.name}
        </span>
      </div>

      {statItems.map((stat, idx) => {
        const homeVal = stat.home;
        const awayVal = stat.away;
        const sum = homeVal + awayVal;

        // Calculate split percentages
        let homePct = 50;
        let awayPct = 50;
        
        if (sum > 0) {
          homePct = Math.round((homeVal / sum) * 100);
          awayPct = 100 - homePct;
        }

        return (
          <div key={idx} className="space-y-1.5 select-none">
            {/* Stat Row Labels */}
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-white tabular-nums">
                {stat.isPercentage ? `${homeVal}%` : homeVal}
              </span>
              <span className="text-text-secondary font-medium">
                {stat.label}
              </span>
              <span className="text-white tabular-nums">
                {stat.isPercentage ? `${awayVal}%` : awayVal}
              </span>
            </div>

            {/* Split Progress Bar */}
            <div className="w-full h-2 rounded-full overflow-hidden bg-surface-light flex">
              <div 
                className="h-full bg-primary transition-all duration-500 rounded-l-full"
                style={{ width: `${homePct}%` }}
              />
              <div 
                className="h-full bg-accent-blue transition-all duration-500 rounded-r-full"
                style={{ width: `${awayPct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
