export function PlacesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl shadow-sm p-6 border border-brand-border/5 animate-pulse">
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg" />
          <div className="h-12 bg-gray-200 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-border/5 animate-pulse"
          >
            <div className="h-56 bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-6 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
