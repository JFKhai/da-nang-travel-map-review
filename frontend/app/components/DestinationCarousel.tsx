'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PiStarFill } from 'react-icons/pi'
import { type Destination } from '@/app/types'
import { CAROUSEL_AUTO_ROTATE_INTERVAL } from '@/app/constants'

interface DestinationCarouselProps {
  destinations: Destination[]
}

/**
 * DestinationCarousel Component
 * 
 * Displays a rotating carousel of hot destinations
 * Features:
 * - Auto-rotation every 5 seconds
 * - Smooth fade transitions
 * - Navigation dots for manual selection
 * - Star ratings display
 * - Responsive design
 */
export default function DestinationCarousel({ destinations }: DestinationCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate carousel
  useEffect(() => {
    if (destinations.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length)
    }, CAROUSEL_AUTO_ROTATE_INTERVAL)

    return () => clearInterval(timer)
  }, [destinations.length])

  // Handle empty state
  if (destinations.length === 0) {
    return (
      <div className="mt-9 w-full">
        <div className="flex h-6 w-full items-center justify-between">
          <h3 className="text-xl font-semibold leading-normal tracking-wide">
            Hot destinations
          </h3>
        </div>
        <div className="mt-3 h-100 w-full rounded-lg bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No destinations available</p>
        </div>
      </div>
    )
  }

  const currentDestination = destinations[currentIndex]

  return (
    <div className="mt-9 w-full">
      <div className="flex h-6 w-full items-center justify-between">
        <h3 className="text-xl font-semibold leading-normal tracking-wide">
          Hot destinations
        </h3>
        <div className="flex cursor-pointer items-center justify-start gap-2 hover:text-blue-600 hover:underline">
          <h4 className="text-base font-normal leading-none">View more</h4>
          <span>→</span>
        </div>
      </div>
      
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mt-3 h-100 w-full overflow-hidden rounded-lg bg-gray-200"
      >
        <img
          className="h-full w-full object-cover"
          src={currentDestination.image}
          alt={currentDestination.name}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
        
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex justify-end">
            <button className="rounded-full border-2 border-white px-6 py-2 text-white font-medium hover:bg-white hover:text-black transition-all">
              View details
            </button>
          </div>
          
          <div className="text-white">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <PiStarFill
                  key={i}
                  className={i < Math.floor(currentDestination.rating) ? 'text-yellow-400' : 'text-gray-400'}
                  size={20}
                />
              ))}
            </div>
            <h2 className="text-4xl font-bold mb-2">{currentDestination.name}</h2>
            <p className="text-base text-gray-200">{currentDestination.address}</p>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {destinations.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
