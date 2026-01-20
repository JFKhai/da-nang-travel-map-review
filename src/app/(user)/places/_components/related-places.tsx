import { PlaceWithRelations } from '@/lib/schemas/place.schema'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface RelatedPlacesProps {
  places: PlaceWithRelations[]
  title: string
}

export default function RelatedPlaces({ places, title }: RelatedPlacesProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-brand-border">{title}</h2>
        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-brand-teal transition">
            <ArrowLeft />
          </button>
          <button className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-brand-teal transition">
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {places.map((place) => (
          <Link
            key={place.id}
            href={`/places/${place.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-brand-teal/10 hover:border-brand-teal/30 transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={place.coverImage.url}
                alt={place.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {place.categories.map((category) => (
                  <span
                    key={category.id}
                    className="text-xs px-2 py-1 bg-brand-light/30 text-brand-border rounded-full font-medium"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-brand-border mb-2 line-clamp-2 group-hover:text-brand-teal transition-colors">
                {place.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">{place.averageRating}</span>
                  <span className="text-sm text-gray-500">({place.reviewCount})</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{place.address}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
