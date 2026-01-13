import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '@/lib/constants/regex.constant'
import { UserSchema } from '@/lib/schemas/user.schema'
import z from 'zod'

export const LoginBodySchema = z
  .object({
    email: z.string().min(1, 'Email không được để trống').regex(EMAIL_REGEX, 'Email không hợp lệ'),
    password: z.string().min(1, 'Mật khẩu không được để trống'),
  })
  .strict()

export const LoginResponse = z.object({
  token: z.string(),
  user: UserSchema.omit({ password: true }),
})

export const RegisterBodySchema = z
  .object({
    full_name: z.string().min(1, 'Họ và tên không được để trống'),
    email: z.string().min(1, 'Email không được để trống').regex(EMAIL_REGEX, 'Email không hợp lệ'),
    phone: z.string().min(1, 'Số điện thoại không được để trống').regex(PHONE_REGEX, 'Số điện thoại không hợp lệ'),
    password: z
      .string()
      .min(1, 'Mật khẩu không được để trống')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .max(16, 'Mật khẩu không được vượt quá 16 ký tự')
      .regex(PASSWORD_REGEX, 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu không được để trống'),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

export const RegisterResponse = UserSchema.omit({ password: true })

export type LoginBodyType = z.TypeOf<typeof LoginBodySchema>
export type LoginResponseType = z.TypeOf<typeof LoginResponse>
export type RegisterBodyType = z.TypeOf<typeof RegisterBodySchema>
export type RegisterResType = z.TypeOf<typeof RegisterResponse>
