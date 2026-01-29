'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Share2, Info, Star, ImageIcon, Heart, ExternalLink } from 'lucide-react'
import type { PlaceLocation, PlaceReview } from '@/lib/map/map.types'
import { getReviewsApi } from '@/lib/api/client-api/map.api'
import { getCategoryLabel, isPlaceOpen } from '@/lib/map/map.utils'
import { cn } from '@/lib/utils'

function ReviewSection({ placeId, rating, reviewCount }: { placeId: number; rating: number; reviewCount: number }) {
  const [reviews, setReviews] = useState<PlaceReview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true)
      try {
        const data = await getReviewsApi(placeId)
        setReviews(data)
      } catch (err) {
        console.error('Failed to fetch reviews', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchReviews()
  }, [placeId])

  // Calculate rating distribution from actual reviews
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length
    const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0
    return { star, count, percentage }
  })

  return (
    <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-2 fade-in">
      {/* Header Summary */}
      <div className="flex items-center gap-4 py-2">
        <div className="flex flex-col items-center justify-center rounded-lg bg-yellow-50 px-4 py-2 border border-yellow-100">
          <span className="text-3xl font-bold text-yellow-600">{rating}</span>
          <div className="flex text-yellow-500 text-xs">★★★★★</div>
          <span className="text-[10px] text-gray-500 mt-1">{reviewCount} đánh giá</span>
        </div>
        {/* Rating Distribution */}
        <div className="flex-1 flex flex-col gap-1">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-2 text-[10px] text-gray-500">
              <span className="w-2">{star}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${percentage}%` }} />
              </div>
              <span className="w-4 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="flex flex-col gap-3 mt-1">
        {isLoading ? (
          <p className="text-center text-gray-400 py-4">Đang tải đánh giá...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                    {review.user.avatar ? (
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-300">
                        {review.user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{review.user.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-gray-500">{review.user.level}</span>
                      <span className="text-[8px] text-gray-300">•</span>
                      <div className="flex text-yellow-500 text-[10px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed pl-1">{review.content}</p>
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mt-1 overflow-x-auto pb-1 no-scrollbar">
                  {review.images.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                      <Image src={img} alt="Review" fill className="object-cover" sizes="64px" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">Chưa có đánh giá nào.</p>
            <p className="text-gray-400 text-xs mt-1">Hãy là người đầu tiên chia sẻ cảm nhận!</p>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Props for the PlaceDetailSidebar component
 */
interface PlaceDetailSidebarProps {
  /** The place to display details for */
  place: PlaceLocation
  /** Callback fired when the sidebar is closed */
  onClose: () => void
  /** Whether this place is in the user's favorites */
  isFavorite?: boolean
  /** Callback fired when the favorite button is toggled */
  onToggleFavorite?: () => void
}

type TabKey = 'info' | 'reviews' | 'photos'

export function PlaceDetailSidebar({ place, onClose, isFavorite = false, onToggleFavorite }: PlaceDetailSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('info')

  const handleShare = async () => {
    const url = `${window.location.origin}/places/${place.id}`
    try {
      await navigator.clipboard.writeText(url)
      alert('Đã copy link địa điểm vào bộ nhớ tạm!')
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-left-5 duration-300">
      {/* 1. Header with Cover Image */}
      <div className="relative h-48 w-full shrink-0">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover"
          sizes="400px"
          loading="eager"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        {/* Top Actions */}
        <div className="absolute left-0 top-0 flex w-full justify-between p-4">
          <button
            onClick={onClose}
            className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            <button
              className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
              onClick={onToggleFavorite}
              title={isFavorite ? 'Bỏ thích' : 'Yêu thích'}
            >
              <Heart
                className={cn(
                  'h-5 w-5 transition-colors',
                  isFavorite ? 'fill-red-500 text-red-500' : 'fill-transparent',
                )}
              />
            </button>
            <button
              className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
              onClick={handleShare}
              title="Chia sẻ"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Title & Category */}
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-brand-teal px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
              {getCategoryLabel(place.category)}
            </span>
            {place.opening_hours &&
              (isPlaceOpen(place.opening_hours) ? (
                <span className="text-xs font-medium text-green-400">Đang mở cửa</span>
              ) : (
                <span className="text-xs font-medium text-red-400">Đã đóng cửa</span>
              ))}
          </div>
          <h2 className="font-cabinet-grotesk text-2xl font-bold leading-tight">{place.name}</h2>
        </div>
      </div>

      {/* Detail Page Button */}
      <div className="px-5 pt-4 pb-2">
        <Link href={`/places/${place.id}`}>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-teal text-white rounded-lg font-medium hover:bg-brand-dark transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span>Chi tiết địa điểm</span>
          </button>
        </Link>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="p-5 pb-0 shrink-0">
          {/* Rating & Review Count */}
          <div className="mb-4 flex items-center gap-2 text-sm">
            <span className="font-medium text-orange-500">{place.rating}</span>
            <div className="flex text-orange-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-xs">
                  {i < Math.floor(place.rating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-gray-500">({place.reviewCount})</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600">{getCategoryLabel(place.category)}</span>
          </div>

          <hr className="mb-4 border-gray-100" />

          {/* Tab Buttons (Replaces Actions) */}
          <div className="mb-2 flex border-b border-gray-200">
            {[
              { id: 'info', icon: Info, label: 'Thông tin' },
              { id: 'reviews', icon: Star, label: 'Đánh giá' },
              { id: 'photos', icon: ImageIcon, label: 'Danh mục ảnh' },
            ].map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 pb-3 pt-2 text-sm font-medium transition-colors border-b-2',
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 pt-0">
          {activeTab === 'info' && (
            <div className="space-y-4 text-[15px] animate-in fade-in slide-in-from-bottom-2 duration-300">
              {place.description && <p className="text-gray-600 text-sm leading-relaxed mb-4">{place.description}</p>}

              {place.address && (
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <div className="h-5 w-5 text-gray-400 text-center">📍</div>
                  </div>
                  <p className="text-gray-700">{place.address}</p>
                </div>
              )}

              {place.opening_hours ? (
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <div className="h-5 w-5 text-gray-400 text-center">🕒</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium">Giờ mở cửa</p>
                    <p className="text-sm text-gray-600">{place.opening_hours}</p>
                    {isPlaceOpen(place.opening_hours) ? (
                      <p className="text-xs text-green-700 font-medium mt-1">Đang mở cửa</p>
                    ) : (
                      <p className="text-xs text-red-600 font-medium mt-1">Đã đóng cửa</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <div className="h-5 w-5 text-gray-400 text-center">🕒</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 italic">Chưa có thông tin giờ mở cửa</p>
                  </div>
                </div>
              )}

              {place.phone ? (
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <div className="h-5 w-5 text-gray-400 text-center">📞</div>
                  </div>
                  <p className="text-gray-700">{place.phone}</p>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <div className="h-5 w-5 text-gray-400 text-center">📞</div>
                  </div>
                  <p className="text-gray-400 italic">Chưa có số điện thoại</p>
                </div>
              )}

              {place.website && (
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <div className="h-5 w-5 text-gray-400 text-center">🌐</div>
                  </div>
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate w-full"
                  >
                    {place.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <ReviewSection placeId={place.id} rating={place.rating} reviewCount={place.reviewCount} />
          )}

          {activeTab === 'photos' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {place.images && place.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {place.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={img.url}
                        alt={img.caption || `Ảnh ${idx + 1}`}
                        fill
                        className="object-cover transition-transform hover:scale-110"
                        sizes="(max-width: 400px) 50vw, 200px"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {/* Mock Photos if empty (Using cover image duplicated for demo) */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={place.image}
                        alt={`Demo Photo ${i}`}
                        fill
                        className="object-cover opacity-80"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
