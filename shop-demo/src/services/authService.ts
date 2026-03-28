import apiClient, { handleApiError } from './api'
import { User, Address } from '@/types/user'
import { ApiResponse } from '@/types/api'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
}

export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    try {
      const response = await apiClient.post<ApiResponse<User>>(
        '/auth/login',
        payload
      )
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async register(payload: RegisterPayload): Promise<User> {
    try {
      const response = await apiClient.post<ApiResponse<User>>(
        '/auth/register',
        payload
      )
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/user/profile')
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(
        '/user/profile',
        data
      )
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async getAddresses(): Promise<Address[]> {
    try {
      const response = await apiClient.get<ApiResponse<Address[]>>(
        '/user/addresses'
      )
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async addAddress(data: Omit<Address, 'id' | 'userId'>): Promise<Address> {
    try {
      const response = await apiClient.post<ApiResponse<Address>>(
        '/user/addresses',
        data
      )
      return response.data.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async deleteAddress(id: string): Promise<void> {
    try {
      await apiClient.delete(`/user/addresses/${id}`)
    } catch (error) {
      throw handleApiError(error)
    }
  },
}
