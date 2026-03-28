import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../constants/api'
import {
  CampaignQuestionListResponse,
  EmailVariantListResponse,
  EmailOptimizeResponse,
  CampaignPageResponse,
  CampaignDetailResponse,
  ContentQuestionGenerateDTO,
  EmailContentGenerateDTO,
  EmailOptimizeDTO,
  CampaignPageParams,
} from '../types'

/**
 * 活动服务
 */
export const campaignService = {
  /**
   * 生成问题
   */
  async generateQuestions(data: ContentQuestionGenerateDTO): Promise<CampaignQuestionListResponse> {
    return apiClient.post(API_ENDPOINTS.CAMPAIGN.GENERATE_QUESTIONS, data)
  },

  /**
   * 生成邮件内容
   */
  async generateEmailContent(data: EmailContentGenerateDTO): Promise<EmailVariantListResponse> {
    return apiClient.post(API_ENDPOINTS.CAMPAIGN.GENERATE_EMAIL, data)
  },

  /**
   * 优化邮件内容
   */
  async optimizeEmail(data: EmailOptimizeDTO): Promise<EmailOptimizeResponse> {
    return apiClient.post(API_ENDPOINTS.CAMPAIGN.OPTIMIZE_EMAIL, data)
  },

  /**
   * 获取活动列表（分页）
   */
  async getCampaignsList(params: CampaignPageParams): Promise<CampaignPageResponse> {
    const queryString = new URLSearchParams()

    if (params.page) queryString.append('page', params.page.toString())
    if (params.size) queryString.append('size', params.size.toString())
    if (params.key) queryString.append('key', params.key)
    if (params.sortBy) queryString.append('sortBy', params.sortBy)
    if (params.sortType) queryString.append('sortType', params.sortType)
    if (params.type) queryString.append('type', params.type)
    if (params.status) queryString.append('status', params.status)

    const url = queryString.toString()
      ? `${API_ENDPOINTS.CAMPAIGN.GET_CAMPAIGNS_PAGE}?${queryString}`
      : API_ENDPOINTS.CAMPAIGN.GET_CAMPAIGNS_PAGE

    return apiClient.get(url)
  },

  /**
   * 获取活动详情
   */
  async getCampaignDetail(campaignId: string): Promise<CampaignDetailResponse> {
    const endpoint = API_ENDPOINTS.CAMPAIGN.GET_CAMPAIGN_DETAIL.replace(
      ':campaignId',
      campaignId,
    )
    return apiClient.get(endpoint)
  },
}
