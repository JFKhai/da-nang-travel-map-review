'use client'

import Image from 'next/image'
import type { PlaceLocation } from '@/lib/map/map.types'
import { getCategoryLabel } from '@/lib/map/map.utils'
import { cn } from '@/lib/utils'

interface PlaceListSidebarProps {
  places: PlaceLocation[]
  onPlaceHover?: (place: PlaceLocation | null) => void
  onPlaceClick?: (place: PlaceLocation) => void
  hoveredPlaceId?: string | null
  isLoading?: boolean
}

export function PlaceListSidebar({
  places,
  onPlaceHover,
  onPlaceClick,
  hoveredPlaceId,
  isLoading = false,
}: PlaceListSidebarProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg bg-white p-3 shadow-sm">
            <div className="mb-2 h-32 rounded-lg bg-gray-200" />
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    )
  }

  if (places.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-white p-6 text-center shadow-sm">
        <div>
          <p className="mb-1 font-cabinet-grotesk text-sm font-semibold text-brand-dark">Không tìm thấy địa điểm</p>
          <p className="text-xs text-gray-500">Thử di chuyển bản đồ hoặc thay đổi bộ lọc</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-brand-teal">Hiển thị {places.length} địa điểm</p>

      {places.map((place) => (
        <div
          key={place.id}
          onMouseEnter={() => onPlaceHover?.(place)}
          onMouseLeave={() => onPlaceHover?.(null)}
          onClick={() => onPlaceClick?.(place)}
          className={cn(
            'cursor-pointer rounded-lg bg-white p-3 shadow-sm transition-all duration-200',
            'hover:shadow-md hover:scale-[1.02]',
            hoveredPlaceId === place.id && 'ring-2 ring-brand-teal shadow-md scale-[1.02]',
          )}
        >
          {/* Image */}
          <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg">
            <Image
              src={place.image}
              alt={place.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>

          {/* Content */}
          <div>
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="font-cabinet-grotesk text-sm font-semibold text-brand-dark line-clamp-1">{place.name}</h3>
              {place.priceRange && <span className="text-xs font-medium text-gray-500">{place.priceRange}</span>}
            </div>

            <p className="mb-2 text-xs text-gray-600">{getCategoryLabel(place.category)}</p>

            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-sm text-yellow-500">★</span>
                <span className="ml-1 text-sm font-medium text-brand-dark">{place.rating}</span>
              </div>
              <span className="text-xs text-gray-400">({place.reviewCount} đánh giá)</span>
            </div>

            <p className="line-clamp-2 text-xs text-gray-600">{place.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
