'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<'vi' | 'en'>('vi')

  return (
    <div className="relative ml-6">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          rounded-xl border border-gray-200
          bg-white/70 px-4 py-2
          text-sm font-medium text-gray-700
          shadow-sm backdrop-blur
          hover:border-teal-400 hover:shadow-md
        "
      >
        {lang === 'vi' ? (
          <>
            <img src="https://flagicons.lipis.dev/flags/4x3/vn.svg" alt="" className="h-6" />
            <span className="uppercase">{lang}</span>
          </>
        ) : (
          <>
            <img src="https://flagicons.lipis.dev/flags/4x3/gb.svg" alt="" className="h-6" />
            <span className="uppercase">{lang}</span>
          </>
        )}
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </span>
      </button>

      {open && (
        <div className="absolute overflow-hidden right-0 mt-3 z-20 w-28 rounded-xl border bg-white shadow-xl">
          <a
            onClick={() => {
              setLang('vi')
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-teal-50 hover:cursor-pointer"
          >
            <img src="https://flagicons.lipis.dev/flags/4x3/vn.svg" alt="" className="h-6" />
            <span className="uppercase">{lang}</span>
          </a>

          <a
            onClick={() => {
              setLang('en')
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-teal-50 hover:cursor-pointer"
          >
            <img src="https://flagicons.lipis.dev/flags/4x3/gb.svg" alt="" className="h-6" />
            <span className="uppercase">{lang}</span>
          </a>
        </div>
      )}
    </div>
  )
}
