import z from 'zod'

export const ROLE = ['user', 'admin'] as const

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  full_name: z.string().min(2).max(255),
  avatar_url: z.string().url().optional(),
  role: z.enum(ROLE).default('user'),
  created_at: z.date(),
  updated_at: z.date(),
})

export const UserResponseSchema = UserSchema.omit({ password: true })

export type UserType = z.TypeOf<typeof UserSchema>
export type UserResponseType = z.TypeOf<typeof UserResponseSchema>
