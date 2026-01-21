'use client'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'
import { PaginationType } from '@/lib/schemas/pagination.schema'
import PlacesToolbar from '@/app/(admin)/admin/places/_components/places-toolbar'
import EditPlaceModal from '@/app/(admin)/admin/places/_components/edit-place-modal'
import DeletePlaceDialog from '@/app/(admin)/admin/places/_components/delete-place-dialog'
import Image from 'next/image'
import { Edit, Trash } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { GetPlacesParams } from '@/lib/api/server-api/place.api'
import { Paginator } from 'primereact/paginator'
import { categoryApiServerRequest } from '@/lib/api/server-api/category.api'
import { CategoryType } from '@/lib/schemas/category.schema'

type Props = {
  places: PlaceWithRelations[]
  pagination: PaginationType
  categories: string[]
  search: string
}

const emptyBodyTemplate = (field: keyof PlaceWithRelations) => {
  const EmptyBodyTemplate = (rowData: PlaceWithRelations) => {
    const value = rowData[field]
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-500">—</span>
    }
    if (value instanceof Date) {
      return <span>{value.toLocaleString()}</span>
    }
    if (typeof value === 'object') {
      return <span>{JSON.stringify(value)}</span>
    }
    return <span>{String(value)}</span>
  }
  EmptyBodyTemplate.displayName = `EmptyBodyTemplate_${String(field)}`
  return EmptyBodyTemplate
}

const imageBodyTemplate = (rowData: PlaceWithRelations) => {
  return (
    <Image
      src={(rowData.coverImage && rowData.coverImage.url) || '/images/place-placeholder.jpg'}
      alt={rowData.name}
      className="shadow-2 border-round"
      width={64}
      height={64}
      style={{ width: '64px', height: '64px', objectFit: 'cover' }}
    />
  )
}

const categoriesBodyTemplate = (rowData: PlaceWithRelations) => {
  return (
    <div className="flex items-start flex-wrap min-w-[200px] gap-1">
      {rowData.categories.map((cat) => (
        <span key={cat.id} className="mr-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs shrink-0">
          {cat.name}
        </span>
      ))}
    </div>
  )
}

const ActionBodyTemplate = ({
  rowData,
  onEdit,
  onDelete,
}: {
  rowData: PlaceWithRelations
  onEdit: (place: PlaceWithRelations) => void
  onDelete: (place: PlaceWithRelations) => void
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onEdit(rowData)}
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
        title="Edit"
      >
        <Edit className="text-gray-600" />
      </button>
      <button
        onClick={() => onDelete(rowData)}
        className="p-2 rounded-full border border-red-300 hover:bg-red-50 transition-colors"
        title="Delete"
      >
        <Trash className="text-red-600" />
      </button>
    </div>
  )
}

export default function PlacesTable({ places, pagination, categories, search }: Props) {
  const [selectedPlaces, setSelectedPlaces] = useState<PlaceWithRelations[]>([])
  const [editingPlace, setEditingPlace] = useState<PlaceWithRelations | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deletingPlace, setDeletingPlace] = useState<PlaceWithRelations | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [allCategories, setAllCategories] = useState<CategoryType[]>([])

  const searchParams = useSearchParams()
  const router = useRouter()

  const first = (pagination.currentPage - 1) * pagination.itemsPerPage

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApiServerRequest.getAll()
        setAllCategories(response.data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const selectedCategories = useMemo(() => {
    if (!allCategories.length) return []

    return categories
      .map((catSlug) => {
        const category = allCategories.find((cat) => cat.slug === catSlug)
        return category ? { id: category.id, name: category.name, slug: category.slug } : null
      })
      .filter((cat): cat is { id: number; name: string; slug: string } => cat !== null)
  }, [allCategories, categories])

  const updateURL = useCallback(
    (params: GetPlacesParams) => {
      const newParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, String(value))
        } else {
          newParams.delete(key)
        }
      })

      router.push(`?${newParams.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const onPageChange = (event: { first: number; rows: number }) => {
    const newPage = Math.floor(event.first / event.rows) + 1
    updateURL({
      page: newPage,
      limit: event.rows,
    })
  }

  const handleCategoryChange = useCallback(
    (cats: { id: number; name: string; slug: string }[]) => {
      updateURL({
        category: cats.map((c) => c.slug).join(','),
        page: 1,
      })
    },
    [updateURL],
  )

  const handleSearch = useCallback(
    (query: string) => {
      updateURL({
        search: query,
        category: selectedCategories.map((c) => c.slug).join(','),
        page: 1,
      })
    },
    [updateURL, selectedCategories],
  )

  const handleEditPlace = (place: PlaceWithRelations) => {
    setEditingPlace(place)
    setShowEditModal(true)
  }

  const handleDeletePlace = (place: PlaceWithRelations) => {
    setDeletingPlace(place)
    setShowDeleteDialog(true)
  }

  const handleEditSuccess = () => {
    router.refresh()
  }

  return (
    <>
      <PlacesToolbar
        availableCategories={allCategories}
        selectedPlaces={selectedPlaces}
        selectedCategories={selectedCategories}
        setSelectedCategories={handleCategoryChange}
        search={search}
        onSearch={handleSearch}
      />

      <DataTable
        value={places}
        dataKey="id"
        size="small"
        showGridlines
        rows={pagination.itemsPerPage}
        totalRecords={pagination.totalItems}
        first={first}
        selection={selectedPlaces}
        onSelectionChange={(e) => {
          if (Array.isArray(e.value)) setSelectedPlaces(e.value)
        }}
        selectionMode="multiple"
        className="text-[15px]"
      >
        <Column selectionMode="multiple" />
        <Column field="slug" header="Slug" style={{ minWidth: '12rem' }}></Column>
        <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
        <Column header="Image" body={imageBodyTemplate} exportField="imagesExport" field="imagesExport"></Column>
        <Column
          header="Categories"
          body={categoriesBodyTemplate}
          exportField="categoriesExport"
          field="categoriesExport"
        ></Column>
        <Column field="address" header="Address" style={{ minWidth: '16rem' }}></Column>
        <Column field="reviewCount" header="Review" sortable></Column>
        <Column field="averageRating" header="Rating" sortable></Column>
        <Column field="phone" header="Phone" style={{ minWidth: '12rem' }} body={emptyBodyTemplate('phone')}></Column>
        <Column
          field="website"
          header="Website"
          style={{ minWidth: '12rem' }}
          body={emptyBodyTemplate('website')}
        ></Column>
        <Column
          field="opening_hours"
          header="Opening Hours"
          style={{ minWidth: '12rem' }}
          body={emptyBodyTemplate('opening_hours')}
        ></Column>
        <Column
          body={(rowData) => (
            <ActionBodyTemplate rowData={rowData} onEdit={handleEditPlace} onDelete={handleDeletePlace} />
          )}
          exportable={false}
          style={{ minWidth: '12rem' }}
        ></Column>
      </DataTable>
      <Paginator
        first={first}
        rows={pagination.itemsPerPage}
        totalRecords={pagination.totalItems}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={onPageChange}
        className="border-none"
      />

      <EditPlaceModal
        place={editingPlace}
        visible={showEditModal}
        onHide={() => {
          setShowEditModal(false)
          setEditingPlace(null)
        }}
        onSuccess={handleEditSuccess}
        availableCategories={allCategories}
      />

      <DeletePlaceDialog
        place={deletingPlace}
        visible={showDeleteDialog}
        onHide={() => {
          setShowDeleteDialog(false)
          setDeletingPlace(null)
        }}
        onSuccess={handleEditSuccess}
      />
    </>
  )
}
