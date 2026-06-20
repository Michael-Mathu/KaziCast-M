import Link from 'next/link';

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-text-main tracking-tight hover:text-accent transition-colors">
            KaziCast <span className="text-xs font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent ml-1.5 uppercase tracking-wider">Help Center</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-semibold text-text-muted hover:text-text-main transition-colors mr-2">
              Dashboard
            </Link>
            <Link href="/" className="btn-outline inline-flex items-center gap-2 text-xs !py-1.5 !px-3 font-semibold text-text-muted hover:text-text-main transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer support notice */}
      <div className="bg-surface-variant border-t border-border py-12 text-center px-6">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="text-lg font-bold text-text-main">Still need help?</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            Our support team is available from Monday to Friday, 9:00 AM to 5:00 PM EAT. We typically respond within 2-4 hours.
          </p>
          <div className="pt-2">
            <a href="mailto:support@kazicast.com" className="btn-primary text-sm">
              Email Support (support@kazicast.com)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
