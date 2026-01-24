import z from 'zod'

export type CategoryType = {
  id: number
  slug: string
  name: string
  icon: string
  created_at: Date
  updated_at: Date
}

export const CreateCategoryBodySchema = z.object({
  name: z
    .string('Tên danh mục là bắt buộc')
    .min(1, 'Tên danh mục là bắt buộc')
    .min(3, 'Tên danh mục phải có ít nhất 3 ký tự'),
  slug: z
    .string('Slug là bắt buộc')
    .min(1, 'Slug là bắt buộc')
    .min(3, 'Slug phải có ít nhất 3 ký tự')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug chỉ được chứa chữ cái, số và dấu gạch ngang'),
  // icon: z.string().optional(),
})

export type CreateCategoryBodyType = z.infer<typeof CreateCategoryBodySchema>

export const UpdateCategoryBodySchema = CreateCategoryBodySchema

export type UpdateCategoryBodyType = z.infer<typeof UpdateCategoryBodySchema>
