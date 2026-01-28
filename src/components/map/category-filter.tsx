'use client'

import { useState } from 'react'
import type { PlaceCategory } from '@/lib/map/map.types'
import { CATEGORY_MARKERS } from '@/lib/map/map.config'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Props for the CategoryFilter component
 */
interface CategoryFilterProps {
  /** Currently selected categories */
  selectedCategories: PlaceCategory[]
  /** Callback fired when category selection changes */
  onCategoryChange: (categories: PlaceCategory[]) => void
  /** Optional count of places per category */
  placeCounts?: Record<PlaceCategory, number>
}

export function CategoryFilter({ selectedCategories, onCategoryChange, placeCounts }: CategoryFilterProps) {
  const categories = Object.keys(CATEGORY_MARKERS) as PlaceCategory[]

  const toggleCategory = (category: PlaceCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  const selectAll = () => {
    onCategoryChange(categories)
  }

  const clearAll = () => {
    onCategoryChange([])
  }

  return (
    <div className="overflow-x-auto py-2 no-scrollbar px-1">
      <div className="flex gap-2">
        {categories.map((category) => {
          const config = CATEGORY_MARKERS[category]
          const isSelected = selectedCategories.includes(category)
          const count = placeCounts?.[category] || 0

          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={cn(
                'group flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all whitespace-nowrap text-gray-900',
                isSelected
                  ? 'border-gray-400 bg-gray-300'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
              )}
            >
              <FontAwesomeIcon icon={config.icon} className="h-4 w-4 text-gray-700" />
              <span>{config.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
