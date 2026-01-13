import z from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  full_name: z.string().min(2).max(255),
  avatar_url: z.string().url().optional(),
  role: z.enum(['user', 'admin']).default('user'),
  created_at: z.date(),
  updated_at: z.date(),
})

export type UserType = z.TypeOf<typeof UserSchema>
