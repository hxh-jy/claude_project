import axios, { AxiosInstance } from 'axios'
import { ApiResponse } from '@/types/api'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred'
      return Promise.reject(new Error(message))
    }
    return Promise.reject(new Error('Network error'))
  }
)

export class ApiError extends Error {
  constructor(public code: number, public message: string) {
    super(message)
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return new ApiError(500, error.message)
  }
  return new ApiError(500, 'Unknown error')
}

export default apiClient
