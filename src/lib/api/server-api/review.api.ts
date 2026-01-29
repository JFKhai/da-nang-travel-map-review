import http from '@/lib/http'
import { CreateReviewResponseType, ReviewType } from '@/lib/schemas/review.schema'

export const reviewApiServerRequest = {
  getReviewsByPlaceId: (placeId: number) => http.get<ReviewType[]>(`/review/place/${placeId}`),

  createReview: (data: FormData) => http.post<CreateReviewResponseType>('/review', data),

  updateReview: (reviewId: number, data: FormData) => http.put<CreateReviewResponseType>(`/review/${reviewId}`, data),

  deleteReview: (reviewId: number) => http.delete<{ message: string }>(`/review/${reviewId}`),
}
