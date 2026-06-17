'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Calendar, Newspaper, Trophy, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import MatchCard from '@/components/matches/MatchCard';
import { formatRelativeTime, cn } from '@/lib/utils';
import { SearchResultSkeleton, SearchMatchCardSkeleton } from '@/components/shared/Skeletons';

export default function SearchPage() {
  const router = useRouter();
  const matches = useAppStore(s => s.matches);
  const news = useAppStore(s => s.news);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'USA',
    'Argentina',
    'Matchday 1',
    'Group Stage'
  ]);

  const handleClear = () => {
    setQuery('');
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
  };

  const handleAddRecent = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(t => t.toLowerCase() !== term.toLowerCase());
      return [term, ...filtered].slice(0, 5); // limit to 5
    });
  };

  // Simulate search loading
  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [query]);

  // Perform filtering searches
  const searchResults = React.useMemo(() => {
    if (!query.trim()) return { matches: [], news: [] };
    const lowercaseQuery = query.toLowerCase();

    // Match filtering
    const matchedMatches = matches.filter(
      (m) =>
        m.homeTeam.name.toLowerCase().includes(lowercaseQuery) ||
        m.awayTeam.name.toLowerCase().includes(lowercaseQuery) ||
        m.matchdayName.toLowerCase().includes(lowercaseQuery)
    );

    // News filtering
    const matchedNews = news.filter(
      (n) =>
        n.title.toLowerCase().includes(lowercaseQuery) ||
        n.summary.toLowerCase().includes(lowercaseQuery) ||
        n.category.toLowerCase().includes(lowercaseQuery)
    );

    return { matches: matchedMatches, news: matchedNews };
  }, [query, matches, news]);

  return (
    <div className="flex flex-col h-full bg-background select-none p-4 pb-12">
      <h1 className="text-lg font-black text-white uppercase tracking-wider mb-4">
        Search
      </h1>

{/* Input box */}
        <div className="relative w-full mb-5">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddRecent(query)}
            placeholder="Search teams, matches, players, articles..."
            className="w-full bg-surface border border-surface-light/60 rounded-xl py-3 pl-10 pr-10 text-xs font-semibold text-white placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
            aria-label="Search"
          />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-white rounded-full bg-surface-light"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Recent searches display */}
      {!query && (
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
            Recent Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => handleRecentClick(term)}
                className="px-3.5 py-2 rounded-xl bg-surface border border-surface-light/40 hover:border-text-muted text-xs font-semibold text-text-secondary hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                aria-label={`Search for ${term}`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

{/* Search results lists */}
      {query && (
        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Loading state */}
          {isSearching ? (
            <>
              <div>
                <h2 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar size={12} />
                  Searching...
                </h2>
                <div className="bg-surface rounded-xl border border-surface-light/30 overflow-hidden">
                  <SearchMatchCardSkeleton />
                  <SearchMatchCardSkeleton />
                </div>
              </div>
              <div>
                <h2 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Newspaper size={12} />
                  Articles
                </h2>
                <div className="space-y-2">
                  <SearchResultSkeleton />
                  <SearchResultSkeleton />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Matches results */}
              {searchResults.matches.length > 0 && (
                <div>
                  <h2 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar size={12} />
                    Matches ({searchResults.matches.length})
                  </h2>
                  <div className="bg-surface rounded-xl border border-surface-light/30 overflow-hidden divide-y divide-surface-light/50">
                    {searchResults.matches.map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        onClick={() => {
                          handleAddRecent(query);
                          router.push(`/matches/${match.id}`);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* News articles results */}
              {searchResults.news.length > 0 && (
                <div>
                  <h2 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Newspaper size={12} />
                    Articles ({searchResults.news.length})
                  </h2>
                  <div className="space-y-2">
                    {searchResults.news.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          handleAddRecent(query);
                          router.push(`/news/${art.id}`);
                        }}
                        className="p-3 bg-surface border border-surface-light/30 rounded-xl hover:bg-surface-light/40 transition-colors cursor-pointer flex items-center gap-3"
                      >
                        <img
                          src={art.image}
                          alt={`News article image: ${art.title}`}
                          loading="lazy"
                          className="w-12 h-12 object-cover rounded-md shrink-0 border border-surface-light/20"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] text-primary font-bold uppercase tracking-wider">
                            {art.category}
                          </span>
                          <h4 className="text-xs font-semibold text-white line-clamp-1 mt-0.5">
                            {art.title}
                          </h4>
                          <span className="text-[9px] text-text-muted block mt-0.5">
                            {art.source.name} • {formatRelativeTime(art.publishedAt)}
                          </span>
                        </div>
                        <ArrowRight size={14} className="text-text-muted" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty search results state */}
              {searchResults.matches.length === 0 && searchResults.news.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center select-none">
                  <span className="text-3xl mb-2">🔍</span>
                  <h4 className="text-sm font-bold text-white mb-1">
                    No results for "{query}"
                  </h4>
                  <p className="text-xs text-text-secondary max-w-xs">
                    Check spelling or try search terms like "Arsenal", "Bayern" or "Transfers".
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
