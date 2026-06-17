'use client';

import React, { useState, useRef, useEffect } from 'react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [pullOffset, setPullOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isPulling = useRef(false);

  const footballEmojis = ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥎'];

  const getFootball = () => {
    if (pullOffset < 20) return '⚽';
    if (pullOffset < 50) return footballEmojis[Math.floor((pullOffset / 10) % footballEmojis.length)];
    return ['⚽', '🏀', '🏈'][Math.min(2, Math.floor((pullOffset - 20) / 25))];
  };

  const PULL_THRESHOLD = 70;
  const MAX_PULL = 100;

  const handleTouchStart = (e: TouchEvent) => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling.current || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0) {
      if (e.cancelable) e.preventDefault();
      const offset = Math.min(MAX_PULL, diff * 0.4);
      setPullOffset(offset);
    } else {
      isPulling.current = false;
      setPullOffset(0);
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling.current) return;
    isPulling.current = false;

    if (pullOffset >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullOffset(PULL_THRESHOLD);
      try {
        await onRefresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsRefreshing(false);
        setPullOffset(0);
      }
    } else {
      setPullOffset(0);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-full">
      <div 
        className="absolute left-0 right-0 flex items-center justify-center overflow-hidden transition-all duration-150 z-20 pointer-events-none"
        style={{ 
          height: `${pullOffset}px`,
          top: 0,
          opacity: pullOffset > 10 ? 1 : 0
        }}
      >
        <div className="bg-surface border border-surface-light px-3 py-1.5 rounded-full shadow-lg flex items-center justify-center gap-2">
          <span 
            className={`text-base ${isRefreshing ? 'football-bounce' : ''} ${!isRefreshing && pullOffset > 40 ? 'pull-football' : ''}`}
            style={{ 
              fontSize: pullOffset > 30 ? `${14 + (pullOffset - 30) * 0.08}px` : '14px'
            }}
          >
            {isRefreshing ? '⚽' : getFootball()}
          </span>
          {isRefreshing && (
            <span className="text-[9px] text-primary uppercase tracking-[0.15em]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Loading...
            </span>
          )}
        </div>
      </div>

      <div 
        className="transition-transform duration-150"
        style={{ 
          transform: pullOffset > 0 ? `translateY(${pullOffset}px)` : 'none' 
        }}
      >
        {children}
      </div>
    </div>
  );
}