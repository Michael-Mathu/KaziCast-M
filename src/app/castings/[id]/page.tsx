import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import ApplyButton from "./ApplyButton";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let casting;
  try {
    casting = await prisma.casting.findUnique({ where: { id } });
  } catch {
    return { title: "Error | KaziCast" };
  }
  if (!casting) return { title: "Not Found | KaziCast" };
  return { title: `${casting.title} | KaziCast Castings` };
}

export default async function CastingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  let casting;
  try {
    casting = await prisma.casting.findUnique({
      where: { id },
      include: {
        director: { select: { name: true } },
        _count: { select: { applications: true } },
      },
    });
  } catch (err: any) {
    console.error("Casting detail error:", err);
    const msg = err?.message || "Unknown database error";
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-text-main mb-4">Something went wrong</h1>
        <p className="text-text-muted mb-2">We couldn&apos;t load this casting.</p>
        <p className="text-xs text-danger mb-6 font-mono break-all">
          {/DATABASE_URL/i.test(msg)
            ? "Missing DATABASE_URL. Configure it in .env and restart the dev server."
            : msg}
        </p>
        <Link href="/castings" className="btn-outline">Back to Castings</Link>
      </div>
    );
  }

  if (!casting) notFound();

  const daysLeft = Math.ceil(
    (new Date(casting.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  // Check if this talent has already applied
  let hasApplied = false;
  if (session?.user.role === "TALENT") {
    try {
      const existing = await prisma.application.findUnique({
        where: { castingId_talentId: { castingId: id, talentId: session.user.id } },
      });
      hasApplied = !!existing;
    } catch (err: any) {
      console.error("Application check failed:", err);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/castings" className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-[#C8A97E] bg-surface hover:bg-surface-variant hover:text-text-main transition-all shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Active Castings
      </Link>

      <div className="mt-8 border-b border-border pb-8 mb-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-text-main mb-3">{casting.title}</h1>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-text-muted font-semibold">
              <span className="border border-border px-3 py-1.5">{casting.roleType}</span>
              <span className="border border-border px-3 py-1.5">{casting.productionType}</span>
              <span className="border border-border px-3 py-1.5">{casting.location}</span>
              <span className="border border-[#C8A97E]/50 text-[#C8A97E] px-3 py-1.5">{casting.rate}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-text-main">{daysLeft > 0 ? `${daysLeft}` : "0"}</p>
            <p className="text-xs text-text-muted uppercase tracking-widest">{daysLeft === 1 ? "day left" : "days left"}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-2 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-3">About This Role</p>
            <p className="text-sm text-text-main leading-relaxed whitespace-pre-wrap">{casting.description}</p>
          </div>

          {(casting.gender || casting.ageRange) && (
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-3">Requirements</p>
              <div className="flex gap-3 flex-wrap">
                {casting.gender && <span className="text-xs border border-border px-3 py-1.5 text-text-muted">{casting.gender}</span>}
                {casting.ageRange && <span className="text-xs border border-border px-3 py-1.5 text-text-muted">{casting.ageRange}</span>}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="border border-border p-5 space-y-3">
            <InfoRow label="Posted by" value={casting.director.name} />
            <InfoRow label="Deadline" value={new Date(casting.deadline).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })} />
            <InfoRow label="Applicants" value={`${casting._count.applications}`} />
            {casting.rateAmount && <InfoRow label="Rate" value={casting.rateAmount} />}
          </div>
        </div>
      </div>

      {/* Apply Section */}
      <div className="border-t border-border pt-8">
        {!session && (
          <div className="border border-border p-6 text-center">
            <p className="text-sm text-text-muted mb-4">You need an account to apply for this role.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/register" className="bg-[#C8A97E] text-black font-bold uppercase tracking-widest text-xs px-6 py-2.5 hover:bg-[#b8966a] transition-colors">
                Join KaziCast
              </Link>
              <Link href="/login" className="border border-border text-text-muted font-bold uppercase tracking-widest text-xs px-6 py-2.5 hover:border-text-main hover:text-text-main transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        )}

        {session?.user.role === "DIRECTOR" && (
          <p className="text-sm text-text-muted text-center">Director accounts cannot apply to castings.</p>
        )}

        {session?.user.role === "TALENT" && (
          <ApplyButton castingId={id} hasApplied={hasApplied} />
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-xs text-text-muted uppercase tracking-widest">{label}</span>
      <span className="text-xs text-text-main font-semibold text-right">{value}</span>
    </div>
  );
}
