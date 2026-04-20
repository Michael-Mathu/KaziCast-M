import Link from "next/link";

const mockCastings = [
  { id: 1, title: "Lead Actor - Indie Drama", role: "Male, 20-30", location: "Nairobi, Kenya", type: "Feature Film", rate: "Paid" },
  { id: 2, title: "Supporting Actress - Thriller", role: "Female, 35-50", location: "Kampala, Uganda", type: "Short Film", rate: "Deferred" },
  { id: 3, title: "Voice Actor - Animation", role: "Any, 18-60", location: "Remote", type: "Voiceover", rate: "Paid" },
  { id: 4, title: "Extras for Street Scene", role: "Any, 18-40", location: "Dar es Salaam, Tanzania", type: "Commercial", rate: "Paid" },
  { id: 5, title: "Antagonist - Web Series", role: "Male, 40-55", location: "Kigali, Rwanda", type: "Web Series", rate: "Unpaid/Copy" },
];

export default function CastingsPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24 border border-gray-800 p-6">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-800 pb-4">Filters</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Role Type</h3>
              <div className="space-y-3">
                {['Lead', 'Supporting', 'Background', 'Voiceover'].map((type) => (
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
                {['Nairobi', 'Kampala', 'Dar es Salaam', 'Kigali', 'Remote'].map((loc) => (
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
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-2 text-white">Active Castings</h1>
            <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Showing {mockCastings.length} open roles</p>
          </div>
          <div className="hidden sm:block">
             <select className="bg-black border border-gray-800 text-sm text-gray-400 py-2.5 px-4 focus:outline-none focus:border-white uppercase tracking-wide cursor-pointer transition-colors font-medium">
               <option>Newest First</option>
               <option>Closing Soon</option>
               <option>Highest Paid</option>
             </select>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {mockCastings.map((casting) => (
            <Link href={`/castings/${casting.id}`} key={casting.id} className="block group">
              <div className="border border-gray-800 p-6 md:p-8 hover:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                  <div className="pl-4">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-200 group-hover:text-white transition-colors mb-3">{casting.title}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 font-medium tracking-wide uppercase">
                      <span className="border border-gray-700 px-3 py-1.5">{casting.role}</span>
                      <span className="border border-gray-700 px-3 py-1.5">{casting.type}</span>
                      <span className="flex items-center text-gray-500 xl:ml-2">
                         <span className="sr-only">Location:</span>
                         {casting.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start xl:items-end pl-4 xl:pl-0 mt-2 xl:mt-0">
                    <span className="text-sm font-bold uppercase tracking-widest text-white border border-white px-4 py-1.5 mb-3">{casting.rate}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold flex items-center">
                       <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
                       Ends in 5 days
                    </span>
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
