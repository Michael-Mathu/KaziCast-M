'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/appStore';
import { useUiStore } from '@/store/uiStore';
import { MatchEvent, Match } from '@/types';

export function useLiveScores() {
  const { matches, updateLiveMatch } = useAppStore();
  const { isLiveSimulationActive, triggerGoalFlash } = useUiStore();
  const matchesRef = useRef<Match[]>(matches);

  // Keep matches reference fresh
  useEffect(() => {
    matchesRef.current = matches;
  }, [matches]);

  useEffect(() => {
    if (!isLiveSimulationActive) return;

    const interval = setInterval(() => {
      const liveMatches = matchesRef.current.filter(m => m.status === 'LIVE');

      liveMatches.forEach((match) => {
        const currentMinute = match.minute || 70;
        const nextMinute = currentMinute + 1;

        if (nextMinute > 90) {
          // End the match (FT)
          updateLiveMatch(match.id, {
            status: 'FT',
            minute: 90
          });
          return;
        }

        // Prepare updates
        const updates: Partial<Match> = {
          minute: nextMinute
        };

        // Random event simulation
        const rand = Math.random();
        
        // 1. Goal Simulation (approx 4% chance per tick)
        if (rand < 0.04) {
          const scoringTeam = Math.random() > 0.5 ? 'home' : 'away';
          const newScore = { ...match.score };
          
          let scoringPlayer = 'Unknown Player';
          let assistPlayer: string | undefined;

          if (scoringTeam === 'home') {
            newScore.home += 1;
            const players = match.lineups.home.starting.filter(p => p.position !== 'GK');
            scoringPlayer = players[Math.floor(Math.random() * players.length)].name;
            assistPlayer = players[Math.floor(Math.random() * players.length)].name;
            if (assistPlayer === scoringPlayer) assistPlayer = undefined;
          } else {
            newScore.away += 1;
            const players = match.lineups.away.starting.filter(p => p.position !== 'GK');
            scoringPlayer = players[Math.floor(Math.random() * players.length)].name;
            assistPlayer = players[Math.floor(Math.random() * players.length)].name;
            if (assistPlayer === scoringPlayer) assistPlayer = undefined;
          }

          const newEvent: MatchEvent = {
            id: `e-sim-${Date.now()}`,
            type: 'GOAL',
            minute: nextMinute,
            player: scoringPlayer,
            team: scoringTeam,
            assist: assistPlayer,
            description: scoringTeam === 'home' 
              ? `${match.homeTeam.name} score a sensational goal!` 
              : `${match.awayTeam.name} scores from close range!`
          };

          // Trigger goal flash animation
          triggerGoalFlash(
            scoringTeam === 'home' ? match.homeTeam.name : match.awayTeam.name,
            match.id
          );

          // Update match statistics
          const newStats = { ...match.stats };
          if (scoringTeam === 'home') {
            newStats.shots.home += 1;
            newStats.shotsOnTarget.home += 1;
          } else {
            newStats.shots.away += 1;
            newStats.shotsOnTarget.away += 1;
          }

          updates.score = newScore;
          updates.events = [newEvent, ...match.events];
          updates.stats = newStats;
        }
        // 2. Yellow Card Simulation (approx 6% chance)
        else if (rand < 0.10) {
          const cardTeam = Math.random() > 0.5 ? 'home' : 'away';
          const players = cardTeam === 'home' 
            ? match.lineups.home.starting 
            : match.lineups.away.starting;
          const cardPlayer = players[Math.floor(Math.random() * players.length)].name;

          const newEvent: MatchEvent = {
            id: `e-sim-${Date.now()}`,
            type: 'YELLOW_CARD',
            minute: nextMinute,
            player: cardPlayer,
            team: cardTeam,
            description: 'Tactical foul stopping a counter-attack'
          };

          const newStats = { ...match.stats };
          if (cardTeam === 'home') {
            newStats.yellowCards.home += 1;
            newStats.fouls.home += 1;
          } else {
            newStats.yellowCards.away += 1;
            newStats.fouls.away += 1;
          }

          updates.events = [newEvent, ...match.events];
          updates.stats = newStats;
        }
        // 3. Substitution Simulation (approx 8% chance)
        else if (rand < 0.18) {
          const subTeam = Math.random() > 0.5 ? 'home' : 'away';
          const lineups = subTeam === 'home' ? match.lineups.home : match.lineups.away;
          
          if (lineups.starting.length > 0 && lineups.substitutes.length > 0) {
            const outPlayerIdx = Math.floor(Math.random() * lineups.starting.length);
            const outPlayer = lineups.starting[outPlayerIdx];
            const inPlayerIdx = Math.floor(Math.random() * lineups.substitutes.length);
            const inPlayer = lineups.substitutes[inPlayerIdx];

            const newEvent: MatchEvent = {
              id: `e-sim-${Date.now()}`,
              type: 'SUBSTITUTION',
              minute: nextMinute,
              player: inPlayer.name,
              team: subTeam,
              description: `Replaces ${outPlayer.name}`
            };

            updates.events = [newEvent, ...match.events];
          }
        }
        // 4. Regular Minute Tick / Possession Shuffle
        else {
          const newStats = { ...match.stats };
          const posShift = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          
          let homePos = newStats.possession.home + posShift;
          if (homePos > 75) homePos = 75;
          if (homePos < 25) homePos = 25;
          
          newStats.possession.home = homePos;
          newStats.possession.away = 100 - homePos;
          updates.stats = newStats;
        }

        updateLiveMatch(match.id, updates);
      });
    }, 7000); // simulation ticks every 7 seconds for visible feedback

    return () => clearInterval(interval);
  }, [isLiveSimulationActive, updateLiveMatch, triggerGoalFlash]);
}
