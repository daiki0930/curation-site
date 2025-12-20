import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// データベースの型定義
export type Product = {
  id: string
  title: string
  description: string
  price: number
  image_url: string
  category: string
  featured: boolean
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  email: string
  name: string
  created_at: string
}

export type Review = {
  id: string
  user_id: string
  product_id: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
}

export type Favorite = {
  id: string
  user_id: string
  product_id: string
  created_at: string
}
