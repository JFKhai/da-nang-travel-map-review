'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole, Mail, Phone, User } from 'lucide-react'
import { registerSchema, type RegisterInput } from '@/lib/schemas/auth.schema'
import { registerApi } from '@/lib/api/auth.api'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await registerApi(data)
      // Register API doesn't return token, user needs to login
      if (response.success) {
        setSuccess(true)
        // Redirect sau 1.5 giây
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        setError(response.message || 'Đã xảy ra lỗi trong quá trình đăng ký.')
      }
    } catch (err: any) {
      console.error('Register error:', err)

      // Handle different error types
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.')
      } else if (err.response) {
        // Server responded with error status
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          'Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.'
        setError(errorMessage)
      } else if (err.request) {
        // Request was made but no response received
        setError('Không nhận được phản hồi từ server. Vui lòng thử lại.')
      } else {
        // Something else happened
        setError(err.message || 'Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-[74px] font-extrabold text-brand-teal text-center -mt-14">Register</h2>
      <p className="text-gray-500 mb-4 -mt-2 text-center">Register a new account</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
          Đăng ký thành công! Đang chuyển đến trang đăng nhập...
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 grid md:grid-cols-2 gap-2">
          {/* Full Name */}
          <div className="mb-1 col-span-2">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Full Name</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <User className="text-brand-teal mr-3" />
              <input
                type="text"
                placeholder="Nhập họ tên của bạn"
                className="w-full outline-none bg-transparent"
                {...register('full_name')}
              />
            </div>
            {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-1 col-span-2">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Email</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <Mail className="text-brand-teal mr-3" />
              <input
                type="email"
                placeholder="thisuix@mail.com"
                className="w-full outline-none bg-transparent"
                {...register('email')}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-1">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Password</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <LockKeyhole className="text-brand-teal mr-3" />
              <input
                type="password"
                placeholder="********"
                className="w-full outline-none bg-transparent"
                {...register('password')}
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-1">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Confirm password</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <LockKeyhole className="text-brand-teal mr-3" />
              <input
                type="password"
                placeholder="********"
                className="w-full outline-none bg-transparent"
                {...register('confirm_password')}
              />
            </div>
            {errors.confirm_password && <p className="mt-1 text-sm text-red-600">{errors.confirm_password.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-teal text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang đăng ký...' : 'REGISTER'}
        </button>
      </form>

      <p className="text-center text-sm mt-8">
        Do you have account?{' '}
        <Link href="/login" className="text-brand-teal font-semibold cursor-pointer hover:underline">
          Login Now
        </Link>
      </p>
    </div>
  )
}
