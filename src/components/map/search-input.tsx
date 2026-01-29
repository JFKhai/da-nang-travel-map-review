'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '@/lib/hooks/useDebounce'

/**
 * Props for the SearchInput component
 */
interface SearchInputProps {
  /** Current search value */
  value: string
  /** Callback fired when the search value changes (debounced) */
  onChange: (value: string) => void
  /** Placeholder text for the input */
  placeholder?: string
  /** Optional CSS class name */
  className?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebounce(localValue, 500)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange, value])

  return (
    <div className={`relative ${className}`}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>
      <input
        type="text"
        className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-[15px] text-gray-900 shadow-md transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  )
}
