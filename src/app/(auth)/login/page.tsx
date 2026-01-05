'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const INIT_DATA = {
  email: '',
  password: '',
  rememberMe: false,
}

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState(INIT_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (formData.email === 'test@example.com' && formData.password === 'password') {
        console.log('Simulated login successful with data:', formData)
        router.push('/')
      } else {
        setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {}, [])

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-brand-border/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-border mb-2">Đăng nhập</h1>
            <p className="text-gray-600">Chào mừng bạn trở lại!</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 relative" role="alert">
              <strong className="font-bold">Lỗi!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Nhập email của bạn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Nhập mật khẩu"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rememberMe: e.target.checked,
                    })
                  }
                  disabled={isLoading}
                  className="w-4 h-4 text-brand-teal border-gray-300 rounded focus:ring-brand-teal disabled:opacity-50"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <Link href="#" className="text-sm text-brand-teal hover:text-brand-dark disabled:text-gray-400">
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-teal text-white font-semibold py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors disabled:bg-brand-teal/50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="text-brand-teal font-semibold hover:text-brand-dark">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
