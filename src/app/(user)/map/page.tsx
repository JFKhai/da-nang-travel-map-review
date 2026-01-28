'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Map } from '@/components/map/map'
import { MapMarker } from '@/components/map/map-marker'
import { MapInfoWindow } from '@/components/map/map-info-window'
import { CategoryFilter } from '@/components/map/category-filter'
import { PlaceListSidebar } from '@/components/map/place-list-sidebar'
import { PlaceDetailSidebar } from '@/components/map/place-detail-sidebar'
import { SearchInput } from '@/components/map/search-input'
import { useMapFilters } from '@/components/map/use-map-filters'
import { getPlacesApi } from '@/lib/api/places.api'
// import { getMyFavoritesApi, toggleFavoriteApi } from '@/lib/api/favorites.api' // TODO: Implement by other team member
import type { PlaceLocation, PlaceCategory, MapViewport } from '@/lib/map/map.types'
import { isInBounds } from '@/lib/map/map.utils'
import { useRecentPlaces } from '@/lib/hooks/useRecentPlaces'
import { MapSidebarNav, type NavTab } from '@/components/map/map-sidebar-nav'

export default function MapPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  // Custom hooks
  const { filters, setCategories, setSearch } = useMapFilters()
  const { recentPlaces, addPlace } = useRecentPlaces()

  // State
  const [places, setPlaces] = useState<PlaceLocation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewport, setViewport] = useState<MapViewport | null>(null)
  const [hoveredPlace, setHoveredPlace] = useState<PlaceLocation | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<PlaceLocation | null>(null)
  const [activeTab, setActiveTab] = useState<NavTab>('all')
  const [minRating, setMinRating] = useState<number>(0)
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
  //   const fetchFavorites = async () => {
  //     if (status === 'authenticated') {
  //       try {
  //         const favorites = await getMyFavoritesApi()
  //         setFavoriteIds(new Set(favorites.map((f) => f.id)))
  //       } catch (error) {
  //         console.error('Failed to fetch favorites:', error)
  //       }
  //     }
  //   }
  //   fetchFavorites()
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
  }, [places, activeTab, recentPlaces])

  // Apply filters (categories, search, rating, open-now)
  const displayedPlaces = useMemo(() => {
    let baseList = filteredByTab

    // Category filter
    if (filters.categories.length > 0) {
      baseList = baseList.filter((p) => filters.categories.includes(p.category))
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      baseList = baseList.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.address?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower),
      )
    }

    // Rating filter
    if (minRating > 0) {
      baseList = baseList.filter((p) => p.rating >= minRating)
    }

    return baseList
  }, [filteredByTab, filters.categories, filters.search, minRating])

  // Count places per category
  const placeCounts = useMemo(() => {
    const counts: Record<PlaceCategory, number> = {
      beach: 0,
      restaurant: 0,
      hotel: 0,
      attraction: 0,
      cafe: 0,
      shopping: 0,
      nightlife: 0,
      landmark: 0,
    }

    displayedPlaces.forEach((place) => {
      if (place.category in counts) {
        counts[place.category]++
      }
    })

    return counts
  }, [displayedPlaces])

  // Handlers
  const handleCameraChanged = useCallback((newViewport: MapViewport) => {
    setViewport(newViewport)
  }, [])

  const handleMarkerClick = useCallback(
    (place: PlaceLocation) => {
      setSelectedPlace(place)
      addPlace(place)
    },
    [addPlace],
  )

  const handlePlaceClick = useCallback(
    (place: PlaceLocation) => {
      setSelectedPlace(place)
      addPlace(place)
    },
    [addPlace],
  )

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
              placeCounts={placeCounts}
            />
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="absolute bottom-4 left-4 top-[80px] z-20 flex w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="flex-1 overflow-y-auto bg-white">
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
                onPlaceHover={setHoveredPlace}
                onPlaceClick={handlePlaceClick}
                hoveredPlaceId={hoveredPlace?.id}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        {/* Map */}
        <div className="absolute inset-0 z-0">
          <Map onCameraChanged={handleCameraChanged}>
            {displayedPlaces.map((place) => (
              <MapMarker
                key={place.id}
                place={place}
                onClick={handleMarkerClick}
                onHover={setHoveredPlace}
                isHighlighted={hoveredPlace?.id === place.id}
              />
            ))}
            {hoveredPlace && !selectedPlace && (
              <MapInfoWindow place={hoveredPlace} onClose={() => setHoveredPlace(null)} />
            )}
          </Map>
        </div>
      </div>
    </div>
  )
}
