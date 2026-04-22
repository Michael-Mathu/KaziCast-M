import React from 'react';

const STEPS = [
  {
    num: "01",
    title: "Build your verified profile",
    desc: "Your credits, your skills, your dialects, your showreel — all in one place. Independently verified. Professionally presented."
  },
  {
    num: "02",
    title: "Connect with the right people",
    desc: "Directors find you through search. You find castings that match your profile. No middlemen. No WhatsApp threads."
  },
  {
    num: "03",
    title: "Work, get paid, grow",
    desc: "Payments are protected. Credits are recorded. Every job builds a reputation that follows you to the next one."
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 md:mb-32">
          <h2 className="font-serif font-light text-5xl md:text-7xl leading-tight tracking-tight max-w-xl">
            Getting started<br />is straightforward.
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xs md:text-right mb-4 opacity-70">
            Whether you're joining as talent or a director, you're up and running in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {STEPS.map((step, i) => (
            <div key={i} className="group relative p-10 md:p-16 border-t md:border-t-0 md:border-l border-white/8 first:border-l-0">
              <span className="absolute top-8 left-10 md:left-16 text-[8rem] font-serif font-light text-white/5 pointer-events-none select-none -translate-y-10 group-hover:text-accent/10 transition-colors duration-700">
                {step.num}
              </span>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl md:text-3xl text-warm-white mb-6 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
