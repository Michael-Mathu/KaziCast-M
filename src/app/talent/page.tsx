import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = { title: "Talent Roster | KaziCast" };
export const dynamic = 'force-dynamic';

export default async function TalentRosterPage() {
  const session = await getServerSession(authOptions);
  const profiles = await prisma.talentProfile.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true }
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 animate-fade-up">
      <div className="max-w-2xl mx-auto mb-4">
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

      <header className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-4">Talent Roster</h1>
        <p className="text-text-muted text-lg">
          Discover verified actors, voice talent, and crew across East Africa.
        </p>
      </header>

      {/* Basic Search/Filter Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <input 
          type="search" 
          placeholder="Search by name, skill, or location..." 
          className="input-field flex-1"
        />
        <select className="input-field sm:w-48 bg-surface">
          <option value="">All Locations</option>
          <option value="Nairobi">Nairobi</option>
          <option value="Kampala">Kampala</option>
          <option value="Dar es Salaam">Dar es Salaam</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {profiles.map((profile) => (
          <Link key={profile.id} href={`/talent/${profile.id}`} className="group block">
            <div className="card overflow-hidden h-full flex flex-col hover:border-accent hover:shadow-sm transition-all">
              <div className="aspect-square bg-surface-variant relative overflow-hidden flex items-center justify-center">
                {/* Fallback image if headshot is missing */}
                {profile.headshotUrl ? (
                  <img 
                    src={profile.headshotUrl} 
                    alt={profile.user.name || "Talent"} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-accent/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="currentColor" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-text-main group-hover:text-accent transition-colors truncate">
                  {profile.user.name}
                </h2>
                
                <p className="text-sm text-text-muted mt-1 font-medium truncate">
                  {profile.bio || "Actor"}
                </p>

                {profile.location && (
                  <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                    {profile.location}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5 mt-auto pt-4">
                  {JSON.parse(profile.skills || "[]").slice(0, 3).map((skill: string) => (
                    <span key={skill} className="badge">
                      {skill}
                    </span>
                  ))}
                  {JSON.parse(profile.skills || "[]").length > 3 && (
                    <span className="badge">
                      +{JSON.parse(profile.skills || "[]").length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
