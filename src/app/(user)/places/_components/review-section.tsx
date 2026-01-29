'use client'

import { useState } from 'react'
import ImageNext from 'next/image'
import { Image } from 'primereact/image'
import { Dialog } from 'primereact/dialog'
import { Star, X, Upload, Edit, Trash } from 'lucide-react'
import { ReviewType } from '@/lib/schemas/review.schema'
import { clientAccessToken } from '@/lib/http'
import { useToast } from '@/components/providers/toast-provider'
import { reviewApiServerRequest } from '@/lib/api/server-api/review.api'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/components/providers/app-provider'

interface ReviewSectionProps {
  placeId: number
  reviews: ReviewType[]
  rating: number | null
  totalReviews: number
}

export default function ReviewSection({ placeId, reviews, rating, totalReviews }: ReviewSectionProps) {
  const router = useRouter()
  const { showSuccess, showError } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newReview, setNewReview] = useState({
    stars: 0,
    title: '',
    content: '',
    images: [] as File[],
  })
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const { user } = useAppContext()
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null)

  const [existingImages, setExistingImages] = useState<{ id: number; url: string }[]>([])
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([])

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; reviewId: number | null }>({
    open: false,
    reviewId: null,
  })
  const [isDeleting, setIsDeleting] = useState(false)

  // Tính toán số lượng reviews cho mỗi mức sao
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => review.stars === stars).length,
  }))

  const handleStarClick = (starValue: number) => {
    setNewReview({ ...newReview, stars: starValue })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const fileArray = Array.from(files)
    setNewReview({ ...newReview, images: [...newReview.images, ...fileArray] })

    fileArray.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImages((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveNewImage = (index: number) => {
    const newImages = newReview.images.filter((_, i) => i !== index)
    const newPreviews = previewImages.filter((_, i) => i !== index)
    setNewReview({ ...newReview, images: newImages })
    setPreviewImages(newPreviews)
  }

  const toggleDeleteExistingImage = (imageId: number) => {
    setDeleteImageIds((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const handleSubmitReview = async () => {
    if (!clientAccessToken.value) {
      showError('Vui lòng đăng nhập để tiếp tục')
      return
    }

    if (editingReviewId && user?.id !== reviews.find((r) => r.id === editingReviewId)?.user_id) {
      showError('Bạn không có quyền chỉnh sửa đánh giá này')
      return
    }
    if (!editingReviewId && user?.role !== 'user') {
      showError('Bạn không có quyền đăng đánh giá')
      return
    }

    if (newReview.stars === 0 || newReview.content.trim() === '') {
      showError('Vui lòng điền đầy đủ thông tin')
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()

      if (editingReviewId) {
        // Update review
        if (newReview.title) formData.append('title', newReview.title)
        formData.append('content', newReview.content)
        formData.append('stars', newReview.stars.toString())

        // Add images to delete
        if (deleteImageIds.length > 0) {
          formData.append('deleteImageIds', JSON.stringify(deleteImageIds))
        }

        // Add new images
        newReview.images.forEach((image) => formData.append('images', image))

        await reviewApiServerRequest.updateReview(editingReviewId, formData)
        showSuccess('Cập nhật đánh giá thành công!')
      } else {
        formData.append('place_id', placeId.toString())
        formData.append('title', newReview.title || newReview.content.substring(0, 50))
        formData.append('content', newReview.content)
        formData.append('stars', newReview.stars.toString())
        newReview.images.forEach((image) => formData.append('images', image))

        await reviewApiServerRequest.createReview(formData)
        showSuccess('Đăng đánh giá thành công!')
      }

      // Reset form
      setShowModal(false)
      setNewReview({ stars: 0, title: '', content: '', images: [] })
      setPreviewImages([])
      setExistingImages([])
      setDeleteImageIds([])
      setEditingReviewId(null)
      router.refresh()
    } catch (error: unknown) {
      console.error('Error submitting review:', error)
      const err = error as { data?: { message?: string } }
      showError(err?.data?.message || 'Có lỗi xảy ra khi xử lý đánh giá')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditClick = (review: ReviewType) => {
    if (user?.id !== review.user_id) return
    setEditingReviewId(review.id)
    setNewReview({
      stars: review.stars,
      title: ((review as any)?.title as string) ?? '',
      content: review.content ?? '',
      images: [],
    })
    setPreviewImages([])
    setExistingImages(review.images || [])
    setDeleteImageIds([])
    setShowModal(true)
  }

  const openDeleteDialog = (reviewId: number, userId: number) => {
    if (user?.id !== userId) return
    setDeleteDialog({ open: true, reviewId })
  }

  const confirmDeleteReview = async () => {
    if (!deleteDialog.reviewId) return
    setIsDeleting(true)
    try {
      await reviewApiServerRequest.deleteReview(deleteDialog.reviewId)
      showSuccess('Xóa đánh giá thành công!')
      setDeleteDialog({ open: false, reviewId: null })
      router.refresh()
    } catch (error: unknown) {
      console.error('Error deleting review:', error)
      const err = error as { data?: { message?: string } }
      showError(err?.data?.message || 'Có lỗi xảy ra khi xóa đánh giá')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingReviewId(null)
    setNewReview({ stars: 0, title: '', content: '', images: [] })
    setPreviewImages([])
    setExistingImages([])
    setDeleteImageIds([])
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-brand-border">Đánh giá</h2>
        {user?.role === 'user' && (
          <button
            onClick={() => {
              setEditingReviewId(null)
              setShowModal(true)
            }}
            className="px-6 py-2.5 bg-brand-teal text-white rounded-full hover:bg-brand-teal/90 font-medium transition-colors flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Viết đánh giá
          </button>
        )}
      </div>

      {/* Rating Overview */}
      <div className="bg-brand-light/10 border border-brand-teal/20 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{rating ? parseFloat(rating.toFixed(2)) : 0}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">{totalReviews} đánh giá</p>
          </div>

          <div className="flex-1 space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm w-12">{item.stars} Stars</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${totalReviews > 0 ? (item.count / totalReviews) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button className="px-4 py-2 border border-brand-teal/30 rounded-full text-sm hover:bg-brand-light/20 hover:border-brand-teal transition-colors">
          <Star className="w-4 h-4 inline mr-1" /> Xu hướng
        </button>
        <button className="px-4 py-2 border border-brand-teal/30 rounded-full text-sm hover:bg-brand-light/20 hover:border-brand-teal transition-colors">
          Mới nhất
        </button>
        <button className="px-4 py-2 border border-brand-teal/30 rounded-full text-sm hover:bg-brand-light/20 hover:border-brand-teal transition-colors">
          Cũ nhất
        </button>
        <button className="px-4 py-2 border border-brand-teal/30 rounded-full text-sm hover:bg-brand-light/20 hover:border-brand-teal transition-colors">
          <Star className="w-4 h-4 inline mr-1" /> Đánh giá cao
        </button>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-brand-teal/10 pb-6">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <ImageNext
                  src={review.author.avatar_url ? review.author.avatar_url : '/images/default-avatar.png'}
                  alt={review.author.full_name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{review.author.full_name}</h4>
                    <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleString('vi-VN')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {user?.id === review.user_id && (
                      <div className="flex items-center gap-2">
                        <button
                          className="text-sm text-brand-teal hover:underline"
                          onClick={() => handleEditClick(review)}
                        >
                          <Edit className="w-4 h-4 inline mr-1" />
                        </button>
                        <button
                          className="text-sm text-red-600 hover:underline"
                          onClick={() => openDeleteDialog(review.id, review.user_id)}
                        >
                          <Trash className="w-4 h-4 inline mr-1" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.stars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {review.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <Image src={image.url} alt={`Review image ${index + 1}`} preview className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 px-6 py-3 border border-brand-teal text-brand-teal rounded-full hover:bg-brand-light/20 font-medium transition-colors">
        Xem thêm đánh giá
      </button>

      {/* Create/Edit Review Modal */}
      <Dialog
        visible={showModal}
        onHide={handleCloseModal}
        header={editingReviewId ? 'Chỉnh sửa đánh giá' : 'Viết đánh giá'}
        style={{ width: '600px' }}
        className="review-modal"
      >
        <div className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-semibold mb-3">Đánh giá của bạn</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 cursor-pointer ${
                      star <= newReview.stars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {newReview.stars > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {newReview.stars === 5 && 'Xuất sắc!'}
                {newReview.stars === 4 && 'Rất tốt!'}
                {newReview.stars === 3 && 'Tốt'}
                {newReview.stars === 2 && 'Cần cải thiện'}
                {newReview.stars === 1 && 'Không hài lòng'}
              </p>
            )}
          </div>

          {/* Review Title */}
          <div>
            <label htmlFor="review-title" className="block text-sm font-semibold mb-2">
              Tiêu đề (tùy chọn)
            </label>
            <input
              id="review-title"
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              placeholder="Tiêu đề cho đánh giá của bạn..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
            />
          </div>

          {/* Review Content */}
          <div>
            <label htmlFor="review-content" className="block text-sm font-semibold mb-2">
              Nội dung đánh giá <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review-content"
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
              placeholder="Chia sẻ trải nghiệm của bạn về địa điểm này..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent resize-none"
              rows={5}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">Thêm ảnh</label>
            <div className="space-y-3">
              <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-brand-teal/30 rounded-lg cursor-pointer hover:border-brand-teal hover:bg-brand-light/10 transition-colors">
                <Upload className="w-5 h-5 mr-2 text-brand-teal" />
                <span className="text-sm text-brand-teal font-medium">Tải ảnh lên</span>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              {editingReviewId && existingImages.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Ảnh hiện tại ({existingImages.length - deleteImageIds.length}/{existingImages.length})
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {existingImages.map((image) => {
                      const isMarkedForDeletion = deleteImageIds.includes(image.id)
                      return (
                        <div
                          key={image.id}
                          className={`relative group rounded-lg overflow-hidden transition-all ${
                            isMarkedForDeletion
                              ? 'ring-2 ring-red-500 opacity-40'
                              : 'ring-2 ring-transparent hover:ring-brand-teal'
                          }`}
                        >
                          <ImageNext
                            src={image.url}
                            alt="Existing image"
                            width={96}
                            height={96}
                            className="w-full h-24 object-cover"
                          />

                          {/* Overlay when marked for deletion */}
                          {isMarkedForDeletion && (
                            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                              <span className="text-xs font-medium text-red-600 bg-white px-2 py-1 rounded">
                                Sẽ xóa
                              </span>
                            </div>
                          )}

                          {/* Delete/Restore button */}
                          <button
                            type="button"
                            onClick={() => toggleDeleteExistingImage(image.id)}
                            className={`absolute top-1 right-1 rounded-full p-1.5 shadow-md transition-all ${
                              isMarkedForDeletion
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100'
                            }`}
                            title={isMarkedForDeletion ? 'Khôi phục ảnh' : 'Đánh dấu xóa'}
                          >
                            {isMarkedForDeletion ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                              </svg>
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  {deleteImageIds.length > 0 && (
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      {deleteImageIds.length} ảnh sẽ bị xóa khi lưu
                    </p>
                  )}
                </div>
              )}

              {/* New Images Preview */}
              {previewImages.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Ảnh mới ({previewImages.length})</p>
                  <div className="grid grid-cols-4 gap-3">
                    {previewImages.map((preview, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-brand-teal transition-all"
                      >
                        <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Xóa ảnh"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCloseModal}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmitReview}
              disabled={isSubmitting || newReview.stars === 0 || newReview.content.trim() === ''}
              className="flex-1 px-6 py-3 bg-brand-teal text-white rounded-full hover:bg-brand-teal/90 font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? editingReviewId
                  ? 'Đang lưu...'
                  : 'Đang đăng...'
                : editingReviewId
                  ? 'Lưu thay đổi'
                  : 'Đăng đánh giá'}
            </button>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        visible={deleteDialog.open}
        onHide={() => setDeleteDialog({ open: false, reviewId: null })}
        header="Xóa đánh giá"
        style={{ width: '420px' }}
        className="delete-confirm-dialog"
        modal
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-700">Bạn có chắc muốn xóa đánh giá này? Hành động này không thể hoàn tác.</p>
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => setDeleteDialog({ open: false, reviewId: null })}
              disabled={isDeleting}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              onClick={confirmDeleteReview}
              disabled={isDeleting}
              className="px-5 py-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-50"
            >
              {isDeleting ? 'Đang xóa...' : 'Xóa'}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
