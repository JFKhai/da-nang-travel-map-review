import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { formatChartDate } from './chart-utils'

interface ReviewChartData {
  date: string
  count: number
}

interface ReviewChartProps {
  data: ReviewChartData[]
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-purple-200 bg-white p-3 shadow-lg">
        <p className="mb-1 text-sm font-semibold text-gray-900">{formatChartDate(label)}</p>
        <p className="text-sm text-purple-600">
          Reviews: <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    )
  }
  return null
}

export function ReviewChart({ data }: ReviewChartProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Reviews Activity</h3>
        <p className="mt-1 text-sm text-gray-600">Daily reviews submitted over the last 7 days</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartDate}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#d1d5db"
          />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} stroke="#d1d5db" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#a855f7"
            strokeWidth={2}
            fill="url(#colorReviews)"
            name="Reviews"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// Skeleton for loading state
export function ReviewChartSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 space-y-2">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-96 animate-pulse rounded bg-gray-200"></div>
      </div>
      <div className="h-[350px] w-full animate-pulse rounded bg-gray-100"></div>
    </div>
  )
}
