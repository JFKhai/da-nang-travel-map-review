import { Suspense } from 'react'
import { GetPlacesParams, placeApiServerRequest } from '@/lib/api/server-api/place.api'
import { PlacesContent } from '@/app/(user)/places/_components/places-content'
import { Sidebar } from '@/app/(user)/places/_components/sidebar'
import { PlacesSkeleton } from '@/app/(user)/places/_components/places-skeleton'

export default async function PlacesPage({ searchParams }: { searchParams: Promise<GetPlacesParams> }) {
  const params = await searchParams
  const search = params.search || ''
  const categories = params.category?.split(',').filter(Boolean) || []
  const page = params.page || 1
  const limit = params.limit || 6

  let allPlaces: any[] = []
  let popularPlaces = []
  let recommendedPlaces = []
  let pagination = {
    currentPage: 1,
    itemsPerPage: limit,
    totalPages: 1,
  }

  try {
    const placesResponse = await placeApiServerRequest.getPlaces({
      page,
      limit,
      search,
      category: categories.join(','),
      sortBy: 'created_at',
      sortOrder: 'DESC',
    })

    console.log(placesResponse)

    allPlaces = placesResponse.data.places || []
    pagination = placesResponse.data.pagination

    // Calculate popular and recommended places
    // vì chưa có api này nên tạm lấy 5 địa điểm đầu tiên làm ví dụ
    popularPlaces = allPlaces.slice(0, 5)
    recommendedPlaces = allPlaces.slice(0, 5)
  } catch (error) {
    console.error('Error fetching places:', error)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5">
      {/* Main Content */}
      <div className="lg:col-span-8">
        <Suspense fallback={<PlacesSkeleton />}>
          <PlacesContent
            places={allPlaces}
            search={search}
            categories={categories}
            page={pagination.currentPage}
            limit={pagination.itemsPerPage}
            totalPages={pagination.totalPages}
          />
        </Suspense>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4">
        <Sidebar popularPlaces={popularPlaces} recommendedPlaces={recommendedPlaces} />
      </div>
    </div>
  )
}
