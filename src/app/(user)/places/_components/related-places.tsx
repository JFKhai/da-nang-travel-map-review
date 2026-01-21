'use client'

import { useEffect, useMemo, useState } from 'react'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface RelatedPlacesProps {
  places: PlaceWithRelations[]
  title: string
}

export default function RelatedPlaces({ places, title }: RelatedPlacesProps) {
  const calcItems = () => {
    if (typeof window === 'undefined') return 4
    const width = window.innerWidth
    if (width < 640) return 1 // mobile
    if (width < 1024) return 2 // tablet
    return 4 // desktop
  }

  const [itemsPerPage, setItemsPerPage] = useState(calcItems)
  const [page, setPage] = useState(0)

  // Derive itemsPerPage based on viewport width
  useEffect(() => {
    const handleResize = () => setItemsPerPage(calcItems())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(places.length / itemsPerPage)), [places.length, itemsPerPage])

  // Clamp page to valid range
  const clampedPage = useMemo(() => Math.min(page, totalPages - 1), [page, totalPages])

  const currentPlaces = useMemo(() => {
    const start = clampedPage * itemsPerPage
    return places.slice(start, start + itemsPerPage)
  }, [itemsPerPage, clampedPage, places])

  const canPrev = clampedPage > 0
  const canNext = clampedPage < totalPages - 1

  const handlePrev = () => {
    if (canPrev) setPage((p) => p - 1)
  }

  const handleNext = () => {
    if (canNext) setPage((p) => p + 1)
  }

  if (!places || places.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-brand-border">{title}</h2>
        <div className="flex gap-3">
          <button
            className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-brand-teal transition disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous related places"
          >
            <ArrowLeft />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-brand-teal transition disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next related places"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPlaces.map((place) => (
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
