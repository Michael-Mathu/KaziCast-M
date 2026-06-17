'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { useLiveRefresh } from '@/hooks/useLiveRefresh';
import DateScroller from '@/components/matches/DateScroller';
import LeagueGroup from '@/components/matches/LeagueGroup';
import PullToRefresh from '@/components/shared/PullToRefresh';
import { LeagueGroupSkeleton } from '@/components/shared/Skeletons';

export default function MatchesPage() {
  const router = useRouter();
  const matches = useAppStore(s => s.matches);
  const selectedMatchdayId = useAppStore(s => s.selectedMatchdayId);
  const [isLoading, setIsLoading] = useState(false);

  // Start live refresh polling (30s intervals)
  const { refresh: refreshLive } = useLiveRefresh({ interval: 30000 });

  // Filter matches based on selectedMatchdayId
  const filteredMatches = React.useMemo(() => {
    return matches.filter((match) => match.matchdayId === selectedMatchdayId);
  }, [matches, selectedMatchdayId]);

  // Group filtered matches by Group (A-H) or Knockout Stage
  const groupedMatches = React.useMemo(() => {
    const groups: Record<string, typeof filteredMatches> = {};
    
    filteredMatches.forEach((match) => {
      let groupName = match.matchdayName; // Default for knockouts
      
      // If group stage, group by Team Group (A-H)
      if (['md-1', 'md-2', 'md-3'].includes(selectedMatchdayId)) {
        groupName = `Group ${match.homeTeam.group}`;
      }

      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(match);
    });

    // Sort alphabetically so Group A is before Group B
    const sortedGroups: Record<string, typeof filteredMatches> = {};
    Object.keys(groups)
      .sort()
      .forEach((key) => {
        sortedGroups[key] = groups[key];
      });

    return sortedGroups;
  }, [filteredMatches, selectedMatchdayId]);

  const handleRefresh = async () => {
    setIsLoading(true);
    await refreshLive();
    // Short delay so the UI shows loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const handleMatchClick = (matchId: string) => {
    router.push(`/matches/${matchId}`);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Matchday Scroller */}
      <DateScroller />

      {/* Main content list */}
      <div className="flex-1 overflow-y-auto">
        <PullToRefresh onRefresh={handleRefresh}>
          {isLoading ? (
            <div className="py-2.5">
              <LeagueGroupSkeleton />
              <LeagueGroupSkeleton />
            </div>
          ) : Object.keys(groupedMatches).length > 0 ? (
            <div className="py-2">
                {Object.entries(groupedMatches).map(([groupName, groupMatches]) => (
                  <LeagueGroup
                    key={groupName}
                    leagueId={groupName}
                    leagueName={groupName}
                    leagueLogo="🏆"
                    matches={groupMatches}
                    onMatchClick={handleMatchClick}
                    defaultExpanded={groupMatches.some(m => m.status === 'LIVE' || m.status === 'HALFTIME')}
                  />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center select-none">
              <span className="text-4xl mb-4">🗓️</span>
              <h3 className="text-base font-bold text-white mb-1">
                No matches scheduled
              </h3>
              <p className="text-xs text-text-secondary max-w-xs">
                There are no scheduled games for this tournament stage. Keep checking back!
              </p>
            </div>
          )}
        </PullToRefresh>
      </div>
    </div>
  );
}
