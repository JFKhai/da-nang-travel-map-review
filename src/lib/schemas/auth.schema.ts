import { z } from 'zod'

// Register Schema
export const registerSchema = z
  .object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirm_password: z.string().min(6, 'Xác nhận mật khẩu phải có ít nhất 6 ký tự'),
    full_name: z.string().min(1, 'Họ tên không được để trống'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirm_password'],
  })

export type RegisterInput = z.infer<typeof registerSchema>

// Login Schema
export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
})

export type LoginInput = z.infer<typeof loginSchema>

// Change Password Schema
export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, 'Mật khẩu cũ không được để trống'),
    new_password: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
    confirm_password: z.string().min(6, 'Xác nhận mật khẩu phải có ít nhất 6 ký tự'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirm_password'],
  })

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

// API Response Types - Actual API Structure
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  error: null | string
}

export interface AuthResponseData {
  token: string
  user: {
    id: number
    email: string
    full_name: string
    avatar_url?: string | null
    role: string
    created_at: string
    updated_at: string
  }
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    full_name: string
    avatar_url?: string | null
    role?: string
    created_at?: string
    updated_at?: string
  }
}

export interface UserMeResponse {
  id: number
  email: string
  full_name: string
  avatar_url?: string | null
  role?: string
  created_at?: string
  updated_at?: string
}
