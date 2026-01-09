'use client'

import { useState, useEffect } from 'react'
import apiClient from '@/lib/api/client'

interface DebugUser {
  id: number
  email: string
  password: string
  full_name: string
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

interface DebuggerResponse {
  success: boolean
  message: string
  total: number
  data: DebugUser[]
}

export default function DebuggerPage() {
  const [users, setUsers] = useState<DebugUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiClient.get<DebuggerResponse>('/debugger')
      setUsers(response.data.data)
      setLastUpdated(new Date())
    } catch (err: any) {
      console.error('Error fetching debugger data:', err)
      setError(err.message || 'Không thể tải dữ liệu')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-brand-bg p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-brand-border/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-brand-border mb-2">🐛 Debugger</h1>
              <p className="text-gray-600">Danh sách tất cả users trong database (Development Only)</p>
            </div>
            <button
              onClick={fetchUsers}
              disabled={isLoading}
              className="px-6 py-3 bg-brand-teal text-white rounded-lg font-semibold hover:bg-brand-dark transition-colors disabled:bg-brand-teal/50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang tải...' : '🔄 Refresh'}
            </button>
          </div>

          {lastUpdated && (
            <div className="mb-4 text-sm text-gray-500">Cập nhật lần cuối: {lastUpdated.toLocaleString('vi-VN')}</div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <strong className="font-bold">Lỗi!</strong>
              <span className="ml-2">{error}</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
                <p className="text-gray-600">Đang tải dữ liệu...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Tổng số users:</strong> {users.length}
                  </p>
                </div>
              </div>

              {users.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Chưa có user nào trong database</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Password (Hash)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Họ và tên
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Ngày tạo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono break-all">
                              {user.password.substring(0, 30)}...
                            </code>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{user.full_name}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleString('vi-VN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Cảnh báo:</strong> Trang này chỉ dùng cho mục đích development/debugging. Không nên deploy
              route này lên production.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
