import http from '@/lib/http'
import { CreateReviewResponseType, ReviewType } from '@/lib/schemas/review.schema'

export const reviewApiServerRequest = {
  getReviewsByPlaceId: (placeId: number) => http.get<ReviewType[]>(`/review/place/${placeId}`),
  createReview: (data: FormData) => http.post<CreateReviewResponseType>('/review', data),
}
