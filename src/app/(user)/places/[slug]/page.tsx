import ImageGallery from '../_components/image-gallery'
import PlaceInfoCard from '../_components/place-info-card'
import ReviewSection from '../_components/review-section'
import RelatedPlaces from '../_components/related-places'
import { placeApiServerRequest } from '@/lib/api/server-api/place.api'
import { notFound } from 'next/navigation'
import { reviewApiServerRequest } from '@/lib/api/server-api/review.api'

export default async function PlaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const placeId = Number(slug)
  if (isNaN(placeId)) {
    notFound()
  }

  let placeDetail
  let reviews: any[] = []
  let relatedPlaces: any[] = []

  try {
    // 1. API CHÍNH: Lấy thông tin địa điểm
    const placeResult = await placeApiServerRequest.getPlaceById(placeId)
    placeDetail = placeResult.data

    if (!placeDetail) {
      notFound()
    }

    // 2. API PHỤ: Lấy Reviews
    try {
      const reviewsResult = await reviewApiServerRequest.getReviewsByPlaceId(placeId)
      reviews = reviewsResult.data || []
    } catch (reviewError) {
      console.warn('Error fetching reviews:', reviewError)
      reviews = []
    }

    // 3. API PHỤ: Lấy Related Places
    if (placeDetail.categories && placeDetail.categories.length > 0) {
      try {
        const categoryIds = placeDetail.categories.map((cat: any) => cat.id)
        const relatedResult = await placeApiServerRequest.getRelatedPlaces({
          categoryIds,
          excludePlaceId: placeDetail.id,
        })
        relatedPlaces = relatedResult.data || []
      } catch (relatedError) {
        console.warn('Error fetching related places:', relatedError)
        relatedPlaces = []
      }
    }
  } catch (error) {
    console.error('Error fetching place detail:', error)
    notFound()
  }

  // Double check cuối cùng
  if (!placeDetail) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {placeDetail.coverImage && (
              <ImageGallery
                coverImage={placeDetail.coverImage}
                images={placeDetail.images || []}
                title={placeDetail.name}
              />
            )}

            {/* Description */}
            {placeDetail.short_description && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-teal/10">
                <h2 className="text-2xl font-bold mb-4 text-brand-border">Mô tả</h2>
                <p className="text-gray-700 leading-relaxed">{placeDetail.short_description}</p>
              </div>
            )}

            {/* Location & Map */}
            {(placeDetail.address || (placeDetail.lat && placeDetail.lng)) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-teal/10">
                <h2 className="text-2xl font-bold mb-4 text-brand-border">Địa điểm</h2>
                {placeDetail.address && <p className="text-gray-700 mb-4">{placeDetail.address}</p>}

                {placeDetail.lat && placeDetail.lng && (
                  <div className="rounded-xl overflow-hidden">
                    <iframe
                      className="w-full h-[400px]"
                      loading="lazy"
                      src={`https://maps.google.com/maps?q=${placeDetail.lat},${placeDetail.lng}&hl=vi&z=15&output=embed`}
                      title="Map"
                      style={{ border: 0 }}
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}

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
        {relatedPlaces.length > 0 && (
          <div className="mt-12">
            <RelatedPlaces places={relatedPlaces} title="Địa điểm liên quan" />
          </div>
        )}
      </div>
    </div>
  )
}
