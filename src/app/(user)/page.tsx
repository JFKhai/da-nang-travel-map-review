'use client'
import { placeApiServerRequest } from '@/lib/api/server-api/place.api'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, Clock, MapIcon, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

const items = [
  {
    bg: 'bg-brand-light',
    src: 'https://i.pinimg.com/1200x/ef/69/c5/ef69c56e319d6db337527303f3501ee1.jpg',
    roundedContainer: ' rounded-tl-[13.5px] rounded-tr-[80px] rounded-br-[13.5px] rounded-bl-none',
    roundedImage: 'rounded-tl-[12px] rounded-tr-[80px] rounded-bl-[50px] rounded-br-[12px]',
    title: 'Golden Bridge',
    people: 600,
  },
  {
    bg: 'bg-brand-dark',
    src: 'https://i.pinimg.com/1200x/bf/8a/2e/bf8a2efd2e72a2a39e844648e22e91b3.jpg',
    roundedContainer: ' rounded-tl-[13.5px] rounded-br-[80px] rounded-tr-[13.5px] rounded-bl-none',
    roundedImage: ' rounded-tl-[12px] rounded-tr-none rounded-br-[80px] rounded-bl-[12px]',
    title: 'My Khe Beach',
    people: 60,
  },
  {
    bg: 'bg-brand-light',
    src: 'https://i.pinimg.com/736x/e7/3d/4a/e73d4a13a9db14eaca53cfb89c928330.jpg',
    roundedContainer: ' rounded-tr-[13.5px] rounded-tl-[80px] rounded-bl-[13.5px] rounded-br-none',
    roundedImage: ' rounded-tl-[80px] rounded-tr-[12px] rounded-br-[80px] rounded-bl-[12px]',
    title: 'Hoi An Ancient Town',
    people: 60,
  },
  {
    bg: 'bg-brand-dark',
    src: 'https://i.pinimg.com/1200x/a9/d3/d6/a9d3d6bd5a86724df02271c42f2791cf.jpg',
    roundedContainer: ' rounded-tl-[13.5px] rounded-tr-[13.5px] rounded-br-[80px] rounded-bl-none',
    roundedImage: ' rounded-tl-[12px] rounded-tr-none rounded-br-[80px] rounded-bl-[12px]',
    title: 'Dragon Bridge',
    people: 60,
  },
  {
    bg: 'bg-brand-dark',
    src: 'https://i.pinimg.com/1200x/38/88/b4/3888b4278a0c94d56e88e6326dcb779e.jpg',
    roundedContainer: ' rounded-tl-[13.5px] rounded-tr-[80px] rounded-br-none rounded-bl-[13.5px]',
    roundedImage: 'rounded-tl-[12px] rounded-tr-[80px] rounded-bl-[50px] rounded-br-[12px]',
    title: 'Ba Na Hills',
    people: 60,
  },
]

