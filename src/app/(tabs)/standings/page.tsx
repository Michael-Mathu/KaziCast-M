'use client';

import React, { useState } from 'react';
import { Trophy, GitMerge, Award } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { MOCK_GROUPS_TABLES, MOCK_BRACKET } from '@/data/standings';
import { cn, getTeamFlagUrl } from '@/lib/utils';

type StandingsSubTab = 'groups' | 'bracket';

export default function StandingsPage() {
  const matches = useAppStore(s => s.matches);
  const [activeTab, setActiveTab] = useState<StandingsSubTab>('groups');

  const subTabs = [
    { id: 'groups', label: 'Group Standings', Icon: Trophy },
    { id: 'bracket', label: 'Knockout Bracket', Icon: GitMerge }
  ] as const;

  return (
    <div className="flex flex-col h-full bg-background p-4 pb-12 select-none">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-black text-white uppercase tracking-wider">
          Standings & Bracket
        </h1>
      </div>

      {/* Standings Sub-Tabs */}
      <div className="flex gap-2 mb-5 border-b border-surface-light pb-2">
        {subTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset rounded",
                isActive ? "text-primary" : "text-text-muted hover:text-text-secondary"
              )}
              aria-label={`View ${tab.label}`}
              aria-pressed={isActive}
            >
              <tab.Icon size={14} />
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-[-9px] left-0 right-0 h-[2.5px] bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Group Tables Tab content */}
      {activeTab === 'groups' && (
        <div className="space-y-6 overflow-y-auto">
          {MOCK_GROUPS_TABLES.map((group) => (
            <div key={group.groupId} className="bg-surface border border-surface-light/40 rounded-2xl p-4 shadow-md">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>{group.name}</span>
                <span className="text-[9px] text-text-muted font-semibold tracking-wide uppercase">Top 2 Qualify</span>
              </h3>

              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-surface-light/60 text-text-muted font-bold text-[9px] uppercase tracking-wider">
                    <th className="py-2.5 w-8 text-center">#</th>
                    <th className="py-2.5 pl-3">Team</th>
                    <th className="py-2.5 px-2 text-center w-12">PL</th>
                    <th className="py-2.5 px-2 text-center w-12">GD</th>
                    <th className="py-2.5 pr-2 text-right w-12 font-bold">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {group.teams.map((row, idx) => {
                    const isQualifyingZone = idx < 2; // Top 2 qualify
                    
                    return (
                      <tr 
                        key={row.teamId}
                        className="border-b border-surface-light/30 hover:bg-surface-light/20 transition-colors"
                      >
                        <td className="py-3.5 text-center font-bold">
                          <span className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[10px] tabular-nums mx-auto",
                            isQualifyingZone ? "bg-primary/10 text-primary border border-primary/25" : "text-text-secondary"
                          )}>
                            {row.position}
                          </span>
                        </td>
                        <td className="py-3.5 pl-3">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={getTeamFlagUrl(row.teamId)} 
                              alt="" 
                              className="w-[20px] h-[14px] rounded-sm object-cover shadow-sm border border-white/10 shrink-0" 
                            />
                            <span className="font-bold text-white truncate max-w-[140px]">
                              {row.teamName}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 text-center text-text-secondary font-medium tabular-nums">
                          {row.played}
                        </td>
                        <td className={cn(
                          "py-3.5 px-2 text-center font-semibold tabular-nums",
                          row.goalDifference > 0 ? "text-primary" : row.goalDifference < 0 ? "text-accent-red" : "text-text-secondary"
                        )}>
                          {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                        </td>
                        <td className={cn(
                          "py-3.5 pr-2 text-right font-black tabular-nums",
                          isQualifyingZone ? "text-primary" : "text-white"
                        )}>
                          {row.points}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Knockout Bracket Tab content */}
      {activeTab === 'bracket' && (
        <div className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar py-2">
          {/* Scrollable bracket grid row */}
          <div className="flex gap-6 min-w-[760px] h-full items-stretch select-none pr-4">
            
            {/* Round of 16 column */}
            <div className="flex flex-col justify-around flex-1 gap-4">
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block text-center mb-1.5 border-b border-surface-light pb-1">
                Round of 16
              </span>
              {MOCK_BRACKET.roundOf16.map((match) => (
                <div 
                  key={match.id}
                  className="bg-surface border border-surface-light/40 rounded-xl p-3 shadow-md space-y-2.5 border-l-3 border-l-primary hover:border-surface-light transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      {match.homeTeam ? (
                        <img 
                          src={getTeamFlagUrl(match.homeTeam.id)} 
                          alt="" 
                          className="w-[18px] h-[13px] rounded-sm object-cover shadow-sm border border-white/10 shrink-0" 
                        />
                      ) : (
                        <span className="text-text-muted shrink-0">🏳️</span>
                      )}
                      <span className="font-bold text-white truncate">{match.homeTeam?.name || 'TBD'}</span>
                    </div>
                    <span className="font-bold text-white/90 tabular-nums">0</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      {match.awayTeam ? (
                        <img 
                          src={getTeamFlagUrl(match.awayTeam.id)} 
                          alt="" 
                          className="w-[18px] h-[13px] rounded-sm object-cover shadow-sm border border-white/10 shrink-0" 
                        />
                      ) : (
                        <span className="text-text-muted shrink-0">🏳️</span>
                      )}
                      <span className="font-bold text-white truncate">{match.awayTeam?.name || 'TBD'}</span>
                    </div>
                    <span className="font-bold text-white/90 tabular-nums">0</span>
                  </div>
                  <span className="text-[9px] text-text-muted block text-center mt-1">
                    Scheduled • Metro
                  </span>
                </div>
              ))}
            </div>

            {/* Quarter-finals column */}
            <div className="flex flex-col justify-around flex-1 gap-4">
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block text-center mb-1.5 border-b border-surface-light pb-1">
                Quarter-finals
              </span>
              {MOCK_BRACKET.quarters.map((match) => (
                <div 
                  key={match.id}
                  className="bg-surface border border-surface-light/40 rounded-xl p-2.5 shadow-sm space-y-2 border-l-3 border-l-accent-blue"
                >
                  <div className="flex items-center justify-between text-xs opacity-60">
                    <span className="font-medium text-text-secondary truncate">Winner R16 #1</span>
                    <span className="font-bold text-text-muted">-</span>
                  </div>
                  <div className="flex items-center justify-between text-xs opacity-60">
                    <span className="font-medium text-text-secondary truncate">Winner R16 #2</span>
                    <span className="font-bold text-text-muted">-</span>
                  </div>
                  <span className="text-[9px] text-text-muted block text-center mt-1">
                    TBD
                  </span>
                </div>
              ))}
            </div>

            {/* Semi-finals column */}
            <div className="flex flex-col justify-around flex-1 gap-4">
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block text-center mb-1.5 border-b border-surface-light pb-1">
                Semi-finals
              </span>
              {MOCK_BRACKET.semis.map((match) => (
                <div 
                  key={match.id}
                  className="bg-surface border border-surface-light/40 rounded-xl p-2.5 shadow-sm space-y-2 border-l-3 border-l-accent-yellow"
                >
                  <div className="flex items-center justify-between text-xs opacity-60">
                    <span className="font-medium text-text-secondary truncate">Winner QF #1</span>
                    <span className="font-bold text-text-muted">-</span>
                  </div>
                  <div className="flex items-center justify-between text-xs opacity-60">
                    <span className="font-medium text-text-secondary truncate">Winner QF #2</span>
                    <span className="font-bold text-text-muted">-</span>
                  </div>
                  <span className="text-[9px] text-text-muted block text-center mt-1">
                    TBD
                  </span>
                </div>
              ))}
            </div>

            {/* Finals column */}
            <div className="flex flex-col justify-center flex-1 gap-4">
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block text-center mb-1.5 border-b border-surface-light pb-1">
                Finals
              </span>
              <div className="bg-surface border border-primary/45 rounded-xl p-3 shadow-lg space-y-2.5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary/20 text-primary text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-bl">
                  Championship
                </div>
                <div className="flex items-center justify-between text-xs opacity-65 pt-2">
                  <span className="font-semibold text-text-secondary">Semifinalist #1</span>
                  <span className="font-bold text-text-muted">-</span>
                </div>
                <div className="flex items-center justify-between text-xs opacity-65">
                  <span className="font-semibold text-text-secondary">Semifinalist #2</span>
                  <span className="font-bold text-text-muted">-</span>
                </div>
                <div className="pt-2 border-t border-surface-light/50 flex items-center justify-center gap-1 text-[10px] text-primary font-bold">
                  <Award size={12} />
                  <span>World Cup Final</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
