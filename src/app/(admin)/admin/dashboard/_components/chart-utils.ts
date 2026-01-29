import { format, subDays } from 'date-fns'

export interface ChartDataPoint {
  date: string
  count: number
}

/**
 * Fill missing dates for the last N days with 0 counts
 * Ensures continuous X-axis on charts
 */
export function fillMissingDates(data: ChartDataPoint[], days: number = 7): ChartDataPoint[] {
  const today = new Date()
  const result: ChartDataPoint[] = []

  // Create a map of existing data for quick lookup
  const dataMap = new Map<string, number>()
  data.forEach((item) => {
    dataMap.set(item.date, item.count)
  })

  // Fill in all dates for the last N days
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i)
    const dateString = format(date, 'yyyy-MM-dd')

    result.push({
      date: dateString,
      count: dataMap.get(dateString) || 0,
    })
  }

  return result
}

/**
 * Format date for display on chart X-axis
 */
export function formatChartDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return format(date, 'MMM dd')
  } catch {
    return dateString
  }
}

/**
 * Calculate mock trend percentage for visual appeal
 */
export function calculateMockTrend(): { value: number; isPositive: boolean } {
  const value = Math.floor(Math.random() * 20) + 1 // 1-20%
  const isPositive = Math.random() > 0.3 // 70% chance positive
  return { value, isPositive }
}
