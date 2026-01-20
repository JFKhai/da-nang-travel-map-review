'use client'

import { PlaceWithRelations } from '@/lib/schemas/place.schema'
import { MapPin, Phone, Globe, Clock, Star } from 'lucide-react'

interface PlaceInfoCardProps {
  place: PlaceWithRelations
}

export default function PlaceInfoCard({ place }: PlaceInfoCardProps) {
  console.log(place)
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-4 space-y-6">
        {/* Rating Card */}
        <div className="bg-gradient-to-br from-brand-light/20 to-brand-teal/20 rounded-2xl p-6 border border-brand-teal/20">
          <div className=" mb-4">
            <div className=" mb-3 font-bold text-3xl">{place.name}</div>
            <div className="text-5xl flex gap-3 font-bold text-gray-800 mb-1">
              <span> {place.averageRating}</span>{' '}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(place.averageRating ?? 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-gray-600">{place.reviewCount} đánh giá</div>
          </div>

          {place.categories && place.categories.length > 0 && (
            <div className="flex justify-start flex-wrap gap-2 justify-center">
              {place.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="px-3 py-1 bg-white rounded-full text-sm font-medium text-brand-teal shadow-sm"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Contact Info Card */}
        <div className="bg-white border border-brand-teal/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold mb-4 text-brand-border">Thông tin liên hệ</h3>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-brand-teal flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-1">Địa chỉ</p>
              <p className="text-sm text-gray-600">{place.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-3 border-t border-brand-teal/10">
            <Phone className="w-5 h-5 text-brand-teal flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-border mb-1">Điện thoại</p>
              <a href={`tel:${place.phone}`} className="text-sm text-brand-teal hover:underline">
                {place.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-3 border-t border-brand-teal/10">
            <Globe className="w-5 h-5 text-brand-teal flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-border mb-1">Website</p>
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-teal hover:underline break-all"
              >
                {place.website}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-3 border-t border-brand-teal/10">
            <Clock className="w-5 h-5 text-brand-teal flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-border mb-1">Giờ mở cửa</p>
              <p className="text-sm text-gray-600">{place.opening_hours}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-teal/10">
            <button className="w-full bg-brand-teal text-white py-3 rounded-full font-semibold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Chỉ đường
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
