'use client'
import { Eye, EyeOff, LockKeyhole, Mail, Phone, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterBodySchema, RegisterBodyType } from '@/lib/schemas/auth.schema'
import authApiServerRequest from '@/lib/api/server-api/auth.api'
import { HttpError } from '@/lib/http'

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useRef<Toast>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBodySchema),
  })

  const show = (
    severity?: 'error' | 'success' | 'info' | 'warn' | 'secondary' | 'contrast',
    summary?: string,
    detail?: string,
  ) => {
    toast.current?.show({ severity, summary, detail })
  }

  const onSubmit = async (data: RegisterBodyType) => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await authApiServerRequest.register(data)
      show('success', 'Đăng ký thành công', 'Đăng nhập để tiếp tục sử dụng dịch vụ')
      reset()
    } catch (error: any) {
      if (error instanceof HttpError) {
        show('error', 'Đăng ký thất bại', error.data?.message || 'Có lỗi xảy ra')
      } else {
        show('error', 'Đăng ký thất bại', 'Vui lòng kiểm tra lại thông tin đăng ký')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {' '}
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 grid md:grid-cols-2 gap-2">
          {/* Name */}
          <div className="mb-1 col-span-2">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Full Name</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <User className="text-brand-teal mr-3" />
              <input type="text" placeholder="" className="w-full outline-none" {...register('full_name')} />
            </div>
            {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
          </div>
          {/* Email */}
          <div className="mb-1 col-span-2">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Email</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <Mail className="text-brand-teal mr-3" />
              <input type="text" className="w-full outline-none" {...register('email')} />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          {/* Phone */}
          <div className="mb-1 col-span-2">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Phone</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <Phone className="text-brand-teal mr-3" />
              <input type="text" placeholder="" className="w-full outline-none" {...register('phone')} />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
          {/* Password */}
          <div className="mb-1">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Password</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <LockKeyhole className="text-brand-teal mr-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className="w-full outline-none"
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

          {/* Confirm Password */}
          <div className="mb-1">
            <label className="block text-sm mb-1 text-brand-teal font-semibold">Confirm password</label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 ring-brand-teal">
              <LockKeyhole className="text-brand-teal mr-3" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="********"
                className="w-full outline-none"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-500 hover:text-brand-teal"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-teal text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition"
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng ký' : 'REGISTER'}
        </button>
      </form>
    </>
  )
}

export default RegisterForm
