/**
 * API基础配置常量
 */

// API基础URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// 请求超时时间 (毫秒)
export const REQUEST_TIMEOUT = 10000

// OAuth 提供商
export const OAUTH_PROVIDERS = {
  GOOGLE: 'google',
  SALESFORCE: 'salesforce',
  SFMC: 'sfmc',
} as const

// API 端点
export const API_ENDPOINTS = {
  // Auth 相关
  AUTH: {
    OAUTH_AUTHORIZE: '/auth/oauth/:provider/authorize',
    OAUTH_CALLBACK: '/auth/oauth/:provider/callback',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/token/refresh',
    LOGOUT: '/auth/logout',
  },

  // User 相关
  USER: {
    GET_USER: '/user/:userId',
    GET_PROFILE: '/user/profile/:userId',
    GET_PROFILE_PAGE: '/user/profile/page',
    UPDATE_PROFILE: '/user/profile',
    COMPLETE_PROFILE: '/user/profile/complete',
    CHANGE_PASSWORD: '/user/password',
  },

  // Organization 相关
  ORGANIZATION: {
    GET_ORGANIZATION: '/organization/:organizationId',
    UPDATE_ORGANIZATION: '/organization',
  },

  // Inviter 相关
  INVITER: {
    GET_INVITE_PATH: '/inviter/path',
    SEND_INVITE: '/inviter/invite',
  },

  // Brand 相关
  BRAND: {
    GET_BRAND_IDENTITY: '/brand/identity',
    SET_BRAND_IDENTITY: '/brand/identity',
    GET_BRAND_ASSETS: '/brand/asset/:brandIdentityId',
    SUBMIT_BRAND_ASSET: '/brand/asset',
    GET_DATASOURCE_CONFIG: '/brand/datasource/:brandIdentityId',
    CONFIG_DATASOURCE: '/brand/datasource',
    ANALYZE_WEBSITE: '/brand/analysis/website',
  },

  // Campaign 相关
  CAMPAIGN: {
    GENERATE_QUESTIONS: '/campaign/content/questions',
    GENERATE_EMAIL: '/campaign/content/email',
    OPTIMIZE_EMAIL: '/campaign/content/email/optimize',
    GET_CAMPAIGNS_PAGE: '/campaign/page',
    GET_CAMPAIGN_DETAIL: '/campaign/detail/:campaignId',
  },
} as const
