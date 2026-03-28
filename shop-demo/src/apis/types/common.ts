/**
 * 通用响应类型定义
 */

/**
 * 通用API响应包装
 */
export interface ApiResponse<T = any> {
  code: string
  message: string
  data: T
  traceId: string
}

/**
 * 分页信息
 */
export interface PageInfo<T> {
  page: number
  size: number
  pages: number
  total: number
  content: T[]
}

/**
 * 分页响应
 */
export interface PageResponse<T> extends ApiResponse<PageInfo<T>> {}

/**
 * 空响应
 */
export interface VoidResponse extends ApiResponse<null> {}

/**
 * 排序类型枚举
 */
export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * 分页和排序参数
 */
export interface PaginationParams {
  page?: number
  size?: number
  key?: string
  sortBy?: string
  sortType?: SortType | string
}
