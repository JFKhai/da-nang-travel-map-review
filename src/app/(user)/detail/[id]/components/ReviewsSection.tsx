'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Review {
  name: string
  avatar: string
  rating: number
  comment: string
}

interface ReviewsSectionProps {
  reviews: Review[]
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [sortOrder, setSortOrder] = useState<'high' | 'low' | 'default'>('default')
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all')

  const filteredReviews =
    selectedRating === 'all' ? reviews : reviews.filter((review) => review.rating === selectedRating)

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOrder === 'high') {
      return b.rating - a.rating
    } else if (sortOrder === 'low') {
      return a.rating - b.rating
    }
    return 0
  })

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Đánh giá ({filteredReviews.length})</h2>
        <div className="flex gap-2">
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white text-gray-700"
          >
            <option value="all">Tất cả</option>
            <option value={5}>5 sao</option>
            <option value={4}>4 sao</option>
            <option value={3}>3 sao</option>
            <option value={2}>2 sao</option>
            <option value={1}>1 sao</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  unoptimized
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-gray-800 truncate">{review.name}</h3>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400' : 'fill-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">Không có đánh giá nào</p>
        )}
      </div>
    </div>
  )
}
