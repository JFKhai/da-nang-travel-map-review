import apiClient from './client'
import type {
  RegisterInput,
  LoginInput,
  ChangePasswordInput,
  AuthResponse,
  UserMeResponse,
  ApiResponse,
  AuthResponseData,
} from '@/lib/schemas/auth.schema'

// Register
export const registerApi = async (
  data: RegisterInput,
): Promise<{ success: boolean; message: string; user: UserMeResponse }> => {
  // Only send required fields to API (exclude confirm_password)
  const { confirm_password, ...apiData } = data
  const response = await apiClient.post<ApiResponse<UserMeResponse>>('/auth/register', apiData)

  // API returns { success, message, data: { id, email, full_name, ... } } for register (no token)
  return {
    success: response.data.success,
    message: response.data.message,
    user: response.data.data,
  }
}

// Login
export const loginApi = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/login', data)

  // Extract token and user from data field
  return {
    token: response.data.data.token,
    user: {
      id: response.data.data.user.id.toString(),
      email: response.data.data.user.email,
      full_name: response.data.data.user.full_name,
      avatar_url: response.data.data.user.avatar_url || undefined,
      role: response.data.data.user.role,
      created_at: response.data.data.user.created_at,
      updated_at: response.data.data.user.updated_at,
    },
  }
}

// Get Me
export const getMeApi = async (token: string): Promise<UserMeResponse> => {
  const response = await apiClient.get<ApiResponse<UserMeResponse>>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

// Change Password
export const changePasswordApi = async (data: ChangePasswordInput, token: string): Promise<{ message: string }> => {
  const response = await apiClient.put<ApiResponse<{ message: string }>>(
    '/auth/change-password',
    {
      old_password: data.old_password,
      new_password: data.new_password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return { message: response.data.message }
}
