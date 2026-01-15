import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, ThumbsUp, MapPin, Star } from 'lucide-react'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'

type SidebarProps = {
  popularPlaces: PlaceWithRelations[]
  recommendedPlaces: PlaceWithRelations[]
}

export function Sidebar({ popularPlaces, recommendedPlaces }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Popular Places */}
      <div className="rounded-2xl shadow-sm p-6 border border-brand-border/5">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold text-brand-teal">POPULAR PLACES</h2>
        </div>

        <div className="space-y-4">
          {popularPlaces.map((place, index) => (
            <Link
              href={`/places/${place.id}`}
              key={place.id}
              className="group flex gap-3 bg-white hover:bg-gray-50 p-2 rounded-xl transition-colors"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={place.coverImage.url || '/placeholder.jpg'}
                  alt={place.name || ''}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-1 left-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-brand-border text-sm mb-1 line-clamp-1 group-hover:text-brand-teal transition-colors">
                  {place.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span className="line-clamp-1">{place.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                  <span className="text-xs font-bold text-gray-700">{place.averageRating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Places */}
      <div className="rounded-2xl shadow-sm p-6 border border-brand-border/5">
        <div className="flex items-center gap-2 mb-5">
          <ThumbsUp className="w-5 h-5 text-brand-teal" />
          <h2 className="text-xl font-bold text-brand-teal">RECOMMENDED PLACES</h2>
        </div>

        <div className="space-y-4">
          {recommendedPlaces.map((place) => (
            <Link
              href={`/places/${place.id}`}
              key={place.id}
              className="group flex gap-3 bg-white hover:bg-gray-50 p-2 rounded-xl transition-colors"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={place.coverImage.url || '/placeholder.jpg'}
                  alt={place.name || ''}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-brand-border text-sm mb-1 line-clamp-1 group-hover:text-brand-teal transition-colors">
                  {place.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span className="line-clamp-1">{place.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                  <span className="font-bold">{place.averageRating}</span>
                  <span className="text-gray-400">•</span>
                  <span>{place.reviewCount} đánh giá</span>
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
  )
}
