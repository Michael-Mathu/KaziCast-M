export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 animate-pulse">
      <div className="mb-4 h-8 w-24 bg-surface-variant/50 rounded-lg"></div>
      <header className="mb-8">
        <div className="h-10 w-48 bg-surface-variant/50 rounded-lg mb-2"></div>
        <div className="h-4 w-64 bg-surface-variant/50 rounded-lg mb-6"></div>
      </header>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="card overflow-hidden h-64 bg-surface-variant/50 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
