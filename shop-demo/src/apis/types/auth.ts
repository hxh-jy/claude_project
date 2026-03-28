import { ApiResponse } from './common'

/**
 * OAuth授权URL响应
 */
export interface AuthorizationUrlVO {
  authorizationUrl: string
}

export type AuthorizationUrlResponse = ApiResponse<AuthorizationUrlVO>

/**
 * Token信息
 */
export interface TokenInfoVO {
  userId: string
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export type TokenInfoResponse = ApiResponse<TokenInfoVO>

/**
 * 登录请求体
 */
export interface UserPasswordLoginDTO {
  email: string
  password: string
}

/**
 * 注册请求体
 */
export interface UserRegisterDTO {
  email: string
  password: string
  username?: string
  inviterId?: string
}

/**
 * Token刷新请求体
 */
export interface TokenRefreshDTO {
  refreshToken: string
}

/**
 * OAuth提供商类型
 */
export enum OAuthProvider {
  GOOGLE = 'google',
  SALESFORCE = 'salesforce',
  SFMC = 'sfmc',
}
