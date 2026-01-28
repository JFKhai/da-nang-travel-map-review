'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Marker, useMap } from '@vis.gl/react-google-maps'
import type { PlaceLocation } from '@/lib/map/map.types'
import { getCategoryColor, getCategoryIcon } from '@/lib/map/map.utils'
import { icon as faIcon } from '@fortawesome/fontawesome-svg-core'

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

  const map = useMap()

  const svgIcon = useMemo(() => {
    if (!map) return undefined

    const size = 40
    const iconDefinition = getCategoryIcon(place.category)
    const color = getCategoryColor(place.category)

    // Convert Font Awesome icon to SVG path
    const faIconObj = faIcon(iconDefinition)
    const iconPath = faIconObj.icon[4] as string // SVG path data

    const svg = `
      <svg width="${size}" height="${size + 10}" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-${place.id}" x="-50%" y="-50%" width="200%" height="200%">
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
        <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="2.5" filter="url(#shadow-${place.id})"/>
        <g transform="translate(20, 20)">
          <g transform="translate(-8, -8) scale(0.03125)">
            <path d="${iconPath}" fill="white"/>
          </g>
        </g>
        <path d="M 20 38 L 16 46 L 20 42 L 24 46 Z" fill="${color}"/>
      </svg>
    `

    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new google.maps.Size(40, 50),
      anchor: new google.maps.Point(20, 50),
    }
  }, [place.category, place.id, map])

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
