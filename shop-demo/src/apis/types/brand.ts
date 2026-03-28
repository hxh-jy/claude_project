import { ApiResponse } from './common'

/**
 * 品牌身份信息
 */
export interface BrandIdentityVO {
  id: string
  brandName: string
  website?: string
  logo?: string
  tone?: string
  colors?: string[]
  keywords?: string[]
  coreAudiencePersona?: string
  brandStory?: string
}

export type BrandIdentityResponse = ApiResponse<BrandIdentityVO>

/**
 * 品牌身份设置请求体
 */
export interface BrandIdentitySettingDTO {
  brandName: string
  website?: string
  logo?: string
  tone?: string
  colors?: string[]
  keywords?: string[]
  coreAudiencePersona?: string
  brandStory?: string
}

/**
 * 资源信息
 */
export interface Asset {
  id: string
  name: string
  url: string
  mimeType: string
  size: number
}

/**
 * 品牌资源
 */
export interface BrandAssetVO {
  assets: Asset[]
}

export type BrandAssetResponse = ApiResponse<BrandAssetVO>

/**
 * 品牌资源提交请求体
 */
export interface BrandAssetSubmitDTO {
  brandIdentityId: string
  assets: Array<{
    name: string
    url: string
    mimeType: string
    size: number
  }>
}

/**
 * 数据扩展信息
 */
export interface DataExtension {
  id: string
  key: string
  name: string
}

/**
 * 品牌数据源配置
 */
export interface BrandDataSourceConfigVO {
  dataExtensions: DataExtension[]
}

export type BrandDataSourceConfigResponse = ApiResponse<BrandDataSourceConfigVO>

/**
 * 数据源配置请求体
 */
export interface DataSourceConfigDTO {
  brandIdentityId: string
  dataExtensions: Array<{
    id: string
    key: string
    name: string
  }>
}

/**
 * 网站分析请求体
 */
export interface WebsiteAnalysisDTO {
  website: string
  organizationId?: string
}
