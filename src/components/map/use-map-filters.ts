import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import type { PlaceCategory } from '@/lib/map/map.types'

/**
 * Interface for the map filters.
 */
interface MapFilters {
  /** An array of selected place categories. */
  categories: PlaceCategory[]
  /** The current search query string. */
  search: string
  /** The current page number for pagination. */
  page: number
}

/**
 * Custom hook for managing map filters based on URL search parameters.
 * It provides a way to read current filters from the URL and update them,
 * which in turn updates the URL and triggers re-renders.
 *
 * @returns An object containing:
 * - `filters`: The current map filters (categories, search, page).
 * - `setCategories`: A function to update the selected categories in the URL.
 * - `setSearch`: A function to update the search query in the URL.
 * - `setPage`: A function to update the current page number in the URL.
 */
export function useMapFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current filters from URL
  const filters: MapFilters = useMemo(() => {
    const categoryParam = searchParams.get('category')
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')

    let categories: PlaceCategory[] = ['coffee-tea', 'food', 'hotel', 'check-in', 'history', 'entertainment']

    if (categoryParam) {
      categories = categoryParam.split(',').filter(Boolean) as PlaceCategory[]
    }

    return { categories, search, page }
  }, [searchParams])

  // Update filters in URL
  const setFilters = useCallback(
    (newFilters: Partial<MapFilters>) => {
      const params = new URLSearchParams(searchParams.toString())

      // Update categories
      if (newFilters.categories !== undefined) {
        if (newFilters.categories.length > 0) {
          params.set('category', newFilters.categories.join(','))
        } else {
          params.delete('category')
        }
      }

      // Update search
      if (newFilters.search !== undefined) {
        if (newFilters.search) {
          params.set('search', newFilters.search)
        } else {
          params.delete('search')
        }
      }

      // Update page
      if (newFilters.page !== undefined) {
        if (newFilters.page > 1) {
          params.set('page', newFilters.page.toString())
        } else {
          params.delete('page')
        }
      } else {
        // Reset page to 1 on filter change if page not explicitly set
        if (newFilters.categories !== undefined || newFilters.search !== undefined) {
          params.delete('page')
        }
      }

      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const setCategories = useCallback(
    (categories: PlaceCategory[]) => {
      setFilters({ categories })
    },
    [setFilters],
  )

  const setSearch = useCallback(
    (search: string) => {
      setFilters({ search })
    },
    [setFilters],
  )

  const setPage = useCallback(
    (page: number) => {
      setFilters({ page })
    },
    [setFilters],
  )

  return {
    filters,
    setCategories,
    setSearch,
    setPage,
  }
}
