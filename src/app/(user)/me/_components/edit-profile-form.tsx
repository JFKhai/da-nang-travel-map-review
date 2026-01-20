'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail, Phone, Camera, Save } from 'lucide-react'
import { z } from 'zod'
import { PHONE_REGEX } from '@/lib/constants/regex.constant'
import { useAppContext } from '@/components/providers/app-provider'
import { useToast } from '@/components/providers/toast-provider'
import { HttpError } from '@/lib/http'
import userApiServerRequest from '@/lib/api/server-api/user.api'
import Image from 'next/image'

const UpdateProfileSchema = z.object({
  full_name: z.string().min(1, 'Họ và tên không được để trống'),
  email: z.string().email('Email không hợp lệ'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || PHONE_REGEX.test(val), {
      message: 'Số điện thoại không hợp lệ',
    }),
})

type UpdateProfileType = z.infer<typeof UpdateProfileSchema>

export default function EditProfileForm() {
  const { user, setUser } = useAppContext()
  const { showSuccess, showError } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar_url || null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      full_name: user?.full_name || '',
      email: user?.email || '',
      phone: '',
    },
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: UpdateProfileType) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      // TODO: Implement update profile API
      // const result = await userApiServerRequest.updateProfile(data)
      // setUser(result.data)
      showSuccess('Cập nhật thành công', 'Thông tin cá nhân đã được cập nhật')
    } catch (error) {
      if (error instanceof HttpError) {
        showError('Cập nhật thất bại', error.data?.message || 'Có lỗi xảy ra')
      } else {
        showError('Cập nhật thất bại', 'Vui lòng thử lại sau')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {avatarPreview ? (
              <Image src={avatarPreview} alt="Avatar" width={96} height={96} className="object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-brand-teal text-white p-2 rounded-full cursor-pointer hover:bg-brand-dark transition-colors"
          >
            <Camera className="w-4 h-4" />
            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user?.full_name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Họ và tên
          </label>
          <input
            type="text"
            {...register('full_name')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
            placeholder="Nhập họ và tên"
          />
          {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
            placeholder="Nhập email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Số điện thoại
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
            placeholder="Nhập số điện thoại"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-brand-teal text-white rounded-lg font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </div>
    </form>
  )
}
