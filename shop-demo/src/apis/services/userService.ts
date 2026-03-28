import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../constants/api'
import {
  UserResponse,
  UserPageResponse,
  UserUpdateDTO,
  CurrentUserUpdateDTO,
  UserPasswordChangeDTO,
  UserPageParams,
} from '../types'

/**
 * 用户服务
 */
export const userService = {
  /**
   * 获取用户信息
   */
  async getUser(userId: string): Promise<UserResponse> {
    const endpoint = API_ENDPOINTS.USER.GET_USER.replace(':userId', userId)
    return apiClient.get(endpoint)
  },

  /**
   * 获取用户Profile
   */
  async getUserProfile(userId: string): Promise<UserResponse> {
    const endpoint = API_ENDPOINTS.USER.GET_PROFILE.replace(':userId', userId)
    return apiClient.get(endpoint)
  },

  /**
   * 分页获取用户列表
   */
  async getUsersPage(params: UserPageParams): Promise<UserPageResponse> {
    const queryString = new URLSearchParams()

    if (params.page) queryString.append('page', params.page.toString())
    if (params.size) queryString.append('size', params.size.toString())
    if (params.key) queryString.append('key', params.key)
    if (params.sortBy) queryString.append('sortBy', params.sortBy)
    if (params.sortType) queryString.append('sortType', params.sortType)
    if (params.organizationId) queryString.append('organizationId', params.organizationId)

    const url = queryString.toString()
      ? `${API_ENDPOINTS.USER.GET_PROFILE_PAGE}?${queryString}`
      : API_ENDPOINTS.USER.GET_PROFILE_PAGE

    return apiClient.get(url)
  },

  /**
   * 更新用户信息
   */
  async updateUser(data: UserUpdateDTO): Promise<UserResponse> {
    return apiClient.post(API_ENDPOINTS.USER.UPDATE_PROFILE, data)
  },

  /**
   * 完善用户信息
   */
  async completeUserProfile(data: CurrentUserUpdateDTO): Promise<UserResponse> {
    return apiClient.post(API_ENDPOINTS.USER.COMPLETE_PROFILE, data)
  },

  /**
   * 修改密码
   */
  async changePassword(data: UserPasswordChangeDTO): Promise<void> {
    await apiClient.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, data)
  },
}
