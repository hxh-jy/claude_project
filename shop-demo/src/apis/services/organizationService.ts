import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../constants/api'
import { OrganizationResponse, OrganizationUpdateDTO } from '../types'

/**
 * 组织服务
 */
export const organizationService = {
  /**
   * 获取组织信息
   */
  async getOrganization(organizationId: string): Promise<OrganizationResponse> {
    const endpoint = API_ENDPOINTS.ORGANIZATION.GET_ORGANIZATION.replace(
      ':organizationId',
      organizationId,
    )
    return apiClient.get(endpoint)
  },

  /**
   * 更新组织信息
   */
  async updateOrganization(data: OrganizationUpdateDTO): Promise<OrganizationResponse> {
    return apiClient.post(API_ENDPOINTS.ORGANIZATION.UPDATE_ORGANIZATION, data)
  },
}
