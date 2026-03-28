import { CartItem } from './cart'
import { Address } from './user'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: OrderStatus
  shippingAddress: Address
  createdAt: string
  updatedAt: string
}

export interface OrderDetail extends Order {
  trackingNumber?: string
  estimatedDelivery?: string
}
