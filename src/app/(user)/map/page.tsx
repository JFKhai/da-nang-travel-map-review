'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Map } from '@/components/map/Map'
import { MapMarker } from '@/components/map/MapMarker'
import { MapInfoWindow } from '@/components/map/MapInfoWindow'
import { CategoryFilter } from '@/components/map/CategoryFilter'
import { PlaceListSidebar } from '@/components/map/PlaceListSidebar'
import { MOCK_PLACES } from '@/lib/map/mock-places'
import type { PlaceLocation, PlaceCategory, MapViewport } from '@/lib/map/map.types'
import { isInBounds } from '@/lib/map/map.utils'

export default function MapPage() {
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<PlaceCategory[]>([
    'beach',
    'restaurant',
    'hotel',
    'attraction',
    'cafe',
    'shopping',
    'landmark',
  ])
  const [hoveredPlace, setHoveredPlace] = useState<PlaceLocation | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<PlaceLocation | null>(null)
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null)

  // Filter places by selected categories
  const filteredPlaces = useMemo(() => {
    return MOCK_PLACES.filter((place) => selectedCategories.includes(place.category))
  }, [selectedCategories])

  // Filter places by viewport (for sidebar)
  const visiblePlaces = useMemo(() => {
    if (!mapBounds) return filteredPlaces

    return filteredPlaces.filter((place) => {
      const bounds = {
        north: mapBounds.getNorthEast().lat(),
        south: mapBounds.getSouthWest().lat(),
        east: mapBounds.getNorthEast().lng(),
        west: mapBounds.getSouthWest().lng(),
      }
      return isInBounds(place.latitude, place.longitude, bounds)
    })
  }, [filteredPlaces, mapBounds])

  // Count places per category
  const placeCounts = useMemo(() => {
    const counts: Record<PlaceCategory, number> = {
      beach: 0,
      restaurant: 0,
      hotel: 0,
      attraction: 0,
      cafe: 0,
      shopping: 0,
      landmark: 0,
    }
    MOCK_PLACES.forEach((place) => {
      counts[place.category]++
    })
    return counts
  }, [])

  const handleCameraChanged = useCallback((viewport: MapViewport) => {
    // Update bounds when map moves
    // Note: We'll need to get actual bounds from the map
    // For now, this is a placeholder
  }, [])

  const handlePlaceClick = useCallback(
    (place: PlaceLocation) => {
      // Navigate to place detail page
      router.push(`/place/${place.id}`)
    },
    [router],
  )

  const handleMarkerClick = useCallback((place: PlaceLocation) => {
    setSelectedPlace(place)
  }, [])

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="font-cabinet-grotesk text-2xl font-bold text-brand-teal">Khám phá Đà Nẵng</h1>
        <p className="text-sm text-gray-600">Tìm kiếm và khám phá các địa điểm du lịch tuyệt vời</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Place List */}
        <div className="w-2/5 overflow-y-auto border-r border-gray-200 bg-brand-bg p-4">
          {/* Category Filter */}
          <div className="mb-4">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              placeCounts={placeCounts}
            />
          </div>

          {/* Place List */}
          <PlaceListSidebar
            places={visiblePlaces}
            onPlaceHover={setHoveredPlace}
            onPlaceClick={handlePlaceClick}
            hoveredPlaceId={hoveredPlace?.id}
          />
        </div>

        {/* Right Side - Map */}
        <div className="flex-1">
          <Map onCameraChanged={handleCameraChanged}>
            {/* Render markers for filtered places */}
            {filteredPlaces.map((place) => (
              <MapMarker
                key={place.id}
                place={place}
                onClick={handleMarkerClick}
                onHover={setHoveredPlace}
                isHighlighted={hoveredPlace?.id === place.id}
              />
            ))}

            {/* Info Window */}
            {selectedPlace && <MapInfoWindow place={selectedPlace} onClose={() => setSelectedPlace(null)} />}
          </Map>
        </div>
      </div>
    </div>
  )
}
