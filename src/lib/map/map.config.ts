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
  beach: {
    icon: '🏖️',
    color: BRAND_COLORS.teal,
    label: 'Bãi biển',
  },
  restaurant: {
    icon: '🍜',
    color: '#FF6B35',
    label: 'Nhà hàng',
  },
  hotel: {
    icon: '🏨',
    color: '#8B5CF6',
    label: 'Khách sạn',
  },
  attraction: {
    icon: '🎭',
    color: '#EF4444',
    label: 'Điểm tham quan',
  },
  cafe: {
    icon: '☕',
    color: '#92400E',
    label: 'Quán cà phê',
  },
  shopping: {
    icon: '🛍️',
    color: '#EC4899',
    label: 'Mua sắm',
  },
  landmark: {
    icon: '🌉',
    color: '#F59E0B',
    label: 'Địa danh',
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
