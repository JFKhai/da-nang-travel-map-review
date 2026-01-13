'use client'

import { Marker } from '@vis.gl/react-google-maps'
import { useState, useMemo } from 'react'
import type { PlaceLocation } from '@/lib/map/map.types'
import { getCategoryColor, getCategoryIcon } from '@/lib/map/map.utils'

interface MapMarkerProps {
  place: PlaceLocation
  onClick?: (place: PlaceLocation) => void
  onHover?: (place: PlaceLocation | null) => void
  isHighlighted?: boolean
}

export function MapMarker({ place, onClick, onHover, isHighlighted = false }: MapMarkerProps) {
  const [isHovered, setIsHovered] = useState(false)

  const color = getCategoryColor(place.category)
  const icon = getCategoryIcon(place.category)

  // Calculate scale based on state
  const scale = isHighlighted ? 1.3 : isHovered ? 1.2 : 1.0

  // Create custom SVG icon
  const customIcon = useMemo(() => {
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
        <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="2" filter="url(#shadow)"/>
        <text x="20" y="26" text-anchor="middle" font-size="16">${icon}</text>
        <path d="M 20 38 L 16 46 L 20 42 L 24 46 Z" fill="${color}"/>
      </svg>
    `
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
  }, [color, icon])

  return (
    <Marker
      position={{ lat: place.latitude, lng: place.longitude }}
      onClick={() => onClick?.(place)}
      onMouseOver={() => {
        setIsHovered(true)
        onHover?.(place)
      }}
      onMouseOut={() => {
        setIsHovered(false)
        onHover?.(null)
      }}
      icon={{
        url: customIcon,
        scaledSize: new google.maps.Size(40 * scale, 50 * scale),
        anchor: new google.maps.Point(20 * scale, 50 * scale),
      }}
      zIndex={isHighlighted ? 1000 : isHovered ? 100 : 1}
    />
  )
}
