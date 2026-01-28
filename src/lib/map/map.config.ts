import type { PlaceCategory, MarkerConfig } from './map.types'

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

// Category marker configurations
export const CATEGORY_MARKERS: Record<PlaceCategory, MarkerConfig> = {
  'coffee-tea': {
    icon: '☕',
    color: '#F59E0B',
    label: 'Cà phê & Trà',
  },
  food: {
    icon: '🍜',
    color: '#EF4444',
    label: 'Ẩm thực',
  },
  hotel: {
    icon: '🏨',
    color: '#3B82F6',
    label: 'Khách sạn',
  },
  'check-in': {
    icon: '📸',
    color: '#10B981',
    label: 'Check-in',
  },
  history: {
    icon: '🏛️',
    color: '#8B5CF6',
    label: 'Lịch sử',
  },
  entertainment: {
    icon: '🎢',
    color: '#EC4899',
    label: 'Vui chơi',
  },
}

// Map style configuration (optional - for custom map styling)
export const MAP_STYLES = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a2daf2' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: BRAND_COLORS.bg }],
  },
]
