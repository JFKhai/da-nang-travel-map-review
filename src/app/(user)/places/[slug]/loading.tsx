export default function PlaceDetailLoading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery Skeleton */}
            <div className="mb-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-teal/10 animate-pulse">
              <div className="h-[500px] bg-gray-200" />
            </div>

            {/* Description Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-teal/10 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>

            {/* Location & Map Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-teal/10 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="h-[400px] bg-gray-200 rounded-xl" />
            </div>

            {/* Reviews Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-teal/10 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32 mb-6" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-brand-teal/10 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Rating Card Skeleton */}
              <div className="bg-gradient-to-br from-brand-light/20 to-brand-teal/20 rounded-2xl p-6 border border-brand-teal/20 animate-pulse">
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-12 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded-full w-16" />
                  ))}
                </div>
              </div>

              {/* Contact Info Card Skeleton */}
              <div className="bg-white border border-brand-teal/20 rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gray-200 rounded shrink-0 mt-1" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-12 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
