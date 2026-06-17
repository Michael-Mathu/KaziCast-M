import React from 'react';

export function MatchCardSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 h-[76px] bg-surface border-b border-surface-light animate-pulse select-none">
      {/* Left team */}
      <div className="flex items-center gap-2.5 flex-1 justify-end pr-2">
        <div className="h-4 bg-surface-light rounded w-16" />
        <div className="w-8 h-8 rounded-full bg-surface-light" />
      </div>
      
      {/* Center score */}
      <div className="flex flex-col items-center justify-center w-[84px]">
        <div className="h-5 bg-surface-light rounded w-12" />
        <div className="h-3 bg-surface-light rounded w-8 mt-1.5" />
      </div>

      {/* Right team */}
      <div className="flex items-center gap-2.5 flex-1 justify-start pl-2">
        <div className="w-8 h-8 rounded-full bg-surface-light" />
        <div className="h-4 bg-surface-light rounded w-16" />
      </div>
    </div>
  );
}

export function LeagueGroupSkeleton() {
  return (
    <div className="mx-4 my-2.5 bg-surface border border-surface-light/40 rounded-xl overflow-hidden shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-surface/80">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-surface-light" />
          <div className="h-4 bg-surface-light rounded w-28" />
        </div>
        <div className="w-5 h-5 rounded-full bg-surface-light" />
      </div>
      
      {/* Cards list */}
      <div className="flex flex-col divide-y divide-surface-light border-t border-surface-light/40">
        <MatchCardSkeleton />
        <MatchCardSkeleton />
      </div>
    </div>
  );
}

export function StandardArticleSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-surface-light animate-pulse">
      <div className="w-20 h-20 bg-surface-light rounded-lg shrink-0" />
      <div className="flex-1 flex flex-col gap-2.5">
        <div className="h-4 bg-surface-light rounded w-11/12" />
        <div className="h-4 bg-surface-light rounded w-8/12" />
        <div className="h-3 bg-surface-light rounded w-4/12 mt-1" />
      </div>
    </div>
  );
}

export function FeaturedArticleSkeleton() {
  return (
    <div className="mx-4 my-2.5 h-[200px] rounded-xl bg-surface border border-surface-light animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 bg-surface-light" />
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
        <div className="h-3 bg-surface rounded w-24" />
        <div className="h-5 bg-surface rounded w-11/12" />
        <div className="h-5 bg-surface rounded w-8/12" />
      </div>
    </div>
  );
}

export function SearchResultSkeleton() {
  return (
    <div className="p-4 border-b border-surface-light animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-surface-light rounded-lg shrink-0" />
        <div className="flex-1 flex flex-col gap-2.5">
          <div className="h-3 bg-surface-light rounded w-11/12" />
          <div className="h-4 bg-surface-light rounded w-8/12" />
          <div className="h-3 bg-surface-light rounded w-4/12 mt-1" />
        </div>
      </div>
    </div>
  );
}

export function SearchMatchCardSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 h-[76px] bg-surface border-b border-surface-light animate-pulse">
      <div className="flex items-center gap-2.5 flex-1 justify-end pr-2">
        <div className="h-4 bg-surface-light rounded w-16" />
        <div className="w-8 h-8 rounded-full bg-surface-light" />
      </div>
      <div className="flex flex-col items-center justify-center w-[84px]">
        <div className="h-5 bg-surface-light rounded w-12" />
        <div className="h-3 bg-surface-light rounded w-8 mt-1.5" />
      </div>
      <div className="flex items-center gap-2.5 flex-1 justify-start pl-2">
        <div className="w-8 h-8 rounded-full bg-surface-light" />
        <div className="h-4 bg-surface-light rounded w-16" />
      </div>
    </div>
  );
}
