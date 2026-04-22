import React from 'react';

const TALENT_FEATURES = [
  "A verified professional profile that works while you sleep",
  "Know what productions in your market are actually paying",
  "Submit self-tapes without the email chaos",
  "Build a work history no one can dispute",
  "Never get stiffed on a payment again",
  "Be found by the right directors — not just the ones in your WhatsApp"
];

const DIRECTOR_FEATURES = [
  "Search verified talent by skill, dialect, location, and availability",
  "See real credits — not just what someone claims",
  "Run your entire audition pipeline in one place",
  "Structured contracts and payments built into the process",
  "Build a trusted roster you can return to production after production"
];

export default function DualSplit() {
  return (
    <section id="dual" className="grid grid-cols-1 lg:grid-cols-2 border-y border-white/8 min-h-screen">
      {/* Talent Side */}
      <div className="p-12 md:p-24 lg:border-r border-white/8 flex flex-col justify-center">
        <span className="inline-block border border-accent text-accent px-4 py-1 text-[10px] uppercase font-bold tracking-[0.2em] mb-12 self-start">
          For Talent
        </span>
        <h2 className="font-serif font-light text-5xl md:text-7xl leading-[1.0] tracking-tight mb-12 text-warm-white">
          Your career, finally<br />on solid ground.
        </h2>
        <ul className="space-y-6 max-w-lg">
          {TALENT_FEATURES.map((feature, i) => (
            <li key={i} className="flex gap-4 text-muted text-base md:text-lg leading-relaxed">
              <span className="text-accent">—</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Directors Side */}
      <div className="p-12 md:p-24 bg-near-black/40 flex flex-col justify-center">
        <span className="inline-block border border-white/20 text-muted px-4 py-1 text-[10px] uppercase font-bold tracking-[0.2em] mb-12 self-start">
          For Directors
        </span>
        <h2 className="font-serif font-light text-5xl md:text-7xl leading-[1.0] tracking-tight mb-12 text-warm-white">
          Find the right person.<br />Every time.
        </h2>
        <ul className="space-y-6 max-w-lg">
          {DIRECTOR_FEATURES.map((feature, i) => (
            <li key={i} className="flex gap-4 text-muted text-base md:text-lg leading-relaxed">
              <span className="text-warm-white/40">—</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
