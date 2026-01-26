import { MapIcon, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        {/* Top CTA */}
        <div className="rounded-2xl bg-brand-dark border border-brand-border p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-light">Plan your Da Nang trip</p>
              <h3 className="text-2xl md:text-3xl font-bold mt-2 text-white">Get fresh guides, maps, and deals.</h3>
              <p className="text-sm text-slate-300 mt-2">
                Curated tips on beaches, food, and hidden gems delivered occasionally.
              </p>
            </div>
            <form className="flex w-full md:w-auto max-w-xl gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 rounded-xl bg-white/10 border border-brand-border px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-light"
              />
              <button
                type="submit"
                className="rounded-xl bg-brand-light px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-light/90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="inline-block w-full h-12  group">
              <div
                className="w-full h-full bg-brand-light bg-cover rounded-lg
      mask-[url('/images/logo.svg')]
      mask-contain
      mask-no-repeat
      [-webkit-mask-image:url('/images/logo.svg')]
      [-webkit-mask-size:contain]
      [-webkit-mask-repeat:no-repeat]
      [-webkit-mask-position:left]
      group-hover:bg-brand-teal transition-colors duration-300"
              />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              Discover Da Nang with honest reviews, smart maps, and handpicked experiences. Your journey starts here.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-brand-light w-fit pb-1">Explore</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-brand-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/review" className="hover:text-brand-light transition-colors">
                  Destination Reviews
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-brand-light transition-colors">
                  Travel Map
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-light transition-colors">
                  Travel Tips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-brand-light w-fit pb-1">Support</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href="#" className="hover:text-brand-light transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-light transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-light transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-light transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <h3 className="text-lg font-semibold mb-4 border-b border-brand-light w-fit pb-1">Contact</h3>
            <p className="flex items-start gap-3">
              <span className="text-brand-light">
                <MapIcon size={18} />
              </span>
              Hai Chau District, Da Nang
            </p>
            <p className="flex items-center gap-3">
              <span className="text-brand-light">
                <Phone size={18} />
              </span>
              +84 123 456 789
            </p>
            <p className="flex items-center gap-3">
              <span className="text-brand-light">
                <Mail size={18} />
              </span>
              info@danangtrip.com
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Follow</span>
              <div className="flex gap-3 text-slate-200">
                <Link href="#" className="hover:text-brand-light transition-colors">
                  Facebook
                </Link>
                <Link href="#" className="hover:text-brand-light transition-colors">
                  Instagram
                </Link>
                <Link href="#" className="hover:text-brand-light transition-colors">
                  YouTube
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border text-center text-sm text-white">
          <p>©2026 Travelopia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
