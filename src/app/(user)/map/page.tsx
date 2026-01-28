'use client'

import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/components/providers/app-provider'
import { Map } from '@/components/map/map'
import { MapMarker } from '@/components/map/map-marker'
import { MapInfoWindow } from '@/components/map/map-info-window'
import { MapZoomControls } from '@/components/map/map-zoom-controls'
import { CategoryFilter } from '@/components/map/category-filter'
import { PlaceListSidebar } from '@/components/map/place-list-sidebar'
import { PlaceDetailSidebar } from '@/components/map/place-detail-sidebar'
import { SearchInput } from '@/components/map/search-input'
import { useMapFilters } from '@/components/map/use-map-filters'
import { getPlacesApi } from '@/lib/api/client-api/map.api'
// import { getMyFavoritesApi, toggleFavoriteApi } from '@/lib/api/favorites.api' // TODO: Implement by other team member
import type { PlaceLocation, PlaceCategory, MapViewport } from '@/lib/map/map.types'
import { useRecentPlaces } from '@/lib/hooks/useRecentPlaces'
import { MapSidebarNav, type NavTab } from '@/components/map/map-sidebar-nav'

export default function MapPage() {
  // Custom hooks
  const { filters, setCategories, setSearch } = useMapFilters()
  const { recentPlaces, addPlace } = useRecentPlaces()

  // State
  const [places, setPlaces] = useState<PlaceLocation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredPlace, setHoveredPlace] = useState<PlaceLocation | null>(null)
  const [hoveredFromMarker, setHoveredFromMarker] = useState(false) // Track hover source
  const [selectedPlace, setSelectedPlace] = useState<PlaceLocation | null>(null)
  const [activeTab, setActiveTab] = useState<NavTab>('all')
  const [minRating, setMinRating] = useState<number>(0)
  const mapInstanceRef = useRef<any>(null)
  // const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set()) // TODO: Implement favorites
  // const [showLoginDialog, setShowLoginDialog] = useState(false) // TODO: Implement favorites

  // Fetch places
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true)
        const { places: fetchedPlaces } = await getPlacesApi({ limit: 100 })
        setPlaces(fetchedPlaces)
      } catch (error) {
        console.error('Failed to fetch places:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlaces()
  }, [])

  // TODO: Implement favorites feature
  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     const fetchFavorites = async () => {
  //       try {
  //         const favorites = await getMyFavoritesApi()
  //         setFavoriteIds(new Set(favorites.map((f) => f.id)))
  //       } catch (error) {
  //         console.error('Failed to fetch favorites:', error)
  //       }
  //     }
  //     fetchFavorites()
  //   }
  // }, [status])

  // TODO: Implement toggle favorite
  // const handleToggleFavorite = async (placeId: number) => {
  //   if (status !== 'authenticated') {
  //     setShowLoginDialog(true)
  //     return
  //   }
  //   try {
  //     await toggleFavoriteApi(placeId)
  //     setFavoriteIds((prev) => {
  //       const newSet = new Set(prev)
  //       if (newSet.has(placeId)) {
  //         newSet.delete(placeId)
  //       } else {
  //         newSet.add(placeId)
  //       }
  //       return newSet
  //     })
  //   } catch (error) {
  //     console.error('Failed to toggle favorite:', error)
  //   }
  // }

  // Filter places based on active tab
  const filteredByTab = useMemo(() => {
    if (activeTab === 'all') return places
    // TODO: Implement favorites tab
    // if (activeTab === 'favorites') {
    //   return places.filter((p) => favoriteIds.has(p.id))
    // }
    if (activeTab === 'recent') {
      const recentIds = new Set(recentPlaces.map((p) => p.id))
      return places.filter((p) => recentIds.has(p.id))
    }
    return places
  }, [activeTab, places, recentPlaces])

  // Apply filters
  const displayedPlaces = useMemo(() => {
    return filteredByTab.filter((place) => {
      // Filter by search
      if (filters.search && !place.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      // Filter by categories
      if (filters.categories.length > 0 && !filters.categories.includes(place.category)) {
        return false
      }

      // Filter by minimum rating
      if (place.rating < minRating) {
        return false
      }

      return true
    })
  }, [filteredByTab, filters, minRating])

  // Count places per category
  const categoryCounts = useMemo(() => {
    const counts: Record<PlaceCategory, number> = {
      'coffee-tea': 0,
      food: 0,
      hotel: 0,
      'check-in': 0,
      history: 0,
      entertainment: 0,
    }

    displayedPlaces.forEach((place) => {
      if (place.category in counts) {
        counts[place.category]++
      }
    })

    return counts
  }, [displayedPlaces])

  // Handlers
  const handleSelectPlace = useCallback(
    (place: PlaceLocation) => {
      setSelectedPlace(place)
      addPlace(place)

      // Focus map on the selected place with "Google Maps-like" fly effect
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo({
          center: [place.longitude, place.latitude],
          padding: { left: 200, top: 50, right: 50, bottom: 50 }, // Account for sidebar
          speed: 0.4, // Much slower speed for "cinematic" smoothness
          curve: 1, // Flatter curve (same as zoom)
          essential: true,
        })
      }
    },
    [addPlace],
  )

  const handleMarkerHover = useCallback((place: PlaceLocation | null) => {
    setHoveredPlace(place)
    setHoveredFromMarker(!!place)
  }, [])

  const clearHoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastPannedPlaceRef = useRef<number | null>(null)

  const handleSidebarHover = useCallback((place: PlaceLocation | null) => {
    if (clearHoverTimerRef.current) {
      clearTimeout(clearHoverTimerRef.current)
      clearHoverTimerRef.current = null
    }

    if (!place) {
      // Debounce clearing to prevent popup from closing when moving between items
      clearHoverTimerRef.current = setTimeout(() => {
        setHoveredPlace(null)
        setHoveredFromMarker(false)
        lastPannedPlaceRef.current = null
      }, 50) // Short delay to allow mouseenter on next item
      return
    }

    // Set hovered place immediately for visual feedback
    setHoveredPlace(place)
    setHoveredFromMarker(false)
  }, [])

  return (
    <div className="flex flex-1 h-full w-full overflow-hidden bg-gray-100">
      {/* 1. Left Navigation Rail */}
      <MapSidebarNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
          setSelectedPlace(null)
        }}
        minRating={minRating}
        onMinRatingChange={(rating) => setMinRating(rating ?? 0)}
        showLoginDialog={false}
        onCloseLoginDialog={() => {}}
        onShowLoginDialog={() => {}}
      />

      {/* Main Content Area */}
      <div className="relative flex-1 h-full">
        {/* Floating Header */}
        <div className="absolute left-4 right-4 top-4 z-30 flex items-start gap-3 pointer-events-none">
          <div className="pointer-events-auto w-[400px]">
            <SearchInput value={filters.search} onChange={setSearch} placeholder="Tìm kiếm danh mục, địa điểm..." />
          </div>
          <div className="pointer-events-auto min-w-0 flex-1 pt-1">
            <CategoryFilter
              selectedCategories={filters.categories}
              onCategoryChange={setCategories}
              placeCounts={categoryCounts}
            />
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="absolute bottom-4 left-4 top-[80px] z-20 flex w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="flex-1 overflow-hidden bg-white">
            {selectedPlace ? (
              <PlaceDetailSidebar
                place={selectedPlace}
                onClose={() => setSelectedPlace(null)}
                isFavorite={false}
                onToggleFavorite={() => {}}
              />
            ) : (
              <PlaceListSidebar
                places={displayedPlaces}
                onPlaceHover={handleSidebarHover}
                onPlaceClick={handleSelectPlace}
                hoveredPlaceId={hoveredFromMarker ? null : hoveredPlace?.id}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        {/* Map */}
        <div className="absolute inset-0 z-0">
          <Map onMapReady={(map) => (mapInstanceRef.current = map)}>
            {displayedPlaces.map((place) => (
              <MapMarker
                key={place.id}
                place={place}
                onClick={handleSelectPlace}
                onHover={handleMarkerHover}
                isHighlighted={selectedPlace?.id === place.id}
              />
            ))}
            {hoveredPlace && !selectedPlace && (
              <MapInfoWindow
                key={hoveredPlace.id}
                place={hoveredPlace}
                onClose={() => setHoveredPlace(null)}
                immediate={!hoveredFromMarker}
              />
            )}
          </Map>

          {/* Zoom Controls */}
          <div className="absolute bottom-8 right-4 z-10">
            <MapZoomControls
              onZoomIn={() => {
                if (!mapInstanceRef.current) return
                mapInstanceRef.current.flyTo({
                  zoom: mapInstanceRef.current.getZoom() + 1,
                  speed: 0.4,
                  curve: 1,
                  essential: true,
                })
              }}
              onZoomOut={() => {
                if (!mapInstanceRef.current) return
                mapInstanceRef.current.flyTo({
                  zoom: mapInstanceRef.current.getZoom() - 1,
                  speed: 0.4,
                  curve: 1,
                  essential: true,
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
