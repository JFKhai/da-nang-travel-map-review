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
  image: string | null
}

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
    image: null,
  }

  const [places, setPlaces] = useState<Place[]>([
    {
      id: '1',
      slug: 'eiffel-tower',
      name: 'Eiffel Tower',
      description: 'Iconic iron lattice tower on the Champ de Mars in Paris, France',
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
      website: 'https://www.toureiffel.paris',
      openingHours: 'Daily: 9:30 AM - 11:45 PM',
      lat: 48.8584,
      lng: 2.2945,
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400',
    },
    {
      id: '2',
      slug: 'grand-canyon',
      name: 'Grand Canyon',
      description: 'Steep-sided canyon carved by the Colorado River in Arizona',
      address: 'Grand Canyon National Park, Arizona, USA',
      website: 'https://www.nps.gov/grca',
      openingHours: '24 hours',
      lat: 36.1069,
      lng: -112.1129,
      image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400',
    },
    {
      id: '3',
      slug: 'taj-mahal',
      name: 'Taj Mahal',
      description: 'Ivory-white marble mausoleum on the right bank of the river Yamuna',
      address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
      website: 'https://www.tajmahal.gov.in',
      openingHours: 'Sat-Thu: 6:00 AM - 6:30 PM (Closed on Fridays)',
      lat: 27.1751,
      lng: 78.0421,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400',
    },
    {
      id: '4',
      slug: 'colosseum',
      name: 'Colosseum',
      description: 'Ancient amphitheatre in the centre of Rome, Italy',
      address: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
      website: 'https://colosseo.it',
      openingHours: 'Daily: 9:00 AM - 7:00 PM',
      lat: 41.8902,
      lng: 12.4922,
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
    },
    {
      id: '5',
      slug: 'great-wall-china',
      name: 'Great Wall of China',
      description: 'Series of fortifications built across northern China',
      address: 'Huairou District, China',
      website: 'https://www.travelchinaguide.com/china_great_wall',
      openingHours: 'Daily: 7:00 AM - 6:00 PM',
      lat: 40.4319,
      lng: 116.5704,
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400',
    },
    {
      id: '6',
      slug: 'machu-picchu',
      name: 'Machu Picchu',
      description: '15th-century Inca citadel in the Eastern Cordillera of southern Peru',
      address: 'Aguas Calientes, Cusco Region, Peru',
      website: 'https://www.machupicchu.gob.pe',
      openingHours: 'Daily: 6:00 AM - 5:30 PM',
      lat: -13.1631,
      lng: -72.545,
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400',
    },
    {
      id: '7',
      slug: 'statue-of-liberty',
      name: 'Statue of Liberty',
      description: 'Colossal neoclassical sculpture on Liberty Island in New York Harbor',
      address: 'Liberty Island, New York, NY 10004, USA',
      website: 'https://www.nps.gov/stli',
      openingHours: 'Daily: 9:00 AM - 5:00 PM',
      lat: 40.6892,
      lng: -74.0445,
      image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400',
    },
    {
      id: '8',
      slug: 'sydney-opera-house',
      name: 'Sydney Opera House',
      description: 'Multi-venue performing arts centre in Sydney, Australia',
      address: 'Bennelong Point, Sydney NSW 2000, Australia',
      website: 'https://www.sydneyoperahouse.com',
      openingHours: 'Daily: 9:00 AM - 8:30 PM',
      lat: -33.8568,
      lng: 151.2153,
      image: 'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?w=400',
    },
    {
      id: '9',
      slug: 'big-ben',
      name: 'Big Ben',
      description: 'Clock tower at the north end of the Palace of Westminster in London',
      address: 'Westminster, London SW1A 0AA, United Kingdom',
      website: 'https://www.parliament.uk/bigben',
      openingHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      lat: 51.5007,
      lng: -0.1246,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
    },
    {
      id: '10',
      slug: 'christ-the-redeemer',
      name: 'Christ the Redeemer',
      description: 'Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil',
      address: 'Parque Nacional da Tijuca, Alto da Boa Vista, Rio de Janeiro, Brazil',
      website: 'https://cristoredentoroficial.com.br',
      openingHours: 'Daily: 8:00 AM - 7:00 PM',
      lat: -22.9519,
      lng: -43.2105,
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400',
    },
  ])
  const [placeDialog, setPlaceDialog] = useState<boolean>(false)
  const [deletePlaceDialog, setDeletePlaceDialog] = useState<boolean>(false)
  const [deletePlacesDialog, setDeletePlacesDialog] = useState<boolean>(false)
  const [place, setPlace] = useState<Place>(emptyPlace)
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([])
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
        _place.image = 'place-placeholder.jpg'
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
      <div className="flex flex-wrap gap-2">
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedPlaces || !selectedPlaces.length}
        />
      </div>
    )
  }

  const rightToolbarTemplate = () => {
    return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
  }

  const imageBodyTemplate = (rowData: Place) => {
    return (
      <img
        src={rowData.image || '/images/place-placeholder.jpg'}
        alt={rowData.name}
        className="shadow-2 border-round"
        style={{ width: '64px', height: '64px', objectFit: 'cover' }}
      />
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

  const header = (
    <div className="flex flex-wrap gap-2  align-items-center justify-between">
      <h4 className="m-0 my-auto">Manage Places</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Search..."
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            setGlobalFilter(target.value)
          }}
        />
      </IconField>
    </div>
  )
  const placeDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={savePlace} />
    </React.Fragment>
  )
  const deletePlaceDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePlaceDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deletePlace} />
    </React.Fragment>
  )
  const deletePlacesDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePlacesDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedPlaces} />
    </React.Fragment>
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
          header={header}
          selectionMode="multiple"
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="slug" header="Slug" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="image" header="Image" body={imageBodyTemplate}></Column>
          <Column field="address" header="Address" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="website" header="Website" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="openingHours" header="Opening Hours" sortable style={{ minWidth: '12rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>

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
        {place.image && (
          <img
            src={place.image}
            alt={place.name}
            className="place-image block m-auto pb-3"
            style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover' }}
          />
        )}
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
        <div className="formgrid grid">
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
        <div className="field">
          <label htmlFor="image" className="font-bold">
            Image URL
          </label>
          <InputText
            id="image"
            value={place.image || ''}
            onChange={(e) => onInputChange(e, 'image')}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </Dialog>

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
