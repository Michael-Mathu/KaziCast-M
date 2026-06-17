'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { useUiStore } from '@/store/uiStore';
import { useUserStore } from '@/store/userStore';
import { useLiveScores } from '@/hooks/useLiveScores';
import Header from './Header';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import GoalFlashOverlay from './GoalFlashOverlay';

import SocialFooter from './SocialFooter';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Start the live simulation engine
  useLiveScores();

  const { activeTab, setActiveTab, goalFlashEvent, isLiveSimulationActive, toggleLiveSimulation, notificationsEnabled, toggleNotifications } = useUiStore();
  const matches = useAppStore(s => s.matches);
  const favoriteMatchIds = useUserStore(s => s.favoriteMatchIds);

  // 1. Sync url pathname to global active tab state
  useEffect(() => {
    const segments = pathname.split('/');
    const currentTab = segments[1];
    
    if (['matches', 'teams', 'news', 'standings', 'search'].includes(currentTab)) {
      setActiveTab(currentTab as 'matches' | 'teams' | 'news' | 'standings' | 'search');
    } else if (pathname === '/') {
      setActiveTab('matches');
    }
  }, [pathname, setActiveTab]);

  // 2. Navigate to tab — state syncs via the URL effect above
  const handleTabChange = (tabId: 'matches' | 'teams' | 'news' | 'standings' | 'search') => {
    router.push(`/${tabId}`);
  };

  // Filter matches for side widgets
  const liveMatches = matches.filter(m => m.status === 'LIVE');
  const favoriteMatches = matches.filter(m => favoriteMatchIds.includes(m.id));

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans antialiased selection:bg-primary selection:text-black">
      
      {/* Goal Flash Alert Overlay */}
      <GoalFlashOverlay />

      {/* Main Layout Container */}
      <div className="w-full flex-1 max-w-[1200px] mx-auto flex">
        
        {/* Left Sidebar Navigation (Tablet/Desktop only) */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isLiveSimulationActive={isLiveSimulationActive}
          notificationsEnabled={notificationsEnabled}
          onToggleLiveSimulation={toggleLiveSimulation}
          onToggleNotifications={toggleNotifications}
        />

        {/* Center Main Viewport */}
        <main className="flex-1 flex flex-col min-w-0 bg-background pb-14 sm:pb-0 sm:border-r sm:border-surface-light/60">
          
          {/* Top Header (Visible on Mobile only) */}
          <div className="block sm:hidden">
            <Header />
          </div>

          <div className="flex-1 relative overflow-y-auto flex flex-col justify-between">
            <div className="flex-grow">
              {children}
            </div>
            {/* Mobile Social Footer */}
            <div className="block sm:hidden border-t border-surface-light/25 bg-surface/20 py-2">
              <SocialFooter />
            </div>
          </div>
        </main>

        {/* Right Sidebar Widgets Panel (Desktop only >= 1024px) */}
        <RightPanel
          liveMatches={liveMatches}
          favoriteMatches={favoriteMatches}
        />

      </div>

      {/* Fixed Bottom Navigation (Mobile only) */}
      <div className="block sm:hidden">
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}