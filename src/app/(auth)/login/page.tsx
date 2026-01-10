'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole, Mail } from 'lucide-react'
import { loginSchema, type LoginInput } from '@/lib/schemas/auth.schema'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setError(null)

    try {
      // Call API through Next.js proxy to avoid CORS
      const loginResponse = await fetch('/api/proxy/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json().catch(() => ({}))
        setError(errorData.message || 'Email hoặc mật khẩu không chính xác. Vui lòng thử lại.')
        setIsLoading(false)
        return
      }

      const loginData = await loginResponse.json()

      // Extract token from response structure: { success, message, data: { token, user } }
      if (!loginData.success || !loginData.data?.token) {
        setError(loginData.message || 'Email hoặc mật khẩu không chính xác. Vui lòng thử lại.')
        setIsLoading(false)
        return
      }

      // Save token to localStorage for axios interceptor
      localStorage.setItem('token', loginData.data.token)

      // Sign in with next-auth (this will also use the API internally but we've already cached the token)
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.')
      } else if (result?.ok) {
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-[74px] font-extrabold text-brand-teal text-center">Welcome</h2>
      <p className="text-gray-500 mb-8 text-center">Login with Email</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-4">
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
        <div className="mb-2">
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

      {/* OR */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-3 text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Social */}
      <div className="flex justify-center gap-4">
        <button className="border-none py-3 px-6 bg-[#E7F2F5] rounded-xl hover:bg-[#d0e5ea] transition">
          <img src="/images/google-logo.svg" className="mx-auto h-6" alt="Google" />
        </button>
        <button className="border-none py-3 px-6 bg-[#E7F2F5] rounded-xl hover:bg-[#d0e5ea] transition">
          <img src="/images/facebook-logo.svg" className="mx-auto h-6" alt="Facebook" />
        </button>
        <button className="border-none py-3 px-6 bg-[#E7F2F5] rounded-xl hover:bg-[#d0e5ea] transition">
          <img src="/images/apple-logo.svg" className="mx-auto h-6" alt="Apple" />
        </button>
      </div>

      <p className="text-center text-sm mt-8">
        Don't have account?{' '}
        <Link href="/register" className="text-brand-teal font-semibold cursor-pointer hover:underline">
          Register Now
        </Link>
      </p>
    </div>
  )
}
