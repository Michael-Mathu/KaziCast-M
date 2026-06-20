import WaitlistForm from '@/components/WaitlistForm';

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="px-6 md:px-12 py-24 md:py-32 bg-surface">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-text-main mb-6">
            Be part of building what East Africa&apos;s film industry needs.
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            KaziCast is in active development. The waitlist gets you early access, a founding member profile, and a direct line to the team building this. We&apos;re starting in Nairobi. We want the right people in the room first.
          </p>
        </div>

        <div className="card p-8 md:p-10">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
