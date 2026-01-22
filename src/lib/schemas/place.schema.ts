import z from 'zod'

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
  reviewCount: number
  averageRating: number | null
}

export const UpdatePlaceBodySchema = z
  .object({
    name: z
      .string('Tên địa điểm là bắt buộc')
      .min(3, 'Tên địa điểm phải có ít nhất 3 ký tự')
      .max(255, 'Tên địa điểm không được vượt quá 255 ký tự'),
    slug: z
      .string('Slug là bắt buộc')
      .min(3, 'Slug phải có ít nhất 3 ký tự')
      .max(255, 'Slug không được vượt quá 255 ký tự'),
    short_description: z.string().max(1000, 'Mô tả ngắn không được vượt quá 1000 ký tự').optional(),
    address: z.string('Địa chỉ là bắt buộc').max(500, 'Địa chỉ không được vượt quá 500 ký tự'),
    phone: z.string().max(20, 'Số điện thoại không được vượt quá 20 ký tự').optional(),
    website: z.string().max(255, 'Website không được vượt quá 255 ký tự').optional(),
    opening_hours: z.string('Giờ mở cửa là bắt buộc').max(255, 'Giờ mở cửa không được vượt quá 255 ký tự'),
    lat: z
      .number('Vĩ độ là bắt buộc')
      .min(-90, 'Vĩ độ phải nằm trong khoảng -90 đến 90')
      .max(90, 'Vĩ độ phải nằm trong khoảng -90 đến 90'),
    lng: z
      .number('Kinh độ là bắt buộc')
      .min(-180, 'Kinh độ phải nằm trong khoảng -180 đến 180')
      .max(180, 'Kinh độ phải nằm trong khoảng -180 đến 180'),
    categories: z.array(z.number(), 'Danh mục là bắt buộc').min(1, 'Phải chọn ít nhất 1 danh mục'),
    deleteImages: z.array(z.number()).optional(),
  })
  .strict()

export type UpdatePlaceBodyType = z.infer<typeof UpdatePlaceBodySchema>
