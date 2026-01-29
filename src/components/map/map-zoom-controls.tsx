'use client'

import { Plus, Minus } from 'lucide-react'

interface MapZoomControlsProps {
  /** Callback to zoom in */
  onZoomIn: () => void
  /** Callback to zoom out */
  onZoomOut: () => void
}

/**
 * Zoom controls component for the map
 * Displays zoom in/out buttons in the bottom right corner
 */
export function MapZoomControls({ onZoomIn, onZoomOut }: MapZoomControlsProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onZoomIn}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition-all hover:bg-gray-50 active:scale-95"
        aria-label="Zoom in"
      >
        <Plus className="h-5 w-5 text-gray-700" />
      </button>
      <button
        onClick={onZoomOut}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition-all hover:bg-gray-50 active:scale-95"
        aria-label="Zoom out"
      >
        <Minus className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  )
}
