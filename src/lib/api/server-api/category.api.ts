import http from '@/lib/http'
import { CategoryType } from '@/lib/schemas/category.schema'

export const categoryApiServerRequest = {
  getAll: () => http.get<CategoryType[]>('/categories'),
}
