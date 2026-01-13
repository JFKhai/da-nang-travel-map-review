'use client'

import { useState } from 'react'
import type { PlaceCategory } from '@/lib/map/map.types'
import { CATEGORY_MARKERS } from '@/lib/map/map.config'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  selectedCategories: PlaceCategory[]
  onCategoryChange: (categories: PlaceCategory[]) => void
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
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-cabinet-grotesk text-sm font-semibold text-brand-dark">Loại địa điểm</h3>
        <div className="flex gap-2 text-xs">
          <button
            onClick={selectAll}
            className="text-brand-teal hover:underline"
            disabled={selectedCategories.length === categories.length}
          >
            Tất cả
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={clearAll}
            className="text-gray-500 hover:underline"
            disabled={selectedCategories.length === 0}
          >
            Xóa
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {categories.map((category) => {
          const config = CATEGORY_MARKERS[category]
          const isSelected = selectedCategories.includes(category)
          const count = placeCounts?.[category] || 0

          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
                isSelected ? 'bg-brand-teal/10 text-brand-dark' : 'bg-gray-50 text-gray-600 hover:bg-gray-100',
              )}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg"
                style={{ backgroundColor: isSelected ? config.color : '#e5e7eb' }}
              >
                {config.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{config.label}</p>
              </div>
              {count > 0 && <span className="text-xs font-medium text-gray-500">({count})</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
