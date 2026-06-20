import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "My Castings | KaziCast" };

export default async function MyCastingsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "DIRECTOR") redirect("/dashboard");

  const castings = await prisma.casting.findMany({
    where: { directorId: session.user.id },
    include: { _count: { select: { applications: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen text-text-main font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-10 border-b border-border pb-6 flex justify-between items-end">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-[#C8A97E] bg-surface hover:bg-surface-variant hover:text-text-main transition-all shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Dashboard
            </Link>
            <h1 className="text-3xl font-serif font-semibold mt-3 text-text-main">My Castings</h1>
          </div>
          <Link href="/dashboard/castings/new"
            className="text-xs font-bold bg-[#C8A97E] text-black px-5 py-2.5 hover:bg-[#b8966a] transition-colors uppercase tracking-widest">
            + New Casting
          </Link>
        </header>

        {castings.length === 0 ? (
          <div className="text-center py-16 px-6 border border-dashed border-border bg-surface rounded-2xl max-w-md mx-auto my-4 animate-fade-up">
            <div className="w-12 h-12 bg-[#C8A97E]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C8A97E]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-text-main mb-1">
              No castings yet
            </h3>
            <p className="text-sm text-text-muted mb-6">
              You haven't posted any casting calls yet.
            </p>
            <Link href="/dashboard/castings/new" className="btn-outline text-xs px-4 py-2 hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors rounded-lg font-semibold uppercase tracking-widest">
              Post your first casting
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {castings.map((c) => {
              const isExpired = new Date(c.deadline) < new Date();
              return (
                <div key={c.id} className="border border-border p-6 flex flex-col sm:flex-row justify-between gap-4 bg-surface rounded-lg">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg font-semibold text-text-main">{c.title}</h2>
                      <span className={`text-xs px-2 py-0.5 uppercase tracking-widest font-bold ${
                        c.status === "OPEN" && !isExpired ? "text-success" : "text-text-muted"
                      }`}>
                        {isExpired ? "Expired" : c.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted uppercase tracking-widest">
                      {c.location} · {c.productionType} · {c.rate}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      Deadline: {new Date(c.deadline).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-text-main">{c._count.applications}</p>
                      <p className="text-xs text-text-muted uppercase tracking-widest">applicants</p>
                    </div>
                    <Link href={`/dashboard/castings/${c.id}/applications`}
                      className="text-xs border border-border px-4 py-2 text-text-muted hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors uppercase tracking-widest font-semibold">
                      Review →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
