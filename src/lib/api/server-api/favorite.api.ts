import http from '@/lib/http'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'

export const favoriteApiServerRequest = {
  getMyFavorites: () => http.get<PlaceWithRelations[]>('/favorite/me'),
  toggleFavorite: (placeId: number) =>
    http.post<{ is_favorited: boolean; message: string }>('/favorite/toggle', { place_id: placeId }),
}

export default favoriteApiServerRequest
