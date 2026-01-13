'use client'

import { InfoWindow } from '@vis.gl/react-google-maps'
import Image from 'next/image'
import type { PlaceLocation } from '@/lib/map/map.types'
import { getCategoryLabel } from '@/lib/map/map.utils'

interface MapInfoWindowProps {
  place: PlaceLocation
  onClose: () => void
}

export function MapInfoWindow({ place, onClose }: MapInfoWindowProps) {
  return (
    <InfoWindow position={{ lat: place.latitude, lng: place.longitude }} onClose={onClose} headerDisabled>
      <div className="w-64 overflow-hidden rounded-lg">
        {/* Image */}
        <div className="relative h-32 w-full">
          <Image src={place.image} alt={place.name} fill className="object-cover" sizes="256px" />
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-cabinet-grotesk text-sm font-semibold text-brand-dark">{place.name}</h3>
            {place.priceRange && <span className="text-xs text-gray-500">{place.priceRange}</span>}
          </div>

          <p className="mb-2 text-xs text-gray-600">{getCategoryLabel(place.category)}</p>

          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-xs text-yellow-500">★</span>
              <span className="ml-1 text-xs font-medium">{place.rating}</span>
            </div>
            <span className="text-xs text-gray-400">({place.reviewCount} reviews)</span>
          </div>

          <p className="line-clamp-2 text-xs text-gray-600">{place.description}</p>
        </div>
      </div>
    </InfoWindow>
  )
}