export default function Home() {
  const [destinations, setDestinations] = useState<PlaceWithRelations[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchDestinations = async (pageNum: number) => {
    try {
      setLoading(true)
      const { data } = await placeApiServerRequest.getPlaces({
        page: pageNum,
        limit: 8,
        sortBy: 'created_at',
        sortOrder: 'DESC',
      })
      setDestinations(data.places)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Failed to load destinations', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDestinations(page)
  }, [page])

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1)
  }

  return (
    <>
      {/* Line decorate */}
      <section className="">
        <hr className="border-t-2 border-dashed border-brand-light" />
      </section>

      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-10 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 bg-[url('/images/map-bg-image.png')] bg-contain bg-center bg-no-repeat">
          {/* Left */}
          <div className="">
            <div className="lg:pr-3">
              <p className="mb-2 text-sm sm:text-base lg:text-[18px] uppercase font-bold tracking-widest text-[#81949D]">
                Mountains | Plains | Beaches
              </p>
              <h2 className="mb-2 text-3xl sm:text-4xl lg:text-5xl xl:text-[64px] leading-tight text-brand-teal font-bold">
                Make the most of Da Nang with top activities and places
              </h2>
              <p className="lg:pr-3 text-base sm:text-lg lg:text-[20px] text-[#81949D]">
                The traveller where you can select your desired activity and destinations of your choice for vacations.
              </p>
            </div>

            {/* Activity list */}
            <div className="mt-4 lg:mt-2">
              <p className="mb-4 text-xs sm:text-sm font-bold text-[#81949D]">ACTIVITY LIST</p>
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-4 sm:gap-6 lg:gap-[32px] animate-marquee will-change-transform hover:[animation-play-state:paused]">
                  {[...items, ...items].map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-[160px] sm:w-[180px] lg:w-[198px] overflow-hidden shrink-0 p-3 sm:p-4',
                        item.roundedContainer,
                        item.bg,
                      )}
                    >
                      <div className={cn('aspect-square w-full overflow-hidden', item.roundedImage)}>
                        <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold">{item.title}</h3>
                      <p className="text-[10px] sm:text-xs opacity-80">{item.people} people going</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full overflow-hidden">
            <div
              className="relative w-full h-full
    bg-cover bg-center

    mask-[url('/images/mask.png')]
    mask-contain
    mask-no-repeat
    mask-center

    [-webkit-mask-image:url('/images/mask.png')]
    [-webkit-mask-size:contain]
    [-webkit-mask-repeat:no-repeat]
    [-webkit-mask-position:center]"
            >
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/videos/mask.mp4" type="video/mp4" />
              </video>
            </div>
            <img
              src="/images/circle-big.png"
              alt="decoration"
              className="absolute z-10 top-0 w-40 md:w-auto left-1/5 lg:left-0 lg:top-10 lg:w-auto animate-float-scale"
            />
            <img
              src="/images/circle-small.png"
              alt="decoration"
              className="absolute z-10 sm:-bottom-40  -bottom-10 w-1/2 right-0 sm:-right-40  lg:w-auto animate-float-scale-delayed"
            />
          </div>
        </div>

        {/* Search bar */}
        <div className="px-0 sm:px-4 lg:px-10 pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-12 lg:pb-16 w-full">
          <div className="mx-auto flex flex-col sm:flex-row max-w-5xl items-stretch sm:items-center gap-3 sm:gap-4 lg:gap-6 rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-lg">
            {/* Location */}
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-semibold uppercase text-[#81949D]">Location</label>
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="hidden sm:block h-10 w-px bg-gray-200" />

            {/* Activity */}
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-semibold uppercase text-[#81949D]">Activity</label>
              <input
                type="text"
                placeholder="Choose activity"
                className="w-full text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="hidden sm:block h-10 w-px bg-gray-200" />

            {/* Date */}
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-semibold uppercase text-[#81949D]">Date</label>
              <input type="date" className="w-full text-sm outline-none text-gray-600" />
            </div>

            <div className="hidden sm:block h-10 w-px bg-gray-200" />

            {/* Guests */}
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-semibold uppercase text-[#81949D]">Guests</label>
              <input
                type="number"
                placeholder="2"
                min={1}
                className="w-full text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Search button */}
            <button className="sm:ml-2 flex px-4 py-3 sm:py-2 items-center justify-center rounded-xl sm:rounded-2xl bg-brand-teal text-white hover:opacity-90 transition text-sm font-medium">
              SEARCH
            </button>
          </div>
        </div>

        <img
          src="/images/boat.png"
          alt="boat decoration"
          className="bottom-[30%] md:bottom-16 lg:block lg:bottom-30 w-3/5 md:w-1/2 absolute z-10 xl:bottom-0 right-0 xl:w-auto"
        />
      </section>

      {/* Top Destination */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-brand-teal">TOP DESTINATION</h1>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={page <= 1 || loading}
              className={cn(
                'w-10 h-10 flex items-center justify-center border rounded-full transition',
                page <= 1 || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-brand-teal hover:text-white hover:border-brand-teal',
              )}
              aria-label="Previous page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={page >= totalPages || loading}
              className={cn(
                'w-10 h-10 flex items-center justify-center border rounded-full transition',
                page >= totalPages || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-brand-teal hover:text-white hover:border-brand-teal',
              )}
              aria-label="Next page"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
            <p className="mt-4 text-gray-600">Loading destinations...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && destinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No destinations found.</p>
          </div>
        )}

        {/* LIST */}
        {!loading && destinations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {destinations.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                  <img
                    src={item.images?.[0]?.url ?? (item as any).image ?? '/images/placeholder.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-sm mb-1 text-brand-teal line-clamp-2 min-h-[2.5rem]">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 flex items-start gap-1">
                    <MapPin className="grow-0 shrink-0 w-3 sm:w-4 mt-0.5" />
                    <span className="line-clamp-1">{item.address}</span>
                  </p>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2 min-h-[2rem]">{item.short_description}</p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 mb-3 min-h-[1.75rem]">
                    {item.categories?.slice(0, 2).map((category, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-xs font-medium text-white bg-brand-teal px-2 py-1 rounded capitalize"
                      >
                        {(category as any).name ?? category}
                      </span>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="text-xs text-gray-600 mb-4 pb-3 border-t border-gray-200 pt-3">
                    <p className="truncate flex gap-1 items-center">
                      <Clock className="w-3 sm:w-4 grow-0 shrink-0" />
                      <span className="text-[10px] sm:text-xs truncate">
                        {(item as any).opening_hours ?? (item as any).openingHours ?? 'Updating'}
                      </span>
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-brand-teal font-semibold text-xs sm:text-sm">
                        {(item as any).rating ?? '4.5'}
                      </span>
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-[10px] sm:text-xs text-gray-400">
                        ({(item as any).review_count ?? (item as any).reviewCount ?? 0})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination info */}
        {!loading && destinations.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>
        )}
      </section>
    </>
  )
}
