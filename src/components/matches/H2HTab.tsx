'use client';

import React from 'react';
import { Match } from '@/types';
import { cn } from '@/lib/utils';
import { TeamLogo } from './MatchCard';

interface H2HTabProps {
  match: Match;
}

export default function H2HTab({ match }: H2HTabProps) {
  // Mock recent form data (last 5 results)
  const homeForm = ['W', 'W', 'D', 'L', 'W'] as const;
  const awayForm = ['W', 'L', 'W', 'D', 'D'] as const;

  // Mock historic head-to-head matches between these teams
  const historicMatches = [
    { date: 'Dec 14, 2025', homeScore: 1, awayScore: 2, venue: match.venue },
    { date: 'Aug 28, 2025', homeScore: 3, awayScore: 1, venue: 'Neutral Ground' },
    { date: 'Apr 03, 2025', homeScore: 2, awayScore: 2, venue: match.venue },
    { date: 'Nov 12, 2024', homeScore: 0, awayScore: 1, venue: 'Neutral Ground' }
  ];

  const getFormPillClass = (result: 'W' | 'D' | 'L') => {
    switch (result) {
      case 'W':
        return 'bg-primary text-black';
      case 'L':
        return 'bg-accent-red text-white';
      case 'D':
        return 'bg-surface-light text-text-secondary border border-surface-light';
    }
  };

  return (
    <div className="p-4 bg-surface rounded-xl border border-surface-light/40 mx-4 my-3 space-y-6 select-none">
      {/* Form Section */}
      <div>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
          Recent Form (Last 5 Games)
        </h3>

        <div className="space-y-4">
          {/* Home form */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary">
              {match.homeTeam.name}
            </span>
            <div className="flex gap-1.5">
              {homeForm.map((res, idx) => (
                <span 
                  key={`home-f-${idx}`}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm",
                    getFormPillClass(res)
                  )}
                >
                  {res}
                </span>
              ))}
            </div>
          </div>

          {/* Away form */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary">
              {match.awayTeam.name}
            </span>
            <div className="flex gap-1.5">
              {awayForm.map((res, idx) => (
                <span 
                  key={`away-f-${idx}`}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm",
                    getFormPillClass(res)
                  )}
                >
                  {res}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Head to Head Meetings */}
      <div>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
          Previous Meetings
        </h3>

        <div className="space-y-3">
          {historicMatches.map((meeting, idx) => {
            const isHomeWin = meeting.homeScore > meeting.awayScore;
            const isAwayWin = meeting.awayScore > meeting.homeScore;

            return (
              <div 
                key={idx}
                className="p-3 bg-surface-light/35 border border-surface-light/20 rounded-lg flex items-center justify-between text-xs"
              >
                <div className="flex flex-col">
                  <span className="text-text-secondary font-medium">{meeting.date}</span>
                  <span className="text-[10px] text-text-muted mt-0.5">{meeting.venue}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-semibold", isHomeWin ? "text-white font-bold" : "text-text-secondary")}>
                      {match.homeTeam.name}
                    </span>
                    <TeamLogo name={match.homeTeam.name} color={match.homeTeam.color} secondaryColor={match.homeTeam.secondaryColor} size={18} />
                  </div>

                  <span className="font-bold text-white bg-background px-2.5 py-1 rounded border border-surface-light tabular-nums shrink-0">
                    {meeting.homeScore} - {meeting.awayScore}
                  </span>

                  <div className="flex items-center gap-2">
                    <TeamLogo name={match.awayTeam.name} color={match.awayTeam.color} secondaryColor={match.awayTeam.secondaryColor} size={18} />
                    <span className={cn("font-semibold", isAwayWin ? "text-white font-bold" : "text-text-secondary")}>
                      {match.awayTeam.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
