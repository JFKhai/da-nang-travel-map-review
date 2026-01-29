'use client'
import { useState, useCallback } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { CategoryType } from '@/lib/schemas/category.schema'
import { Edit, Trash } from 'lucide-react'
import CategoriesToolbar from '@/app/(admin)/admin/categories/_components/categories-toolbar'
import EditCategoryModal from '@/app/(admin)/admin/categories/_components/edit-category-modal'
import DeleteCategoryDialog from '@/app/(admin)/admin/categories/_components/delete-category-dialog'

type Props = {
  initialCategories: CategoryType[]
}

const emptyBodyTemplate = (field: keyof CategoryType) => {
  const EmptyBodyTemplate = (rowData: CategoryType) => {
    const value = rowData[field]
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-500">—</span>
    }
    if (value instanceof Date) {
      return <span>{new Date(value).toLocaleDateString('vi-VN')}</span>
    }
    return <span>{String(value)}</span>
  }
  EmptyBodyTemplate.displayName = `EmptyBodyTemplate_${String(field)}`
  return EmptyBodyTemplate
}

const iconBodyTemplate = (rowData: CategoryType) => {
  const iconClass = rowData.icon || 'pi-folder'
  return <i className={`pi ${iconClass} text-xl text-blue-600`}></i>
}

const ActionBodyTemplate = ({
  rowData,
  onEdit,
  onDelete,
}: {
  rowData: CategoryType
  onEdit: (category: CategoryType) => void
  onDelete: (category: CategoryType) => void
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onEdit(rowData)}
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
        title="Edit"
      >
        <Edit className="text-gray-600" size={18} />
      </button>
      <button
        onClick={() => onDelete(rowData)}
        className="p-2 rounded-full border border-red-300 hover:bg-red-50 transition-colors"
        title="Delete"
      >
        <Trash className="text-red-600" size={18} />
      </button>
    </div>
  )
}

export default function CategoriesTable({ initialCategories }: Props) {
  const [categories, setCategories] = useState<CategoryType[]>(initialCategories)
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState<CategoryType | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleEdit = useCallback((category: CategoryType) => {
    setEditingCategory(category)
    setShowEditModal(true)
  }, [])

  const handleDelete = useCallback((category: CategoryType) => {
    setDeletingCategory(category)
    setShowDeleteDialog(true)
  }, [])

  const handleCreateNew = useCallback(() => {
    setEditingCategory(null)
    setShowCreateModal(true)
  }, [])

  const handleSaveSuccess = (updatedCategory: CategoryType) => {
    if (editingCategory) {
      setCategories((prev) => prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
    } else {
      setCategories((prev) => [updatedCategory, ...prev])
    }
    setShowEditModal(false)
    setShowCreateModal(false)
  }

  const handleDeleteSuccess = () => {
    if (deletingCategory) {
      setCategories((prev) => prev.filter((cat) => cat.id !== deletingCategory.id))
    }
    setShowDeleteDialog(false)
  }

  return (
    <div className="space-y-4">
      <CategoriesToolbar onCreateNew={handleCreateNew} />

      <div className="bg-white rounded-lg shadow">
        <DataTable value={categories} className="p-datatable-sm" showGridlines>
          <Column field="name" header="Name" body={emptyBodyTemplate('name')} />
          <Column field="slug" header="Slug" body={emptyBodyTemplate('slug')} />
          <Column
            body={(rowData) => <ActionBodyTemplate rowData={rowData} onEdit={handleEdit} onDelete={handleDelete} />}
          />
        </DataTable>
      </div>

      {(showEditModal || showCreateModal) && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => {
            setShowEditModal(false)
            setShowCreateModal(false)
          }}
          onSaveSuccess={handleSaveSuccess}
        />
      )}

      {showDeleteDialog && deletingCategory && (
        <DeleteCategoryDialog
          category={deletingCategory}
          onClose={() => setShowDeleteDialog(false)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  )
}
