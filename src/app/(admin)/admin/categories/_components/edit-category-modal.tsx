'use client'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryType, CreateCategoryBodySchema, UpdateCategoryBodySchema } from '@/lib/schemas/category.schema'
import { categoryApiServerRequest } from '@/lib/api/server-api/category.api'
import { useToast } from '@/components/providers/toast-provider'

type CreateFormData = {
  name: string
  slug: string
  icon?: string
}

type Props = {
  category: CategoryType | null
  onClose: () => void
  onSaveSuccess: (category: CategoryType) => void
}

export default function EditCategoryModal({ category, onClose, onSaveSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useToast()
  const isEditing = !!category

  const schema = isEditing ? UpdateCategoryBodySchema : CreateCategoryBodySchema

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name || '',
      slug: category?.slug || '',
    },
  })

  const onSubmit = async (data: CreateFormData) => {
    setLoading(true)
    try {
      let result
      if (isEditing) {
        result = await categoryApiServerRequest.update(category!.id, data)
      } else {
        result = await categoryApiServerRequest.create(data)
      }

      showSuccess(isEditing ? 'Cập nhật danh mục thành công' : 'Tạo danh mục thành công')

      onSaveSuccess(result.data)
    } catch (error: any) {
      showError(isEditing ? 'Cập nhật danh mục thất bại' : 'Tạo danh mục thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog
        visible={true}
        onHide={onClose}
        header={isEditing ? 'Chỉnh sửa danh mục' : 'Tạo danh mục mới'}
        modal
        style={{ width: '90vw', maxWidth: '500px' }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tên danh mục</label>
            <InputText
              {...register('name')}
              className={`w-full ${errors.name ? 'p-invalid' : ''}`}
              placeholder="Nhập tên danh mục"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <InputText {...register('slug')} className={`w-full ${errors.slug ? 'p-invalid' : ''}`} />
            {errors.slug && <span className="text-red-500 text-sm">{errors.slug.message}</span>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button label="Hủy" severity="secondary" onClick={onClose} disabled={loading} />
            <Button type="submit" label={isEditing ? 'Cập nhật' : 'Tạo mới'} loading={loading} />
          </div>
        </form>
      </Dialog>
    </>
  )
}
