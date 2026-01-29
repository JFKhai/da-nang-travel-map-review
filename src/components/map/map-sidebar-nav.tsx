import { Home, Star, History, Clock, Filter, Heart, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useAppContext } from '@/components/providers/app-provider'
import { useRouter } from 'next/navigation'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

export type NavTab = 'all' | 'featured' | 'favorites' | 'recent' | 'open-now'

interface MapSidebarNavProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
  minRating: number | null
  onMinRatingChange: (rating: number | null) => void
  showLoginDialog?: boolean
  onCloseLoginDialog?: () => void
  onShowLoginDialog?: () => void
}

export function MapSidebarNav({
  activeTab,
  onTabChange,
  minRating,
  onMinRatingChange,
  showLoginDialog = false,
  onCloseLoginDialog,
  onShowLoginDialog,
}: MapSidebarNavProps) {
  const { user } = useAppContext()
  const router = useRouter()
  const [isRatingOpen, setIsRatingOpen] = useState(false)

  const navItems = [
    { id: 'all', icon: Home, label: 'Tất cả' },
    { id: 'featured', icon: Star, label: 'Nổi bật' },
    { id: 'favorites', icon: Heart, label: 'Yêu thích' },
    { id: 'recent', icon: History, label: 'Đã xem' },
    { id: 'open-now', icon: Clock, label: 'Mở cửa' },
  ] as const

  const handleTabClick = (tabId: NavTab) => {
    if (tabId === 'favorites' && !user) {
      onShowLoginDialog?.()
      return
    }
    onTabChange(tabId)
  }

  return (
    <>
      <div className="flex h-full w-16 flex-col items-center bg-white py-4 shadow-xl border-r z-50">
        {/* 1. Logo spacer */}
        <div className="h-4" />

        {/* Main Tabs */}
        <div className="flex flex-col gap-4 w-full px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id as NavTab)}
                className={cn(
                  'group flex flex-col items-center justify-center gap-1 rounded-lg py-2 transition-all w-full',
                  isActive ? 'bg-blue-50 text-brand-teal' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600',
                )}
                title={item.label}
              >
                <item.icon className={cn('h-6 w-6 transition-transform group-hover:scale-110')} />
                <span className="text-[10px] font-medium text-center leading-tight">{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="my-4 h-px w-8 bg-gray-200" />

        {/* Filter Toggles */}
        <div className="flex flex-col gap-3 w-full px-2">
          {/* Advanced Rating Filter (Separate) */}
          <div className="flex flex-col items-center w-full gap-2">
            <button
              onClick={() => setIsRatingOpen(!isRatingOpen)}
              className={cn(
                'group flex flex-col items-center justify-center gap-1 rounded-lg py-2 transition-all w-full',
                isRatingOpen || minRating
                  ? 'bg-orange-50 text-orange-500'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600',
              )}
              title="Bộ lọc nâng cao"
            >
              <Filter className="h-5 w-5" />
              <span className="text-[10px] font-medium text-center leading-tight">Bộ lọc</span>
            </button>

            {/* Collapsible Star List */}
            {isRatingOpen && (
              <div className="flex flex-col gap-1 w-full animate-in slide-in-from-top-2 fade-in duration-200">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    onClick={() => onMinRatingChange(minRating === star ? null : star)}
                    className={cn(
                      'flex items-center justify-center w-full rounded-md py-1 text-xs font-medium transition-colors border',
                      minRating === star
                        ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:text-orange-600',
                    )}
                  >
                    {star} <span className="ml-0.5 text-[9px]">★</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Required Dialog */}
      <Dialog
        header="Yêu cầu đăng nhập"
        visible={showLoginDialog}
        style={{ width: '90vw', maxWidth: '400px' }}
        onHide={() => onCloseLoginDialog?.()}
        className="font-sans"
      >
        <div className="flex flex-col items-center pt-2 pb-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8 text-brand-teal" />
          </div>
          <p className="text-center text-gray-600 mb-6">
            Vui lòng đăng nhập để xem và quản lý danh sách địa điểm yêu thích của bạn.
          </p>
          <div className="flex gap-3 w-full">
            <Button
              label="Hủy"
              severity="secondary"
              outlined
              className="flex-1"
              onClick={() => onCloseLoginDialog?.()}
            />
            <Button
              label="Đăng nhập ngay"
              className="flex-1 bg-brand-teal border-brand-teal"
              onClick={() => router.push('/login')}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}
