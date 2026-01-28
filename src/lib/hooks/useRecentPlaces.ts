import { useState, useEffect, useCallback } from 'react'
import type { PlaceLocation } from '@/lib/map/map.types'

const MAX_RECENT_PLACES = 20
const STORAGE_KEY = 'dn_recent_places'

export function useRecentPlaces() {
  const [recentPlaces, setRecentPlaces] = useState<PlaceLocation[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRecentPlaces(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load recent places', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Add a place to recent list
  const addPlace = useCallback((place: PlaceLocation) => {
    setRecentPlaces((prev) => {
      // Remove if already exists to move to top
      const filtered = prev.filter((p) => p.id !== place.id)
      const newRecent = [place, ...filtered].slice(0, MAX_RECENT_PLACES)

      // Persist
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecent))
      } catch (e) {
        console.error('Failed to save recent place', e)
      }

      return newRecent
    })
  }, [])

  return { recentPlaces, addPlace, isLoaded }
}
