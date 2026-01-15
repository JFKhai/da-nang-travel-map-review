import http from '@/lib/http'
import { ReviewType } from '@/lib/schemas/review.schema'

export const reviewApiServerRequest = {
  getReviewsByPlaceId: (placeId: number) => http.get<ReviewType[]>(`/review/place/${placeId}`),
}
