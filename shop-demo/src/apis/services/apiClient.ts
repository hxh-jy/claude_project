import { API_BASE_URL, REQUEST_TIMEOUT } from '../constants/api'
import { ApiResponse } from '../types'

/**
 * API客户端配置选项
 */
interface ApiClientOptions {
  headers?: Record<string, string>
  timeout?: number
}

/**
 * API客户端类
 */
class ApiClient {
  private baseUrl: string
  private timeout: number
  private defaultHeaders: Record<string, string>

  constructor(baseUrl: string = API_BASE_URL, timeout: number = REQUEST_TIMEOUT) {
    this.baseUrl = baseUrl
    this.timeout = timeout
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  /**
   * 获取授权token
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  /**
   * 构建请求头
   */
  private buildHeaders(options?: ApiClientOptions): Record<string, string> {
    const headers = { ...this.defaultHeaders }

    const token = this.getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    if (options?.headers) {
      Object.assign(headers, options.headers)
    }

    return headers
  }

  /**
   * 执行fetch请求
   */
  private async fetchWithTimeout(
    url: string,
    init: RequestInit,
    timeout: number,
  ): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      return await fetch(url, {
        ...init,
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeoutId)
    }
  }

  /**
   * 处理响应
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP Error: ${response.status}`)
    }

    return data
  }

  /**
   * GET请求
   */
  async get<T = any>(
    endpoint: string,
    options?: ApiClientOptions,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = this.buildHeaders(options)

    const response = await this.fetchWithTimeout(
      url,
      {
        method: 'GET',
        headers,
      },
      options?.timeout ?? this.timeout,
    )

    return this.handleResponse<ApiResponse<T>>(response)
  }

  /**
   * POST请求
   */
  async post<T = any>(
    endpoint: string,
    body?: any,
    options?: ApiClientOptions,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = this.buildHeaders(options)

    const response = await this.fetchWithTimeout(
      url,
      {
        method: 'POST',
        headers,
        body: body ? JSON.stringify(body) : undefined,
      },
      options?.timeout ?? this.timeout,
    )

    return this.handleResponse<ApiResponse<T>>(response)
  }

  /**
   * PUT请求
   */
  async put<T = any>(
    endpoint: string,
    body?: any,
    options?: ApiClientOptions,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = this.buildHeaders(options)

    const response = await this.fetchWithTimeout(
      url,
      {
        method: 'PUT',
        headers,
        body: body ? JSON.stringify(body) : undefined,
      },
      options?.timeout ?? this.timeout,
    )

    return this.handleResponse<ApiResponse<T>>(response)
  }

  /**
   * DELETE请求
   */
  async delete<T = any>(
    endpoint: string,
    options?: ApiClientOptions,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = this.buildHeaders(options)

    const response = await this.fetchWithTimeout(
      url,
      {
        method: 'DELETE',
        headers,
      },
      options?.timeout ?? this.timeout,
    )

    return this.handleResponse<ApiResponse<T>>(response)
  }
}

// 导出单例
export const apiClient = new ApiClient()
