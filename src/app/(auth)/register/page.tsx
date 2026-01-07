'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!')
      return
    }

    console.log('Register data:', formData)
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-brand-border/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-border mb-2">Đăng ký</h1>
            <p className="text-brand-dark">Tạo tài khoản mới của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-border mb-2">Họ và tên</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
                className="w-full border border-brand-border/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-border mb-2">Email</label>
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
                className="w-full border border-brand-border/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                placeholder="Nhập email của bạn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-border mb-2">Số điện thoại</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full border border-brand-border/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-border mb-2">Mật khẩu</label>
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
                className="w-full border border-brand-border/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                placeholder="Nhập mật khẩu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-border mb-2">Xác nhận mật khẩu</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full border border-brand-border/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 text-brand-teal border-brand-border/20 rounded focus:ring-brand-teal"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-brand-dark">
                Tôi đồng ý với{' '}
                <Link href="#" className="text-brand-teal hover:text-brand-dark">
                  điều khoản
                </Link>{' '}
                và{' '}
                <Link href="#" className="text-brand-teal hover:text-brand-dark">
                  chính sách bảo mật
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-teal text-white font-semibold py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors"
            >
              Đăng ký
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-brand-dark">
              Đã có tài khoản?{' '}
              <Link href="/login" className="text-brand-teal font-semibold hover:text-brand-dark">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
