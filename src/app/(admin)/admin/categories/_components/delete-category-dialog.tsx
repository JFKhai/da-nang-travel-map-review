'use client'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CategoryType } from '@/lib/schemas/category.schema'
import { categoryApiServerRequest } from '@/lib/api/server-api/category.api'
import { useToast } from '@/components/providers/toast-provider'

type Props = {
  category: CategoryType
  onClose: () => void
  onDeleteSuccess: () => void
}

export default function DeleteCategoryDialog({ category, onClose, onDeleteSuccess }: Props) {
  const { showSuccess, showError } = useToast()
  const [loading, setLoading] = useState(false)

  const handleConfirmDelete = async () => {
    setLoading(true)
    try {
      await categoryApiServerRequest.delete(category.id)

      showSuccess('Xóa danh mục thành công')

      onDeleteSuccess()
    } catch (error: any) {
      showError('Xóa danh mục thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog visible={true} onHide={onClose} header="Xác nhận xóa" modal style={{ width: '90vw', maxWidth: '400px' }}>
        <div className="space-y-4">
          <p className="text-gray-700">
            Bạn có chắc chắn muốn xóa danh mục <strong>&quot;{category.name}&quot;</strong>?
          </p>
          <p className="text-sm text-gray-500">
            Hành động này không thể hoàn tác. Tất cả các địa điểm liên kết với danh mục này sẽ mất liên kết.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <Button label="Hủy" severity="secondary" onClick={onClose} disabled={loading} />
            <Button label="Xóa" severity="danger" onClick={handleConfirmDelete} loading={loading} />
          </div>
        </div>
      </Dialog>
    </>
  )
}
