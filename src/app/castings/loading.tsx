export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 flex flex-col md:flex-row gap-8 animate-pulse">
      {/* Filters Sidebar Skeleton */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="card p-5 h-96 bg-surface-variant/50 rounded-xl"></div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1">
        <div className="mb-4 h-8 w-24 bg-surface-variant/50 rounded-lg"></div>
        <header className="mb-8 flex justify-between items-end">
          <div>
            <div className="h-10 w-48 bg-surface-variant/50 rounded-lg mb-2"></div>
            <div className="h-4 w-32 bg-surface-variant/50 rounded-lg"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-6 h-40 bg-surface-variant/50 rounded-xl"></div>
          ))}
        </div>
      </main>
    </div>
  );
}
