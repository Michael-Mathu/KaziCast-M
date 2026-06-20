import React from 'react';

const STEPS = [
  {
    num: "1",
    title: "Build your profile",
    desc: "Your credits, skills, and showreel in one place. Professionally presented.",
  },
  {
    num: "2",
    title: "Connect directly",
    desc: "Directors find you through search. You find castings that match your profile.",
  },
  {
    num: "3",
    title: "Work & grow",
    desc: "Every job builds a reputation that follows you to the next production.",
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="px-6 md:px-12 py-24 bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-text-main max-w-xl">
            Getting started is straightforward.
          </h2>
          <p className="text-text-muted text-base max-w-xs md:text-right mb-2">
            Whether you&apos;re joining as talent or a director, you&apos;re up and running in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="card p-8">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold text-sm mb-6">
                {step.num}
              </span>
              <h3 className="text-xl font-bold text-text-main mb-3">
                {step.title}
              </h3>
              <p className="text-text-muted text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
