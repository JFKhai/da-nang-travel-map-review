import envConfig from '@/lib/config/env.config'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ResponseType<TData> = {
  success: boolean
  message: string
  data: TData
  error?: any
  status: number
}

export class HttpError extends Error {
  status: number
  data: {
    message: string
    [key: string]: any
  }
  constructor({ status, data }: { status: number; data: any }) {
    super('Http Error')
    this.status = status
    this.data = data
  }
}

class AccessToken {
  private token = ''
  private _expiresAt = new Date().toISOString()
  get value() {
    return this.token
  }
  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side')
    }
    this.token = token
  }
  get expiresAt() {
    return this._expiresAt
  }
  set expiresAt(expiresAt: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side')
    }
    this._expiresAt = expiresAt
  }
}

export const clientAccessTokenToken = new AccessToken()

const request = async <TResponse>(
  method: HttpMethod,
  url: string,
  options?: CustomOptions | undefined,
): Promise<ResponseType<TResponse>> => {
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: clientAccessTokenToken.value ? `Bearer ${clientAccessTokenToken.value}` : '',
  }
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  })
  const payload: ResponseType<TResponse> = await res.json()
  const data = {
    ...payload,
    status: res.status,
  }

  // Interceptor
  if (!res.ok) {
    throw new HttpError({ status: res.status, data })
  }
  return data
}

const http = {
  get<TResponse>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<TResponse>('GET', url, options)
  },
  post<TResponse>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<TResponse>('POST', url, { ...options, body })
  },
  put<TResponse>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<TResponse>('PUT', url, { ...options, body })
  },
  delete<TResponse>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<TResponse>('DELETE', url, { ...options, body })
  },
}

export default http
