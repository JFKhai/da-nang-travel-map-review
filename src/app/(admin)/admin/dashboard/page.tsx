'use client'

import React, { useEffect, useState } from 'react'
import { Users, MapPin, MessageSquare, List, Heart, Star, TrendingUp, Activity } from 'lucide-react'
import { StatsCard, StatsCardSkeleton } from './_components/stats-card'
import { GrowthChart, GrowthChartSkeleton } from './_components/growth-chart'
import { ReviewChart, ReviewChartSkeleton } from './_components/review-chart'
import { fillMissingDates, calculateMockTrend, ChartDataPoint } from './_components/chart-utils'

interface DashboardResponse {
  success: boolean
  data: {
    summary: {
      totalUsers: number
      totalPlaces: number
      totalReviews: number
      totalCategories: number
      totalFavorites: number
      averageRating: string | number
    }
    charts: {
      userChart: ChartDataPoint[]
      placeChart: ChartDataPoint[]
      reviewChart: ChartDataPoint[]
    }
  }
}

interface ProcessedChartData {
  date: string
  users: number
  places: number
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardResponse['data']['summary'] | null>(null)
  const [growthData, setGrowthData] = useState<ProcessedChartData[]>([])
  const [reviewData, setReviewData] = useState<ChartDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem('token') || localStorage.getItem('accessToken')

        if (!token) {
          throw new Error('No authentication token found. Please verify login.')
        }
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8080/api'

        const cleanApiUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl

        const response = await fetch(`${cleanApiUrl}/admin/dashboard-stats`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error('Unauthorized access. Please check Admin permissions.')
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: DashboardResponse = await response.json()

        if (data.success) {
          setSummary(data.data.summary)

          const filledUserChart = fillMissingDates(data.data.charts.userChart, 7)
          const filledPlaceChart = fillMissingDates(data.data.charts.placeChart, 7)
          const filledReviewChart = fillMissingDates(data.data.charts.reviewChart, 7)

          const combinedGrowth: ProcessedChartData[] = filledUserChart.map((userItem, index) => ({
            date: userItem.date,
            users: userItem.count,
            places: filledPlaceChart[index]?.count || 0,
          }))

          setGrowthData(combinedGrowth)
          setReviewData(filledReviewChart)
        } else {
          throw new Error('Failed to fetch dashboard stats')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching dashboard stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
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

        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <p className="text-sm font-medium text-red-800">Error: {error}</p>
            </div>
            <p className="mt-2 text-xs text-red-600 ml-4">
              *Tip: Try logging out and logging in again to refresh your token.
            </p>
          </div>
        )}

        {/* Summary Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : summary ? (
            <>
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
                value={
                  typeof summary.averageRating === 'number' ? summary.averageRating.toFixed(1) : summary.averageRating
                }
                icon={Star}
                color="yellow"
                trend={calculateMockTrend()}
              />
            </>
          ) : null}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-1">
          {loading ? (
            <>
              <GrowthChartSkeleton />
              <ReviewChartSkeleton />
            </>
          ) : (
            <>
              <GrowthChart data={growthData} />
              <ReviewChart data={reviewData} />
            </>
          )}
        </div>

        {/* Footer Info */}
        {!loading && summary && (
          <div className="mt-8 rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50 p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm font-semibold text-teal-900">Dashboard Updated</p>
                <p className="mt-0.5 text-xs text-teal-700">Last refreshed: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
