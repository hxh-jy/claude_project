import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../constants/api'
import { InviterResponse, InviteEmailSendDTO } from '../types'

/**
 * 邀请服务
 */
export const inviterService = {
  /**
   * 获取邀请路径
   */
  async getInvitePath(): Promise<InviterResponse> {
    return apiClient.get(API_ENDPOINTS.INVITER.GET_INVITE_PATH)
  },

  /**
   * 发送邀请邮件
   */
  async sendInviteEmail(data: InviteEmailSendDTO): Promise<void> {
    await apiClient.post(API_ENDPOINTS.INVITER.SEND_INVITE, data)
  },
}
