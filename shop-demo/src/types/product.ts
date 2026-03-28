export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  rating: number
  reviewCount: number
  createdAt: string
}

export interface Category {
  id: string
  name: string
  description: string
}
