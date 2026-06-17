'use client';

import React, { useState } from 'react';
import { X, Trophy, Shirt } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Match, Player } from '@/types';
import { cn } from '@/lib/utils';
import { TeamLogo } from './MatchCard';

interface LineupsTabProps {
  match: Match;
}

export default function LineupsTab({ match }: LineupsTabProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedPlayerTeam, setSelectedPlayerTeam] = useState<'home' | 'away' | null>(null);

  const handlePlayerClick = (player: Player, team: 'home' | 'away') => {
    setSelectedPlayer(player);
    setSelectedPlayerTeam(team);
  };

  const homeLineup = match.lineups.home;
  const awayLineup = match.lineups.away;

  return (
    <div className="flex flex-col gap-4 select-none px-4 pb-6">
      
      {/* Pitch Layout Block */}
      <div className="bg-surface border border-surface-light/40 rounded-2xl p-4 shadow-md overflow-hidden relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Starting Formations
            </h3>
            <div className="text-[11px] text-text-secondary mt-0.5">
              Home <span className="text-primary font-bold">{homeLineup.formation}</span> vs Away <span className="text-accent-blue font-bold">{awayLineup.formation}</span>
            </div>
          </div>
          <span className="text-[10px] bg-background border border-surface-light px-2 py-0.5 rounded font-semibold text-text-secondary">
            Pitch Diagram
          </span>
        </div>

        {/* Tactical Pitch Wrapper */}
        <div className="relative w-full aspect-[2/3] bg-[#1b431e] rounded-xl border border-white/20 overflow-hidden shadow-inner flex flex-col">
          {/* Pitch markings */}
          <div className="absolute inset-2 border border-white/10 rounded-lg pointer-events-none" />
          
          {/* Halfway line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/10 pointer-events-none" />
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] border-[1.5px] border-white/10 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/15 rounded-full pointer-events-none" />

          {/* Top Penalty Box (Away Team Side) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[140px] h-[55px] border-b-[1.5px] border-l-[1.5px] border-r-[1.5px] border-white/10 pointer-events-none" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[60px] h-[18px] border-b-[1.5px] border-l-[1.5px] border-r-[1.5px] border-white/10 pointer-events-none" />

          {/* Bottom Penalty Box (Home Team Side) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-[55px] border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] border-white/10 pointer-events-none" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60px] h-[18px] border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] border-white/10 pointer-events-none" />

          {/* Render Starting Players as dots */}
          {/* Home Players */}
          {homeLineup.starting.map((player) => (
            <button
              key={`home-${player.id}`}
              onClick={() => handlePlayerClick(player, 'home')}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
              style={{ left: `${player.x}%`, top: `${player.y}%` }}
            >
              <div className="relative group">
                {/* Rating Badge */}
                {player.rating > 0 && (
                  <span className="absolute -top-1 -right-1.5 text-[9px] bg-primary text-black font-bold h-4 px-1.5 rounded-full flex items-center justify-center border border-black/30 shadow-lg z-10">
                    {player.rating.toFixed(1)}
                  </span>
                )}
                {/* Shirt Badge - bigger with flag colors */}
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-[11px] text-white shadow-lg transition-transform active:scale-125 ring-2 ring-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${match.homeTeam.color} 50%, ${match.homeTeam.secondaryColor} 50%)`
                  }}
                >
                  {player.number}
                </div>
              </div>
              <span className="text-[10px] text-white font-bold mt-1 px-1.5 bg-black/70 rounded text-center truncate max-w-[80px] shadow-sm backdrop-blur-sm">
                {player.name.split(' ').pop()}
              </span>
            </button>
          ))}

          {/* Away Players */}
          {awayLineup.starting.map((player) => (
            <button
              key={`away-${player.id}`}
              onClick={() => handlePlayerClick(player, 'away')}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
              style={{ left: `${player.x}%`, top: `${player.y}%` }}
            >
              <div className="relative group">
                {/* Rating Badge */}
                {player.rating > 0 && (
                  <span className="absolute -top-1 -right-1.5 text-[9px] bg-accent-blue text-white font-bold h-4 px-1.5 rounded-full flex items-center justify-center border border-black/30 shadow-lg z-10">
                    {player.rating.toFixed(1)}
                  </span>
                )}
                {/* Shirt Badge - bigger with flag colors */}
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-[11px] text-white shadow-lg transition-transform active:scale-125 ring-2 ring-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${match.awayTeam.color} 50%, ${match.awayTeam.secondaryColor} 50%)`
                  }}
                >
                  {player.number}
                </div>
              </div>
              <span className="text-[10px] text-white font-bold mt-1 px-1.5 bg-black/70 rounded text-center truncate max-w-[80px] shadow-sm backdrop-blur-sm">
                {player.name.split(' ').pop()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Substitutes Section */}
      <div className="bg-surface border border-surface-light/40 rounded-2xl p-4 shadow-md">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
          Substitutes
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Home Subs */}
          <div>
            <div className="text-[10px] font-bold text-primary uppercase mb-2">
              {match.homeTeam.name}
            </div>
            <div className="space-y-1.5">
              {homeLineup.substitutes.map(sub => (
                <div 
                  key={sub.id} 
                  onClick={() => handlePlayerClick({ ...sub, x: 0, y: 0 } as Player, 'home')}
                  className="flex items-center justify-between p-2 rounded bg-surface-light/30 hover:bg-surface-light/60 cursor-pointer border border-surface-light/20 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-text-muted w-4 tabular-nums">{sub.number}</span>
                    <span className="text-xs font-medium text-white truncate">{sub.name}</span>
                  </div>
                  <span className="text-[9px] font-bold text-text-secondary">{sub.position}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Away Subs */}
          <div>
            <div className="text-[10px] font-bold text-accent-blue uppercase mb-2">
              {match.awayTeam.name}
            </div>
            <div className="space-y-1.5">
              {awayLineup.substitutes.map(sub => (
                <div 
                  key={sub.id} 
                  onClick={() => handlePlayerClick({ ...sub, x: 0, y: 0 } as Player, 'away')}
                  className="flex items-center justify-between p-2 rounded bg-surface-light/30 hover:bg-surface-light/60 cursor-pointer border border-surface-light/20 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-text-muted w-4 tabular-nums">{sub.number}</span>
                    <span className="text-xs font-medium text-white truncate">{sub.name}</span>
                  </div>
                  <span className="text-[9px] font-bold text-text-secondary">{sub.position}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player Stats Slide-up Modal Drawer */}
      <AnimatePresence>
        {selectedPlayer && selectedPlayerTeam && (
          <>
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlayer(null)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Modal content drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-surface-light rounded-t-2xl max-w-[430px] mx-auto sm:max-w-md p-5 pb-8 shadow-2xl select-none"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <TeamLogo 
                    name={selectedPlayerTeam === 'home' ? match.homeTeam.name : match.awayTeam.name}
                    color={selectedPlayerTeam === 'home' ? match.homeTeam.color : match.awayTeam.color}
                    secondaryColor={selectedPlayerTeam === 'home' ? match.homeTeam.secondaryColor : match.awayTeam.secondaryColor}
                    size={38}
                  />
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

              {/* Stats detail grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-surface-light/40 rounded-xl border border-surface-light/20 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-primary tabular-nums">
                    {selectedPlayer.rating?.toFixed(1) || 'N/A'}
                  </span>
                  <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mt-1">
                    Match Rating
                  </span>
                </div>
                <div className="p-3 bg-surface-light/40 rounded-xl border border-surface-light/20 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white tabular-nums">
                    {selectedPlayer.stats?.goals || 0}
                  </span>
                  <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mt-1">
                    Goals Scored
                  </span>
                </div>
              </div>

              {/* Secondary stats lists */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-surface-light/40">
                  <span className="text-text-secondary font-medium">Assists</span>
                  <span className="font-bold text-white tabular-nums">{selectedPlayer.stats?.assists || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-surface-light/40">
                  <span className="text-text-secondary font-medium">Shots Attempted</span>
                  <span className="font-bold text-white tabular-nums">{selectedPlayer.stats?.shots || 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-surface-light/40">
                  <span className="text-text-secondary font-medium">Pass Completion</span>
                  <span className="font-bold text-white tabular-nums">{selectedPlayer.stats?.passes || 'N/A'}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
