'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Paginator } from 'primereact/paginator'
import { CategoryMultiSelect } from '@/components/category-multiselect'
import { Search, MapPin, Star } from 'lucide-react'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'
import { GetPlacesParams } from '@/lib/api/server-api/place.api'

type PlacesContentProps = {
  places: PlaceWithRelations[]
  search: string
  categories: string[]
  page: number
  limit: number
  totalPages: number
}

export function PlacesContent({ places, search, categories, page, limit, totalPages }: PlacesContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(search)

  // Fix: Initialize selectedCategories from categories prop, not places
  //vì chưa có api lấy category nên tạm map thủ công
  const [selectedCategories, setSelectedCategories] = useState<{ id: number; name: string; slug: string }[]>(() => {
    const CATEGORY_MAP: Record<number, { name: string; slug: string }> = {
      1: { name: 'Cà phê & Trà', slug: 'coffee-tea' },
      2: { name: 'Ẩm thực', slug: 'food' },
      3: { name: 'Check-in', slug: 'check-in' },
      4: { name: 'Lịch sử', slug: 'history' },
      5: { name: 'Vui chơi', slug: 'entertainment' },
    }

    return categories
      .map((catId) => {
        const id = Number(catId)
        const category = CATEGORY_MAP[id]
        return category ? { id, ...category } : null
      })
      .filter((cat): cat is { id: number; name: string; slug: string } => cat !== null)
  })

  // Update URL with new params
  const updateURL = useCallback(
    (params: GetPlacesParams) => {
      const newParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, String(value))
        } else {
          newParams.delete(key)
        }
      })

      router.push(`/places?${newParams.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const first = (page - 1) * limit

  const onPageChange = (event: { first: number; rows: number }) => {
    const newPage = Math.floor(event.first / event.rows) + 1
    updateURL({
      page: newPage,
      limit: event.rows,
    })
  }

  const handleSearch = () => {
    updateURL({
      search: searchQuery,
      category: selectedCategories.map((c) => c.id).join(','),
      page: 1,
    })
  }

  const handleCategoryChange = (cats: { id: number; name: string; slug: string }[]) => {
    setSelectedCategories(cats)
    updateURL({
      category: cats.map((c) => c.id).join(','),
      page: 1,
    })
  }

  return (
    <>
      {/* Search and Filters */}
      <div className="rounded-2xl shadow-sm p-6 mb-6 border border-brand-border/5">
        <div className="space-y-4">
          {/* Search Box */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm địa điểm, khu vực..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent bg-white"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-brand-teal text-white font-medium rounded-lg hover:bg-brand-teal/90 transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <Search className="w-5 h-5" />
              Tìm kiếm
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
            <CategoryMultiSelect
              selectedCategories={selectedCategories}
              setSelectedCategories={handleCategoryChange}
              placeholder="Chọn danh mục..."
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Tìm thấy <span className="font-bold text-brand-teal">{places.length}</span> địa điểm
          </p>
        </div>
      </div>

      {/* Places Grid */}
      {places.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {places.map((place) => (
              <Link
                href={`/place/${place.slug}`}
                key={place.slug}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-border/5 hover:-translate-y-2"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={place.coverImage.url || '/placeholder.jpg'}
                    alt={place.name || ''}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white/50">
                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                    <span className="font-bold text-brand-border text-sm">4</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {place.address || 'Chưa có địa chỉ'}
                  </div>

                  <h3 className="text-xl font-bold text-brand-border mb-2 group-hover:text-brand-teal transition-colors line-clamp-1">
                    {place.name}
                  </h3>

                  <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed mb-4">{place.short_description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="text-xs font-medium text-gray-400">0 đánh giá</span>
                    <span className="text-brand-teal font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Xem chi tiết
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Paginator
                first={first}
                rows={limit}
                totalRecords={totalPages * limit}
                rowsPerPageOptions={[6, 12, 18]}
                onPageChange={onPageChange}
                className="border-none"
              />
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy địa điểm nào</h3>
          <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn</p>
        </div>
      )}
    </>
  )
}
