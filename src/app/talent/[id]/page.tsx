import Link from "next/link";

export default function TalentProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Profile Header */}
      <header className="border border-gray-800 p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] mix-blend-overlay opacity-50 z-0 border-b border-gray-800"></div>
        <div className="w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 bg-gray-900 border border-gray-700 relative z-10 flex items-center justify-center p-2">
            <span className="text-gray-600 uppercase tracking-widest text-xs font-semibold">Headshot Placeholder</span>
        </div>
        <div className="flex-1 relative z-10 text-center md:text-left pt-2">
          <div className="inline-block border border-gray-800 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-gray-400 bg-black/50">
            Featured Talent
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white">John Doe</h1>
          <p className="text-lg md:text-xl text-gray-400 font-light mb-8 uppercase tracking-wide">Lead Actor • Stunt Performer • Action Choreographer</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm mb-10 font-bold">
            <span className="bg-white text-black px-4 py-2 uppercase tracking-wider">Nairobi, KE</span>
            <span className="border border-gray-700 px-4 py-2 uppercase text-gray-300 tracking-wider">SAG-AFTRA</span>
            <span className="border border-gray-700 px-4 py-2 uppercase text-gray-300 tracking-wider">Representation: Independent</span>
          </div>
          <div className="flex gap-4 justify-center md:justify-start">
             <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors shadow-lg">
               Contact Agent
             </button>
             <button className="px-8 py-4 bg-transparent border-[3px] border-white text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
               Portfolio
             </button>
          </div>
        </div>
      </header>

      {/* Attributes & Media Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Attributes Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="border border-gray-800 p-8 bg-black hover:bg-gray-900/40 transition-colors">
            <h2 className="text-xl font-black uppercase tracking-widest border-b border-gray-800 pb-4 mb-6">Physical Attributes</h2>
            <dl className="space-y-4 text-sm font-medium">
              <div className="flex justify-between items-center"><dt className="text-gray-500 uppercase tracking-widest">Height</dt><dd className="text-white text-right font-mono">6' 1" (185cm)</dd></div>
              <div className="flex justify-between items-center"><dt className="text-gray-500 uppercase tracking-widest">Weight</dt><dd className="text-white text-right font-mono">180 lbs (81kg)</dd></div>
              <div className="flex justify-between items-center"><dt className="text-gray-500 uppercase tracking-widest">Hair</dt><dd className="text-white text-right font-mono uppercase">Black</dd></div>
              <div className="flex justify-between items-center"><dt className="text-gray-500 uppercase tracking-widest">Eyes</dt><dd className="text-white text-right font-mono uppercase">Dark Brown</dd></div>
              <div className="flex justify-between items-center"><dt className="text-gray-500 uppercase tracking-widest">Build</dt><dd className="text-white text-right font-mono uppercase">Athletic</dd></div>
            </dl>
          </div>

          <div className="border border-gray-800 p-8 bg-black hover:bg-gray-900/40 transition-colors">
            <h2 className="text-xl font-black uppercase tracking-widest border-b border-gray-800 pb-4 mb-6">Special Skills</h2>
            <div className="flex flex-wrap gap-3">
              {['Martial Arts', 'Wire Work', 'Swahili (Native)', 'English (Fluent)', 'Horseback Riding', 'Firearms Training'].map(skill => (
                <span key={skill} className="text-xs uppercase font-bold tracking-widest bg-gray-900 border border-gray-800 px-3 py-2 text-gray-300 hover:text-white hover:border-gray-500 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Portfolio Content */}
        <main className="lg:col-span-2 space-y-16">
           <section>
             <h2 className="text-4xl font-black uppercase tracking-widest mb-8 border-b-4 border-white pb-6 text-white inline-block">Showreel & Clips</h2>
             <div className="aspect-video bg-gray-900 border border-gray-800 flex items-center justify-center relative group cursor-pointer hover:border-gray-500 transition-all duration-500">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <div className="w-24 h-24 bg-white/10 border border-white/20 flex items-center justify-center rounded-full backdrop-blur-md group-hover:bg-white transition-all duration-300 group-hover:scale-110 z-10">
                   <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-white group-hover:border-l-black border-b-[14px] border-b-transparent ml-3 transition-colors duration-300"></div>
                </div>
             </div>
           </section>

           <section>
             <h2 className="text-4xl font-black uppercase tracking-widest mb-8 border-b-4 border-white pb-6 text-white inline-block">Still Gallery</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-[3/4] bg-gray-900 border border-gray-800 hover:border-white transition-all duration-500 cursor-pointer relative group overflow-hidden">
                     <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-black/80 backdrop-blur-sm transition-all duration-300">
                        <span className="text-sm font-black uppercase tracking-widest text-black bg-white px-6 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View</span>
                     </div>
                  </div>
                ))}
             </div>
           </section>
        </main>
      </div>
    </div>
  );
}
