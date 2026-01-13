'use client'
import { LoginBodySchema, LoginBodyType } from '@/lib/schemas/auth.schema'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import authApiServerRequest from '@/lib/api/server-api/auth.api'
import authApiClientRequest from '@/lib/api/client-api/auth.api'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useRef<Toast>(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBodySchema),
  })

  const show = (
    severity?: 'error' | 'success' | 'info' | 'warn' | 'secondary' | 'contrast',
    summary?: string,
    detail?: string,
  ) => {
    toast.current?.show({ severity, summary, detail })
  }

  const onSubmit = async (data: LoginBodyType) => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const result = await authApiServerRequest.login(data)
      await authApiClientRequest.setToken({
        accessToken: result.data.token,
      })
      show('success', 'Đăng nhập thành công', `Chào mừng ${result.data.user.full_name} đến với Travelopia`)
      router.push('/')
    } catch (error) {
      show('error', 'Đăng nhập thất bại', 'Vui lòng kiểm tra lại thông tin đăng nhập')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-brand-teal font-semibold">Email</label>
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
            <Mail className="text-brand-teal mr-3" />
            <input
              type="text"
              placeholder="example@gmail.com"
              className="w-full outline-none bg-transparent"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm mb-1 text-brand-teal font-semibold">Password</label>
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
            <LockKeyhole className="text-brand-teal mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              className="w-full outline-none bg-transparent"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-brand-teal"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <div className="text-right text-sm text-gray-500 mb-6">
          <a href="" className="hover:text-brand-teal">
            Forgot your password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-teal text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang đăng nhập...' : 'LOGIN'}
        </button>
      </form>
    </>
  )
}

export default LoginForm
