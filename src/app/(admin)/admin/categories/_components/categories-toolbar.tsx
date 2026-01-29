'use client'
import { Button } from 'primereact/button'
import { Plus } from 'lucide-react'

type Props = {
  onCreateNew: () => void
}

export default function CategoriesToolbar({ onCreateNew }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h1></h1>
      <Button onClick={onCreateNew} className="flex items-center gap-2 " severity="success">
        <Plus size={20} />
        Add
      </Button>
    </div>
  )
}
