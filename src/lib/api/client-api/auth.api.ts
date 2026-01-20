import http from '@/lib/http'

const authApiClientRequest = {
  setToken: (body: { accessToken: string }) =>
    http.post('/api/auth/token', body, {
      baseUrl: '',
    }),
}
export default authApiClientRequest
