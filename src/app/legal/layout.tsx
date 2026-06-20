import Link from 'next/link';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-text-main tracking-tight hover:text-accent transition-colors">
            KaziCast
          </Link>
          <Link href="/" className="btn-outline inline-flex items-center gap-2 text-xs !py-1.5 !px-3 font-semibold text-text-muted hover:text-text-main transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <article className="prose prose-neutral dark:prose-invert max-w-none
          [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:text-text-main [&_h1]:mb-2
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-text-main [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-border
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-text-main [&_h3]:mt-6 [&_h3]:mb-3
          [&_p]:text-text-muted [&_p]:leading-relaxed [&_p]:mb-4
          [&_ul]:text-text-muted [&_ul]:space-y-2 [&_ul]:mb-4 [&_ul]:pl-6 [&_ul]:list-disc
          [&_ol]:text-text-muted [&_ol]:space-y-2 [&_ol]:mb-4 [&_ol]:pl-6 [&_ol]:list-decimal
          [&_li]:leading-relaxed
          [&_a]:text-accent [&_a]:underline [&_a]:hover:text-accent-hover
          [&_strong]:text-text-main [&_strong]:font-semibold
          [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4
          [&_th]:text-left [&_th]:p-3 [&_th]:bg-surface-variant [&_th]:border [&_th]:border-border [&_th]:text-text-main [&_th]:font-semibold [&_th]:text-sm
          [&_td]:p-3 [&_td]:border [&_td]:border-border [&_td]:text-text-muted [&_td]:text-sm
        ">
          {children}
        </article>
      </main>

      {/* Nav between legal pages */}
      <nav className="max-w-4xl mx-auto px-6 pb-16">
        <div className="border-t border-border pt-8">
          <p className="text-sm font-semibold text-text-main mb-4">Other Legal Documents</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/legal/privacy', label: 'Privacy Policy' },
              { href: '/legal/terms', label: 'Terms of Service' },
              { href: '/legal/cookies', label: 'Cookie Policy' },
              { href: '/legal/community', label: 'Community Guidelines' },
              { href: '/legal/data-rights', label: 'Data Subject Rights' },
              { href: '/legal/talent-release', label: 'Talent Release Agreement' },
              { href: '/legal/minors', label: "Minor's Policy" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm px-3 py-1.5 rounded-lg border border-border text-text-muted hover:text-accent hover:border-accent transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
