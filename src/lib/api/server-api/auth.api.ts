import http from '@/lib/http'
import { LoginBodyType, LoginResponseType, RegisterBodyType, RegisterResType } from '@/lib/schemas/auth.schema'

const authApiServerRequest = {
  login: (body: LoginBodyType) => http.post<LoginResponseType>('/auth/login', body),

  register: (body: RegisterBodyType) => http.post<RegisterResType>('/auth/register', body),
}
export default authApiServerRequest
