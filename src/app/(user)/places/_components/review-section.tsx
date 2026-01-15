import ImageNext from 'next/image'
import { Image } from 'primereact/image'
import { Star } from 'lucide-react'
import { ReviewType } from '@/lib/schemas/review.schema'

interface ReviewSectionProps {
  reviews: ReviewType[]
  rating: number | null
  totalReviews: number
}

export default function ReviewSection({ reviews, rating, totalReviews }: ReviewSectionProps) {
  // Tính toán số lượng reviews cho mỗi mức sao
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => review.stars === stars).length,
  }))

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-brand-border">Đánh giá</h2>

      {/* Rating Overview */}
      <div className="bg-brand-light/10 border border-brand-teal/20 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{rating}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">{totalReviews} đánh giá</p>
          </div>

          <div className="flex-1 space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm w-12">{item.stars} Stars</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${totalReviews > 0 ? (item.count / totalReviews) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button className="px-4 py-2 border border-brand-teal/30 rounded-full text-sm hover:bg-brand-light/20 hover:border-brand-teal transition-colors">
          <Star className="w-4 h-4 inline mr-1" /> Xu hướng
        </button>
        <button className="px-4 py-2 border border-brand-teal/30 rounded-full text-sm hover:bg-brand-light/20 hover:border-brand-teal transition-colors">
          Mới nhất
        </button>
        <button className="px-4 py-2 border border-brand-teal/30 rounded-full text-sm hover:bg-brand-light/20 hover:border-brand-teal transition-colors">
          Cũ nhất
        </button>
        <button className="px-4 py-2 border border-brand-teal/30 rounded-full text-sm hover:bg-brand-light/20 hover:border-brand-teal transition-colors">
          <Star className="w-4 h-4 inline mr-1" /> Đánh giá cao
        </button>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-brand-teal/10 pb-6">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <ImageNext
                  src={review.author.avatar_url ? review.author.avatar_url : '/images/default-avatar.png'}
                  alt={review.author.full_name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{review.author.full_name}</h4>
                    <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.stars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {review.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <Image src={image.url} alt={`Review image ${index + 1}`} preview className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 px-6 py-3 border border-brand-teal text-brand-teal rounded-full hover:bg-brand-light/20 font-medium transition-colors">
        Xem thêm đánh giá
      </button>
    </div>
  )
}
