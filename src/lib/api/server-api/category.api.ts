import http from '@/lib/http'
import { CategoryType, CreateCategoryBodyType, UpdateCategoryBodyType } from '@/lib/schemas/category.schema'

export const categoryApiServerRequest = {
  getAll: () => http.get<CategoryType[]>('/categories'),

  getById: (id: number) => http.get<CategoryType>(`/categories/${id}`),

  create: (data: CreateCategoryBodyType) => http.post<CategoryType>('/categories', data),

  update: (id: number, data: UpdateCategoryBodyType) => http.put<CategoryType>(`/categories/${id}`, data),

  delete: (id: number) => http.delete<{ message: string }>(`/categories/${id}`),
}
