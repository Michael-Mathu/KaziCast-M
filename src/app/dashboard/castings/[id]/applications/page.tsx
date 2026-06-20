import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import ApplicationActions from "./ApplicationActions";

export const metadata = { title: "Applications | KaziCast" };

export default async function ApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "DIRECTOR") redirect("/dashboard");

  const casting = await prisma.casting.findUnique({
    where: { id, directorId: session.user.id },
    include: {
      applications: {
        include: {
          talent: {
            select: {
              name: true,
              profile: {
                select: { id: true, stageName: true, location: true, skills: true, headshotUrl: true },
              },
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!casting) redirect("/dashboard/castings");

  const statusGroups = {
    SHORTLISTED: casting.applications.filter((a) => a.status === "SHORTLISTED"),
    PENDING: casting.applications.filter((a) => a.status === "PENDING"),
    ACCEPTED: casting.applications.filter((a) => a.status === "ACCEPTED"),
    REJECTED: casting.applications.filter((a) => a.status === "REJECTED"),
  };

  return (
    <main className="min-h-screen text-text-main font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-10 border-b border-border pb-6">
          <Link href="/dashboard/castings" className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-[#C8A97E] bg-surface hover:bg-surface-variant hover:text-text-main transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            My Castings
          </Link>
          <h1 className="text-3xl font-serif font-semibold mt-3 text-text-main">{casting.title}</h1>
          <p className="text-text-muted text-sm mt-1">{casting.applications.length} total applications</p>
        </header>

        {casting.applications.length === 0 ? (
          <div className="text-center py-16 px-6 border border-dashed border-border bg-surface rounded-2xl max-w-md mx-auto my-4 animate-fade-up">
            <div className="w-12 h-12 bg-[#C8A97E]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C8A97E]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A2.25 2.25 0 0 1 12.75 21.5h-5.5A2.25 2.25 0 0 1 5 19.237v-.109c0-1.11.285-2.156.785-3.064M15 19.128c-.49-.91-.785-1.954-.785-3.064 0-1.286.293-2.498.813-3.585M5.785 16.064A9.237 9.237 0 0 1 8 15.5a9.237 9.237 0 0 1 2.215.564M5.785 16.064a9.337 9.337 0 0 0-4.121.952 4.125 4.125 0 0 0 7.533 2.493M10.215 16.064a9.12 9.12 0 0 1 1.751-2.482M12 10.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-text-main mb-1">
              No applications yet
            </h3>
            <p className="text-sm text-text-muted">
              No talent profiles have applied to this casting call yet.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {(["SHORTLISTED", "PENDING", "ACCEPTED", "REJECTED"] as const).map((status) => {
              const apps = statusGroups[status];
              if (apps.length === 0) return null;
              return (
                <section key={status}>
                  <h2 className="text-xs uppercase tracking-widest font-semibold text-text-muted mb-4 border-b border-border pb-2">
                    {status} ({apps.length})
                  </h2>
                  <div className="space-y-4">
                    {apps.map((app) => {
                       const profile = app.talent.profile;
                       const name = profile?.stageName || app.talent.name;
                       return (
                        <div key={app.id} className="border border-border p-6 flex flex-col sm:flex-row gap-5 bg-surface rounded-lg">
                          {/* Mini headshot */}
                          <div className="w-16 h-16 flex-shrink-0 bg-surface-variant border border-border overflow-hidden">
                            {profile?.headshotUrl
                              // eslint-disable-next-line @next/next/no-img-element
                              ? <img src={profile.headshotUrl} alt={name} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">N/A</div>
                            }
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div>
                                <h3 className="font-semibold text-text-main">{name}</h3>
<p className="text-xs text-text-muted mt-0.5">
                                   {profile?.location || "Location not set"} ·{" "}
                                   {JSON.parse(profile?.skills || "[]").slice(0, 2).join(", ") || "Skills not set"}
                                 </p>
                              </div>
                              {profile && (
                                <Link href={`/talent/${profile.id}`} target="_blank"
                                  className="text-xs text-[#C8A97E] hover:text-text-main transition-colors uppercase tracking-widest">
                                  View Profile →
                                </Link>
                              )}
                            </div>
                            {app.message && (
                              <p className="text-sm text-text-muted mt-3 border-l-2 border-border pl-3 leading-relaxed">
                                {app.message}
                              </p>
                            )}
                            <p className="text-xs text-text-muted mt-2">
                              Applied: {new Date(app.createdAt).toLocaleDateString("en-KE")}
                            </p>
                          </div>

                          <ApplicationActions
                            castingId={id}
                            appId={app.id}
                            currentStatus={app.status}
                          />
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
