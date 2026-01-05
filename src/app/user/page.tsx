'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'

export default function UserProfilePage() {
  // Mock user data
  const [user, setUser] = useState({
    fullName: 'Thân Ánh Thiện',
    email: 'solshuneo@gmail.com',
    password: 'password123',
    avatar: '/assets/images/avatar.jpg',
  })

  const [isEditingPassword, setIsEditingPassword] = useState(false)

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (formData.oldPassword !== user.password) {
      setMessage({ type: 'error', text: 'Mật khẩu cũ không chính xác!' })
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Mật khẩu xác nhận không khớp!',
      })
      return
    }

    if (formData.newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: 'Mật khẩu mới phải có ít nhất 6 ký tự!',
      })
      return
    }

    // Simulate API call
    setUser({ ...user, password: formData.newPassword })
    setIsEditingPassword(false)
    setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' })
    setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' })
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg font-sans">
      <Navbar />

      <main className="grow pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-border/10 mb-8">
            <div className="h-32 bg-brand-teal/20 relative">
              <div className="absolute -bottom-12 left-8">
                <Image
                  src={user.avatar}
                  alt="User Avatar"
                  width={96}
                  height={96}
                  className="rounded-2xl border-4 border-white object-cover shadow-md bg-gray-100"
                  priority
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.srcset = ''
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=3D8E95&color=fff`
                  }}
                />
              </div>
            </div>

            <div className="pt-16 p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-brand-border">{user.fullName}</h1>
                <p className="text-gray-500">{user.email}</p>
              </div>

              {message && (
                <div
                  className={`mb-6 p-4 rounded-xl border animate-fade-in ${
                    message.type === 'success'
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      readOnly
                      value={user.fullName}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      readOnly
                      value={user.email}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                  <div className="relative">
                    <input
                      type="password"
                      readOnly
                      value={user.password}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed pr-12"
                    />
                    <button
                      onClick={() => {
                        setIsEditingPassword(!isEditingPassword)
                        setMessage(null)
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-brand-teal hover:bg-brand-teal/10 rounded-full transition-colors"
                      title="Đổi mật khẩu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {isEditingPassword && (
                  <form
                    onSubmit={handlePasswordUpdate}
                    className="mt-4 p-6 bg-brand-bg/50 rounded-2xl border border-brand-teal/20 space-y-4 animate-fade-in"
                  >
                    <h3 className="font-bold text-brand-dark mb-2">Đổi mật khẩu mới</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Mật khẩu cũ</label>
                        <input
                          type="password"
                          required
                          value={formData.oldPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              oldPassword: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-teal outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Mật khẩu mới</label>
                        <input
                          type="password"
                          required
                          value={formData.newPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-teal outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Xác nhận</label>
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
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-teal outline-none bg-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsEditingPassword(false)}
                        className="px-6 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-brand-teal text-white rounded-lg font-semibold hover:bg-brand-dark transition-colors text-sm shadow-md"
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
