'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/appStore';
import { Match } from '@/types';

interface LiveRefreshOptions {
  /** Polling interval in milliseconds. Default 30000 (30s) */
  interval?: number;
  /** Whether to fetch on mount. Default true */
  fetchOnMount?: boolean;
}

/**
 * Hook that polls /api/live at a configurable interval and updates
 * the Zustand store with live match data.
 * 
 * Live data is deeply merged: scores, status, minute, events, and stats
 * are updated while preserving isFavorite, selectedMatchdayId, etc.
 */
export function useLiveRefresh(options: LiveRefreshOptions = {}) {
  const { interval = 30000, fetchOnMount = true } = options;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFetching = useRef(false);

  const setMatches = useAppStore(s => s.setMatches);
  const updateLiveMatch = useAppStore(s => s.updateLiveMatch);

  const fetchLiveData = useCallback(async () => {
    if (isFetching.current) return; // Prevent concurrent requests
    isFetching.current = true;

    try {
      const response = await fetch('/api/live');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const liveMatches: Match[] = data.matches;

      if (!liveMatches || liveMatches.length === 0) {
        return;
      }

      // Update each live match in the store
      for (const liveMatch of liveMatches) {
        updateLiveMatch(liveMatch.id, {
          status: liveMatch.status,
          score: liveMatch.score,
          minute: liveMatch.minute,
          events: liveMatch.events,
          stats: liveMatch.stats,
          // Also update team names and venues in case ESPN has better data
          venue: liveMatch.venue,
        });
      }

      // Also check if there are new matches (e.g. matches that weren't in static data)
      // that should be added to the store
      const currentMatches = useAppStore.getState().matches;
      const currentIds = new Set(currentMatches.map(m => m.id));
      
      const newMatches = liveMatches.filter(m => !currentIds.has(m.id));
      if (newMatches.length > 0) {
        setMatches([...currentMatches, ...newMatches]);
      }
    } catch (error) {
      console.warn('[useLiveRefresh] Failed to fetch live data:', error);
    } finally {
      isFetching.current = false;
    }
  }, [setMatches, updateLiveMatch]);

  // Initial fetch
  useEffect(() => {
    if (fetchOnMount) {
      fetchLiveData();
    }
  }, [fetchOnMount, fetchLiveData]);

  // Set up polling interval
  useEffect(() => {
    if (interval > 0) {
      intervalRef.current = setInterval(fetchLiveData, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [interval, fetchLiveData]);

  return { refresh: fetchLiveData };
}