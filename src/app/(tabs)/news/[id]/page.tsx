'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Share2, Calendar, Clock, Bookmark, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { TeamLogo } from '@/components/matches/MatchCard';
import { cn, formatDateHeading, formatRelativeTime } from '@/lib/utils';

export default function NewsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const { news, matches } = useAppStore();
  const article = news.find(art => art.id === articleId);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 select-none">
        <span className="text-4xl mb-4">⚠️</span>
        <h3 className="text-lg font-bold text-white mb-2">Article Not Found</h3>
        <p className="text-xs text-text-secondary mb-6 max-w-xs">
          The article you are trying to view does not exist or may have been archived.
        </p>
        <button 
          onClick={() => router.push('/news')}
          className="px-5 py-2.5 bg-primary text-black font-bold text-xs rounded-xl shadow-lg hover:bg-primary-dark transition-all active:scale-95"
        >
          Back to News Feed
        </button>
      </div>
    );
  }

  // Get related articles details
  const relatedArticlesDetails = news.filter(
    (art) => article.relatedArticles.includes(art.id)
  );

  // Look for any related matches dynamically (matching teams or related IDs)
  const relatedMatch = matches.find(
    (m) => article.title.toLowerCase().includes(m.homeTeam.name.toLowerCase()) ||
           article.title.toLowerCase().includes(m.awayTeam.name.toLowerCase()) ||
           article.relatedArticles.includes(m.id)
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-background pb-16 select-none">
      
      {/* Detail header bar */}
      <div className="sticky top-0 z-30 w-full h-14 bg-background/90 backdrop-blur-md border-b border-surface-light px-4 flex items-center justify-between">
        <button 
          onClick={() => router.push('/news')}
          className="p-2 -ml-2 rounded-full hover:bg-surface text-text-secondary hover:text-white transition-colors"
          aria-label="Back to news"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-xs font-bold text-white uppercase tracking-wider truncate max-w-[180px]">
          {article.category} Detail
        </span>

        <div className="flex items-center gap-1">
          <button 
            className="p-2 rounded-full hover:bg-surface text-text-secondary hover:text-white transition-colors"
            aria-label="Bookmark article"
          >
            <Bookmark size={18} />
          </button>
          <button 
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-surface text-text-secondary hover:text-white transition-colors"
            aria-label="Share article"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Hero Header Image */}
      <div className="w-full aspect-video relative overflow-hidden bg-surface rounded-b-2xl border-b border-surface-light">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary/95 text-black font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
          {article.category}
        </div>
      </div>

      {/* Main content body panel */}
      <div className="px-4 py-5 select-text">
        <h1 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight mb-4">
          {article.title}
        </h1>

        {/* Article Author/Time Metadata */}
        <div className="flex items-center flex-wrap gap-4 pb-4 border-b border-surface-light/40 text-xs text-text-secondary mb-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-surface-light flex items-center justify-center font-bold text-[10px] text-primary border border-surface-light/80">
              {article.source.logo}
            </span>
            <span className="font-semibold text-white">{article.source.name}</span>
            {article.author && <span className="text-text-muted">by {article.author}</span>}
          </div>
          <span className="text-text-muted">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-text-muted" />
            <span>{formatDateHeading(article.publishedAt)}</span>
          </div>
          <span className="text-text-muted">•</span>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-text-muted" />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        {/* Render HTML content block */}
        <div 
          className="prose prose-invert text-sm text-text-secondary leading-relaxed space-y-4 max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Embedded player profile box */}
        <div className="my-6 p-4 rounded-xl bg-surface border border-surface-light/50 flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xl">
              🏃‍♂️
            </div>
            <div>
              <span className="text-[9px] text-primary font-bold uppercase tracking-wider">Spotlight Player</span>
              <h4 className="text-sm font-bold text-white mt-0.5">Robert Lewandowski</h4>
              <p className="text-[10px] text-text-secondary mt-0.5">FC Barcelona • FW • Rating 8.2</p>
            </div>
          </div>
          <button 
            onClick={() => router.push('/matches')}
            className="p-2 bg-surface-light rounded-lg hover:bg-surface border border-surface-light/40 transition-all text-primary hover:text-white"
          >
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Embedded Match Card Widget */}
        {relatedMatch && (
          <div className="my-6 select-none">
            <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2.5">
              Related Match Coverage
            </h4>
            <div 
              onClick={() => router.push(`/matches/${relatedMatch.id}`)}
              className="p-3 bg-surface border border-surface-light/50 rounded-xl hover:bg-surface-light/40 transition-colors cursor-pointer flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <TeamLogo name={relatedMatch.homeTeam.name} color={relatedMatch.homeTeam.color} secondaryColor={relatedMatch.homeTeam.secondaryColor} size={22} />
                <span className="text-xs font-bold text-white truncate max-w-[70px]">{relatedMatch.homeTeam.name}</span>
                <span className="text-[10px] text-text-muted">vs</span>
                <span className="text-xs font-bold text-white truncate max-w-[70px]">{relatedMatch.awayTeam.name}</span>
                <TeamLogo name={relatedMatch.awayTeam.name} color={relatedMatch.awayTeam.color} secondaryColor={relatedMatch.awayTeam.secondaryColor} size={22} />
              </div>
              <div className="text-xs font-black text-primary ml-3 bg-background/50 border border-surface-light px-2 py-1 rounded tabular-nums">
                {relatedMatch.status === 'LIVE' ? (
                  <span className="text-accent-red font-bold animate-pulse">{relatedMatch.score.home}-{relatedMatch.score.away} (Live)</span>
                ) : relatedMatch.status === 'FT' ? (
                  <span>{relatedMatch.score.home}-{relatedMatch.score.away}</span>
                ) : (
                  <span>Scheduled</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Related articles section */}
        {relatedArticlesDetails.length > 0 && (
          <div className="mt-8 border-t border-surface-light/40 pt-6 select-none">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
              More on this story
            </h4>
            <div className="space-y-3">
              {relatedArticlesDetails.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => router.push(`/news/${art.id}`)}
                  className="flex items-center gap-3 p-2 hover:bg-surface/30 cursor-pointer rounded-lg border border-transparent hover:border-surface-light/40 transition-all"
                >
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-12 h-12 object-cover rounded-md border border-surface-light/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-white leading-snug line-clamp-2 hover:text-primary">
                      {art.title}
                    </h5>
                    <span className="text-[9px] text-text-muted mt-1 block">
                      {art.source.name} • {formatRelativeTime(art.publishedAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
