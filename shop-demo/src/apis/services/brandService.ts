import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../constants/api'
import {
  BrandIdentityResponse,
  BrandIdentitySettingDTO,
  BrandAssetResponse,
  BrandAssetSubmitDTO,
  BrandDataSourceConfigResponse,
  DataSourceConfigDTO,
  WebsiteAnalysisDTO,
} from '../types'

/**
 * 品牌服务
 */
export const brandService = {
  /**
   * 获取品牌身份设置
   */
  async getBrandIdentity(): Promise<BrandIdentityResponse> {
    return apiClient.get(API_ENDPOINTS.BRAND.GET_BRAND_IDENTITY)
  },

  /**
   * 设置品牌身份
   */
  async setBrandIdentity(data: BrandIdentitySettingDTO): Promise<BrandIdentityResponse> {
    return apiClient.post(API_ENDPOINTS.BRAND.SET_BRAND_IDENTITY, data)
  },

  /**
   * 获取品牌资源列表
   */
  async getBrandAssets(brandIdentityId: string): Promise<BrandAssetResponse> {
    const endpoint = API_ENDPOINTS.BRAND.GET_BRAND_ASSETS.replace(
      ':brandIdentityId',
      brandIdentityId,
    )
    return apiClient.get(endpoint)
  },

  /**
   * 提交品牌资源
   */
  async submitBrandAsset(data: BrandAssetSubmitDTO): Promise<BrandAssetResponse> {
    return apiClient.post(API_ENDPOINTS.BRAND.SUBMIT_BRAND_ASSET, data)
  },

  /**
   * 获取数据源配置
   */
  async getDataSourceConfig(brandIdentityId: string): Promise<BrandDataSourceConfigResponse> {
    const endpoint = API_ENDPOINTS.BRAND.GET_DATASOURCE_CONFIG.replace(
      ':brandIdentityId',
      brandIdentityId,
    )
    return apiClient.get(endpoint)
  },

  /**
   * 配置数据源
   */
  async configDataSource(data: DataSourceConfigDTO): Promise<BrandDataSourceConfigResponse> {
    return apiClient.post(API_ENDPOINTS.BRAND.CONFIG_DATASOURCE, data)
  },

  /**
   * 分析网站
   */
  async analyzeWebsite(data: WebsiteAnalysisDTO): Promise<BrandIdentityResponse> {
    return apiClient.post(API_ENDPOINTS.BRAND.ANALYZE_WEBSITE, data)
  },
}
