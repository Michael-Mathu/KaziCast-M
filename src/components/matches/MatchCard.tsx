'use client';

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Star, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Match } from '@/types';
import { useUserStore } from '@/store/userStore';
import { cn, formatTimeOnly, getTeamFlagUrl } from '@/lib/utils';

export const TeamLogo = memo(function TeamLogo({ name, color, secondaryColor, flag, size = 32 }: { name: string; color: string; secondaryColor: string; flag?: string; size?: number }) {
  const flagUrl = getTeamFlagUrl(flag || name);
  return (
    <div 
      className="rounded-full flex items-center justify-center select-none shadow-md border overflow-hidden shrink-0 bg-surface-light"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderColor: secondaryColor === '#FFFFFF' ? 'rgba(255,255,255,0.15)' : (secondaryColor || 'transparent'),
      }}
    >
      {flagUrl ? (
        <img 
          src={flagUrl} 
          alt={`${name} flag`} 
          className="w-full h-full object-cover scale-[1.05]"
          loading="lazy"
        />
      ) : (
        <span style={{ fontSize: size > 40 ? '20px' : '14px' }} className="leading-none flex items-center justify-center">
          🏳️
        </span>
      )}
    </div>
  );
});

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export default memo(function MatchCard({ match, onClick }: MatchCardProps) {
  const { toggleFavoriteMatch, favoriteMatchIds } = useUserStore();
  const isFavorite = favoriteMatchIds.includes(match.id);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [announcement, setAnnouncement] = useState('');
  const [confettiParticles, setConfettiParticles] = useState<Array<{id: number; x: number; y: number; color: string; spin: number; fallDist: number}>>([]);
  const prevScore = useRef(match.score);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isScoreboardFlipping, setIsScoreboardFlipping] = useState(false);
  const [hasTrendingGlow, setHasTrendingGlow] = useState(false);
  const [iconBounce, setIconBounce] = useState(false);

  // Track window width for SSR-safe positioning
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Announce score updates for accessibility
  useEffect(() => {
    if (
      match.status === 'LIVE' &&
      (match.score.home !== prevScore.current.home ||
       match.score.away !== prevScore.current.away)
    ) {
      setAnnouncement(`${match.homeTeam.name} ${match.score.home} - ${match.score.away} ${match.awayTeam.name}`);
      const timer = setTimeout(() => setAnnouncement(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [match.score, match.status, match.homeTeam.name, match.awayTeam.name]);

  // Detect score updates to trigger scoreboard flip + confetti
  useEffect(() => {
    if (
      match.score.home !== prevScore.current.home ||
      match.score.away !== prevScore.current.away
    ) {
      // Scoreboard flip
      setIsScoreboardFlipping(true);
      const flipTimer = setTimeout(() => setIsScoreboardFlipping(false), 600);

      // Confetti burst on LIVE match goals
      if (match.status === 'LIVE') {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const colors = ['#D97436', '#FF3B30', '#FFCC00', '#0A84FF', '#34C759', '#FFFFFF', '#AF52DE'];
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
          id: Date.now() + i,
          x: centerX + (Math.random() - 0.5) * 120,
          y: centerY + (Math.random() - 0.5) * 40,
          color: colors[Math.floor(Math.random() * colors.length)],
          spin: Math.random() * 360,
          fallDist: 40 + Math.random() * 60,
        }));
        setConfettiParticles(newParticles);
        const clearTimer = setTimeout(() => setConfettiParticles([]), 900);
        return () => clearTimeout(clearTimer);
      }

      prevScore.current = match.score;
      return () => clearTimeout(flipTimer);
    }
  }, [match.score, match.status]);

  // Show trending glow for favorite matches
  useEffect(() => {
    setHasTrendingGlow(isFavorite);
    if (isFavorite) {
      setIconBounce(true);
      const timer = setTimeout(() => setIconBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isFavorite]);

  // Long press handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    
    longPressTimer.current = setTimeout(() => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50); // Haptic feedback
      }
      setMenuPosition({ x, y: y - 80 });
      setShowContextMenu(true);
    }, 600);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    longPressTimer.current = setTimeout(() => {
      setMenuPosition({ x, y: y - 80 });
      setShowContextMenu(true);
    }, 600);
  };

  const handleRelease = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteMatch(match.id);
  };

  return (
    <div className="relative">
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onClick={() => {
          if (!showContextMenu) {
            onClick();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!showContextMenu) onClick();
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleRelease}
        onMouseDown={handleMouseDown}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        className={cn(
          "tap-highlight flex items-center justify-between p-4 h-[80px] bg-surface hover:bg-surface-light/90 border-b border-surface-light/40 cursor-pointer select-none transition-all duration-200 hover:shadow-lg hover:shadow-black/10 active:scale-[0.99]",
          hasTrendingGlow && "trending-glow"
        )}
      >
        {/* Left Side: Home Team */}
        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end pr-3">
          <span className="text-sm font-bold tracking-wide text-white/90 truncate max-w-[100px] sm:max-w-none text-right transition-colors group-hover:text-primary">
            {match.homeTeam.name}
          </span>
          <TeamLogo 
            name={match.homeTeam.name} 
            color={match.homeTeam.color} 
            secondaryColor={match.homeTeam.secondaryColor} 
            flag={match.homeTeam.flag}
          />
        </div>

        {/* Center: Score / Time Area */}
        <div className="flex flex-col items-center justify-center w-[96px] text-center shrink-0">
          {match.status === 'LIVE' && (
            <div className="flex flex-col items-center">
              <div className={cn(
                "text-lg text-white tabular-nums tracking-[0.15em] transition-all drop-shadow-sm",
                isScoreboardFlipping && "scoreboard-flip",
                !isScoreboardFlipping && isFavorite && "score-pulse"
              )}
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1 }}
              >
                {match.score.home} - {match.score.away}
              </div>
              <div className="flex items-center gap-1 mt-1 bg-accent-red/10 border border-accent-red/20 px-1.5 py-0.5 rounded-full">
                <span className="live-dot shrink-0" />
                <span className="text-[9px] text-accent-red uppercase tracking-[0.15em]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  LIVE {match.minute}'
                </span>
              </div>
            </div>
          )}

          {match.status === 'HALFTIME' && (
            <div className="flex flex-col items-center">
              <div className="text-lg text-white tabular-nums tracking-[0.15em] drop-shadow-sm"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1 }}>
                {match.score.home} - {match.score.away}
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-accent-yellow/15 border border-accent-yellow/25 text-[9px] text-accent-yellow uppercase tracking-[0.15em] mt-1"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                HT
              </span>
            </div>
          )}

          {match.status === 'FT' && (
            <div className="flex flex-col items-center">
              <div className="text-lg text-white/80 tabular-nums tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1 }}>
                {match.score.home} - {match.score.away}
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-surface-light border border-text-muted/20 text-[9px] text-text-secondary uppercase tracking-[0.15em] mt-1"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                FT
              </span>
            </div>
          )}

          {match.status === 'SCHEDULED' && (
            <div className="flex flex-col items-center bg-surface-light/35 px-2.5 py-1 rounded-lg border border-surface-light/20">
              <span className="text-xs text-primary tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                {formatTimeOnly(match.startTime)}
              </span>
              <span className="text-[8px] font-bold text-text-secondary mt-0.5 uppercase tracking-widest">
                {new Date(match.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
          )}

          {match.status === 'POSTPONED' && (
            <div className="flex flex-col items-center">
              <span className="text-sm text-text-muted"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                PP
              </span>
              <span className="text-[9px] text-text-muted mt-0.5 uppercase tracking-[0.1em]">
                Postponed
              </span>
            </div>
          )}

          {match.status === 'CANCELLED' && (
            <div className="flex flex-col items-center">
              <span className="text-sm text-text-muted line-through"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                CAN
              </span>
              <span className="text-[9px] text-text-muted mt-0.5 uppercase tracking-[0.1em]">
                Cancelled
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Away Team */}
        <div className="flex items-center gap-3 flex-1 min-w-0 justify-start pl-3">
          <TeamLogo 
            name={match.awayTeam.name} 
            color={match.awayTeam.color} 
            secondaryColor={match.awayTeam.secondaryColor} 
            flag={match.awayTeam.flag}
          />
          <span className="text-sm font-bold tracking-wide text-white/90 truncate max-w-[100px] sm:max-w-none transition-colors group-hover:text-primary">
            {match.awayTeam.name}
          </span>
        </div>

        {/* Trending indicator */}
        {hasTrendingGlow && (
          <div className="absolute top-2 left-2 flex items-center gap-1">
            <Flame size={12} className="text-primary" />
            <span className="text-[8px] text-primary uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Trending
            </span>
          </div>
        )}

        {/* Bookmark Favorite Star */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-1 text-text-muted hover:text-primary transition-all active:scale-125"
          aria-label="Mark match as favorite"
        >
          <Star 
            size={14} 
            className={cn(
              "transition-all", 
              iconBounce && "icon-bounce",
              isFavorite ? "fill-primary text-primary scale-110" : "fill-none text-text-muted"
            )} 
          />
        </button>
      </div>

      {confettiParticles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          aria-hidden="true"
          style={{
            left: p.x,
            top: p.y,
            backgroundColor: p.color,
            '--spin': `${p.spin}deg`,
            '--fall-distance': `${p.fallDist}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Custom Context Menu Overlay */}
      <AnimatePresence>
        {showContextMenu && (
          <>
            <div 
              className="fixed inset-0 z-50 bg-black/20"
              onClick={() => setShowContextMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                top: `${menuPosition.y}px`,
                left: `${Math.min(windowWidth - 170, Math.max(16, menuPosition.x - 75))}px`
              }}
              className="absolute z-50 w-40 bg-surface-light border border-text-muted/20 rounded-lg shadow-xl p-1 overflow-hidden"
            >
              <button
                onClick={(e) => {
                  handleFavoriteClick(e);
                  setShowContextMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-surface text-white rounded transition-colors flex items-center justify-between"
              >
                <span>{isFavorite ? 'Unfavorite' : 'Add Favorite'}</span>
                <Star size={12} className={isFavorite ? 'fill-primary text-primary' : 'text-text-secondary'} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowContextMenu(false);
                  if (navigator.share) {
                    navigator.share({
                      title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
                      text: `Check out ${match.homeTeam.name} vs ${match.awayTeam.name} live scores on FotMob!`,
                      url: window.location.href + `/matches/${match.id}`
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(`${window.location.origin}/matches/${match.id}`);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-surface text-white rounded transition-colors"
              >
                Share Match
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
});
