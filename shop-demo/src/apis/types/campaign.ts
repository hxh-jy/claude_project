import { ApiResponse, PageResponse } from './common'
import { DataExtension } from './brand'

/**
 * 问题选项
 */
export interface QuestionOption {
  id: string
  label: string
  description?: string
  selected: boolean
}

/**
 * 活动问题
 */
export interface CampaignQuestionVO {
  id: string
  question: string
  options: QuestionOption[]
}

export type CampaignQuestionListResponse = ApiResponse<CampaignQuestionVO[]>

/**
 * 邮件评分
 */
export interface EmailScore {
  total: number
  weakestDimensions?: string[]
  personalizationDepth?: number
  emotionalPull?: number
  offerClarity?: number
  ctaMomentum?: number
  brandAuthenticity?: number
}

/**
 * 邮件变体
 */
export interface EmailVariantVO {
  label: string
  subjectLine: string
  previewText: string
  bodyHtml: string
  bodyPlain: string
  ctaText: string
  score: EmailScore
}

export type EmailVariantListResponse = ApiResponse<EmailVariantVO[]>

/**
 * 邮件内容生成请求体
 */
export interface EmailContentGenerateDTO {
  brandIdentityId: string
  questions: CampaignQuestionVO[]
  prompt: string
  ctaLink: string
  abTestingStrategy?: string
}

/**
 * 改进目标
 */
export interface ImprovementTarget {
  dimension: string
  currentScore: number
  estimatedLift: string
  improvementAction: string
}

/**
 * 优化后的邮件
 */
export interface OptimizedEmail {
  subjectLine: string
  bodyHtml: string
  bodyPlain: string
  ctaText: string
  changesMade: string[]
}

/**
 * 邮件优化响应
 */
export interface EmailOptimizeVO {
  pass1Scores: EmailScore
  improvementTargets: ImprovementTarget[]
  pass2Email: OptimizedEmail
  pass2Scores: EmailScore
  totalLift: number
}

export type EmailOptimizeResponse = ApiResponse<EmailOptimizeVO>

/**
 * 邮件优化请求体
 */
export interface EmailOptimizeDTO {
  brandIdentityId: string
  emailVariant: EmailVariantVO
}

/**
 * 问题生成请求体
 */
export interface ContentQuestionGenerateDTO {
  brandIdentityId: string
  context?: string
}

/**
 * 活动列表项
 */
export interface CampaignVO {
  id: string
  name: string
  type: string
  status: string
  channels: string[]
  audiences: number
  openRate: string
  clickRate: string
  createTime: number
  modifyTime: number
}

export type CampaignPageResponse = PageResponse<CampaignVO>

/**
 * 活动分页查询参数
 */
export interface CampaignPageParams {
  page?: number
  size?: number
  key?: string
  sortBy?: string
  sortType?: string
  type?: string
  status?: string
}

/**
 * 字段映射
 */
export interface FieldMapping {
  uniqueIdField: string
  emailField: string
  recencyField?: string
  frequencyField?: string
  monetaryField?: string
}

/**
 * 数据问题
 */
export interface DataIssue {
  severity: string
  field: string
  message: string
}

/**
 * 阈值范围
 */
export interface ThresholdRange {
  min: number
  max: number
}

/**
 * 分析结果
 */
export interface AnalysisResult {
  overallReadiness: string
  readinessScore: number
  fieldMapping: FieldMapping
  issues: DataIssue[]
  inactivityThreshold: number
  inactivityThresholdRange: ThresholdRange
  inactivityThresholdReasoning: string
  estimatedAudience: number
}

/**
 * 策略配置
 */
export interface CampaignStrategy {
  dataSources: DataExtension[]
  analysisResult: AnalysisResult
  senderProfileId: string
  sendClassificationId?: string
  successMetric: string
  windowDuration: number
}

/**
 * 发送时间表
 */
export interface SendSchedule {
  activityType: string
  schedule: {
    startTime: number
    timeZone: string
  }
}

/**
 * 分阶段邮件
 */
export interface StageEmailVO {
  stage: string
  variants: EmailVariantVO[]
}

/**
 * 内容配置
 */
export interface CampaignContent {
  abTestingStrategy: string
  questions: CampaignQuestionVO[]
  prompt: string
  ctaLink: string
  stageEmails: StageEmailVO[]
}

/**
 * 合规检查
 */
export interface ComplianceCheck {
  allHasUnsubscribeLink: boolean
  includeCompanyAddress: boolean
  verifiedSenderDomain: boolean
  noProhibitedWords: boolean
  verifiedEmailSubject: boolean
  verifiedEmailHtmlStructure: boolean
}

/**
 * 活动详情
 */
export interface CampaignDetailVO {
  id: string
  name: string
  description: string
  type: string
  status: string
  strategy: CampaignStrategy
  content: CampaignContent
  sendSchedule: SendSchedule
  complianceCheck: ComplianceCheck
  createTime: number
}

export type CampaignDetailResponse = ApiResponse<CampaignDetailVO>
