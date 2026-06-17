'use client';

import { create } from 'zustand';
import { Match } from '@/types';
import { MOCK_MATCHES } from '@/data/matches';

interface UserState {
  followedTeams: string[];
  favoriteMatchIds: string[];

  toggleFollowTeam: (teamId: string) => void;
  toggleFavoriteMatch: (matchId: string) => void;
}

const STORAGE_KEY = 'ballops-user';

const loadPersisted = (): Partial<UserState> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
};

const persist = (state: UserState) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      followedTeams: state.followedTeams,
      favoriteMatchIds: state.favoriteMatchIds,
    }));
  } catch {}
};

const persisted = loadPersisted();

export const useUserStore = create<UserState>((set, get) => ({
  followedTeams: persisted.followedTeams ?? ['t-usa', 't-arg'],
  favoriteMatchIds: persisted.favoriteMatchIds ?? [],

  toggleFollowTeam: (teamId) => set((state) => {
    const isFollowed = state.followedTeams.includes(teamId);
    const updatedFollowed = isFollowed
      ? state.followedTeams.filter(id => id !== teamId)
      : [...state.followedTeams, teamId];
    const next = { ...state, followedTeams: updatedFollowed };
    persist(next);
    return { followedTeams: updatedFollowed };
  }),

  toggleFavoriteMatch: (matchId) => set((state) => {
    const isFavorite = state.favoriteMatchIds.includes(matchId);
    const updatedFavorites = isFavorite
      ? state.favoriteMatchIds.filter(id => id !== matchId)
      : [...state.favoriteMatchIds, matchId];
    const next = { ...state, favoriteMatchIds: updatedFavorites };
    persist(next);
    return { favoriteMatchIds: updatedFavorites };
  }),
}));
