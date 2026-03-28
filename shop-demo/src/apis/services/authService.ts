import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../constants/api'
import {
  AuthorizationUrlResponse,
  TokenInfoResponse,
  UserPasswordLoginDTO,
  UserRegisterDTO,
  TokenRefreshDTO,
  OAuthProvider,
} from '../types'

/**
 * 认证服务
 */
export const authService = {
  /**
   * 获取OAuth授权URL
   */
  async getOAuthAuthorizeUrl(
    provider: OAuthProvider,
    params?: {
      inviterId?: string
      clientId?: string
      sfmcUserId?: string
      memberId?: number
    },
  ): Promise<AuthorizationUrlResponse> {
    const endpoint = API_ENDPOINTS.AUTH.OAUTH_AUTHORIZE.replace(':provider', provider)
    const queryString = new URLSearchParams()

    if (params?.inviterId) queryString.append('inviterId', params.inviterId)
    if (params?.clientId) queryString.append('clientId', params.clientId)
    if (params?.sfmcUserId) queryString.append('sfmcUserId', params.sfmcUserId)
    if (params?.memberId) queryString.append('memberId', params.memberId.toString())

    const url = queryString.toString() ? `${endpoint}?${queryString}` : endpoint

    return apiClient.get(url)
  },

  /**
   * 登录
   */
  async login(data: UserPasswordLoginDTO): Promise<TokenInfoResponse> {
    const response = await apiClient.post<any>(API_ENDPOINTS.AUTH.LOGIN, data)

    // 保存token到本地存储
    if (response.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('userId', response.data.userId)
    }

    return response as TokenInfoResponse
  },

  /**
   * 注册
   */
  async register(data: UserRegisterDTO): Promise<TokenInfoResponse> {
    const response = await apiClient.post<any>(API_ENDPOINTS.AUTH.REGISTER, data)

    // 保存token到本地存储
    if (response.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('userId', response.data.userId)
    }

    return response as TokenInfoResponse
  },

  /**
   * 刷新Token
   */
  async refreshToken(data: TokenRefreshDTO): Promise<TokenInfoResponse> {
    const response = await apiClient.post<any>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, data)

    // 更新token
    if (response.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
    }

    return response as TokenInfoResponse
  },

  /**
   * 登出
   */
  async logout(): Promise<void> {
    await apiClient.get(API_ENDPOINTS.AUTH.LOGOUT)

    // 清除本地存储
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
  },

  /**
   * 获取访问Token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  },

  /**
   * 获取刷新Token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  },

  /**
   * 检查是否已登录
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken')
  },
}
