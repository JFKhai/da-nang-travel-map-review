'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Paginator } from 'primereact/paginator'
import { CategoryMultiSelect } from '@/components/category-multiselect'
import { Search, MapPin, Star, TrendingUp, ThumbsUp } from 'lucide-react'
import { placesData } from './mock-data'

export default function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<{ id: string; name: string }[]>([])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(6)

  // Use mock data
  const allPlaces = useMemo(() => {
    return placesData
  }, [])

  // Popular places (highest ratings)
  const popularPlaces = useMemo(() => {
    return [...allPlaces].sort((a, b) => b.rating - a.rating).slice(0, 3)
  }, [allPlaces])

  // Recommended places (most reviews)
  const recommendedPlaces = useMemo(() => {
    return [...allPlaces].sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0)).slice(0, 3)
  }, [allPlaces])

  // Filter places based on search and categories
  const filteredPlaces = useMemo(() => {
    return allPlaces.filter((place) => {
      // Search filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategories =
        selectedCategories.length === 0 || selectedCategories.some((cat) => place.categories.includes(cat.id))

      return matchesSearch && matchesCategories
    })
  }, [allPlaces, searchQuery, selectedCategories])

  // Paginated places
  const paginatedPlaces = useMemo(() => {
    return filteredPlaces.slice(first, first + rows)
  }, [filteredPlaces, first, rows])

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5">
      {/* Main Content - Left Side */}
      <div className="lg:col-span-8">
        {/* Search and Filters */}
        <div className=" rounded-2xl shadow-sm p-6 mb-6 border border-brand-border/5">
          <div className="space-y-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm địa điểm, khu vực..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setFirst(0) // Reset to first page
                }}
                className="w-full pl-12 pr-4 py-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent bg-white"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
              <CategoryMultiSelect
                selectedCategories={selectedCategories}
                setSelectedCategories={(cats) => {
                  setSelectedCategories(cats)
                  setFirst(0) // Reset to first page
                }}
                placeholder="Chọn danh mục..."
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Tìm thấy <span className="font-bold text-brand-teal">{filteredPlaces.length}</span> địa điểm
            </p>
          </div>
        </div>

        {/* Places Grid */}
        {paginatedPlaces.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {paginatedPlaces.map((place) => (
                <Link
                  href={`/place/${place.id}`}
                  key={place.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-border/5 hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={place.images[0]}
                      alt={place.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white/50">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span className="font-bold text-brand-border text-sm">{place.rating}.0</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {place.location}
                    </div>

                    <h3 className="text-xl font-bold text-brand-border mb-2 group-hover:text-brand-teal transition-colors line-clamp-1">
                      {place.title}
                    </h3>

                    <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed mb-4">{place.description}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-xs font-medium text-gray-400">{place.reviews?.length || 0} đánh giá</span>
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
            {filteredPlaces.length > rows && (
              <div className="flex justify-center mt-8">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={filteredPlaces.length}
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
      </div>

      {/* Sidebar - Right Side */}
      <div className="lg:col-span-4 space-y-6">
        {/* Popular Places */}
        <div className=" rounded-2xl shadow-sm p-6 border border-brand-border/5">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-brand-teal">POPULAR PLACES</h2>
          </div>

          <div className="space-y-4">
            {popularPlaces.map((place, index) => (
              <Link
                href={`/place/${place.id}`}
                key={place.id}
                className="group flex gap-3 bg-white hover:bg-gray-50 p-2 rounded-xl transition-colors"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={place.images[0]} alt={place.title} fill className="object-cover" />
                  <div className="absolute top-1 left-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-brand-border text-sm mb-1 line-clamp-1 group-hover:text-brand-teal transition-colors">
                    {place.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{place.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                    <span className="text-xs font-bold text-gray-700">{place.rating}.0</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended Places */}
        <div className=" rounded-2xl shadow-sm p-6 border border-brand-border/5">
          <div className="flex items-center gap-2 mb-5">
            <ThumbsUp className="w-5 h-5 text-brand-teal" />
            <h2 className="text-xl font-bold text-brand-teal">RECOMMENDED PLACES</h2>
          </div>

          <div className="space-y-4">
            {recommendedPlaces.map((place) => (
              <Link
                href={`/place/${place.id}`}
                key={place.id}
                className="group flex gap-3 bg-white hover:bg-gray-50 p-2 rounded-xl transition-colors"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={place.images[0]} alt={place.title} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-brand-border text-sm mb-1 line-clamp-1 group-hover:text-brand-teal transition-colors">
                    {place.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{place.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                    <span className="font-bold">{place.rating}.0</span>
                    <span className="text-gray-400">•</span>
                    <span>{place.reviews?.length || 0} đánh giá</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-br from-brand-teal to-brand-dark rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Bạn chưa tìm thấy điểm đến lý tưởng?</h3>
          <p className="text-brand-light/90 text-sm mb-4">
            Liên hệ với chúng tôi để được tư vấn và gợi ý những địa điểm phù hợp nhất!
          </p>
          <button className="bg-white text-brand-teal px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-brand-light hover:text-brand-border transition-colors">
            Liên hệ ngay
          </button>
        </div>
      </div>
    </div>
  )
}
