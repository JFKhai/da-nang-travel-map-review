'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePlaceBodySchema, CreatePlaceBodyType } from '@/lib/schemas/place.schema'
import { placeApiServerRequest } from '@/lib/api/server-api/place.api'
import { HttpError } from '@/lib/http'
import { useToast } from '@/components/providers/toast-provider'
import { CategoryMultiSelect } from '@/components/category-multiselect'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { X } from 'lucide-react'
import { CategoryType } from '@/lib/schemas/category.schema'

type Props = {
  visible: boolean
  onHide: () => void
  onSuccess: () => void
  availableCategories: CategoryType[]
}

export default function CreatePlaceModal({ visible, onHide, onSuccess, availableCategories }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<{ id: number; name: string; slug: string }[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const { showSuccess, showError } = useToast()

  const handleModalCategoryChange = (categories: { id: number; name: string; slug: string }[]) => {
    setSelectedCategories(categories)
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreatePlaceBodyType>({
    resolver: zodResolver(CreatePlaceBodySchema),
  })

  useEffect(() => {
    const categoryIds = selectedCategories.map((c) => c.id)
    setValue('categories', categoryIds)
    trigger('categories')
  }, [selectedCategories, setValue, trigger])

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

  const onSubmit = async (data: CreatePlaceBodyType) => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('slug', data.slug)
      formData.append('short_description', data.short_description || '')
      if (data.address) formData.append('address', data.address)
      formData.append('phone', data.phone || '')
      formData.append('website', data.website || '')
      formData.append('opening_hours', data.opening_hours || '')
      if (data.lat !== undefined) formData.append('lat', String(data.lat))
      if (data.lng !== undefined) formData.append('lng', String(data.lng))

      selectedCategories.forEach((category) => {
        formData.append('categories', String(category.id))
      })

      newImages.forEach((file) => {
        formData.append('images', file)
      })

      await placeApiServerRequest.createPlace(formData)
      showSuccess('Thành công', 'Tạo địa điểm thành công')
      onSuccess()
      onHide()
      reset()
      setSelectedCategories([])
      setNewImages([])
      setPreviewImages([])
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
      header="Tạo địa điểm mới"
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

          {/* Address (optional) */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Địa chỉ</label>
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

          {/* Latitude (optional) */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Vĩ độ</label>
            <input
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('lat', {
                valueAsNumber: true,
                setValueAs: (v) => (v === '' || Number.isNaN(v) ? undefined : v),
              })}
            />
            {errors.lat && <p className="mt-1 text-sm text-red-600">{errors.lat.message}</p>}
          </div>

          {/* Longitude (optional) */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Kinh độ</label>
            <input
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('lng', {
                valueAsNumber: true,
                setValueAs: (v) => (v === '' || Number.isNaN(v) ? undefined : v),
              })}
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
          <input type="hidden" {...register('categories')} />
          <CategoryMultiSelect
            availableCategories={availableCategories}
            selectedCategories={selectedCategories}
            setSelectedCategories={handleModalCategoryChange}
            placeholder="Chọn danh mục..."
          />
          {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories.message as string}</p>}
        </div>

        {/* Images Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Tải ảnh</label>
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
          <Button label="Tạo" type="button" loading={isLoading} onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </Dialog>
  )
}
