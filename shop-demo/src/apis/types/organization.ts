import { ApiResponse } from './common'

/**
 * 主要联系人信息
 */
export interface PrimaryContact {
  contactName: string
  title: string
  email: string
  phone: string
}

/**
 * 组织信息
 */
export interface OrganizationVO {
  organizationId: string
  organizationName: string
  website?: string
  logo?: string
  industryType?: string
  businessScale?: string
  foundedYear?: number
  address?: string
  primaryContact?: PrimaryContact
  timeZone?: string
  languagePreference?: string
  currency?: string
}

export type OrganizationResponse = ApiResponse<OrganizationVO>

/**
 * 组织更新请求体
 */
export interface OrganizationUpdateDTO {
  organizationId?: string
  organizationName?: string
  website?: string
  logo?: string
  industryType?: string
  businessScale?: string
  foundedYear?: number
  address?: string
  primaryContact?: PrimaryContact
  timeZone?: string
  languagePreference?: string
  currency?: string
}
