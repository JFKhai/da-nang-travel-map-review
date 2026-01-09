import apiClient from './client'
import { AxiosError } from 'axios'

// ==================== TYPES ====================

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T | null
  error: any | null
}

export interface User {
  id: number
  email: string
  full_name: string
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface RegisterRequest {
  email: string
  password: string
  full_name: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

// ==================== TOKEN MANAGEMENT ====================

export const setAuthToken = (token: string | null) => {
  if (typeof window === 'undefined') return

  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

// ==================== API FUNCTIONS ====================

/**
 * Đăng ký tài khoản mới
 */
export const register = async (data: RegisterRequest): Promise<User> => {
  try {
    const response = await apiClient.post<ApiResponse<User>>('/auth/register', data)

    if (response.data.success && response.data.data) {
      return response.data.data
    }

    throw new Error(response.data.message || 'Đăng ký thất bại')
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ApiResponse<null>>
      throw new Error(axiosError.response?.data?.message || axiosError.message || 'Đăng ký thất bại')
    }
    throw error
  }
}

/**
 * Đăng nhập
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data)

    if (response.data.success && response.data.data) {
      const loginData = response.data.data

      // Lưu token vào localStorage
      setAuthToken(loginData.token)

      // Lưu thông tin user vào localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(loginData.user))
      }

      return loginData
    }

    throw new Error(response.data.message || 'Đăng nhập thất bại')
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ApiResponse<null>>
      throw new Error(axiosError.response?.data?.message || axiosError.message || 'Đăng nhập thất bại')
    }
    throw error
  }
}

/**
 * Lấy thông tin user hiện tại (cần đăng nhập)
 */
export const getMe = async (): Promise<User> => {
  try {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me')

    if (response.data.success && response.data.data) {
      // Cập nhật thông tin user trong localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data.data))
      }
      return response.data.data
    }

    throw new Error(response.data.message || 'Lấy thông tin thất bại')
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ApiResponse<null>>

      // Nếu token hết hạn hoặc không hợp lệ, xóa token và redirect
      if (axiosError.response?.status === 401) {
        setAuthToken(null)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user')
          window.location.href = '/login'
        }
      }

      throw new Error(axiosError.response?.data?.message || axiosError.message || 'Lấy thông tin thất bại')
    }
    throw error
  }
}

/**
 * Đăng xuất
 */
export const logout = () => {
  setAuthToken(null)
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }
}
