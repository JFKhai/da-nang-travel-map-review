import { Suspense } from 'react'
import { categoryApiServerRequest } from '@/lib/api/server-api/category.api'
import CategoriesTable from './_components/categories-table'
import { CategoryType } from '@/lib/schemas/category.schema'

async function CategoriesContent() {
  let categories: CategoryType[] = []

  try {
    const response = await categoryApiServerRequest.getAll()
    categories = response.data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }

  return <CategoriesTable initialCategories={categories} />
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
      <CategoriesContent />
    </Suspense>
  )
}
