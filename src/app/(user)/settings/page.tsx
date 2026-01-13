'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole, CheckCircle2, AlertCircle } from 'lucide-react'
import { changePasswordSchema, type ChangePasswordInput } from '@/lib/schemas/auth.schema'

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  })

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  const onSubmit = async (data: ChangePasswordInput) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Cài đặt</h1>

      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Đổi mật khẩu</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Lỗi</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">Thành công</p>
              <p className="text-sm text-green-700 mt-1">Mật khẩu đã được đổi thành công!</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-sm mb-2 text-gray-700 font-semibold">Mật khẩu cũ</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal focus-within:border-brand-teal transition">
              <LockKeyhole className="text-brand-teal mr-3 flex-shrink-0" />
              <input
                type="password"
                placeholder="Nhập mật khẩu cũ"
                className="w-full outline-none bg-transparent"
                {...register('old_password')}
              />
            </div>
            {errors.old_password && <p className="mt-1 text-sm text-red-600">{errors.old_password.message}</p>}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm mb-2 text-gray-700 font-semibold">Mật khẩu mới</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal focus-within:border-brand-teal transition">
              <LockKeyhole className="text-brand-teal mr-3 flex-shrink-0" />
              <input
                type="password"
                placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                className="w-full outline-none bg-transparent"
                {...register('new_password')}
              />
            </div>
            {errors.new_password && <p className="mt-1 text-sm text-red-600">{errors.new_password.message}</p>}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm mb-2 text-gray-700 font-semibold">Xác nhận mật khẩu mới</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal focus-within:border-brand-teal transition">
              <LockKeyhole className="text-brand-teal mr-3 flex-shrink-0" />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                className="w-full outline-none bg-transparent"
                {...register('confirm_password')}
              />
            </div>
            {errors.confirm_password && <p className="mt-1 text-sm text-red-600">{errors.confirm_password.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-teal text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                'Đổi mật khẩu'
              )}
            </button>
          </div>
        </form>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Lưu ý:</strong> Mật khẩu mới phải có ít nhất 6 ký tự và khác với mật khẩu cũ.
          </p>
        </div>
      </div>
    </div>
  )
}
