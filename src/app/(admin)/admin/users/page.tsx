import { cookies } from 'next/headers'
import { Suspense } from 'react'
import UsersTable from './_components/users-table'
import UsersSkeleton from './_components/skeleton'

async function getUsersData(search: string) {
  const cookieStore = await cookies()
  // Lấy đúng tên accessToken mà team ông đang dùng trong Console
  const token = cookieStore.get('accessToken')?.value || cookieStore.get('token')?.value

  if (!token) return null

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8080/api'

  try {
    const res = await fetch(`${apiBaseUrl}/auth/admin/users?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json()
    // Backend trả về success(users) -> data nằm trong data.data
    return data.success ? data.data : null
  } catch (error) {
    console.error('Lỗi gọi API Users:', error)
    return null
  }
}

export default async function UsersPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams
  const search = params.search || ''
  const users = await getUsersData(search)

  if (!users) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
        <div className="relative bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center border border-red-200/50 max-w-md transform hover:scale-105 transition-transform duration-300">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full p-4 shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3 mt-4">
            ACCESS DENIED
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">Please check Admin Token or Backend 500 error.</p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Back to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2.5 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-500 text-sm">Manage and monitor all users in the system</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <Suspense fallback={<UsersSkeleton />}>
          <UsersTable users={users} search={search} />
        </Suspense>
      </div>
    </div>
  )
}
