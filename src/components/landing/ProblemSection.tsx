import React from 'react';

const TRUTHS_LIST = [
  {
    id: "01",
    text: "A director in Nairobi today finds their cast on WhatsApp.",
    desc: "There is no professional directory, no verified credits, no standard process."
  },
  {
    id: "02",
    text: "Talent has no rate benchmark.",
    desc: "Actors are underpaid because nobody knows what the market actually pays."
  },
  {
    id: "03",
    text: "Credits go unverified.",
    desc: "A self-reported filmography is worthless. There is no system of record."
  },
  {
    id: "04",
    text: "Payments fall through.",
    desc: "No contracts, no escrow, no recourse. Working in this industry requires blind trust."
  }
];

export default function ProblemSection() {
  return (
    <section className="px-6 md:px-12 py-24 bg-surface-variant border-y border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-text-main">
            East Africa has extraordinary creative talent.
            It has never had the <span className="text-accent">infrastructure</span> to match.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {TRUTHS_LIST.map((item) => (
            <div key={item.id} className="card p-6 flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                {item.id}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-text-main font-bold text-base">
                  {item.text}
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
