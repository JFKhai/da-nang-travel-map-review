'use client'

import { mockDestinations } from '@/app/data/mockDestinations'
import HeroSection from '@/app/components/HeroSection'
import DestinationCarousel from '@/app/components/DestinationCarousel'
import BlogSection from '@/app/components/BlogSection'
import ScheduleBanner from '@/app/components/ScheduleBanner'

/**
 * Home Page Component
 * 
 * Main landing page for the Da Nang Travel website
 * Displays hero section, hot destinations, blog posts, and travel schedule CTA
 */
export default function Home() {
  return (
    <div>
      <HeroSection />

      <div className="mx-auto min-h-screen w-full xl:max-w-7xl px-4">
        <DestinationCarousel destinations={mockDestinations} />
        <BlogSection />
        <ScheduleBanner />
      </div>
    </div>
  )
}

