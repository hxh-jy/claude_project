import apiClient, { handleApiError } from './api'
import { Order, OrderDetail } from '@/types/order'
import { CartItem } from '@/types/cart'
import { Address } from '@/types/user'
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api'

export interface CreateOrderPayload {
  items: CartItem[]
  shippingAddress: Address
  total: number
}

export const orderService = {
  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    try {
      const response = await apiClient.post<ApiResponse<Order>>('/orders', payload)
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async getOrders(
    params: PaginationParams
  ): Promise<PaginatedResponse<Order>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
        '/orders',
        { params }
      )
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async getOrderById(id: string): Promise<OrderDetail> {
    try {
      const response = await apiClient.get<ApiResponse<OrderDetail>>(`/orders/${id}`)
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async updateOrderStatus(
    id: string,
    status: string
  ): Promise<Order> {
    try {
      const response = await apiClient.put<ApiResponse<Order>>(
        `/orders/${id}`,
        { status }
      )
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}
