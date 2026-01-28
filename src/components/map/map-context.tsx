import { createContext, useContext } from 'react'

interface MapContextValue {
  map: any | null
}

const MapContext = createContext<MapContextValue>({ map: null })

export const MapProvider = MapContext.Provider

export function useMap() {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMap must be used within a MapProvider')
  }
  return context.map
}
