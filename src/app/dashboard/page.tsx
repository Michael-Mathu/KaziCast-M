import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Dashboard | KaziCast" };
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = session.user?.role || "TALENT";
  const isDirector = role === "DIRECTOR";
  const userId = session.user.id;

  // ── Database Queries for Talent ──
  let applicationCount = 0;
  let consentCount = 0;
  let recentApplications: any[] = [];
  let profileId: string | null = null;
  let fullProfile: any = null;

  // ── Database Queries for Directors ──
  let castingCount = 0;
  let receivedCount = 0;
  let recentSubmissions: any[] = [];

  try {
    if (isDirector) {
      castingCount = await prisma.casting.count({
        where: { directorId: userId },
      });
      receivedCount = await prisma.application.count({
        where: { casting: { directorId: userId } },
      });
      recentSubmissions = await prisma.application.findMany({
        where: { casting: { directorId: userId } },
        orderBy: { createdAt: "desc" },
        take: 3,
        include: {
          talent: { select: { name: true } },
          casting: { select: { title: true } },
        },
      });
    } else {
      applicationCount = await prisma.application.count({
        where: { talentId: userId },
      });
      
      fullProfile = await prisma.talentProfile.findUnique({
        where: { userId },
        include: { user: { select: { name: true, createdAt: true } }, consents: true },
      });
      consentCount = fullProfile?.consents?.length || 0;
      profileId = fullProfile?.id || null;

      recentApplications = await prisma.application.findMany({
        where: { talentId: userId },
        orderBy: { updatedAt: "desc" },
        take: 3,
        include: {
          casting: { select: { title: true, location: true } },
        },
      });
    }
  } catch (error) {
    console.error("Dashboard database query error:", error);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 animate-fade-up space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8A97E] bg-[#C8A97E]/10 px-2.5 py-1 rounded-md flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4.13-5.69a.06.06 0 00-.013-.01z" clipRule="evenodd" />
              </svg>
              {isDirector ? "Verified Director" : "Verified Artist"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-text-main">
            Welcome back, {session.user?.name?.split(" ")[0] || "User"}
          </h1>
          <p className="text-text-muted text-sm max-w-xl">
            {isDirector 
              ? "Manage your active castings, review applicant cards, and discover talent in Kenya." 
              : "Keep your profile current to attract directors. Your digital consent records are secure."}
          </p>
        </div>
        <div>
          {isDirector ? (
            <Link href="/dashboard/castings/new" className="btn-primary !px-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Post a Casting
            </Link>
          ) : (
            <Link href="/dashboard/profile" className="btn-outline !px-6 hover:shadow-sm">
              Update Profile
            </Link>
          )}
        </div>
      </header>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isDirector ? (
          <>
            <DashCard
              title="Active Castings"
              value={castingCount}
              desc="Open productions accepting applications"
              link="/dashboard/castings"
              linkText="Manage Castings"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              }
              primary
            />
            <DashCard
              title="Talent Submissions"
              value={receivedCount}
              desc="Total applicant profile cards received"
              link="/dashboard/castings"
              linkText="Review Submissions"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 21c-2.243 0-4.352-.646-6.136-1.765a4.125 4.125 0 014.617-6.864 4.125 4.125 0 017.533 2.493M18.902 12.03a3.375 3.375 0 11-6.15-2.203 3.375 3.375 0 016.15 2.203zm-7.653-4.5a3.375 3.375 0 11-6.15-2.203 3.375 3.375 0 016.15 2.203z" />
                </svg>
              }
            />
            <DashCard
              title="Post New Role"
              value="+"
              desc="Publish a new casting opportunity"
              link="/dashboard/castings/new"
              linkText="Create Listing"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </>
        ) : (
          <>
            <DashCard
              title="My Submissions"
              value={applicationCount}
              desc="Roles you have applied to on KaziCast"
              link="/dashboard/applications"
              linkText="Track Applications"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.475A2.25 2.25 0 019 13.5V6.108c0-1.135-.845-2.098-1.976-2.192a48.567 48.567 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 017.5 2.25H9c1.03 0 1.9.693 2.166 1.638" />
                </svg>
              }
              primary
            />
            <DashCard
              title="Profile Visibility"
              value={profileId ? "Active" : "Inactive"}
              desc={profileId ? "Your profile is public and visible in the talent roster." : "Create a talent profile to be discovered in the roster."}
              link={profileId ? `/talent/${profileId}` : "/dashboard/profile"}
              linkText={profileId ? "View Public Profile" : "Create Profile"}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            <DashCard
              title="Consent Ledger"
              value={consentCount}
              desc="Active likeness and AI opt-out records"
              link="/dashboard/consent"
              linkText="Manage Consents"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              }
            />
          </>
        )}
      </div>

      {/* Main Activity and Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-main">Recent Activity</h2>
          </div>
          
          <div className="card divide-y divide-border">
            {isDirector ? (
              recentSubmissions.length > 0 ? (
                recentSubmissions.map((sub: any) => (
                  <div key={sub.id} className="p-5 flex items-start justify-between gap-4 hover:bg-surface-variant transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent border border-accent/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-text-main font-semibold">
                          {sub.talent.name} <span className="font-normal text-text-muted">applied to your casting</span> {sub.casting.title}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {new Date(sub.createdAt).toLocaleDateString("en-KE", { hour: "numeric", minute: "2-digit" } as any)}
                        </p>
                      </div>
                    </div>
                    <span className={`badge ${
                      sub.status === "PENDING" ? "badge-warning" : sub.status === "ACCEPTED" ? "badge-success" : sub.status === "SHORTLISTED" ? "badge-accent" : "badge-danger"
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-text-muted text-sm">
                  No submissions received yet. Open roles will appear here once talent applies.
                </div>
              )
            ) : (
              recentApplications.length > 0 ? (
                recentApplications.map((app: any) => (
                  <div key={app.id} className="p-5 flex items-start justify-between gap-4 hover:bg-surface-variant transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent border border-accent/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h3.75a2.25 2.25 0 012.25 2.25v15a2.25 2.25 0 01-2.25 2.25h-3.75a2.25 2.25 0 01-2.25-2.25v-15a2.25 2.25 0 012.25-2.25z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-text-main font-semibold">
                          Applied to <span className="text-[#C8A97E]">{app.casting.title}</span>
                        </p>
                        <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                          {app.casting.location} · Updated {new Date(app.updatedAt).toLocaleDateString("en-KE", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    </div>
                    <span className={`badge ${
                      app.status === "PENDING" ? "badge-warning" : app.status === "ACCEPTED" ? "badge-success" : app.status === "SHORTLISTED" ? "badge-accent" : "badge-danger"
                    }`}>
                      {app.status === "SHORTLISTED" ? "Shortlisted" : app.status === "PENDING" ? "Pending" : app.status === "ACCEPTED" ? "Accepted" : "Rejected"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-text-muted text-sm space-y-2">
                  <p>You haven't submitted any casting applications yet.</p>
                  <Link href="/castings" className="text-xs text-accent uppercase font-bold tracking-wider hover:underline">Browse Active Castings →</Link>
                </div>
              )
            )}
          </div>
        </div>

        {/* Quick Links Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-main">Quick Actions</h2>
          <div className="card p-3 space-y-1">
            <QuickLink href="/castings" text="Browse Castings Board" icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-muted">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-3.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            } />
            <QuickLink href="/talent" text="Search Talent Roster" icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-muted">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 21c-2.243 0-4.352-.646-6.136-1.765a4.125 4.125 0 014.617-6.864 4.125 4.125 0 017.533 2.493M18.902 12.03a3.375 3.375 0 11-6.15-2.203 3.375 3.375 0 016.15 2.203zm-7.653-4.5a3.375 3.375 0 11-6.15-2.203 3.375 3.375 0 016.15 2.203z" />
              </svg>
            } />
            <QuickLink href="/dashboard/profile" text="Manage Profile" icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-muted">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            } />
            <QuickLink href="/help" text="Help Center" icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-muted">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            } />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashCard({ title, value, desc, link, linkText, icon, primary = false }: any) {
  return (
    <Link 
      href={link}
      className={`card p-6 flex flex-col relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border ${
        primary ? 'border-accent/40 ring-1 ring-accent/10 bg-accent/[0.02]' : 'border-border bg-surface'
      }`}
    >
      {/* Decorative Accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 transition-colors ${primary ? 'bg-accent' : 'bg-transparent group-hover:bg-[#C8A97E]'}`}></div>

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">{title}</h3>
        {icon && <div className={`text-text-muted ${primary ? 'text-accent' : ''}`}>{icon}</div>}
      </div>

      <div className={`text-4xl font-extrabold tracking-tight mb-2 font-serif ${primary ? 'text-accent' : 'text-text-main'}`}>
        {value}
      </div>

      <p className="text-xs text-text-muted mb-6 flex-1 font-medium leading-relaxed">{desc}</p>
      
      <span className="text-sm font-semibold text-accent inline-flex items-center gap-1.5 group-hover:text-accent-hover transition-colors">
        {linkText}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </Link>
  );
}

function QuickLink({ href, text, icon }: { href: string, text: string, icon?: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center justify-between p-3.5 rounded-lg hover:bg-surface-variant transition-colors text-sm font-semibold text-text-main group border border-transparent hover:border-border">
      <div className="flex items-center gap-3">
        {icon}
        <span className="group-hover:text-accent transition-colors">{text}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}
