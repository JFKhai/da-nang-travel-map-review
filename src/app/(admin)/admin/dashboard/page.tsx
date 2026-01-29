import { cookies } from 'next/headers'
import DashboardClient from './_components/dashboard-client'
import { fillMissingDates } from './_components/chart-utils'

async function getDashboardData() {
  const cookieStore = await cookies()
  const token =
    cookieStore.get('token')?.value || cookieStore.get('accessToken')?.value || cookieStore.get('auth_token')?.value

  if (!token) return null

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8080/api'
  const cleanApiUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl

  try {
    const res = await fetch(`${cleanApiUrl}/admin/dashboard-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Fetch dashboard error:', error)
    return null
  }
}

export default async function DashboardPage() {
  const dashboardData = await getDashboardData()

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-red-100">
          <div className="h-16 w-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            Unable to load dashboard data. Please make sure you are logged in as an Admin.
          </p>
          <a
            href="/login"
            className="inline-block bg-teal-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-teal-700 transition-colors shadow-sm shadow-teal-200"
          >
            Back to Login
          </a>
        </div>
      </div>
    )
  }

  const { summary, charts } = dashboardData
  const filledUserChart = fillMissingDates(charts.userChart, 7)
  const filledPlaceChart = fillMissingDates(charts.placeChart, 7)
  const filledReviewChart = fillMissingDates(charts.reviewChart, 7)

  const growthData = filledUserChart.map((userItem: any, index: number) => ({
    date: userItem.date,
    users: userItem.count,
    places: filledPlaceChart[index]?.count || 0,
  }))

  return <DashboardClient data={{ summary, growthData, reviewData: filledReviewChart }} />
}
