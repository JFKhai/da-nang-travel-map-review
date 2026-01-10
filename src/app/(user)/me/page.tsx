'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getMeApi } from '@/lib/api/auth.api'
import type { UserMeResponse } from '@/lib/schemas/auth.schema'
import { Mail, User, Calendar, Loader2 } from 'lucide-react'

export default function MePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserMeResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (status === 'authenticated' && session?.user?.token) {
      fetchUserInfo(session.user.token)
    }
  }, [status, session, router])

  const fetchUserInfo = async (token: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getMeApi(token)
      setUserInfo(data)
    } catch (err: any) {
      console.error('Get me error:', err)
      const errorMessage = err.response?.data?.message || 'Không thể lấy thông tin người dùng. Vui lòng thử lại.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-brand-teal" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Thông tin tài khoản</h1>

      {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}

      {userInfo && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* User Avatar Section */}
          <div className="flex items-center gap-4 pb-6 border-b">
            <div className="w-20 h-20 rounded-full bg-brand-teal flex items-center justify-center text-white text-2xl font-bold">
              {userInfo.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{userInfo.full_name}</h2>
              <p className="text-gray-500">Thông tin cá nhân</p>
            </div>
          </div>

          {/* User Info Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-brand-teal/10 rounded-lg">
                <User className="w-5 h-5 text-brand-teal" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Họ và tên</p>
                <p className="text-lg font-medium text-gray-800">{userInfo.full_name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-brand-teal/10 rounded-lg">
                <Mail className="w-5 h-5 text-brand-teal" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-medium text-gray-800">{userInfo.email}</p>
              </div>
            </div>

            {userInfo.created_at && (
              <div className="flex items-start gap-4">
                <div className="p-2 bg-brand-teal/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-brand-teal" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Ngày tạo tài khoản</p>
                  <p className="text-lg font-medium text-gray-800">
                    {new Date(userInfo.created_at).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
