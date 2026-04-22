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
    <section className="px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        <div className="max-w-xl">
          <h2 className="font-serif font-light text-4xl md:text-6xl leading-[1.1] tracking-tight">
            East Africa has <span className="italic">extraordinary</span> creative talent. 
            It has never had the infrastructure to match.
          </h2>
        </div>

        <div className="flex flex-col">
          {TRUTHS_LIST.map((item) => (
            <div key={item.id} className="group py-10 border-t border-white/8 first:border-t-0 flex gap-8">
              <span className="text-accent font-bold text-sm md:text-base">{item.id}</span>
              <div className="flex flex-col gap-3">
                <p className="text-warm-white font-bold text-lg leading-tight">
                  {item.text}
                </p>
                <p className="text-muted text-sm md:text-base leading-relaxed">
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
