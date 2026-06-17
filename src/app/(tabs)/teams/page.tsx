'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Calendar, Shield, Users, Trophy, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { useUserStore } from '@/store/userStore';
import { Team, Player, Match } from '@/types';
import { TeamLogo } from '@/components/matches/MatchCard';
import { generateSquad, WORLD_CUP_TEAMS } from '@/data/teams';
import { cn, formatDateHeading, formatTimeOnly, getTeamFlagUrl } from '@/lib/utils';

export default function TeamsPage() {
  const router = useRouter();
  const { toggleFollowTeam, followedTeams } = useUserStore();
  const matches = useAppStore(s => s.matches);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Group teams A-H
  const groupedTeams = React.useMemo(() => {
    const groups: Record<string, Team[]> = {};
    Object.values(WORLD_CUP_TEAMS).forEach(team => {
      const g = `Group ${team.group}`;
      if (!groups[g]) groups[g] = [];
      groups[g].push(team);
    });
    return groups;
  }, []);

  // Get selected team squad
  const teamSquad = React.useMemo(() => {
    if (!selectedTeam) return [];
    return generateSquad(selectedTeam.id);
  }, [selectedTeam]);

  // Get selected team matches
  const teamMatches = React.useMemo(() => {
    if (!selectedTeam) return [];
    return matches.filter(
      m => m.homeTeam.id === selectedTeam.id || m.awayTeam.id === selectedTeam.id
    );
  }, [selectedTeam, matches]);

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
  };

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="flex flex-col h-full bg-background p-4 pb-12 select-none">
      <h1 className="text-lg font-black text-white uppercase tracking-wider mb-4">
        National Teams
      </h1>

      {/* Teams grid grouped A-H */}
      <div className="space-y-6 overflow-y-auto">
        {Object.entries(groupedTeams).map(([groupName, teams]) => (
          <div key={groupName} className="bg-surface border border-surface-light/40 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3.5 flex items-center justify-between">
              <span>{groupName}</span>
              <span className="text-[10px] text-text-secondary font-medium lowercase">4 teams</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {teams.map(team => {
                const isFollowed = followedTeams.includes(team.id);
                return (
                  <div
                    key={team.id}
                    onClick={() => handleTeamClick(team)}
                    className="p-3 bg-surface-light/30 border border-surface-light/40 rounded-xl hover:bg-surface-light/65 transition-colors cursor-pointer flex items-center justify-between group focus-within:ring-2 focus-within:ring-primary/50"
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${team.name} details`}
                    onKeyDown={(e) => e.key === 'Enter' && handleTeamClick(team)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <TeamLogo name={team.name} color={team.color} secondaryColor={team.secondaryColor} flag={team.flag} size={34} />
                      <span className="text-xs font-semibold text-white truncate group-hover:text-primary transition-colors">
                        {team.name}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollowTeam(team.id);
                      }}
                      className="text-text-muted hover:text-primary transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset rounded"
                      aria-label={isFollowed ? `Unfollow ${team.name}` : `Follow ${team.name}`}
                    >
                      <Star size={12} className={cn(isFollowed ? "fill-primary text-primary" : "fill-none")} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Team Details Slide-over panel */}
      <AnimatePresence>
        {selectedTeam && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeam(null)}
              className="fixed inset-0 z-40 bg-black"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-full sm:max-w-md bg-surface border-l border-surface-light shadow-2xl flex flex-col overflow-hidden select-none"
            >
              {/* Slide-over header */}
              <div className="p-4 border-b border-surface-light flex items-center justify-between bg-surface-light/20">
                <div className="flex items-center gap-3">
                  <TeamLogo name={selectedTeam.name} color={selectedTeam.color} secondaryColor={selectedTeam.secondaryColor} flag={selectedTeam.flag} size={48} />
                  <div>
                    <h2 className="text-base font-bold text-white leading-tight">{selectedTeam.name}</h2>
                    <p className="text-[10px] text-text-secondary mt-0.5 uppercase tracking-wider font-semibold">
                      World Cup Group {selectedTeam.group}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="p-1.5 bg-surface-light hover:bg-surface-light/80 rounded-full text-text-secondary hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable details tab container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
                {/* Squad list */}
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Users size={13} className="text-primary" />
                    Squad Directory ({teamSquad.length} Players)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {teamSquad.map(player => (
                      <div
                        key={player.id}
                        onClick={() => handlePlayerClick(player)}
                        className="p-2.5 bg-surface-light/30 hover:bg-surface-light/60 border border-surface-light/20 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-bold text-text-muted w-4 tabular-nums">{player.number}</span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-white truncate">{player.name}</span>
                            <span className="text-[9px] text-text-secondary mt-0.5">{player.club}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-primary bg-background/50 border border-surface-light/40 px-1.5 py-0.5 rounded uppercase shrink-0 select-none">
                          {player.position}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team fixtures */}
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Calendar size={13} className="text-primary" />
                    Fixtures & Results
                  </h3>
                  <div className="space-y-2.5">
                    {teamMatches.map(match => (
                      <div
                        key={match.id}
                        onClick={() => {
                          setSelectedTeam(null);
                          router.push(`/matches/${match.id}`);
                        }}
                        className="p-3 bg-surface-light/30 hover:bg-surface-light/60 border border-surface-light/20 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                          <img 
                            src={getTeamFlagUrl(match.homeTeam.id)} 
                            alt="" 
                            className="w-[18px] h-[13px] rounded-sm object-cover shadow-sm border border-white/10 shrink-0" 
                          />
                          <span className="font-bold text-white truncate">{match.homeTeam.shortName}</span>
                          <span className="text-[10px] text-text-muted">vs</span>
                          <span className="font-bold text-white truncate">{match.awayTeam.shortName}</span>
                          <img 
                            src={getTeamFlagUrl(match.awayTeam.id)} 
                            alt="" 
                            className="w-[18px] h-[13px] rounded-sm object-cover shadow-sm border border-white/10 shrink-0" 
                          />
                        </div>

                        <div className="text-right shrink-0">
                          {match.status === 'LIVE' ? (
                            <span className="text-accent-red font-bold animate-pulse tabular-nums">{match.score.home}-{match.score.away}</span>
                          ) : match.status === 'FT' ? (
                            <span className="text-white font-bold tabular-nums">{match.score.home}-{match.score.away}</span>
                          ) : (
                            <span className="text-primary font-bold">{formatTimeOnly(match.startTime)}</span>
                          )}
                          <span className="text-[9px] text-text-secondary block mt-0.5">{match.matchdayName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Player stats slide-up drawer details */}
      <AnimatePresence>
        {selectedPlayer && selectedTeam && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlayer(null)}
              className="fixed inset-0 z-50 bg-black"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-surface-light rounded-t-2xl max-w-[430px] mx-auto sm:max-w-md p-5 pb-8 shadow-2xl select-none"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <TeamLogo name={selectedTeam.name} color={selectedTeam.color} secondaryColor={selectedTeam.secondaryColor} flag={selectedTeam.flag} size={44} />
                  <div>
                    <h2 className="text-base font-bold text-white">{selectedPlayer.name}</h2>
                    <p className="text-xs text-text-secondary">
                      #{selectedPlayer.number} • {selectedPlayer.position}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="p-1.5 bg-surface-light hover:bg-surface-light/80 rounded-full text-text-secondary hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-surface-light/40 rounded-xl border border-surface-light/20 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-primary tabular-nums">
                    {selectedPlayer.rating?.toFixed(1) || '6.7'}
                  </span>
                  <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mt-1">
                    Rating
                  </span>
                </div>
                <div className="p-3 bg-surface-light/40 rounded-xl border border-surface-light/20 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white tabular-nums">
                    {selectedPlayer.caps}
                  </span>
                  <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mt-1">
                    International Caps
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-surface-light/40">
                  <span className="text-text-secondary font-medium">Age</span>
                  <span className="font-bold text-white tabular-nums">{selectedPlayer.age} years</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-surface-light/40">
                  <span className="text-text-secondary font-medium">Club</span>
                  <span className="font-bold text-white">{selectedPlayer.club}</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-surface-light/40">
                  <span className="text-text-secondary font-medium">Goals / Assists</span>
                  <span className="font-bold text-white tabular-nums">{selectedPlayer.stats?.goals || 0} G / {selectedPlayer.stats?.assists || 0} A</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
