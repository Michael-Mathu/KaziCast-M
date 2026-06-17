'use client';

import { create } from 'zustand';

interface UiState {
  activeTab: 'matches' | 'teams' | 'news' | 'standings' | 'search';
  searchQuery: string;
  goalFlashEvent: { teamName: string; matchId: string } | null;
  notificationsEnabled: boolean;
  isLiveSimulationActive: boolean;

  setActiveTab: (tab: 'matches' | 'teams' | 'news' | 'standings' | 'search') => void;
  setSearchQuery: (query: string) => void;
  triggerGoalFlash: (teamName: string, matchId: string) => void;
  clearGoalFlash: () => void;
  toggleNotifications: () => void;
  toggleLiveSimulation: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeTab: 'matches',
  searchQuery: '',
  goalFlashEvent: null,
  notificationsEnabled: true,
  isLiveSimulationActive: true,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  triggerGoalFlash: (teamName, matchId) => set({ goalFlashEvent: { teamName, matchId } }),
  clearGoalFlash: () => set({ goalFlashEvent: null }),
  toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  toggleLiveSimulation: () => set((state) => ({ isLiveSimulationActive: !state.isLiveSimulationActive })),
}));
