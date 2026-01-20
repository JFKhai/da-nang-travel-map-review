'use client'

import { useState, useEffect } from 'react'
import { Heart, Search, Loader2, X } from 'lucide-react'
import PlaceCard from '@/components/place-card'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'
import { useToast } from '@/components/providers/toast-provider'
import favoriteApiServerRequest from '@/lib/api/server-api/favorite.api'

export default function FavoritesList() {
  const { showError, showSuccess } = useToast()
  const [favorites, setFavorites] = useState<PlaceWithRelations[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [loadingId, setLoadingId] = useState<number | null>(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await favoriteApiServerRequest.getMyFavorites()
        setFavorites(result.data || [])
      } catch (error) {
        showError('Lỗi', 'Không thể tải danh sách yêu thích')
      } finally {
        setIsLoading(false)
      }
    }
    fetchFavorites()
  }, [showError])

  const filteredFavorites = favorites.filter((place) => place.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleToggle = async (placeId: number) => {
    if (loadingId) return
    setLoadingId(placeId)
    try {
      await favoriteApiServerRequest.toggleFavorite(placeId)
      setFavorites((prev) => prev.filter((p) => p.id !== placeId))
      showSuccess('Đã bỏ yêu thích', 'Địa điểm đã được cập nhật')
    } catch (error) {
      showError('Lỗi', 'Không thể cập nhật yêu thích')
    } finally {
      setLoadingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm địa điểm yêu thích..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
        />
      </div>

      {/* Favorites List */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((place) => (
            <div key={place.id} className="relative">
              <PlaceCard place={place} />
              <button
                onClick={() => handleToggle(place.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 border border-gray-200 shadow-sm hover:bg-red-50 text-red-500 transition-colors"
                disabled={loadingId === place.id}
                title="Bỏ yêu thích"
              >
                {loadingId === place.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {searchQuery ? 'Không tìm thấy địa điểm' : 'Chưa có địa điểm yêu thích'}
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? 'Thử tìm kiếm với từ khóa khác'
              : 'Hãy khám phá và thêm các địa điểm bạn yêu thích vào danh sách'}
          </p>
        </div>
      )}
    </div>
  )
}
