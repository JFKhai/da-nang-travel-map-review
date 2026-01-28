// Map-related TypeScript types

export type PlaceCategory = 'coffee-tea' | 'food' | 'hotel' | 'check-in' | 'history' | 'entertainment'

export interface PlaceImage {
  id: number
  url: string
  caption?: string
  sort_order?: number
}

export interface PlaceLocation {
  id: number
  name: string
  slug: string
  category: PlaceCategory // We will map the primary category here for frontend logic
  categories: { id: number; name: string; slug: string }[] // Full categories from API
  latitude: number
  longitude: number
  address: string
  rating: number
  reviewCount: number
  image: string
  images: PlaceImage[]
  description: string
  priceRange?: string // Optional, might be added later
  opening_hours?: string
  phone?: string
  website?: string
}

export interface PlaceAPIResponse {
  places: PlaceLocation[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface MarkerConfig {
  icon: string
  color: string
  label: string
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

export interface MapViewport {
  center: {
    lat: number
    lng: number
  }
  zoom: number
}

export interface PlaceReview {
  id: number
  userId: number
  placeId: number
  rating: number
  content: string
  images?: string[]
  createdAt: string
  user: {
    id: number
    name: string
    avatar?: string
    level?: string // e.g. "Local Guide"
  }
}
