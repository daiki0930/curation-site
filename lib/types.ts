export type Product = {
  id: number
  title: string
  description: string
  price: number
  imageUrl: string
  category: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export type Review = {
  id: string
  userId: number
  productId: number
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}

export type Favorite = {
  id: string
  userId: number
  productId: number
  createdAt: string
}
