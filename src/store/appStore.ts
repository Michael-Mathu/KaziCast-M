import { create } from 'zustand';
import { Match, NewsArticle } from '@/types';
import { MOCK_MATCHES } from '@/data/matches';
import { MOCK_NEWS } from '@/data/news';

type MatchdayId = 'md-1' | 'md-2' | 'md-3' | 'md-16' | 'md-qf' | 'md-sf' | 'md-f';

interface AppState {
  selectedMatchdayId: MatchdayId;
  matches: Match[];
  news: NewsArticle[];

  setSelectedMatchdayId: (matchdayId: MatchdayId) => void;
  setMatches: (matches: Match[]) => void;
  updateLiveMatch: (matchId: string, updates: Partial<Match>) => void;
  toggleFavoriteMatch: (matchId: string) => void;
}

/** Builds a Map<teamPair, matchId> for fast live-update lookups */
export function buildMatchLookup(matches: Match[]): Map<string, string> {
  const lookup = new Map<string, string>();
  for (const m of matches) {
    const key = `${m.homeTeam.shortName}_${m.awayTeam.shortName}`;
    lookup.set(key, m.id);
  }
  return lookup;
}

export const useAppStore = create<AppState>((set) => ({
  selectedMatchdayId: 'md-1',
  matches: MOCK_MATCHES,
  news: MOCK_NEWS,

  setSelectedMatchdayId: (matchdayId) => set({ selectedMatchdayId: matchdayId }),
  setMatches: (matches) => set({ matches }),
  updateLiveMatch: (matchId, updates) => set((state) => {
    const updatedMatches = state.matches.map((m) => {
      if (m.id === matchId) {
        return { ...m, ...updates };
      }
      return m;
    });
    return { matches: updatedMatches };
  }),
  toggleFavoriteMatch: (matchId) => set((state) => {
    const updatedMatches = state.matches.map((m) => {
      if (m.id === matchId) {
        return { ...m, isFavorite: !m.isFavorite };
      }
      return m;
    });
    return { matches: updatedMatches };
  }),
}));
