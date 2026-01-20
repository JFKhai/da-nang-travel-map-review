import z from 'zod'

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

export const CreateReviewBodySchema = z.object({
  place_id: z.number(),
  title: z.string().min(5).max(100),
  content: z.string().min(10).max(1000),
  stars: z.number().min(1).max(5),
})
export type CreateReviewBody = z.infer<typeof CreateReviewBodySchema>

export const CreateReviewResponseSchema = z.object({
  id: z.number(),
  place_id: z.number(),
  title: z.string(),
  content: z.string(),
  stars: z.number(),
  user_id: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  images: z.array(
    z.object({
      id: z.number(),
      place_id: z.union([z.string(), z.number()]),
      review_id: z.number(),
      url: z.string(),
      public_id: z.string(),
      sort_order: z.number(),
      created_at: z.string(),
    }),
  ),
})
export type CreateReviewResponseType = z.infer<typeof CreateReviewResponseSchema>
