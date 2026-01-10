'use client'
import React, { useState, useRef } from 'react'
import { classNames } from 'primereact/utils'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { InputTextarea } from 'primereact/inputtextarea'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { places } from '@/app/(admin)/admin/places/mock-data'
import ImageUploader from '@/components/image-uploader'
import Image from 'next/image'
import { CategoryMultiSelect } from '@/components/category-multiselect'
import { FloatLabel } from 'primereact/floatlabel'

type ImageItem = {
  id: string
  url: string
}

type Category = {
  id: string
  name: string
}
interface Place {
  id: string | null
  slug: string
  name: string
  description: string
  address: string
  website: string
  openingHours: string
  lat: number
  lng: number
  images?: ImageItem[]
  categories: Category[]
}

const data = places

export default function PlacesPage() {
  const emptyPlace: Place = {
    id: null,
    slug: '',
    name: '',
    description: '',
    address: '',
    website: '',
    openingHours: '',
    lat: 0,
    lng: 0,
    images: [],
    categories: [],
  }

  const dataWithExport = data.map((place) => ({
    ...place,
    imagesExport: place.images?.map((img) => img.url).join(', ') || '',
    categoriesExport: place.categories.map((cat) => cat.name).join(', ') || '',
  }))

  const [places, setPlaces] = useState<Place[]>(dataWithExport)
  const [placeDialog, setPlaceDialog] = useState<boolean>(false)
  const [deletePlaceDialog, setDeletePlaceDialog] = useState<boolean>(false)
  const [deletePlacesDialog, setDeletePlacesDialog] = useState<boolean>(false)
  const [place, setPlace] = useState<Place>(emptyPlace)
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([])
  const [searchSelectedCategories, setSearchSelectedCategories] = useState<Category[]>([])
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const toast = useRef<Toast>(null)
  const dt = useRef<DataTable<Place[]>>(null)

  const openNew = () => {
    setPlace(emptyPlace)
    setSubmitted(false)
    setPlaceDialog(true)
  }

  const hideDialog = () => {
    setSubmitted(false)
    setPlaceDialog(false)
  }

  const hideDeletePlaceDialog = () => {
    setDeletePlaceDialog(false)
  }

  const hideDeletePlacesDialog = () => {
    setDeletePlacesDialog(false)
  }

  const savePlace = () => {
    setSubmitted(true)

    if (place.name.trim()) {
      const _places = [...places]
      const _place = { ...place }

      if (place.id) {
        const index = findIndexById(place.id)

        _places[index] = _place
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Place Updated', life: 3000 })
      } else {
        _place.id = createId()
        _place.images = [
          {
            id: 'img' + _place.id,
            url: '/images/place-placeholder.jpg',
          },
        ]
        _places.push(_place)
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Place Created', life: 3000 })
      }

      setPlaces(_places)
      setPlaceDialog(false)
      setPlace(emptyPlace)
    }
  }

  const editPlace = (place: Place) => {
    setPlace({ ...place })
    setPlaceDialog(true)
  }

  const confirmDeletePlace = (place: Place) => {
    setPlace(place)
    setDeletePlaceDialog(true)
  }

  const deletePlace = () => {
    const _places = places.filter((val) => val.id !== place.id)

    setPlaces(_places)
    setDeletePlaceDialog(false)
    setPlace(emptyPlace)
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Place Deleted', life: 3000 })
  }

  const findIndexById = (id: string) => {
    let index = -1

    for (let i = 0; i < places.length; i++) {
      if (places[i].id === id) {
        index = i
        break
      }
    }

    return index
  }

  const createId = (): string => {
    let id = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return id
  }

  const exportCSV = () => {
    dt.current?.exportCSV()
  }

  const confirmDeleteSelected = () => {
    setDeletePlacesDialog(true)
  }

  const deleteSelectedPlaces = () => {
    const _places = places.filter((val) => !selectedPlaces.includes(val))

    setPlaces(_places)
    setDeletePlacesDialog(false)
    setSelectedPlaces([])
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Places Deleted', life: 3000 })
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const val = (e.target && e.target.value) || ''
    const _place = { ...place }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    _place[name] = val

    setPlace(_place)
  }

  const onInputTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, name: string) => {
    const val = (e.target && e.target.value) || ''
    const _place = { ...place }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    _place[name] = val

    setPlace(_place)
  }

  const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
    const val = e.value ?? 0
    const _place = { ...place }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    _place[name] = val

    setPlace(_place)
  }

  const leftToolbarTemplate = () => {
    return (
      <div className="flex gap-4">
        <InputText
          placeholder="Search..."
          id="search"
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            setGlobalFilter(target.value)
          }}
        />
        <Button label="Search" icon="pi pi-search" className="p-button-primary" />
        <CategoryMultiSelect
          className="max-w-[400px]"
          selectedCategories={searchSelectedCategories}
          setSelectedCategories={(categories) => {
            setSearchSelectedCategories(categories)
          }}
        />
      </div>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedPlaces || !selectedPlaces.length}
        />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
      </div>
    )
  }

  const imageBodyTemplate = (rowData: Place) => {
    return (
      <img
        src={(rowData.images && rowData.images[0].url) || '/images/place-placeholder.jpg'}
        alt={rowData.name}
        className="shadow-2 border-round"
        style={{ width: '64px', height: '64px', objectFit: 'cover' }}
      />
    )
  }

  const categoriesBodyTemplate = (rowData: Place) => {
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

  const actionBodyTemplate = (rowData: Place) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editPlace(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeletePlace(rowData)} />
      </React.Fragment>
    )
  }

  const placeDialogFooter = (
    <div className="flex justify-end gap-4">
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={savePlace} />
    </div>
  )
  const deletePlaceDialogFooter = (
    <div className="flex justify-end gap-4">
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePlaceDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deletePlace} />
    </div>
  )
  const deletePlacesDialogFooter = (
    <div className="flex justify-end gap-4">
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePlacesDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedPlaces} />
    </div>
  )

  return (
    <div>
      <Toast ref={toast} />
      <div>
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

        <DataTable
          ref={dt}
          size="small"
          value={places}
          selection={selectedPlaces}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedPlaces(e.value)
            }
          }}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} places"
          globalFilter={globalFilter}
          selectionMode="multiple"
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="slug" header="Slug" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
          <Column header="Image" body={imageBodyTemplate} exportField="imagesExport" field="imagesExport"></Column>
          <Column
            header="Categories"
            body={categoriesBodyTemplate}
            exportField="categoriesExport"
            field="categoriesExport"
          ></Column>

          <Column field="address" header="Address" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="website" header="Website" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="openingHours" header="Opening Hours" sortable style={{ minWidth: '12rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>

      {/* VIew details & edit */}
      <Dialog
        visible={placeDialog}
        style={{ width: '50rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Place Details"
        modal
        className="p-fluid"
        footer={placeDialogFooter}
        onHide={hideDialog}
      >
        <div className="space-y-2 ">
          <div className="field">
            <label htmlFor="slug" className="font-bold">
              Slug
            </label>
            <InputText
              id="slug"
              value={place.slug}
              onChange={(e) => onInputChange(e, 'slug')}
              required
              autoFocus
              className={classNames({ 'p-invalid': submitted && !place.slug })}
            />
            {submitted && !place.slug && <small className="p-error">Slug is required.</small>}
          </div>
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <InputText
              id="name"
              value={place.name}
              onChange={(e) => onInputChange(e, 'name')}
              required
              className={classNames({ 'p-invalid': submitted && !place.name })}
            />
            {submitted && !place.name && <small className="p-error">Name is required.</small>}
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <InputTextarea
              id="description"
              value={place.description}
              onChange={(e) => onInputTextAreaChange(e, 'description')}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div className="field">
            <label htmlFor="address" className="font-bold">
              Address
            </label>
            <InputText id="address" value={place.address} onChange={(e) => onInputChange(e, 'address')} />
          </div>
          {/* categories */}
          <div className="field">
            <label htmlFor="categories" className="font-bold">
              Categories
            </label>
            <CategoryMultiSelect
              selectedCategories={place.categories}
              setSelectedCategories={(categories) => {
                setPlace({ ...place, categories })
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="website" className="font-bold">
              Website
            </label>
            <InputText
              id="website"
              value={place.website}
              onChange={(e) => onInputChange(e, 'website')}
              placeholder="https://example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="openingHours" className="font-bold">
              Opening Hours
            </label>
            <InputText
              id="openingHours"
              value={place.openingHours}
              onChange={(e) => onInputChange(e, 'openingHours')}
              placeholder="e.g., Mon-Fri: 9AM-6PM"
            />
          </div>
          <div className="grid-cols-2 grid gap-4">
            <div className="field col">
              <label htmlFor="lat" className="font-bold">
                Latitude
              </label>
              <InputNumber
                id="lat"
                value={place.lat}
                onValueChange={(e) => onInputNumberChange(e, 'lat')}
                minFractionDigits={2}
                maxFractionDigits={6}
              />
            </div>
            <div className="field col">
              <label htmlFor="lng" className="font-bold">
                Longitude
              </label>
              <InputNumber
                id="lng"
                value={place.lng}
                onValueChange={(e) => onInputNumberChange(e, 'lng')}
                minFractionDigits={2}
                maxFractionDigits={6}
              />
            </div>
          </div>

          <ImageUploader imagesdata={place.images} />
        </div>
      </Dialog>

      {/* Xóa 1 row */}
      <Dialog
        visible={deletePlaceDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deletePlaceDialogFooter}
        onHide={hideDeletePlaceDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {place && (
            <span>
              Are you sure you want to delete <b>{place.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      {/* Xóa places đã chọn */}
      <Dialog
        visible={deletePlacesDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deletePlacesDialogFooter}
        onHide={hideDeletePlacesDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {place && <span>Are you sure you want to delete the selected places?</span>}
        </div>
      </Dialog>
    </div>
  )
}
