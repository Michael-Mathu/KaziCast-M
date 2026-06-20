import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="flex items-center justify-center px-6 md:px-12 pt-32 pb-24 bg-surface text-center">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <span className="badge badge-accent mb-6 animate-fade-up">
          East Africa&apos;s Film Industry Platform
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-text-main leading-[1.15] mb-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
          Directors find talent on WhatsApp.<br />
          KaziCast is the <span className="text-accent">infrastructure</span><br />
          East Africa has been missing.
        </h1>

        <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: '160ms' }}>
          Built for actors, models, voice artists, and filmmakers across Kenya, Uganda, Tanzania, and beyond. One professional platform for the entire industry.
        </p>

        <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '240ms' }}>
          <Link href="/register" className="btn-primary w-full sm:w-auto">
            Join the Platform
          </Link>
          <Link href="/castings" className="btn-outline w-full sm:w-auto">
            Browse Castings
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-text-muted animate-fade-up" style={{ animationDelay: '320ms' }}>
          Free to join • Built in Nairobi • Actors protected
        </p>
      </div>
    </section>
  );
}
