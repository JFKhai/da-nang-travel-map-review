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

export type GetRelatedPlacesParams = {
  categoryIds: number[]
  excludePlaceId?: number
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
  getPlaceById: (id: number) => http.get<PlaceWithRelations>(`/places/${id}`),
  getRelatedPlaces: (params: GetRelatedPlacesParams) =>
    http.get<PlaceWithRelations[]>('/places/related', {
      params: {
        categoryIds: params.categoryIds.join(','),
        excludePlaceId: params.excludePlaceId,
      },
    }),
  createPlace: (data: FormData) => http.post<PlaceWithRelations>('/places', data),
  updatePlace: (id: number, data: FormData) => http.put<PlaceWithRelations>(`/places/${id}`, data),
  deletePlace: (id: number) => http.delete<{ message: string }>(`/places/${id}`),
}
