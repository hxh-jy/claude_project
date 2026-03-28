import { ApiResponse, PageResponse } from './common'

/**
 * 用户信息
 */
export interface UserVO {
  userId: string
  email: string
  title?: string
  username: string
  phone?: string
  avatar?: string
  organizationId: string
  inviterId?: string
  createTime: number
}

export type UserResponse = ApiResponse<UserVO>
export type UserPageResponse = PageResponse<UserVO>

/**
 * 用户更新请求体
 */
export interface UserUpdateDTO {
  userId: string
  email?: string
  title?: string
  username?: string
  phone?: string
  avatar?: string
}

/**
 * 当前用户信息更新请求体
 */
export interface CurrentUserUpdateDTO {
  email?: string
  title?: string
  username?: string
  phone?: string
  avatar?: string
}

/**
 * 用户密码修改请求体
 */
export interface UserPasswordChangeDTO {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

/**
 * 用户分页查询参数
 */
export interface UserPageParams {
  page?: number
  size?: number
  key?: string
  sortBy?: string
  sortType?: string
  organizationId?: string
}
