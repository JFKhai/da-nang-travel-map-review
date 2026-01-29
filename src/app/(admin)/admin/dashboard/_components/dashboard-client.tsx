'use client'

import React from 'react'
import { Users, MapPin, MessageSquare, List, Heart, Star, TrendingUp, Activity } from 'lucide-react'
import { StatsCard } from './stats-card'
import { GrowthChart } from './growth-chart'
import { ReviewChart } from './review-chart'
import { calculateMockTrend } from './chart-utils'

// Định nghĩa kiểu dữ liệu nhận vào
interface DashboardClientProps {
  data: {
    summary: any
    growthData: any[]
    reviewData: any[]
  }
}

export default function DashboardClient({ data }: DashboardClientProps) {
  const { summary, growthData, reviewData } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Real-time insights and performance metrics</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Users"
            value={summary.totalUsers.toLocaleString()}
            icon={Users}
            color="teal"
            trend={calculateMockTrend()}
          />
          <StatsCard
            title="Total Places"
            value={summary.totalPlaces.toLocaleString()}
            icon={MapPin}
            color="teal"
            trend={calculateMockTrend()}
          />
          <StatsCard
            title="Total Reviews"
            value={summary.totalReviews.toLocaleString()}
            icon={MessageSquare}
            color="purple"
            trend={calculateMockTrend()}
          />
          <StatsCard
            title="Total Categories"
            value={summary.totalCategories.toLocaleString()}
            icon={List}
            color="orange"
            trend={calculateMockTrend()}
          />
          <StatsCard
            title="Total Favorites"
            value={summary.totalFavorites.toLocaleString()}
            icon={Heart}
            color="red"
            trend={calculateMockTrend()}
          />
          <StatsCard
            title="Average Rating"
            value={typeof summary.averageRating === 'number' ? summary.averageRating.toFixed(1) : summary.averageRating}
            icon={Star}
            color="yellow"
            trend={calculateMockTrend()}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-1">
          <GrowthChart data={growthData} />
          <ReviewChart data={reviewData} />
        </div>

        {/* Footer */}
        <div className="mt-8 rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50 p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-teal-600" />
            <div>
              <p className="text-sm font-semibold text-teal-900">Dashboard Updated</p>
              <p className="mt-0.5 text-xs text-teal-700">Last refreshed: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
