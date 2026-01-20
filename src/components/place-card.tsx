import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'

interface PlaceCardProps {
  place: PlaceWithRelations
  showDescription?: boolean
  className?: string
}

export default function PlaceCard({ place, showDescription = true, className = '' }: PlaceCardProps) {
  return (
    <Link
      href={`/places/${place.id}`}
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-border/5 hover:-translate-y-2 ${className}`}
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
          <span className="font-bold text-brand-border text-sm">{place.averageRating || 'N/A'}</span>
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

        {showDescription && (
          <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed mb-4">{place.short_description}</p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="text-xs font-medium text-gray-400">{place.reviewCount || 0} đánh giá</span>
          <span className="text-brand-teal font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Xem chi tiết
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
