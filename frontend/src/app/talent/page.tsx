import Link from "next/link";

const mockTalent = [
  { id: "1", name: "John Doe", role: "Lead Actor", location: "Nairobi, KE" },
  { id: "2", name: "Sarah Mutiso", role: "Stunt Performer", location: "Mombasa, KE" },
  { id: "3", name: "David Ochieng", role: "Voice Artist", location: "Kampala, UG" },
  { id: "4", name: "Amina Hassan", role: "Supporting Actress", location: "Dar es Salaam, TZ" },
  { id: "5", name: "Peter Kinyanjui", role: "Extra / Background", location: "Nairobi, KE" },
  { id: "6", name: "Grace Wanjiru", role: "Lead Actress", location: "Kigali, RW" },
];

export default function TalentRosterPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24 border border-gray-800 p-6 bg-black">
          <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b border-gray-800 pb-4">Filters</h2>
          
          <div className="space-y-8">
             <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Role</h3>
              <div className="space-y-3">
                {['Actor', 'Actress', 'Stunts', 'Voiceover', 'Extras'].map((type) => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="form-checkbox bg-black border-gray-600 rounded-none checked:bg-white checked:border-white focus:ring-0 focus:ring-offset-0 transition-colors w-4 h-4 cursor-pointer" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors uppercase tracking-wide">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Location</h3>
              <div className="space-y-3">
                {['Nairobi', 'Kampala', 'Dar es Salaam', 'Kigali'].map((loc) => (
                  <label key={loc} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="form-checkbox bg-black border-gray-600 rounded-none checked:bg-white checked:border-white focus:ring-0 focus:ring-offset-0 transition-colors w-4 h-4 cursor-pointer" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors uppercase tracking-wide">{loc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button className="w-full mt-10 py-3 border border-white font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors">
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="mb-10 border-b border-gray-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-2 text-white">Talent Roster</h1>
            <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Showing {mockTalent.length} professionals</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTalent.map((talent) => (
            <Link href={`/talent/${talent.id}`} key={talent.id} className="block group">
              <div className="border border-gray-800 bg-black hover:border-white transition-colors duration-300 relative overflow-hidden flex flex-col h-full">
                <div className="aspect-square bg-gray-900 border-b border-gray-800 flex items-center justify-center p-4 relative">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] mix-blend-overlay opacity-30"></div>
                   <span className="text-gray-600 uppercase tracking-widest text-xs font-semibold relative z-10">Headshot</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-2">{talent.name}</h2>
                    <p className="text-sm text-gray-400 font-medium tracking-wide uppercase mb-4">{talent.role}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase border-t border-gray-800 pt-4 mt-4">
                     <span>{talent.location}</span>
                     <span className="group-hover:text-white transition-colors">View Profile &rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
