/**
 * Google Maps Configuration
 */

// Default center coordinates for Da Nang city
export const DA_NANG_CENTER = {
  lat: 16.0544,
  lng: 108.2022,
}

// Map display configuration
export const MAP_CONFIG = {
  defaultZoom: 13,
  containerStyle: {
    width: '100%',
    height: '600px',
  },
  options: {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
  },
}

// Color scheme for different types of map markers
export const MARKER_COLORS = {
  restaurant: '#FF6B6B', // Red
  cafe: '#FFA500',       // Orange
  hotel: '#4ECDC4',      // Teal
  attraction: '#45B7D1'  // Blue
}

/**
 * UI Configuration
 */

// Auto-rotate interval for destination carousel (in milliseconds)
export const CAROUSEL_AUTO_ROTATE_INTERVAL = 5000

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  places: '/api/places',
  destinations: '/api/destinations',
  reviews: '/api/reviews',
}
