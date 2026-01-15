import ImageGallery from '../_components/image-gallery'
import PlaceInfoCard from '../_components/place-info-card'
import ReviewSection from '../_components/review-section'
import RelatedPlaces from '../_components/related-places'
import { reviews, relatedPlaces, relatedPopular } from './mock-data'
import { placeApiServerRequest } from '@/lib/api/server-api/place.api'
import { notFound } from 'next/navigation'
import { reviewApiServerRequest } from '@/lib/api/server-api/review.api'

export default async function PlaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let placeDetail
  let reviews
  try {
    const placeResult = await placeApiServerRequest.getPlaceById(Number(slug))
    placeDetail = placeResult.data
    const reviewsResult = await reviewApiServerRequest.getReviewsByPlaceId(Number(slug))
    reviews = reviewsResult.data
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <ImageGallery coverImage={placeDetail.coverImage} images={placeDetail.images} title={placeDetail.name} />

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-teal/10">
              <h2 className="text-2xl font-bold mb-4 text-brand-border">Mô tả</h2>
              <p className="text-gray-700 leading-relaxed">{placeDetail.short_description}</p>
            </div>

            {/* Location & Map */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-teal/10">
              <h2 className="text-2xl font-bold mb-4 text-brand-border">Địa điểm</h2>
              <p className="text-gray-700 mb-4">{placeDetail.address}</p>

              <div className="rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-[400px]"
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${placeDetail.lat},${placeDetail.lng}&z=15&output=embed`}
                  title="Map"
                />
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-teal/10">
              <ReviewSection
                placeId={placeDetail.id}
                reviews={reviews}
                rating={placeDetail.averageRating}
                totalReviews={placeDetail.reviewCount}
              />
            </div>
          </div>

          {/* Right Sidebar - 1/3 width */}
          <PlaceInfoCard place={placeDetail} />
        </div>

        {/* Related Places Section */}
        <div className="mt-12">
          <RelatedPlaces places={relatedPlaces} title="Địa điểm liên quan" />
        </div>

        {/* Related Popular Section */}
        <div className="mt-8">
          <RelatedPlaces places={relatedPopular} title="Địa điểm phổ biến" />
        </div>
      </div>
    </div>
  )
}
