import { Skeleton } from 'primereact/skeleton'

export default function UsersSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      {/* Search Skeleton */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1">
          <Skeleton height="2.75rem" className="rounded-lg" />
        </div>
        <Skeleton width="6rem" height="2.75rem" className="rounded-lg" />
      </div>

      {/* User Cards Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton shape="circle" size="3rem" />
                <div className="flex-1 space-y-2">
                  <Skeleton width="40%" height="1.25rem" className="rounded" />
                  <Skeleton width="60%" height="1rem" className="rounded" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton width="4rem" height="2rem" className="rounded-md" />
                <Skeleton width="4rem" height="2rem" className="rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
