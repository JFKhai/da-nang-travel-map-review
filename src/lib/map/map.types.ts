// Map-related TypeScript types

export type PlaceCategory = 'beach' | 'restaurant' | 'hotel' | 'attraction' | 'cafe' | 'shopping' | 'landmark'

export interface PlaceLocation {
  id: string
  name: string
  category: PlaceCategory
  latitude: number
  longitude: number
  address: string
  rating: number
  reviewCount: number
  image: string
  description: string
  priceRange?: string // "$", "$$", "$$$"
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
