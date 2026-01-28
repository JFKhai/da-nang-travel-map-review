'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Marker } from '@vis.gl/react-google-maps'
import type { PlaceLocation } from '@/lib/map/map.types'
import { getCategoryColor, getCategoryIcon } from '@/lib/map/map.utils'

/**
 * Props for the MapMarker component
 */
interface MapMarkerProps {
  /** The place to display as a marker */
  place: PlaceLocation
  /** Callback fired when the marker is clicked */
  onClick?: (place: PlaceLocation) => void
  /** Callback fired when the marker is hovered or unhovered */
  onHover?: (place: PlaceLocation | null) => void
  /** Whether this marker should be highlighted (higher z-index) */
  isHighlighted?: boolean
}

export function MapMarker({ place, onClick, onHover, isHighlighted = false }: MapMarkerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutMs = 500
  const hoverTimer = useRef<NodeJS.Timeout | null>(null)

  const handleMouseOver = () => {
    setIsHovered(true)
    // Clear any existing timer to avoid double triggers
    if (hoverTimer.current) clearTimeout(hoverTimer.current)

    hoverTimer.current = setTimeout(() => {
      onHover?.(place)
    }, hoverTimeoutMs)
  }

  const handleMouseOut = () => {
    setIsHovered(false)
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
    onHover?.(null)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current)
    }
  }, [])

  // Calculate scale based on state - fixed at 1.0 as requested
  const scale = 1.0

  const svgIcon = useMemo(() => {
    const size = 40
    const svg = `
        <svg width="${size}" height="${size + 10}" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="20" cy="20" r="18" fill="${getCategoryColor(place.category)}" stroke="white" stroke-width="2" filter="url(#shadow)"/>
          <text x="20" y="26" text-anchor="middle" font-size="16">${getCategoryIcon(place.category)}</text>
          <path d="M 20 38 L 16 46 L 20 42 L 24 46 Z" fill="${getCategoryColor(place.category)}"/>
        </svg>
      `
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new google.maps.Size(40 * scale, 50 * scale),
      anchor: new google.maps.Point(20 * scale, 50 * scale),
    }
  }, [place.category, scale])

  return (
    <Marker
      position={{ lat: place.latitude, lng: place.longitude }}
      onClick={() => onClick?.(place)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      icon={svgIcon}
      zIndex={isHighlighted ? 100 : isHovered ? 50 : 1}
    />
  )
}
