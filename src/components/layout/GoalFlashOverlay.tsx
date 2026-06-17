'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '@/store/uiStore';

export default function GoalFlashOverlay() {
  const { goalFlashEvent, clearGoalFlash, notificationsEnabled } = useUiStore();

  // Generate a short goal notification sound using Web Audio API
  const playGoalSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Two-tone "ding-ding" goal sound
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(1320, audioCtx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.4);
    } catch {
      // Audio not available - silently fail
    }
  }, []);

  useEffect(() => {
    if (goalFlashEvent) {
      if (notificationsEnabled) {
        playGoalSound();
      }
      
      const timer = setTimeout(() => {
        clearGoalFlash();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [goalFlashEvent, clearGoalFlash, notificationsEnabled, playGoalSound]);

  return (
    <AnimatePresence>
      {goalFlashEvent && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-sm pointer-events-none flex flex-col items-center justify-center"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="goal-flash-overlay" aria-hidden="true" />
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-black/90 border border-primary/50 text-white rounded-2xl px-8 py-6 shadow-2xl flex flex-col items-center justify-center gap-3 max-w-sm pointer-events-auto"
          >
            <span className="text-5xl animate-bounce" aria-hidden="true">⚽</span>
            <h1 className="text-2xl font-black text-primary uppercase tracking-wider">
              GOAL!!!
            </h1>
            <p className="text-base font-bold text-center">
              {goalFlashEvent.teamName} has scored!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}