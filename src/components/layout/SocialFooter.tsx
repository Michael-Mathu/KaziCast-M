import React from 'react';

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const ThreadsIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M14.15 11.23c-1.42 0-2.31 1-2.31 2.53s.89 2.52 2.31 2.52 2.31-1 2.31-2.52-.89-2.53-2.31-2.53zm-6.19 2.53c0-2.91 2.22-5.11 5.38-5.11 3.2 0 5.41 2.14 5.41 5.25v.7h-8.25c.16 1.56 1.41 2.54 2.87 2.54 1.25 0 2.13-.58 2.59-1.57h2.24c-.65 2-2.51 3.42-4.83 3.42-2.91 0-5.15-2.18-5.15-5.23zm10.74-5.32h2.28v10.64h-2.28v-1.39c-.92 1.1-2.34 1.56-3.88 1.56-3.32 0-5.88-2.51-5.88-5.74s2.56-5.74 5.88-5.74c1.54 0 2.96.46 3.88 1.56V5.91z"/>
  </svg>
);

export default function SocialFooter() {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-4 py-3 sm:py-2 mt-auto">
      <a 
        href="https://www.instagram.com/theballopshq/" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        className="text-text-muted hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-full p-3 sm:p-1.5"
      >
        <InstagramIcon className="w-6 h-6 sm:w-5 sm:h-5" />
      </a>
      <a 
        href="https://www.tiktok.com/@theballopshq" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Follow us on TikTok"
        className="text-text-muted hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-full p-3 sm:p-1.5"
      >
        <TikTokIcon className="w-6 h-6 sm:w-5 sm:h-5" />
      </a>
      <a 
        href="https://www.threads.com/@theballopshq" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Follow us on Threads"
        className="text-text-muted hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-full p-3 sm:p-1.5"
      >
        <ThreadsIcon className="w-6 h-6 sm:w-5 sm:h-5" />
      </a>
    </div>
  );
}
