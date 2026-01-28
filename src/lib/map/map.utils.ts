import type { PlaceCategory, MapBounds } from './map.types'
import { CATEGORY_MARKERS } from './map.config'

/**
 * Get marker configuration for a category
 */
export function getCategoryConfig(category: PlaceCategory) {
  return CATEGORY_MARKERS[category]
}

/**
 * Get marker color for a category
 */
export function getCategoryColor(category: PlaceCategory): string {
  return CATEGORY_MARKERS[category].color
}

/**
 * Get marker icon for a category
 */
export function getCategoryIcon(category: PlaceCategory): string {
  return CATEGORY_MARKERS[category].icon
}

/**
 * Get category label
 */
export function getCategoryLabel(category: PlaceCategory): string {
  return CATEGORY_MARKERS[category].label
}

/**
 * Calculate distance between two points (Haversine formula)
 * Returns distance in kilometers
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/**
 * Check if a point is within map bounds
 */
export function isInBounds(lat: number, lng: number, bounds: MapBounds): boolean {
  return lat >= bounds.south && lat <= bounds.north && lng >= bounds.west && lng <= bounds.east
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`
  }
  return `${km.toFixed(1)}km`
}

/**
 * Check if a place is currently open based on opening hours
 * @param opening_hours - Format: "HH:MM - HH:MM" (e.g., "08:00 - 22:00")
 * @returns true if currently open, false if closed or invalid format
 */
export function isPlaceOpen(opening_hours: string | undefined): boolean {
  if (!opening_hours) return false

  try {
    // Format: "08:00 - 22:00"
    const [start, end] = opening_hours.split(' - ')
    if (!start || !end) return false

    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    const [startH, startM] = start.split(':').map(Number)
    const [endH, endM] = end.split(':').map(Number)

    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) {
      return false
    }

    const startMinutes = startH * 60 + startM
    const endMinutes = endH * 60 + endM

    // Handle hours crossing midnight (e.g., 18:00 - 02:00)
    if (endMinutes < startMinutes) {
      return currentMinutes >= startMinutes || currentMinutes <= endMinutes
    }

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes
  } catch (e) {
    console.error('Error parsing opening hours:', opening_hours, e)
    return false
  }
}
