import { Suspense } from 'react'
import { placeApiServerRequest } from '@/lib/api/server-api/place.api'
import PlacesTable from './_components/places-table'
import PlacesSkeleton from './_components/skeleton'
import { GetPlacesParams } from '@/lib/api/server-api/place.api'
import { PaginationType } from '@/lib/schemas/pagination.schema'

export default async function PlacesPage({ searchParams }: { searchParams: Promise<GetPlacesParams> }) {
  const params = await searchParams
  const search = params.search || ''
  const categories = params.category?.split(',').filter(Boolean) || []
  let allPlaces: any[] = []
  let pagination: PaginationType = {
    currentPage: params.page || 1,
    itemsPerPage: params.limit || 10,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  }
  try {
    const placesResponse = await placeApiServerRequest.getPlaces({
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 10,
      search: params.search,
      category: params.category,
    })
    allPlaces = placesResponse.data.places || []
    pagination = placesResponse.data.pagination
  } catch (error) {}

  return (
    <Suspense fallback={<PlacesSkeleton />}>
      <PlacesTable places={allPlaces} pagination={pagination} categories={categories} search={search} />
    </Suspense>
  )
}
