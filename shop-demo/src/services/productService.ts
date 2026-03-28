import apiClient, { handleApiError } from './api'
import { Product, Category } from '@/types/product'
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api'

export const productService = {
  async getProducts(
    params: PaginationParams & { category?: string; search?: string }
  ): Promise<PaginatedResponse<Product>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        '/products',
        { params }
      )
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`)
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await apiClient.get<ApiResponse<Product[]>>('/products/search', {
        params: { q: query },
      })
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get<ApiResponse<Category[]>>('/categories')
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}
