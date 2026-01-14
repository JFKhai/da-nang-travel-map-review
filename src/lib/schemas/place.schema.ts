export type PlaceType = {
  id: number
  slug: string
  name: string
  short_description?: string
  address?: string
  phone?: string
  website?: string
  opening_hours?: string
  lat?: number
  lng?: number
  cover_image_id?: number
  user_id: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export type PlaceWithRelations = PlaceType & {
  categories: {
    id: number
    name: string
    slug: string
  }[]
  coverImage: {
    id: number
    url: string
  }
  creator: {
    id: number
    full_name: string
    email: string
  }
  images: {
    id: number
    url: string
    public_id: string | null
    caption?: string
    sort_order: number
  }[]
}
