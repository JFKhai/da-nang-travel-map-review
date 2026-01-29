'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdatePlaceBodySchema, UpdatePlaceBodyType, PlaceWithRelations } from '@/lib/schemas/place.schema'
import { placeApiServerRequest } from '@/lib/api/server-api/place.api'
import { HttpError } from '@/lib/http'
import { useToast } from '@/components/providers/toast-provider'
import { CategoryMultiSelect } from '@/components/category-multiselect'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import Image from 'next/image'
import { X } from 'lucide-react'
import { CategoryType } from '@/lib/schemas/category.schema'

type Props = {
  place: PlaceWithRelations | null
  visible: boolean
  onHide: () => void
  onSuccess: () => void
  availableCategories: CategoryType[]
}

export default function EditPlaceModal({ place, visible, onHide, onSuccess, availableCategories }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<{ id: number; name: string; slug: string }[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([])
  const { showSuccess, showError } = useToast()

  const handleModalCategoryChange = (categories: { id: number; name: string; slug: string }[]) => {
    setSelectedCategories(categories)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<UpdatePlaceBodyType>({
    resolver: zodResolver(UpdatePlaceBodySchema),
  })

  useEffect(() => {
    if (place) {
      setValue('name', place.name)
      setValue('slug', place.slug)
      setValue('short_description', place.short_description || '')
      setValue('address', place.address || '')
      setValue('phone', place.phone || '')
      setValue('website', place.website || '')
      setValue('opening_hours', place.opening_hours || '')
      setValue('lat', place.lat || 0)
      setValue('lng', place.lng || 0)
      setValue(
        'categories',
        place.categories.map((c) => c.id),
      )

      setSelectedCategories(place.categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })))
      setNewImages([])
      setPreviewImages([])
      setDeleteImageIds([])
    }
  }, [place, setValue])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const fileArray = Array.from(files)
    setNewImages((prev) => [...prev, ...fileArray])

    fileArray.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImages((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleDeleteImage = (imageId: number) => {
    setDeleteImageIds((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const onSubmit = async (data: UpdatePlaceBodyType) => {
    if (isLoading || !place) return

    if (selectedCategories.length === 0) {
      showError('Lỗi', 'Vui lòng chọn ít nhất 1 danh mục')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('slug', data.slug)
      formData.append('short_description', data.short_description || '')
      formData.append('address', data.address || '')
      formData.append('phone', data.phone || '')
      formData.append('website', data.website || '')
      formData.append('opening_hours', data.opening_hours || '')
      formData.append('lat', String(data.lat))
      formData.append('lng', String(data.lng))

      selectedCategories.forEach((category) => {
        formData.append('categories', String(category.id))
      })

      newImages.forEach((file) => {
        formData.append('images', file)
      })

      if (deleteImageIds.length > 0) {
        formData.append('deleteImages', JSON.stringify(deleteImageIds))
      }

      await placeApiServerRequest.updatePlace(place.id, formData)
      showSuccess('Thành công', 'Cập nhật địa điểm thành công')
      onSuccess()
      onHide()
      reset()
    } catch (error: any) {
      if (error instanceof HttpError) {
        showError('Lỗi', error.data?.message || 'Có lỗi xảy ra')
      } else {
        showError('Lỗi', 'Vui lòng kiểm tra lại thông tin')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={`Chỉnh sửa địa điểm: ${place?.name || ''}`}
      modal
      style={{ width: '90vw', maxWidth: '800px' }}
      className="p-4"
    >
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Tên địa điểm *</label>
            <input
              type="text"
              placeholder="Tên địa điểm"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('name')}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Slug *</label>
            <input
              type="text"
              placeholder="slug"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('slug')}
            />
            {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Địa chỉ *</label>
            <input
              type="text"
              placeholder="Địa chỉ"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('address')}
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Số điện thoại</label>
            <input
              type="text"
              placeholder="Số điện thoại"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('phone')}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Website</label>
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('website')}
            />
            {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>}
          </div>

          {/* Opening Hours */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Giờ mở cửa *</label>
            <input
              type="text"
              placeholder="9:00 - 17:00"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('opening_hours')}
            />
            {errors.opening_hours && <p className="mt-1 text-sm text-red-600">{errors.opening_hours.message}</p>}
          </div>

          {/* Latitude */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Vĩ độ *</label>
            <input
              type="number"
              step="0.0000001"
              placeholder="16.0471"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('lat', { valueAsNumber: true })}
            />
            {errors.lat && <p className="mt-1 text-sm text-red-600">{errors.lat.message}</p>}
          </div>

          {/* Longitude */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Kinh độ *</label>
            <input
              type="number"
              step="0.0000001"
              placeholder="108.2145"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('lng', { valueAsNumber: true })}
            />
            {errors.lng && <p className="mt-1 text-sm text-red-600">{errors.lng.message}</p>}
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Mô tả ngắn</label>
          <textarea
            placeholder="Mô tả ngắn về địa điểm"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
            {...register('short_description')}
          />
          {errors.short_description && <p className="mt-1 text-sm text-red-600">{errors.short_description.message}</p>}
        </div>

        {/* Danh mục */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Danh mục *</label>
          <CategoryMultiSelect
            availableCategories={availableCategories}
            selectedCategories={selectedCategories}
            setSelectedCategories={handleModalCategoryChange}
            placeholder="Chọn danh mục..."
          />
          {selectedCategories.length === 0 && (
            <p className="mt-1 text-sm text-red-600">Vui lòng chọn ít nhất 1 danh mục</p>
          )}
        </div>

        {/* Existing Images */}
        {place && place.images.length > 0 && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Ảnh hiện có</label>
            <div className="grid grid-cols-4 gap-4">
              {place.images.map((image) => (
                <div
                  key={image.id}
                  className={`relative border-2 rounded-md overflow-hidden ${
                    deleteImageIds.includes(image.id)
                      ? 'border-red-500 opacity-50'
                      : 'border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <Image src={image.url} alt="place" width={200} height={200} className="w-full h-40 object-cover" />
                  <button
                    type="button"
                    onClick={() => toggleDeleteImage(image.id)}
                    className={`absolute top-1 right-1 p-1 rounded-full ${
                      deleteImageIds.includes(image.id) ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-100'
                    }`}
                    title={deleteImageIds.includes(image.id) ? 'Khôi phục' : 'Xóa'}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Tải ảnh mới</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border-2 border-dashed rounded-md px-4 py-6 text-center cursor-pointer hover:bg-gray-50"
          />
          {previewImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative border-2 border-gray-200 rounded-md overflow-hidden">
                  <img src={image} alt={`preview-${index}`} className="w-full h-40 object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button label="Hủy" severity="secondary" type="button" onClick={onHide} disabled={isLoading} />
          <Button label="Cập nhật" type="button" loading={isLoading} onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </Dialog>
  )
}
