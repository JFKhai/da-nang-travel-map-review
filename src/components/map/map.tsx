'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import '@goongmaps/goong-js/dist/goong-js.css'
import { DEFAULT_MAP_CONFIG } from '@/lib/map/map.config'
import envConfig from '@/lib/config/env.config'
import type { MapViewport } from '@/lib/map/map.types'
import { MapProvider } from './map-context'

// Import Goong JS types
declare global {
  interface Window {
    goongjs: any
  }
}

/**
 * Props for the Map component
 */
interface MapProps {
  /** Child elements to render inside the map (markers, popups, etc.) */
  children?: ReactNode
  /** Callback fired when the map camera (center/zoom) changes */
  onCameraChanged?: (viewport: MapViewport) => void
  /** Callback fired when map is ready */
  onMapReady?: (map: any) => void
  /** Optional CSS class name for the map container */
  className?: string
  /** Default center position for the map */
  defaultCenter?: { lat: number; lng: number }
  /** Default zoom level for the map */
  defaultZoom?: number
}

export function Map({
  children,
  onCameraChanged,
  onMapReady,
  className = 'w-full h-full',
  defaultCenter = DEFAULT_MAP_CONFIG.center,
  defaultZoom = DEFAULT_MAP_CONFIG.zoom,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Use refs for callbacks to avoid re-initializing map when they change
  const onMapReadyRef = useRef(onMapReady)
  const onCameraChangedRef = useRef(onCameraChanged)

  useEffect(() => {
    onMapReadyRef.current = onMapReady
    onCameraChangedRef.current = onCameraChanged
  }, [onMapReady, onCameraChanged])

  const goongKey = envConfig.NEXT_PUBLIC_GOONG_MAP_KEY

  useEffect(() => {
    if (!mapContainerRef.current || !goongKey) return

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="goong-js.js"]')

    const initializeMap = () => {
      // Prevent multiple initializations
      if (!window.goongjs || !mapContainerRef.current || mapInstanceRef.current) return

      // Initialize map
      window.goongjs.accessToken = goongKey
      const map = new window.goongjs.Map({
        container: mapContainerRef.current,
        style: 'https://tiles.goong.io/assets/goong_map_web.json',
        center: [defaultCenter.lng, defaultCenter.lat],
        zoom: defaultZoom,
      })

      mapInstanceRef.current = map

      map.on('load', () => {
        // Hide all POI labels and icons
        const layers = map.getStyle().layers
        layers.forEach((layer: any) => {
          if (layer.id.includes('poi') || layer.id.includes('label')) {
            // Wrap in try-catch in case layout property doesn't exist or is invalid
            try {
              map.setLayoutProperty(layer.id, 'visibility', 'none')
            } catch (e) {
              console.warn('Failed to hide layer:', layer.id)
            }
          }
        })

        setMapLoaded(true)
        onMapReadyRef.current?.(map)
      })

      // Add event listeners
      map.on('move', () => {
        const center = map.getCenter()
        const zoom = map.getZoom()
        onCameraChangedRef.current?.({
          center: { lat: center.lat, lng: center.lng },
          zoom,
        })
      })
    }

    if (existingScript) {
      // Script already loaded
      if (window.goongjs) {
        initializeMap()
      } else {
        existingScript.addEventListener('load', initializeMap)
      }
    } else {
      // Dynamically load Goong JS SDK
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/@goongmaps/goong-js/dist/goong-js.js'
      script.async = true
      script.onload = initializeMap
      document.head.appendChild(script)
    }

    return () => {
      if (existingScript) {
        existingScript.removeEventListener('load', initializeMap)
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        setMapLoaded(false)
      }
    }
  }, [goongKey, defaultCenter.lat, defaultCenter.lng, defaultZoom])

  if (!goongKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-brand-bg">
        <div className="text-center">
          <p className="mb-2 text-lg font-semibold text-brand-dark">Goong Map Key Missing</p>
          <p className="text-sm text-gray-600">Please add NEXT_PUBLIC_GOONG_MAP_KEY to your .env.local file</p>
        </div>
      </div>
    )
  }

  return (
    <MapProvider value={{ map: mapInstanceRef.current }}>
      <div className="relative w-full h-full">
        <div ref={mapContainerRef} className={className} />
        {mapLoaded && children}
      </div>
    </MapProvider>
  )
}
