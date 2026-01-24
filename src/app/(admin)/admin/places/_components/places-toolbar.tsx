'use client'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { CategoryMultiSelect } from '@/components/category-multiselect'
import { CategoryType } from '@/lib/schemas/category.schema'
import { useState } from 'react'
import CreatePlaceModal from './create-place-modal'

type Props = {
  availableCategories: CategoryType[]
  selectedCategories: { id: number; name: string; slug: string }[]
  setSelectedCategories: (categories: { id: number; name: string; slug: string }[]) => void
  search: string
  onSearch: (query: string) => void
}

export default function PlacesToolbar({
  availableCategories,
  selectedCategories,
  setSelectedCategories,
  search,
  onSearch,
}: Props) {
  const [searchQuery, setSearchQuery] = useState(search)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreatePlace = () => {
    setShowCreateModal(true)
  }

  const handleCreateSuccess = () => {
    setShowCreateModal(false)
    window.location.reload()
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex gap-2">
            <InputText
              placeholder="Search... "
              className="flex-1 md:min-w-[360px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch(searchQuery)}
            />
            <Button label="Search" className="p-button-primary" onClick={(e) => onSearch(searchQuery)} />
          </div>
          <CategoryMultiSelect
            availableCategories={availableCategories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            className="md:min-w-[300px]"
          />
        </div>
        <div className="flex gap-2 self-end md:self-auto">
          <Button label="Create" severity="success" onClick={handleCreatePlace} />
        </div>
      </div>
      <CreatePlaceModal
        visible={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
        availableCategories={availableCategories}
      />
    </>
  )
}
