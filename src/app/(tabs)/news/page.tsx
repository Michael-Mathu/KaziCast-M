'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { useUserStore } from '@/store/userStore';
import { formatRelativeTime } from '@/lib/utils';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import PullToRefresh from '@/components/shared/PullToRefresh';
import { cn } from '@/lib/utils';

// Fallback image utility helper
const NewsImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative w-full h-full bg-surface-light/40 overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-surface-light animate-pulse" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setImgSrc("https://source.unsplash.com/800x600/?football,worldcup");
          }
        }}
        loading="lazy"
      />
    </div>
  );
};

const getCategoryColor = (category: string) => {
  const clean = category.toLowerCase().trim();
  if (clean === 'match reports') return '#00ff87'; // green
  if (clean === 'injuries') return '#ff4444'; // red
  if (clean === 'transfers') return '#4488ff'; // blue
  if (clean === 'features') return '#ff9900'; // orange
  return '#ffffff';
};

export default function NewsPage() {
  const router = useRouter();
  const news = useAppStore(s => s.news);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const categories = ['All', 'Transfers', 'Injuries', 'Match Reports', 'Features'];

  // Filter articles based on activeCategory
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return news;
    return news.filter((art) => art.category.toLowerCase().trim() === activeCategory.toLowerCase().trim());
  }, [news, activeCategory]);

  // Featured articles list
  const featuredArticles = useMemo(() => {
    const featured = filteredArticles.filter((art) => art.isFeatured);
    return featured.length > 0 ? featured : filteredArticles.slice(0, 3);
  }, [filteredArticles]);

  // Standard non-featured articles list
  const standardArticles = useMemo(() => {
    const featuredIds = featuredArticles.map(f => f.id);
    return filteredArticles.filter((art) => !featuredIds.includes(art.id));
  }, [filteredArticles, featuredArticles]);

  // Reset featured index on filter change
  useEffect(() => {
    setFeaturedIndex(0);
  }, [activeCategory]);

  // Cycle through featured articles every 8 seconds
  useEffect(() => {
    if (featuredArticles.length <= 1) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredArticles]);

  const activeFeaturedArticle = featuredArticles[featuredIndex] || null;

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
  };

  const handleArticleClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
  } as const;

  return (
    <div className="flex flex-col h-full bg-background text-white select-none">
      
      {/* Sticky Top Header with Brand Logo & Category Tabs */}
      <div className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur-md border-b border-surface-light/40 flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-black font-black text-xs">
            WC
          </div>
          <span className="text-sm font-black uppercase tracking-widest text-white">
            WC 2026 News
          </span>
        </div>

        {/* Scrollable Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full border transition-all duration-200 cursor-pointer select-none focus:outline-none",
                  isActive
                    ? "bg-primary border-primary text-black shadow-md shadow-primary/20"
                    : "bg-surface border-surface-light/40 text-text-secondary hover:text-white hover:border-text-secondary"
                )}
                aria-label={`Filter by ${cat}`}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Stream Viewport */}
      <div className="flex-1 overflow-y-auto">
        <PullToRefresh onRefresh={handleRefresh}>
          {isLoading ? (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#111] border border-surface-light/20 rounded-xl h-[260px] animate-pulse" />
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="pb-8">
              
              {/* Featured Hero Article Slider */}
              {activeFeaturedArticle && (
                <div className="p-4">
                  <div 
                    onClick={() => handleArticleClick(activeFeaturedArticle.id)}
                    className="w-full h-[320px] sm:h-[400px] rounded-2xl relative overflow-hidden border border-surface-light/30 shadow-2xl cursor-pointer group select-none transition-all duration-300 hover:border-primary/30"
                  >
                    <NewsImage 
                      src={activeFeaturedArticle.image} 
                      alt={activeFeaturedArticle.title}
                      className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    
                    {/* Visual Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 flex gap-1.5 items-center">
                      <span 
                        className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md text-black"
                        style={{ backgroundColor: getCategoryColor(activeFeaturedArticle.category) }}
                      >
                        {activeFeaturedArticle.category}
                      </span>
                      <span className="bg-black/40 text-white text-[8px] font-black uppercase px-2 py-1 rounded-md border border-white/10">
                        Featured
                      </span>
                    </div>

                    {/* Navigation dot markers */}
                    {featuredArticles.length > 1 && (
                      <div className="absolute top-4 right-4 flex gap-1">
                        {featuredArticles.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFeaturedIndex(idx);
                            }}
                            className={cn(
                              "w-1.5 h-1.5 rounded-full transition-all duration-300",
                              idx === featuredIndex ? "bg-primary w-3" : "bg-white/40"
                            )}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Text content details overlay */}
                    <div className="absolute bottom-6 left-6 right-6 max-w-2xl">
                      <h2 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight mb-2.5 group-hover:text-primary transition-colors duration-200">
                        {activeFeaturedArticle.title}
                      </h2>
                      <p className="text-xs text-text-secondary line-clamp-2 mb-4 leading-relaxed max-w-xl">
                        {activeFeaturedArticle.summary}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-text-secondary font-bold">
                        <span>{activeFeaturedArticle.source.logo}</span>
                        <span>{activeFeaturedArticle.source.name}</span>
                        <span className="text-text-muted">•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {formatRelativeTime(activeFeaturedArticle.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Standard Articles Responsive Cards Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-2"
              >
                {standardArticles.map((art) => (
                  <motion.div 
                    key={art.id}
                    variants={cardVariants}
                    onClick={() => handleArticleClick(art.id)}
                    className="flex flex-col bg-[#111] border border-surface-light/30 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-black/35 group"
                  >
                    {/* 16:9 Thumbnail Image */}
                    <div className="w-full aspect-video overflow-hidden border-b border-surface-light/20 relative">
                      <NewsImage 
                        src={art.image} 
                        alt={art.title}
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      
                      {/* Floating Category Badge */}
                      <span 
                        className="absolute bottom-2.5 left-2.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-black"
                        style={{ backgroundColor: getCategoryColor(art.category) }}
                      >
                        {art.category}
                      </span>
                    </div>

                    {/* Metadata & Headline text container */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
                          {art.title}
                        </h3>
                        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                          {art.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-text-secondary mt-4 pt-3 border-t border-surface-light/25 font-semibold">
                        <span>{art.source.logo}</span>
                        <span>{art.source.name}</span>
                        <span className="text-text-muted">•</span>
                        <span>{formatRelativeTime(art.publishedAt)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
              <span className="text-4xl mb-4">📰</span>
              <h3 className="text-base font-bold text-white mb-1">
                No news items found
              </h3>
              <p className="text-xs text-text-secondary max-w-xs">
                Check back later or adjust your category filter pill to see more updates.
              </p>
            </div>
          )}
        </PullToRefresh>
      </div>
    </div>
  );
}
