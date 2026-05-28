import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_APP_URL ?? ''

export const axiosInstance = axios.create({
  baseURL,
  timeout: 30_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  config => {
    // Auth uses Supabase session cookies set by /api/auth/* — no Bearer token needed
    // for same-origin Next.js API routes. withCredentials sends them automatically.

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status

    if (status === 401 && typeof window !== 'undefined') {
      const path = window.location.pathname
      const publicPaths = ['/login', '/register', '/forgot-password', '/privacy-policy']

      if (!publicPaths.includes(path)) {
        window.location.href = '/login'
      }
    }

    const message =
      error.response?.data?.message ?? error.message ?? 'Something went wrong'

    return Promise.reject(
      Object.assign(error, {
        message
      })
    )
  }
)
