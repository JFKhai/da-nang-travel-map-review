'use client'

import { motion } from 'framer-motion'
import { PiCaretCircleDoubleDown } from 'react-icons/pi'

/**
 * HeroSection Component
 * 
 * Displays the main hero banner with animated text and scroll-down button
 * Features:
 * - Full-screen hero image
 * - Animated heading with Framer Motion
 * - Smooth scroll to next section
 */
export default function HeroSection() {
  // Smooth scroll to the next section (one viewport height down)
  const scrollDownPage = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div className="relative shadow-lg">
      <img
        className="h-screen w-full object-cover"
        src="https://tourism.danang.vn/wp-content/uploads/2023/02/tour-du-lich-da-nang-1.jpg"
        alt="Da Nang Tourism"
      />
      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between bg-black/50 py-5 text-white">
        <div className="h-15"></div>
        <div className="flex max-w-7xl select-none flex-col items-center">
          <motion.h2
            className="mb-2 text-3xl font-semibold"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Da Nang
          </motion.h2>
          <motion.h3
            className="text-6xl font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Unveiling the beauty of Central Vietnam
          </motion.h3>
        </div>
        <button
          className="text-6xl transition-all hover:text-blue-400"
          onClick={scrollDownPage}
        >
          <PiCaretCircleDoubleDown className="opacity-60" />
        </button>
      </div>
    </div>
  )
}
