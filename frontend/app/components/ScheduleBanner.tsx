'use client'

import { motion } from 'framer-motion'

/**
 * ScheduleBanner Component
 * 
 * Call-to-action banner encouraging users to create travel schedules
 * Features:
 * - Hover animation effects
 * - Responsive design
 * - Eye-catching visuals
 */
export default function ScheduleBanner() {
  return (
    <div className="mb-9 w-full relative overflow-hidden rounded-lg">
      <img
        className="h-50 w-full object-cover"
        src="https://duan-sungroup.com/wp-content/uploads/2022/12/Mercure-Danang-French-Village-Bana-Hills-noi-bat-giua-xu-so-hoa-noi-trong-may.png"
        alt="Schedule banner"
      />
      <motion.div
        className="absolute left-0 top-0 h-full w-full cursor-pointer bg-black/50 p-3"
        whileHover={{ padding: '20px' }}
      >
        <motion.div
          className="flex h-full w-full items-center justify-center rounded-md border-2 border-transparent"
          whileHover={{
            borderColor: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="select-none text-center text-4xl font-bold tracking-wider text-white">
            Start create your travel schedule
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
