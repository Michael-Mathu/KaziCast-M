import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await prisma.talentProfile.findUnique({
    where: { id },
    include: { user: { select: { name: true } } },
  });
  if (!profile) return { title: "Not Found | KaziCast" };
  return {
    title: `${profile.stageName || profile.user.name} | KaziCast Talent`,
    description: profile.bio?.slice(0, 160) || "Verified talent profile on KaziCast.",
  };
}

export default async function TalentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const profile = await prisma.talentProfile.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, createdAt: true } },
      consents: { where: { status: "ACTIVE" }, orderBy: { createdAt: "asc" } },
    },
  });

  if (!profile) notFound();

  const displayName = profile.stageName || profile.user.name;
  const aiOptout = profile.consents.find((c) => c.type === "AI_TRAINING_OPTOUT");
  const otherConsents = profile.consents.filter((c) => c.type !== "AI_TRAINING_OPTOUT");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/talent" className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-[#C8A97E] bg-surface hover:bg-surface-variant hover:text-text-main transition-all shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Talent Roster
      </Link>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Headshot */}
        <div className="md:col-span-1">
          <div className="aspect-square bg-surface-variant border border-border flex items-center justify-center overflow-hidden">
            {profile.headshotUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.headshotUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-text-muted text-xs uppercase tracking-widest">No Headshot</span>
            )}
          </div>
          {profile.verified && (
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8A97E]"></span>
              <span className="text-xs text-[#C8A97E] uppercase tracking-widest font-semibold">Verified</span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-serif font-semibold text-text-main">{displayName}</h1>
            {(profile.gender || profile.ageRange) && (
              <p className="text-sm text-text-muted mt-1 uppercase tracking-wide">
                {[profile.gender, profile.ageRange].filter(Boolean).join(" · ")}
              </p>
            )}
            {profile.location && (
              <p className="text-sm text-text-muted mt-1">{profile.location}</p>
            )}
          </div>

{profile.skills && (
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {JSON.parse(profile.skills).map((s: string) => (
                  <span key={s} className="text-xs border border-border px-3 py-1 uppercase tracking-wide text-text-main">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.bio && (
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">About</p>
              <p className="text-sm text-text-main leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {profile.previousWorks && (
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Previous Works</p>
              <p className="text-sm text-text-main leading-relaxed whitespace-pre-line">{profile.previousWorks}</p>
            </div>
          )}

          {profile.portfolioUrls && (
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">Portfolio & Showreels</p>
              <div className="flex flex-col gap-2 mt-1">
                {profile.portfolioUrls.split("\n").map(l => l.trim()).filter(Boolean).map((line, idx) => {
                  const isUrl = line.startsWith("http://") || line.startsWith("https://");
                  return isUrl ? (
                    <a key={idx} href={line} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:text-accent-hover underline flex items-center gap-1.5 break-all font-semibold">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" /><path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" /></svg>
                      {line}
                    </a>
                  ) : (
                    <span key={idx} className="text-sm text-text-main break-all">{line}</span>
                  );
                })}
              </div>
            </div>
          )}

          <p className="text-xs text-text-muted">
            Member since {new Date(profile.user.createdAt).toLocaleDateString("en-KE", { year: "numeric", month: "long" })}
          </p>
        </div>
      </div>

      {/* PUBLIC CONSENT LEDGER — The differentiating feature */}
      <div className="mt-16 border-t border-border pt-10">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-[#C8A97E] font-semibold mb-1">Public Consent Record</p>
          <h2 className="text-xl font-serif font-semibold text-text-main">Consent & AI Policy</h2>
          <p className="text-xs text-text-muted mt-2">
            These records are self-declared by the artist and timestamped. They form a public, auditable record of this artist&apos;s consent preferences.
          </p>
        </div>

        {/* AI Opt-Out Status */}
        <div className={`border p-5 mb-4 ${aiOptout ? "border-[#C8A97E]/40 bg-[#C8A97E]/5" : "border-border"}`}>
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest font-semibold text-[#C8A97E]">AI Training Opt-Out</p>
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 ${aiOptout ? "bg-[#C8A97E]/20 text-[#C8A97E]" : "bg-surface-variant text-text-muted"}`}>
              {aiOptout ? "OPTED OUT" : "NOT DECLARED"}
            </span>
          </div>
          {aiOptout && (
            <>
              <p className="text-sm text-text-main leading-relaxed mt-3">{aiOptout.description}</p>
              <p className="text-xs text-text-muted mt-2">
                Declared: {new Date(aiOptout.createdAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </>
          )}
          {!aiOptout && (
            <p className="text-xs text-text-muted mt-2">This artist has not yet declared their AI training consent preference.</p>
          )}
        </div>

        {/* Other Consent Records */}
        {otherConsents.length > 0 && (
          <div className="space-y-3">
            {otherConsents.map((c) => (
              <div key={c.id} className="border border-border p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest font-semibold text-text-muted">
                    {c.type.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-success uppercase tracking-widest">Active</span>
                </div>
                <p className="text-sm text-text-main leading-relaxed">{c.description}</p>
                {c.grantedTo && <p className="text-xs text-text-muted mt-2">Granted to: {c.grantedTo}</p>}
                <p className="text-xs text-text-muted mt-2">
                  {new Date(c.createdAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        )}

        {profile.consents.length === 0 && (
          <p className="text-xs text-text-muted py-4">No consent records declared.</p>
        )}
      </div>
    </div>
  );
}
