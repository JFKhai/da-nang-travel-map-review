'use client'

import { useEffect, useRef } from 'react'
import type { PlaceLocation } from '@/lib/map/map.types'
import { getCategoryColor, getCategoryIcon } from '@/lib/map/map.utils'
import { MARKER_CONFIG, HOVER_DELAY } from '@/lib/map/map.config'
import { icon as faIcon } from '@fortawesome/fontawesome-svg-core'
import { useMap } from './map-context'
import { getGoongjs } from './map'

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

/**
 * Creates SVG markup for a highlighted (selected) marker
 */
function createHighlightedMarkerSVG(): string {
  return `
    <svg width="100%" height="100%" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
      <path d="M 25 0 C 11.19 0 0 11.19 0 25 C 0 43.75 25 60 25 60 C 25 60 50 43.75 50 25 C 50 11.19 38.81 0 25 0 Z" fill="${MARKER_CONFIG.highlightedColor}" />
      <circle cx="25" cy="25" r="10" fill="${MARKER_CONFIG.highlightedInnerColor}" />
    </svg>
  `
}

/**
 * Creates SVG markup for a normal category marker
 */
function createCategoryMarkerSVG(placeId: number, color: string, iconPath: string, size: number): string {
  return `
    <svg width="${size}" height="${size + 10}" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow-${placeId}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="${color}"
        stroke="white"
        stroke-width="2.5"
        filter="url(#shadow-${placeId})"
      />
      <g transform="translate(20, 20)">
        <g transform="translate(-8, -8) scale(0.03125)">
          <path d="${iconPath}" fill="white" />
        </g>
      </g>
      <path d="M 20 38 L 16 46 L 20 42 L 24 46 Z" fill="${color}" />
    </svg>
  `
}

export function MapMarker({ place, onClick, onHover, isHighlighted = false }: MapMarkerProps) {
  const map = useMap()
  const markerRef = useRef<any>(null)
  const hoverTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!map) return

    const setupMarker = async () => {
      const goongjs = await getGoongjs()
      if (!goongjs) return

      const { size } = MARKER_CONFIG
      const iconDefinition = getCategoryIcon(place.category)
      const color = getCategoryColor(place.category)

      // Convert Font Awesome icon to SVG path
      const faIconObj = faIcon(iconDefinition)
      const iconPath = faIconObj.icon[4] as string

      // Create marker element with inline SVG
      const el = document.createElement('div')
      el.className = 'custom-marker'
      el.style.cursor = 'pointer'
      el.style.width = `${size}px`
      el.style.height = `${size + 10}px`

      // Ensure highlighted marker is always on top
      if (isHighlighted) {
        el.style.zIndex = '999'
        el.innerHTML = createHighlightedMarkerSVG()
      } else {
        el.innerHTML = createCategoryMarkerSVG(place.id, color, iconPath, size)
      }

      // Add event listeners
      const handleMouseOver = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current)
        hoverTimer.current = setTimeout(() => {
          onHover?.(place)
        }, HOVER_DELAY.marker)
      }

      const handleMouseOut = () => {
        if (hoverTimer.current) {
          clearTimeout(hoverTimer.current)
          hoverTimer.current = null
        }
        onHover?.(null)
      }

      const handleClick = (e: Event) => {
        e.stopPropagation()
        onClick?.(place)
      }

      el.addEventListener('mouseenter', handleMouseOver)
      el.addEventListener('mouseleave', handleMouseOut)
      el.addEventListener('click', handleClick)

      // Create marker
      const marker = new goongjs.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map)

      markerRef.current = marker

      return () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current)
        el.removeEventListener('mouseenter', handleMouseOver)
        el.removeEventListener('mouseleave', handleMouseOut)
        el.removeEventListener('click', handleClick)
        if (markerRef.current) {
          markerRef.current.remove()
          markerRef.current = null
        }
      }
    }

    setupMarker().then((cleanup) => {
      return cleanup
    })
  }, [map, place, onClick, onHover, isHighlighted])

  return null
}
