import { LucideIcon } from 'lucide-react'
import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  color: 'blue' | 'teal' | 'purple' | 'orange' | 'red' | 'yellow'
  trend?: {
    value: number
    isPositive: boolean
  }
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-100',
    gradient: 'from-blue-500 to-blue-600',
  },
  teal: {
    bg: 'bg-teal-50',
    icon: 'text-teal-600',
    border: 'border-teal-100',
    gradient: 'from-teal-500 to-teal-600',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    border: 'border-purple-100',
    gradient: 'from-purple-500 to-purple-600',
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    border: 'border-orange-100',
    gradient: 'from-orange-500 to-orange-600',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    border: 'border-red-100',
    gradient: 'from-red-500 to-red-600',
  },
  yellow: {
    bg: 'bg-yellow-50',
    icon: 'text-yellow-600',
    border: 'border-yellow-100',
    gradient: 'from-yellow-500 to-yellow-600',
  },
}

export function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
  const colors = colorVariants[color]

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      {/* Gradient accent on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      ></div>

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="mt-3 flex items-center gap-2">
              <div
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 ${
                  trend.isPositive ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                )}
                <span className={`text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.value}%
                </span>
              </div>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`h-8 w-8 ${colors.icon}`} />
        </div>
      </div>
    </div>
  )
}

// Skeleton component for loading state
export function StatsCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="h-9 w-32 animate-pulse rounded bg-gray-200"></div>
          <div className="h-6 w-28 animate-pulse rounded-full bg-gray-200"></div>
        </div>
        <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-gray-200"></div>
      </div>
    </div>
  )
}
