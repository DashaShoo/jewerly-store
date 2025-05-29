export interface User {
  id: string
  email: string
  name: string
  token: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: ProductCategory
  size?: string
  inStock: number
  type: string
}

export type ProductCategory = "rings" | "earrings" | "necklaces" | "other"

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string // не реализовано, на будущее
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}
