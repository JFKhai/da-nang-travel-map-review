import http from '@/lib/http'
import { PaginationType } from '@/lib/schemas/pagination.schema'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'

export type GetPlacesParams = {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: 'created_at' | 'updated_at' | 'name'
  sortOrder?: 'ASC' | 'DESC'
}

export const placeApiServerRequest = {
  getPlaces: (params?: GetPlacesParams) =>
    http.get<{
      places: PlaceWithRelations[]
      pagination: PaginationType
    }>('/places', {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        category: params?.category,
        search: params?.search,
        sortBy: params?.sortBy ?? 'created_at',
        sortOrder: params?.sortOrder ?? 'ASC',
      },
    }),
}
