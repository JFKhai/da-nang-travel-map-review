import http from '@/lib/http'

const authApiClientRequest = {
  setToken: (body: { accessToken: string }) =>
    http.post('/api/auth/token', body, {
      baseUrl: '',
    }),
  removeToken: () =>
    http.delete('/api/auth/token', {
      baseUrl: '',
    }),
}
export default authApiClientRequest
