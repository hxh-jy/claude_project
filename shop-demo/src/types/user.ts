export interface User {
  id: string
  username: string
  email: string
  phone?: string
  avatar?: string
  createdAt: string
}

export interface Address {
  id: string
  userId: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  address: string
  isDefault: boolean
}
