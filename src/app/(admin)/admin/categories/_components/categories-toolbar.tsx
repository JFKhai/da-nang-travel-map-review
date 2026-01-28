'use client'
import { Button } from 'primereact/button'
import { Plus } from 'lucide-react'

type Props = {
  onCreateNew: () => void
}

export default function CategoriesToolbar({ onCreateNew }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
      <Button onClick={onCreateNew} className="flex items-center gap-2 " severity="success">
        <Plus size={20} />
        Thêm danh mục
      </Button>
    </div>
  )
}
