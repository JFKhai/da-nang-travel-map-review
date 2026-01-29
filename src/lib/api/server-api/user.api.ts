import http from '@/lib/http'
import { UserResponseType } from '@/lib/schemas/user.schema'

const userApiServerRequest = {
  getMe: (accessToken: string) =>
    http.get<UserResponseType>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
}
export default userApiServerRequest
