import React from 'react';

const TALENT_FEATURES = [
  "A verified professional profile that works while you sleep",
  "Know what productions in your market are actually paying",
  "Submit self-tapes without the email chaos",
  "Build a work history no one can dispute",
  "Never get stiffed on a payment again"
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
    <section id="dual" className="grid grid-cols-1 lg:grid-cols-2 bg-surface">
      {/* Talent Side */}
      <div className="p-12 md:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
        <span className="badge badge-accent mb-8 self-start">
          For Talent
        </span>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-text-main">
          Your career,<br />finally on solid ground.
        </h2>
        <ul className="space-y-4 max-w-md">
          {TALENT_FEATURES.map((feature, i) => (
            <li key={i} className="flex gap-3 text-text-muted text-base items-start">
              <span className="flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Directors Side */}
      <div className="p-12 md:p-24 flex flex-col justify-center bg-surface-variant">
        <span className="badge badge-accent mb-8 self-start">
          For Directors
        </span>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-text-main">
          Find the right person.<br />Every time.
        </h2>
        <ul className="space-y-4 max-w-md">
          {DIRECTOR_FEATURES.map((feature, i) => (
            <li key={i} className="flex gap-3 text-text-muted text-base items-start">
              <span className="flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
