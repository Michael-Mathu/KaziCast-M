import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 py-32 md:py-48 flex items-center justify-center min-h-[80vh] overflow-hidden">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay hover:scale-105 transition-transform duration-[10s]"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-block border border-gray-800 px-4 py-1.5 mb-8 text-xs md:text-sm font-semibold tracking-widest uppercase text-gray-300 backdrop-blur-sm">
            East Africa's Premier Casting Hub
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white">
            KaziCast
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed">
            A zero-friction, scalable platform connecting visionary directors with exceptional talent in the East African film industry. Strict monochrome architecture.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link 
              href="/castings" 
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Find a Role
            </Link>
            <Link 
              href="/talent" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Browse Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Marquee Section */}
      <section className="border-y border-gray-800 bg-black py-8 overflow-hidden flex items-center">
        <div className="whitespace-nowrap flex gap-16 animate-[spin_10s_linear_infinite] md:animate-none md:justify-center md:flex-wrap w-full px-4 text-gray-500 font-mono text-sm uppercase tracking-widest">
           <span>100+ Active Castings</span>
           <span className="hidden md:inline">•</span>
           <span>500+ Verified Actors</span>
           <span className="hidden md:inline">•</span>
           <span>Zero Budget Infrastructure</span>
           <span className="hidden md:inline">•</span>
           <span>Next.js & NestJS</span>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide">For Directors & Producers</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Post casting calls instantly. Filter through a curated roster of East African talent. Use our dedicated tools to build your cast without the overhead of traditional agencies.
            </p>
            <ul className="space-y-4">
              {['Secure messaging', 'Instant portfolio reviews', 'Direct booking'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 uppercase tracking-widest text-sm font-semibold border-l-2 border-gray-700 pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-square border border-gray-800 bg-gray-900/50 p-8 flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-700"></div>
             <div className="text-center z-10">
               <span className="text-8xl font-black text-gray-800 group-hover:text-white transition-colors duration-500">PRODUCTION</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
