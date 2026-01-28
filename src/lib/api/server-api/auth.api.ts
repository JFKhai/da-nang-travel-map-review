import http from '@/lib/http'
import {
  LoginBodyType,
  LoginResponseType,
  RegisterBodyType,
  RegisterResType,
  ChangePasswordBodyType,
} from '@/lib/schemas/auth.schema'

const authApiServerRequest = {
  login: (body: LoginBodyType) => http.post<LoginResponseType>('/auth/login', body),

  register: (body: RegisterBodyType) => http.post<RegisterResType>('/auth/register', body),

  changePassword: (body: ChangePasswordBodyType) => http.put<{ message: string }>('/auth/change-password', body),
}
export default authApiServerRequest
