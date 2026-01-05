/**
 * Destination interface - represents a tourist destination or place
 */
export interface Destination {
  id: number
  name: string
  address: string
  image: string
  rating: number
  cost: number
  openTime: string
  closeTime: string
  tags: string[]
  favorite?: boolean
}

/**
 * Place interface - represents a location on the map
 */
export interface Place {
  id: number
  name: string
  lat: number
  lng: number
  type: string
}

/**
 * Map marker color types
 */
export interface MapMarkerType {
  restaurant: string
  cafe: string
  hotel: string
  attraction: string
}

/**
 * User interface - represents authenticated user data
 */
export interface User {
  id: number
  name?: string
  email?: string
  role?: 'admin' | 'user'
}
