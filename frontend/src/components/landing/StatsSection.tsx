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
    <section className="px-6 md:px-12 py-24 bg-near-black/60 border-y border-white/8">
      <div className="max-w-7xl mx-auto">
        <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-muted mb-16 text-center">
          "The market we're building for"
        </span>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="font-serif text-5xl md:text-6xl text-warm-white tracking-tighter mb-4">
                {stat.val}
              </span>
              <p className="text-muted text-[13px] leading-snug max-w-[180px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
