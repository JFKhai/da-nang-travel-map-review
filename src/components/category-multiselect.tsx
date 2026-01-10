import type React from 'react'
import { useState, useRef, useEffect, useMemo } from 'react'
import { Tags, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from 'primereact/badge'
import { Chip } from 'primereact/chip'

const PLACE_CATEGORIES = [
  { id: 'food', name: 'Food' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'checkin', name: 'Check-in' },
  { id: 'hotel', name: 'Hotel' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'bar', name: 'Bar & Pub' },
]

interface CategoryMultiSelectProps {
  selectedCategories: { id: string; name: string }[]
  setSelectedCategories: (categories: { id: string; name: string }[]) => void
  placeholder?: string
  className?: string
}

export function CategoryMultiSelect({
  selectedCategories,
  setSelectedCategories,
  placeholder = 'Select categories',
  className,
}: CategoryMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* Filter + sync selected */
  const filteredCategories = useMemo(() => {
    const normalized = PLACE_CATEGORIES.map((c) => ({
      ...c,
      isSelected: selectedCategories.some((s) => s.id === c.id),
    }))

    return searchQuery ? normalized.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())) : normalized
  }, [selectedCategories, searchQuery])

  /* Toggle category */
  const handleToggleCategory = (categoryId: string) => {
    const category = PLACE_CATEGORIES.find((c) => c.id === categoryId)
    if (!category) return

    const exists = selectedCategories.some((c) => c.id === categoryId)

    if (exists) {
      setSelectedCategories(selectedCategories.filter((c) => c.id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }

    setSearchQuery('')
  }

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedCategories(selectedCategories.filter((c) => c.id !== id))
  }

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedCategories([])
    setSearchQuery('')
  }

  /* Click outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Input */}
      <div
        className={cn(
          'flex min-h-12 cursor-text items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm',
          isOpen && 'ring-1 ring-[#1967d2] border-transparent',
        )}
        onClick={() => {
          setIsOpen(true)
          inputRef.current?.focus()
        }}
      >
        <Tags className="h-5 w-5 text-[#1967d2]" />

        <div className="flex flex-1 flex-wrap items-center gap-1.5 max-h-16 overflow-y-auto">
          {selectedCategories.map((c) => (
            <span key={c.id} className="bg-blue-50 z-10 p-2 rounded-2xl text-blue-700 border border-blue-200">
              {c.name}
              <button onClick={(e) => handleRemove(c.id, e)} className="ml-1 rounded-full p-0.5 hover:bg-blue-200">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsOpen(true)
            }}
            placeholder={selectedCategories.length === 0 ? placeholder : ''}
            className="min-w-[120px] flex-1 bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>

        {selectedCategories.length > 0 && (
          <button onClick={handleClearAll} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
          <div className="max-h-[280px] overflow-y-auto py-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleToggleCategory(c.id)}
                  className={cn(
                    'w-full px-4 py-2.5 text-left text-sm hover:bg-sky-100',
                    c.isSelected && 'bg-blue-50 text-blue-700 font-medium',
                  )}
                >
                  {c.name}
                </button>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-gray-500">No categories found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
