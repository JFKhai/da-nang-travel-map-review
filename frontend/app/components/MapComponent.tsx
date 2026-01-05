'use client'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useState, useEffect } from 'react'
import { type Place } from '@/app/types'
import { DA_NANG_CENTER, MAP_CONFIG, MARKER_COLORS, API_ENDPOINTS } from '@/app/constants'

/**
 * Sample places data - used as fallback when API is unavailable
 */
const samplePlaces: Place[] = [
  {
    id: 1,
    name: 'My Khe Beach',
    lat: 16.0397,
    lng: 108.2422,
    type: 'attraction'
  },
  {
    id: 2,
    name: 'Dragon Bridge',
    lat: 16.0611,
    lng: 108.2270,
    type: 'attraction'
  },
  {
    id: 3,
    name: 'Ba Na Hills',
    lat: 15.9957,
    lng: 107.9923,
    type: 'attraction'
  }
]

/**
 * Generate custom marker icon based on place type
 * @param type - Place type (restaurant, cafe, hotel, attraction)
 * @returns Google Maps marker configuration
 */
const getMarkerIcon = (type: string) => {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: MARKER_COLORS[type as keyof typeof MARKER_COLORS] || MARKER_COLORS.attraction,
    fillOpacity: 1,
    strokeColor: '#fff',
    strokeWeight: 2,
    scale: 8
  }
}

/**
 * API response interface for place data
 */
interface ApiPlace {
  id: number
  name: string
  latitude: number
  longitude: number
  type?: string
}

/**
 * MapComponent
 * 
 * Interactive Google Maps display showing places in Da Nang
 * Features:
 * - Custom colored markers by place type
 * - Fetches places from API with fallback data
 * - Click handlers for place selection
 * - Error handling and loading states
 * - Responsive map container
 */
export default function MapComponent() {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null)
  const [places, setPlaces] = useState<Place[]>(samplePlaces)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPlaces()
  }, [])

  /**
   * Fetch places data from API
   * Falls back to sample data if API is unavailable
   */
  const fetchPlaces = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    
    if (!apiUrl) {
      setError('API URL is not configured')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${apiUrl}${API_ENDPOINTS.places}`)
      
      if (response.ok) {
        const data: ApiPlace[] = await response.json()
        // Transform API data to match Place interface
        const formattedPlaces: Place[] = data.map((place) => ({
          id: place.id,
          name: place.name,
          lat: place.latitude,
          lng: place.longitude,
          type: place.type || 'attraction'
        }))
        setPlaces(formattedPlaces)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch places')
    } finally {
      setLoading(false)
    }
  }

  const onLoad = (map: google.maps.Map) => {
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  const handleMarkerClick = (placeId: number) => {
    setSelectedPlace(placeId)
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className="text-center py-10 text-red-600">
        Google Maps API key is not configured
      </div>
    )
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      loadingElement={<div className="text-center py-10">Loading map...</div>}
    >
      {loading && (
        <div className="text-center py-4 text-gray-600">
          Loading places data...
        </div>
      )}
      {error && (
        <div className="text-center py-4 text-yellow-600">
          Using sample data: {error}
        </div>
      )}
      <GoogleMap
        mapContainerStyle={MAP_CONFIG.containerStyle}
        center={DA_NANG_CENTER}
        zoom={MAP_CONFIG.defaultZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={MAP_CONFIG.options}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            onClick={() => handleMarkerClick(place.id)}
            icon={getMarkerIcon(place.type)}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}
