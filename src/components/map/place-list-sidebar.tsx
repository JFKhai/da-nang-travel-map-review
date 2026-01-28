'use client'

import Image from 'next/image'
import type { PlaceLocation } from '@/lib/map/map.types'
import { getCategoryLabel, isPlaceOpen } from '@/lib/map/map.utils'
import { cn } from '@/lib/utils'

/**
 * Props for the PlaceListSidebar component
 */
interface PlaceListSidebarProps {
  /** List of places to display */
  places: PlaceLocation[]
  /** Callback fired when a place is hovered */
  onPlaceHover?: (place: PlaceLocation | null) => void
  /** Callback fired when a place is clicked */
  onPlaceClick?: (place: PlaceLocation) => void
  /** ID of the currently hovered place */
  hoveredPlaceId?: number | null
  /** Whether the list is currently loading */
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
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-lg font-semibold text-gray-700">Đang tải...</div>
          <div className="text-sm text-gray-500">Vui lòng đợi</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">KẾT QUẢ ({places.length})</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {places.length === 0 ? (
          <div className="flex h-full items-center justify-center p-8">
            <div className="text-center">
              <div className="mb-2 text-lg font-semibold text-gray-700">Không tìm thấy kết quả</div>
              <div className="text-sm text-gray-500">Thử thay đổi bộ lọc hoặc tìm kiếm</div>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {places.map((place) => {
              const isHovered = hoveredPlaceId === place.id
              const openStatus = isPlaceOpen(place.opening_hours)

              return (
                <div
                  key={place.id}
                  className={cn(
                    'cursor-pointer p-4 transition-all hover:bg-gray-50',
                    isHovered && 'bg-blue-50 ring-2 ring-blue-400 ring-inset',
                  )}
                  onMouseEnter={() => onPlaceHover?.(place)}
                  onMouseLeave={() => onPlaceHover?.(null)}
                  onClick={() => onPlaceClick?.(place)}
                >
                  <div className="flex gap-3">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image src={place.image} alt={place.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-1">{place.name}</h3>
                      <div className="mb-1 flex items-center gap-1 text-xs">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium text-gray-900">{place.rating.toFixed(1)}</span>
                        <span className="text-gray-500">({place.reviewCount})</span>
                      </div>
                      <p className="mb-1 text-xs text-gray-500 line-clamp-1">{getCategoryLabel(place.category)}</p>
                      {openStatus !== null ? (
                        <p className={cn('text-xs mt-1 font-medium', openStatus ? 'text-green-700' : 'text-red-700')}>
                          {openStatus ? 'Đang mở cửa' : 'Đã đóng cửa'}
                        </p>
                      ) : place.opening_hours ? (
                        <p className="text-xs text-gray-500 mt-1">Giờ mở cửa: {place.opening_hours}</p>
                      ) : (
                        <p className="text-xs text-gray-400 mt-1">Chưa có thông tin giờ mở cửa</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
