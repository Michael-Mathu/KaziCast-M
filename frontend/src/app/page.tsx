export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto border border-gray-800 p-8">
        <header className="mb-12 border-b border-gray-800 pb-4">
          <h1 className="text-4xl font-bold uppercase tracking-widest">Unparalleled Hermits</h1>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-wide">Casting & Aggregator Platform | Debug View</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Active Castings</h2>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="border-l-2 border-gray-600 pl-4 py-1">Fetching jobs from API...</li>
            </ul>
          </div>
          
          <div className="border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">System Status</h2>
            <div className="text-xs text-gray-500 font-mono space-y-2">
              <p>Environment: DEVELOPMENT</p>
              <p>Frontend: Next.js (Strict Black & White Theme)</p>
              <p>Backend: NestJS (Awaiting Connection)</p>
              <p>Database: Prisma/PostgreSQL</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
