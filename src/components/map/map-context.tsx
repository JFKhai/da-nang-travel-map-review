import { createContext, useContext } from 'react'
import type { Map as GoongMapType } from '@goongmaps/goong-js'

// Re-export GoongMap type for other components
export type GoongMap = GoongMapType

interface MapContextValue {
  map: GoongMap | null
}

const MapContext = createContext<MapContextValue>({ map: null })

export const MapProvider = MapContext.Provider

export function useMap(): GoongMap | null {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMap must be used within a MapProvider')
  }
  return context.map
}
