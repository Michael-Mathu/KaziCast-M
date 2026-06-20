import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = { title: "Active Castings | KaziCast" };
export const dynamic = 'force-dynamic';

const ROLE_TYPES = ["Lead", "Supporting", "Background", "Voice", "Stunt", "Other"];
const STATUSES = ["OPEN", "CLOSED", "DRAFT"];

export default async function CastingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await searchParams;
  const statusFilter = typeof resolvedParams.status === 'string' ? resolvedParams.status : "OPEN";
  const roleFilter = typeof resolvedParams.role === 'string' ? resolvedParams.role : undefined;

  const whereClause: any = {};
  if (statusFilter) whereClause.status = statusFilter;
  if (roleFilter) whereClause.roleType = roleFilter;

  let castings: any[] = [];
  let fetchError: string | null = null;
  try {
    castings = await prisma.casting.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        director: {
          select: { name: true }
        }
      }
    });
  } catch (err: any) {
    console.error("Castings fetch error:", err);
    const msg = err?.message || "Unknown database error";
    fetchError = /DATABASE_URL/i.test(msg)
      ? "Missing DATABASE_URL. Configure it in .env and restart the dev server."
      : msg;
  }

  if (fetchError) {
    return (
      <div className="max-w-7xl mx-auto p-6 md:p-8 text-center">
        <h1 className="text-2xl font-bold text-text-main mb-4">Couldn&apos;t load castings</h1>
        <p className="text-text-muted mb-2">A server error occurred. Please try again later.</p>
        <p className="text-xs text-danger mb-6 font-mono break-all">{fetchError}</p>
        <Link href="/castings" className="btn-outline">Reload</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="card p-5 sticky top-24">
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-2">Filters</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main mb-3 px-2">Status</h3>
              <div className="space-y-1">
                {STATUSES.map(status => (
                  <Link 
                    key={status}
                    href={`/castings?status=${status}${roleFilter ? `&role=${roleFilter}` : ''}`}
                    className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all ${
                      statusFilter === status 
                        ? 'bg-accent/10 text-accent font-semibold' 
                        : 'text-text-muted hover:bg-surface-variant hover:text-text-main'
                    }`}
                  >
                    <span>{status === "OPEN" ? "Accepting Submissions" : status === "CLOSED" ? "Casting Closed" : "Drafts"}</span>
                    {statusFilter === status && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main mb-3 px-2">Role Type</h3>
              <div className="space-y-1">
                <Link 
                  href={`/castings?status=${statusFilter}`}
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all ${
                    !roleFilter 
                      ? 'bg-accent/10 text-accent font-semibold' 
                      : 'text-text-muted hover:bg-surface-variant hover:text-text-main'
                  }`}
                >
                  <span>All Roles</span>
                  {!roleFilter && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  )}
                </Link>
                {ROLE_TYPES.map(role => (
                  <Link 
                    key={role}
                    href={`/castings?status=${statusFilter}&role=${role}`}
                    className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all ${
                      roleFilter === role 
                        ? 'bg-accent/10 text-accent font-semibold' 
                        : 'text-text-muted hover:bg-surface-variant hover:text-text-main'
                    }`}
                  >
                    <span>{role}</span>
                    {roleFilter === role && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mb-4">
          {session ? (
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-[#C8A97E] bg-surface hover:bg-surface-variant hover:text-text-main transition-all shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Dashboard
            </Link>
          ) : (
            <Link href="/" className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-[#C8A97E] bg-surface hover:bg-surface-variant hover:text-text-main transition-all shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Home
            </Link>
          )}
        </div>
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-text-main">Active Castings</h1>
            <p className="text-text-muted mt-2">
              Showing {castings.length} {castings.length === 1 ? 'casting' : 'castings'}
            </p>
          </div>
        </header>

        {castings.length === 0 ? (
          <div className="card p-12 text-center flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-text-main mb-2">No castings found</h3>
            <p className="text-text-muted mb-6">Try adjusting your filters to see more results.</p>
            <Link href="/castings" className="btn-outline">Clear Filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {castings.map((casting) => (
              <Link key={casting.id} href={`/castings/${casting.id}`} className="block">
                <div className="card p-6 hover:border-accent hover:shadow-sm transition-all group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-text-main group-hover:text-accent transition-colors">
                        {casting.title}
                      </h2>
                      <p className="text-text-muted text-sm mt-1 font-medium">
                        {casting.productionType} • Directed by {casting.director.name}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge">
                        {casting.roleType}
                      </span>
                      {casting.status === "OPEN" && (
                        <span className="badge badge-success flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                          Open
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-text-main text-sm line-clamp-2 mb-4 leading-relaxed">
                    {casting.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    {casting.location && (
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                        {casting.location}
                      </span>
                    )}
                    {casting.rate && (
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .252.11.506.33.745zM10.75 5.815a1.28 1.28 0 00-.203-.042A2.943 2.943 0 0010 5.75v-.5a.75.75 0 00-1.5 0v.51c-.462.043-.902.138-1.309.284A3.214 3.214 0 005.9 7.181a1.272 1.272 0 00-.25.804c0 .872.485 1.571 1.096 2.054.406.32 1.011.605 1.754.745v2.855a1.642 1.642 0 01-.62-.24 2.127 2.127 0 01-.475-.465.75.75 0 00-1.214.882c.16.222.36.43.593.615.421.334.981.595 1.716.71v.5a.75.75 0 001.5 0v-.51c.462-.043.902-.138 1.309-.284.407-.146.78-.344 1.091-.59a1.272 1.272 0 00.25-.804c0-.872-.485-1.571-1.096-2.054-.406-.32-1.011-.605-1.754-.745V7.472a1.642 1.642 0 01.62.24 2.127 2.127 0 01.475.465.75.75 0 001.214-.882 3.214 3.214 0 00-.593-.615 2.944 2.944 0 00-1.716-.71v-.5a.75.75 0 00-1.5 0v.515z" /></svg>
                        {casting.rate}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
