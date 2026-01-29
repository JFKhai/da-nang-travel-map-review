import React from 'react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'
import { formatChartDate } from './chart-utils'

interface GrowthChartData {
  date: string
  users: number
  places: number
}

interface GrowthChartProps {
  data: GrowthChartData[]
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        <p className="mb-2 text-sm font-semibold text-gray-900">{formatChartDate(label)}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Growth Overview</h3>
        <p className="mt-1 text-sm text-gray-600">Users and Places growth over the last 7 days</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.3} />
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
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
          <Bar dataKey="users" fill="#14b8a6" radius={[8, 8, 0, 0]} name="Users" />
          <Line
            type="monotone"
            dataKey="places"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: '#f59e0b', r: 5 }}
            activeDot={{ r: 7 }}
            name="Places"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

// Skeleton for loading state
export function GrowthChartSkeleton() {
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
