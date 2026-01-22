'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole, Eye, EyeOff, Save } from 'lucide-react'
import { ChangePasswordBodySchema, ChangePasswordBodyType } from '@/lib/schemas/auth.schema'
import authApiServerRequest from '@/lib/api/server-api/auth.api'
import { HttpError } from '@/lib/http'
import { useToast } from '@/components/providers/toast-provider'

export default function ChangePasswordForm() {
  const { showSuccess, showError } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBodySchema),
  })

  const onSubmit = async (data: ChangePasswordBodyType) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      await authApiServerRequest.changePassword(data)
      showSuccess('Đổi mật khẩu thành công', 'Mật khẩu của bạn đã được cập nhật')
      reset()
    } catch (error) {
      if (error instanceof HttpError) {
        showError('Đổi mật khẩu thất bại', error.data?.message || 'Có lỗi xảy ra')
      } else {
        showError('Đổi mật khẩu thất bại', 'Vui lòng thử lại sau')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Đổi mật khẩu</h3>
        <p className="text-sm text-gray-500">Để bảo mật tài khoản, vui lòng sử dụng mật khẩu mạnh</p>
      </div>

      {/* Old Password */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <LockKeyhole className="w-4 h-4 inline mr-2" />
          Mật khẩu hiện tại
        </label>
        <div className="relative">
          <input
            type={showOldPassword ? 'text' : 'password'}
            {...register('old_password')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent pr-12"
            placeholder="Nhập mật khẩu hiện tại"
          />
          <button
            type="button"
            onClick={() => setShowOldPassword(!showOldPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-teal"
          >
            {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.old_password && <p className="mt-1 text-sm text-red-600">{errors.old_password.message}</p>}
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <LockKeyhole className="w-4 h-4 inline mr-2" />
          Mật khẩu mới
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            {...register('new_password')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent pr-12"
            placeholder="Nhập mật khẩu mới"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-teal"
          >
            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.new_password && <p className="mt-1 text-sm text-red-600">{errors.new_password.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-brand-teal text-white rounded-lg font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {isLoading ? 'Đang lưu...' : 'Đổi mật khẩu'}
        </button>
      </div>
    </form>
  )
}
