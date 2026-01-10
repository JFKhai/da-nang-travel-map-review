import axios from 'axios'

// Use Next.js API proxy routes to avoid CORS issues
// Proxy routes are at /api/proxy/* which forward requests to the actual API
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use Next.js API proxy to avoid CORS
    return '/api/proxy'
  }
  // Server-side: use direct API endpoint (no CORS issue)
  return process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://shuneo.com/api'
}

const baseURL = getBaseURL()

const apiClient = axios.create({
  baseURL,
  timeout: 15000, // Increase timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Add withCredentials if needed for CORS
  // withCredentials: false,
})

// Log baseURL in development for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🚀 API Client initialized with baseURL:', baseURL)
  console.log('📡 NEXT_PUBLIC_API_ENDPOINT:', process.env.NEXT_PUBLIC_API_ENDPOINT)
}

// Add token to requests if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request in development
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('📤 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`,
        hasToken: !!token,
      })
    }

    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  },
)

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 for authenticated routes, not for register/login
    if (error.response?.status === 401) {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
      // Don't redirect if already on login/register pages
      if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
      }
    }

    // Log network errors for debugging
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error' || !error.response) {
      const fullURL =
        error.config?.baseURL && error.config?.url
          ? `${error.config.baseURL}${error.config.url}`
          : error.config?.url || 'Unknown'

      console.error('❌ Network Error Details:', {
        message: error.message,
        code: error.code,
        name: error.name,
        requestURL: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL,
        method: error.config?.method?.toUpperCase(),
        data: error.config?.data,
        headers: error.config?.headers,
        timeout: error.config?.timeout,
        errorType: error.constructor.name,
      })

      // Check if it's a CORS issue
      if (typeof window !== 'undefined') {
        if (error.message?.includes('CORS') || error.code === 'ERR_NETWORK') {
          console.warn('⚠️ Possible CORS issue. Check if API server allows requests from:', window.location.origin)
          console.warn('💡 Tip: Make sure the API server has CORS enabled for:', window.location.origin)
        }
      }
    } else if (error.response) {
      // Log non-network errors (HTTP errors)
      console.error('❌ API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
        fullURL: `${error.config?.baseURL}${error.config?.url}`,
      })
    }

    return Promise.reject(error)
  },
)

export default apiClient
