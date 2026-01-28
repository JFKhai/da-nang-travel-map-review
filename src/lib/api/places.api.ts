import apiClient from './client'
import type { PlaceAPIResponse, PlaceLocation, PlaceCategory } from '@/lib/map/map.types'

interface GetPlacesParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
}

export const getPlacesApi = async (params: GetPlacesParams) => {
  const response = await apiClient.get<{ data: PlaceAPIResponse }>('/places', {
    params,
  })

  // Map backend response to frontend types if needed
  // Backend API returns { data: { places: [], pagination: {} } }
  const result = response.data.data

  // Transform data to match frontend PlaceLocation interface
  const places = result.places.map(
    (place: any): PlaceLocation => ({
      id: place.id,
      name: place.name,
      slug: place.slug,
      // Map the first category slug to the frontend PlaceCategory type
      category: (place.categories?.[0]?.slug as PlaceCategory) || 'landmark',
      categories: place.categories,
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lng),
      address: place.address || '',
      rating: parseFloat(place.averageRating) || 0,
      reviewCount: place.reviewCount || 0,
      image: place.coverImage?.url || place.images?.[0]?.url || '/placeholder.jpg',
      images: place.images,
      description: place.short_description || '',
      opening_hours: place.opening_hours,
      phone: place.phone,
      website: place.website,
    }),
  )

  return {
    places,
    pagination: result.pagination,
  }
}

export const getPlaceByIdApi = async (id: number | string) => {
  const response = await apiClient.get<{ data: any }>(`/places/${id}`)
  const place = response.data.data

  // Transform single place
  return {
    id: place.id,
    name: place.name,
    slug: place.slug,
    category: (place.categories?.[0]?.slug as PlaceCategory) || 'landmark',
    categories: place.categories,
    latitude: parseFloat(place.lat),
    longitude: parseFloat(place.lng),
    address: place.address || '',
    rating: parseFloat(place.averageRating) || 0,
    reviewCount: place.reviewCount || 0,
    image: place.coverImage?.url || place.images?.[0]?.url || '/placeholder.jpg',
    images: place.images,
    description: place.short_description || '',
    opening_hours: place.opening_hours,
    phone: place.phone,
    website: place.website,
  } as PlaceLocation
}

export const getReviewsApi = async (placeId: number | string) => {
  // Correct endpoint corresponds to src/app.js: app.use('/api/review', ...)
  // and src/routes/review.route.js: router.get('/place/:placeId', ...)
  const response = await apiClient.get<{ data: any[] }>(`/review/place/${placeId}`)

  return response.data.data.map((r: any) => ({
    id: r.id,
    userId: r.user_id,
    placeId: r.place_id,
    rating: r.stars, // Backend returns 'stars' not 'rating' based on model check
    content: r.content || '',
    images: r.images?.map((img: any) => img.url) || [],
    createdAt: r.created_at,
    user: {
      id: r.author?.id || 0,
      name: r.author?.full_name || 'Người dùng ẩn danh',
      avatar: r.author?.avatar_url || null, // Fixed: avatar -> avatar_url
      level: 'Thành viên', // Mock level
    },
  }))
}
