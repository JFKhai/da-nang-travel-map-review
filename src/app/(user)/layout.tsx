'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/footer'
import { Header } from '@/components/header'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMapPage = pathname === '/map'

  return (
    <div className={isMapPage ? 'flex h-screen flex-col overflow-hidden' : 'bg-brand-teal/40'}>
      <Header />
      <div className={isMapPage ? 'flex-1 overflow-hidden' : ''}>{children}</div>
      {!isMapPage && <Footer />}
    </div>
  )
}
