import WaitlistForm from '@/components/WaitlistForm';

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="px-6 md:px-12 py-32 md:py-48 bg-near-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="max-w-xl">
          <h2 className="font-serif font-light text-5xl md:text-7xl leading-[1.1] tracking-tight text-warm-white mb-10">
            Be part of <span className="italic">building</span> what East Africa&apos;s film industry needs.
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            KaziCast is in active development. The waitlist gets you early access, a founding member profile, and a direct line to the team building this. We&apos;re starting in Nairobi. We want the right people in the room first.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-10 md:p-16 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
          <div className="relative z-10 w-full">
            <WaitlistForm />
          </div>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>
    </section>
  );
}
