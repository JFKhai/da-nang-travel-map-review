import type React from 'react'
import { useState, useRef, useEffect, useMemo } from 'react'
import { Tags, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryMultiSelectProps {
  availableCategories: { id: number; slug: string; name: string }[]
  selectedCategories: { id: number; slug: string; name: string }[]
  setSelectedCategories: (categories: { id: number; slug: string; name: string }[]) => void
  placeholder?: string
  className?: string
}

export function CategoryMultiSelect({
  availableCategories,
  selectedCategories,
  setSelectedCategories,
  placeholder = 'Chọn danh mục...',
  className,
}: CategoryMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* Filter + sync selected */
  const filteredCategories = useMemo(() => {
    const normalized = availableCategories.map((c) => ({
      ...c,
      isSelected: selectedCategories.some((s) => s.id === c.id),
    }))

    return searchQuery ? normalized.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())) : normalized
  }, [availableCategories, selectedCategories, searchQuery])

  /* Toggle category */
  const handleToggleCategory = (categoryId: number) => {
    const category = availableCategories.find((c) => c.id === categoryId)
    if (!category) return

    const exists = selectedCategories.some((c) => c.id === categoryId)

    if (exists) {
      setSelectedCategories(selectedCategories.filter((c) => c.id !== categoryId))
    } else {
      setSelectedCategories([
        ...selectedCategories,
        {
          id: category.id,
          slug: category.slug,
          name: category.name,
        },
      ])
    }

    setSearchQuery('')
  }

  const handleRemove = (id: number, e: React.MouseEvent) => {
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
          'flex min-h-12 cursor-text items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm transition-all',
          isOpen && 'ring-2 ring-brand-teal border-transparent shadow-md',
          'hover:border-brand-teal',
        )}
        onClick={() => {
          setIsOpen(true)
          inputRef.current?.focus()
        }}
      >
        <Tags className="h-5 w-5 text-brand-teal flex-shrink-0" />

        <div className="flex flex-1 flex-wrap items-center gap-1.5 max-h-16 overflow-y-auto">
          {selectedCategories.map((c) => (
            <span
              key={c.id}
              className="inline-flex items-center gap-1.5 bg-brand-teal/10 px-2.5 py-1 rounded-lg text-brand-teal border border-brand-teal/20 text-xs font-medium"
            >
              {c.name}
              <button
                onClick={(e) => handleRemove(c.id, e)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-brand-teal/20 transition-colors"
                aria-label={`Remove ${c.name}`}
              >
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
          <button
            onClick={handleClearAll}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Clear all"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="max-h-[280px] overflow-y-auto py-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleToggleCategory(c.id)}
                  className={cn(
                    'w-full px-4 py-2.5 text-left text-sm hover:bg-brand-teal/5 transition-colors flex items-center justify-between group',
                    c.isSelected && 'bg-brand-teal/10 text-brand-teal font-medium',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span>{c.name}</span>
                  </div>
                  {c.isSelected && (
                    <svg className="h-4 w-4 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-gray-500">
                <Tags className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p>Không tìm thấy danh mục</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
