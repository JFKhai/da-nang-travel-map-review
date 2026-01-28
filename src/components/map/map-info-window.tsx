'use client'

import { useEffect, useRef } from 'react'
import type { PlaceLocation } from '@/lib/map/map.types'
import { getCategoryLabel, isPlaceOpen } from '@/lib/map/map.utils'
import { POPUP_CONFIG, HOVER_DELAY } from '@/lib/map/map.config'
import { escapeHtml } from '@/lib/utils'
import { useMap } from './map-context'
import { goongjs } from './map'

/**
 * Props for the MapInfoWindow component
 */
interface MapInfoWindowProps {
  /** The place to display information for */
  place: PlaceLocation
  /** Callback fired when the info window is closed */
  onClose: () => void
  /** Whether to show immediately (from sidebar) or with delay (from marker) */
  immediate?: boolean
}

/**
 * Builds HTML content for the popup with XSS prevention
 */
function buildPopupHTML(place: PlaceLocation): string {
  // Determine if place is open
  let openStatusHTML = ''
  if (place.opening_hours) {
    const isOpen = isPlaceOpen(place.opening_hours)
    if (isOpen === null) {
      openStatusHTML = `<span class="text-xs text-gray-500">Giờ mở cửa: ${escapeHtml(place.opening_hours)}</span>`
    } else if (isOpen) {
      openStatusHTML = `<span class="text-xs font-medium text-green-600">Đang mở cửa</span>`
    } else {
      openStatusHTML = `<span class="text-xs font-medium text-red-600">Đã đóng cửa</span>`
    }
  }

  return `
    <div class="w-64 overflow-hidden rounded-lg">
      <div class="relative h-32 w-full overflow-hidden bg-gray-200">
        <img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}" class="h-full w-full object-cover" onerror="this.style.display='none'" />
      </div>
      <div class="p-3">
        <div class="mb-1 flex items-start justify-between gap-2">
          <h3 class="font-cabinet-grotesk text-sm font-semibold text-brand-dark">${escapeHtml(place.name)}</h3>
          ${place.priceRange ? `<span class="text-xs text-gray-500">${escapeHtml(place.priceRange)}</span>` : ''}
        </div>
        <p class="mb-2 text-xs text-gray-600">${escapeHtml(getCategoryLabel(place.category))}</p>
        <div class="mb-2 flex items-center gap-2">
          <div class="flex items-center">
            <span class="text-xs text-yellow-500">★</span>
            <span class="ml-1 text-xs font-medium">${escapeHtml(place.rating)}</span>
          </div>
          <span class="text-xs text-gray-400">(${escapeHtml(place.reviewCount)} reviews)</span>
          ${openStatusHTML ? `<span class="text-xs text-gray-300">•</span>${openStatusHTML}` : ''}
        </div>
        <p class="line-clamp-2 text-xs text-gray-600">${escapeHtml(place.description)}</p>
      </div>
    </div>
  `
}

export function MapInfoWindow({ place, onClose, immediate = false }: MapInfoWindowProps) {
  const map = useMap()
  const popupRef = useRef<any>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isCancelledRef = useRef(false)
  const isProgrammaticCloseRef = useRef(false)

  useEffect(() => {
    if (!map || !goongjs) return

    // Reset flags
    isCancelledRef.current = false
    isProgrammaticCloseRef.current = false

    // CRITICAL: Clean up any existing popup first to prevent multiple popups
    if (popupRef.current) {
      isProgrammaticCloseRef.current = true // Prevent triggering onClose
      popupRef.current.remove()
      popupRef.current = null
      isProgrammaticCloseRef.current = false
    }

    // Clear any pending timers
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    const createPopup = () => {
      // CRITICAL: Don't create popup if effect was cancelled
      if (isCancelledRef.current) return

      // Double-check: remove old popup before creating new one
      if (popupRef.current) {
        isProgrammaticCloseRef.current = true // Prevent triggering onClose
        popupRef.current.remove()
        popupRef.current = null
        isProgrammaticCloseRef.current = false
      }

      // Create popup with configuration from config
      const popup = new goongjs.Popup({
        closeButton: true,
        closeOnClick: false,
        offset: POPUP_CONFIG.offset,
        maxWidth: POPUP_CONFIG.maxWidth,
        className: POPUP_CONFIG.className,
        anchor: POPUP_CONFIG.anchor,
      })
        .setLngLat([place.longitude, place.latitude])
        .setHTML(buildPopupHTML(place))
        .addTo(map)

      popup.on('close', () => {
        // Only trigger onClose if it's NOT a programmatic close (e.g. user clicked X, or cleanup)
        if (!isProgrammaticCloseRef.current) {
          onClose()
        }
      })

      popupRef.current = popup
    }

    const showPopup = () => {
      // CRITICAL: Don't show popup if effect was cancelled
      if (isCancelledRef.current) return

      // Preload image first to prevent flickering
      const img = new Image()
      img.src = place.image

      // If image is already cached, show immediately
      if (img.complete) {
        createPopup()
      } else {
        // Wait for image to load before showing popup
        img.onload = () => {
          if (!isCancelledRef.current) createPopup()
        }
        img.onerror = () => {
          if (!isCancelledRef.current) createPopup()
        }
      }
    }

    if (immediate) {
      // Show immediately for sidebar hover
      showPopup()
    } else {
      // Delay for marker hover using configured delay
      timerRef.current = setTimeout(showPopup, HOVER_DELAY.popup)
    }

    return () => {
      // Mark as cancelled to prevent async callbacks from creating popups
      isCancelledRef.current = true

      // Cleanup on unmount or when place changes
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      if (popupRef.current) {
        // Set flag to prevent onClose from firing during cleanup
        isProgrammaticCloseRef.current = true
        popupRef.current.remove()
        popupRef.current = null
        // No need to reset flag as component is unmounting
      }
    }
  }, [map, place, onClose, immediate])

  return null
}
