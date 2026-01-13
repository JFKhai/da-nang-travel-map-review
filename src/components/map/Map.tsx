'use client'

import { APIProvider, Map as GoogleMap, MapCameraChangedEvent } from '@vis.gl/react-google-maps'
import { useState, useCallback, type ReactNode } from 'react'
import { DEFAULT_MAP_CONFIG } from '@/lib/map/map.config'
import envConfig from '@/lib/config/env.config'
import type { MapViewport } from '@/lib/map/map.types'

interface MapProps {
  children?: ReactNode
  onCameraChanged?: (viewport: MapViewport) => void
  className?: string
  defaultCenter?: { lat: number; lng: number }
  defaultZoom?: number
}

export function Map({
  children,
  onCameraChanged,
  className = 'w-full h-full',
  defaultCenter = DEFAULT_MAP_CONFIG.center,
  defaultZoom = DEFAULT_MAP_CONFIG.zoom,
}: MapProps) {
  const [viewport, setViewport] = useState<MapViewport>({
    center: defaultCenter,
    zoom: defaultZoom,
  })

  const handleCameraChanged = useCallback(
    (ev: MapCameraChangedEvent) => {
      const newViewport = {
        center: ev.detail.center,
        zoom: ev.detail.zoom,
      }
      setViewport(newViewport)
      onCameraChanged?.(newViewport)
    },
    [onCameraChanged],
  )

  const apiKey = envConfig.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-brand-bg">
        <div className="text-center">
          <p className="mb-2 text-lg font-semibold text-brand-dark">Google Maps API Key Missing</p>
          <p className="text-sm text-gray-600">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file</p>
        </div>
      </div>
    )
  }

  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        className={className}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onCameraChanged={handleCameraChanged}
        gestureHandling="greedy"
        disableDefaultUI={false}
      >
        {children}
      </GoogleMap>
    </APIProvider>
  )
}
