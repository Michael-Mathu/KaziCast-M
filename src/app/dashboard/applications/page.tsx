import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "My Applications | KaziCast" };

const STATUS_STYLES: Record<string, string> = {
  PENDING: "text-text-muted border-border",
  SHORTLISTED: "text-[#C8A97E] border-[#C8A97E]/50",
  ACCEPTED: "text-success border-success/30",
  REJECTED: "text-text-muted border-border opacity-60",
};

export default async function MyApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TALENT") redirect("/dashboard");

  const applications = await prisma.application.findMany({
    where: { talentId: session.user.id },
    include: {
      casting: {
        select: {
          id: true, title: true, location: true, productionType: true, rate: true,
          deadline: true, status: true,
          director: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen text-text-main font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-10 border-b border-border pb-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-[#C8A97E] bg-surface hover:bg-surface-variant hover:text-text-main transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-semibold mt-3 text-text-main">My Applications</h1>
          <p className="text-text-muted text-sm mt-1">{applications.length} total</p>
        </header>

        {applications.length === 0 ? (
          <div className="text-center py-16 px-6 border border-dashed border-border bg-surface rounded-2xl max-w-md mx-auto my-4 animate-fade-up">
            <div className="w-12 h-12 bg-[#C8A97E]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C8A97E]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.45.258-.717.258H3.717c-.267 0-.523-.093-.717-.258m1.5-8.006c.194-.165.45-.258.717-.258h12.166c.267 0 .523.093.717.258m-12.13 0c-1.069.16-1.837 1.094-1.837 2.175v3.783c0 .647.287 1.251.75 1.66m15.37-8.006a2.18 2.18 0 0 0-.75-1.66M7.5 7.5V6a2.25 2.25 0 0 1 2.25-2.25h4.5A2.25 2.25 0 0 1 16.5 6v1.5m-9 0h9" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-text-main mb-1">
              No applications yet
            </h3>
            <p className="text-sm text-text-muted mb-6">
              You haven't submitted any casting applications yet.
            </p>
            <Link href="/castings" className="btn-outline text-xs px-4 py-2 hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors rounded-lg font-semibold uppercase tracking-widest">
              Browse Open Castings
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const c = app.casting;
              const isPast = new Date(c.deadline) < new Date();
              return (
                <div key={app.id} className="border border-border p-6 flex flex-col sm:flex-row gap-5 justify-between bg-surface rounded-lg">
                  <div className="flex-1">
                    <Link href={`/castings/${c.id}`} className="hover:text-[#C8A97E] transition-colors">
                      <h2 className="font-semibold text-text-main text-lg mb-1">{c.title}</h2>
                    </Link>
                    <p className="text-xs text-text-muted uppercase tracking-widest">
                      {c.location} · {c.productionType} · {c.rate}
                    </p>
                    <p className="text-xs text-text-muted mt-1">by {c.director.name}</p>
                    {app.message && (
                      <p className="text-xs text-text-muted mt-2 italic line-clamp-2">&ldquo;{app.message}&rdquo;</p>
                    )}
                    <p className="text-xs text-text-muted mt-2">
                      Applied: {new Date(app.createdAt).toLocaleDateString("en-KE")}
                      {isPast && " · Deadline passed"}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-start">
                    <span className={`text-xs font-bold uppercase tracking-widest border px-3 py-1.5 rounded-full ${STATUS_STYLES[app.status] || ""}`}>
                      {app.status}
                    </span>
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
