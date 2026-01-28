import type { PlaceCategory, MarkerConfig } from './map.types'
import { faMugHot, faUtensils, faHotel, faCamera, faLandmark, faMusic } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

// Brand colors from globals.css
export const BRAND_COLORS = {
  teal: '#3d8e95',
  light: '#d9ed82',
  dark: '#246e79',
  border: '#1b485a',
  bg: '#eef4f7',
} as const

// Default map configuration
export const DEFAULT_MAP_CONFIG = {
  center: {
    lat: 16.0544, // Da Nang city center
    lng: 108.2022,
  },
  zoom: 13,
  minZoom: 10,
  maxZoom: 18,
} as const

// Category marker configurations with Font Awesome icons
// Using distinct colors like Google Maps for easy visual differentiation
export const CATEGORY_MARKERS: Record<PlaceCategory, MarkerConfig> = {
  'coffee-tea': {
    icon: faMugHot,
    color: '#D4A574', // Brown/tan for coffee
    label: 'Cà phê & Trà',
  },
  food: {
    icon: faUtensils,
    color: '#FF6B35', // Orange for restaurants
    label: 'Ẩm thực',
  },
  hotel: {
    icon: faHotel,
    color: '#4A90E2', // Blue for hotels
    label: 'Khách sạn',
  },
  'check-in': {
    icon: faCamera,
    color: '#9B59B6', // Purple for photo spots
    label: 'Check-in',
  },
  history: {
    icon: faLandmark,
    color: '#E74C3C', // Red for historical sites
    label: 'Lịch sử',
  },
  entertainment: {
    icon: faMusic,
    color: '#F39C12', // Yellow/gold for entertainment
    label: 'Vui chơi',
  },
}

// Map style configuration (optional - for custom map styling)
