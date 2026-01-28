'use client'

import { useState } from 'react'
import type { PlaceCategory } from '@/lib/map/map.types'
import { CATEGORY_MARKERS } from '@/lib/map/map.config'
import { cn } from '@/lib/utils'

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
      <div className="flex gap-2.5">
        {categories.map((category) => {
          const config = CATEGORY_MARKERS[category]
          const isSelected = selectedCategories.includes(category)

          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={cn(
                'flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 text-[15px] font-medium transition-all shadow-sm active:scale-95 whitespace-nowrap',
                isSelected
                  ? 'border-transparent bg-brand-teal text-white shadow-md ring-2 ring-brand-teal/20'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md',
              )}
            >
              <span className="text-lg">{config.icon}</span>
              <span>{config.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
