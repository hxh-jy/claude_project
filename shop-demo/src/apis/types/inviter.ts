import { ApiResponse } from './common'

/**
 * 邀请路径信息
 */
export interface InviterVO {
  path: string
}

export type InviterResponse = ApiResponse<InviterVO>

/**
 * 邀请邮件发送请求体
 */
export interface InviteEmailSendDTO {
  inviteeEmail: string
  inviteeRole?: string
  organizationId?: string
}
