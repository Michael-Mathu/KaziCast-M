export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 animate-pulse">
      <div className="h-10 w-48 bg-surface-variant/50 rounded-lg mb-2"></div>
      <div className="h-4 w-64 bg-surface-variant/50 rounded-lg mb-8"></div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-6 h-32 bg-surface-variant/50 rounded-xl"></div>
        ))}
      </div>

      {/* Main Content Areas Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6 h-64 bg-surface-variant/50 rounded-xl"></div>
        <div className="card p-6 h-64 bg-surface-variant/50 rounded-xl"></div>
      </div>
    </div>
  );
}
