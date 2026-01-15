export type ReviewType = {
  id: number
  place_id: number
  title: string
  content: string
  stars: number
  user_id: number
  created_at: Date
  updated_at: Date
  author: {
    id: number
    full_name: string
    avatar_url?: string
  }
  images: {
    id: number
    url: string
  }[]
}
