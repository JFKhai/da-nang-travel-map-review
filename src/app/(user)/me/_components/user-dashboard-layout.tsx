'use client'

import { useState, ReactNode } from 'react'
import { User, Heart, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  icon: React.ElementType
  content: ReactNode
}

interface UserDashboardLayoutProps {
  tabs: Tab[]
  defaultTab?: string
}

export default function UserDashboardLayout({ tabs, defaultTab }: UserDashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-border mb-2">Tài khoản của tôi</h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân và tùy chọn của bạn</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-brand-border/5 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-3 px-6 py-4 font-medium transition-colors whitespace-nowrap',
                      isActive
                        ? 'text-brand-teal border-b-2 border-brand-teal bg-brand-light/10'
                        : 'text-gray-600 hover:text-brand-teal hover:bg-gray-50',
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">{activeTabContent}</div>
        </div>
      </div>
    </div>
  )
}
