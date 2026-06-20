import React from 'react';

const STATS = [
  {
    val: "4,200+",
    label: "Film & TV productions across East Africa annually"
  },
  {
    val: "12",
    label: "Countries in the East African creative market"
  },
  {
    val: "47M+",
    label: "People under 35 in Kenya, Uganda & Tanzania alone"
  },
  {
    val: "$1.4B",
    label: "Projected East African creative economy by 2030"
  }
];

export default function StatsSection() {
  return (
    <section className="px-6 md:px-12 py-24 bg-surface-variant border-b border-border">
      <div className="max-w-6xl mx-auto">
        <span className="block text-xs uppercase font-bold tracking-widest text-text-muted mb-12 text-center">
          The market we&apos;re building for
        </span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div key={i} className="card p-8 flex flex-col items-center text-center">
              <span className="text-4xl md:text-5xl font-bold text-accent mb-3">
                {stat.val}
              </span>
              <p className="text-text-main text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
