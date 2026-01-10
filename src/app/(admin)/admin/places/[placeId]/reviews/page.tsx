'use client'

import { useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Rating } from 'primereact/rating'
import { Tag } from 'primereact/tag'
import { Trash2, Eye, Star, Search } from 'lucide-react'
import { classNames } from 'primereact/utils'
import { MultiSelect } from 'primereact/multiselect'

type Props = {
  params: { placeId: string }
}

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  status: 'ACTIVE' | 'HIDDEN'
  createdAt: string
}

// Mock data
const mockReviews: Review[] = [
  {
    id: 1,
    user: 'Nguyen Van A',
    rating: 4,
    comment: 'Địa điểm rất ổn, view đẹp, nhân viên nhiệt tình',
    status: 'ACTIVE',
    createdAt: '2026-01-08',
  },
  {
    id: 2,
    user: 'Tran Thi B',
    rating: 5,
    comment: 'Rất tuyệt vời, sẽ quay lại lần nữa',
    status: 'HIDDEN',
    createdAt: '2026-01-07',
  },
  {
    id: 3,
    user: 'Le Van C',
    rating: 3,
    comment: 'Tạm ổn, giá hơi cao',
    status: 'ACTIVE',
    createdAt: '2026-01-06',
  },
  {
    id: 4,
    user: 'Pham Thi D',
    rating: 5,
    comment: 'Tuyệt vời! Phong cảnh đẹp, đồ ăn ngon',
    status: 'ACTIVE',
    createdAt: '2026-01-05',
  },
  {
    id: 5,
    user: 'Hoang Van E',
    rating: 2,
    comment: 'Không như mong đợi',
    status: 'HIDDEN',
    createdAt: '2026-01-04',
  },
]

export default function PlaceReviewsPage({ params }: Props) {
  const placeId = params.placeId
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [selectedReviews, setSelectedReviews] = useState<Review[]>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [reviewDialog, setReviewDialog] = useState<boolean>(false)
  const [deleteReviewDialog, setDeleteReviewDialog] = useState<boolean>(false)
  const [deleteReviewsDialog, setDeleteReviewsDialog] = useState<boolean>(false)
  const [review, setReview] = useState<Review | null>(null)
  const toast = useRef<Toast>(null)
  const dt = useRef<DataTable<Review[]>>(null)
  const [selectedNumbeOfStar, setSelectedNumbeOfStar] = useState<(1 | 2 | 3 | 4 | 5)[]>([])

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  const totalReviews = reviews.length

  const exportCSV = () => {
    dt.current?.exportCSV()
  }

  const confirmDeleteSelected = () => {
    setDeleteReviewsDialog(true)
  }

  const hideDialog = () => {
    setReviewDialog(false)
    setReview(null)
  }

  const hideDeleteReviewDialog = () => {
    setDeleteReviewDialog(false)
    setReview(null)
  }

  const hideDeleteReviewsDialog = () => {
    setDeleteReviewsDialog(false)
  }

  const viewReview = (review: Review) => {
    setReview({ ...review })
    setReviewDialog(true)
  }

  const confirmDeleteReview = (review: Review) => {
    setReview(review)
    setDeleteReviewDialog(true)
  }

  const deleteReview = () => {
    if (review) {
      const _reviews = reviews.filter((val) => val.id !== review.id)
      setReviews(_reviews)
      setDeleteReviewDialog(false)
      setReview(null)
      toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Review Deleted', life: 3000 })
    }
  }

  const deleteSelectedReviews = () => {
    const _reviews = reviews.filter((val) => !selectedReviews.includes(val))
    setReviews(_reviews)
    setDeleteReviewsDialog(false)
    setSelectedReviews([])
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Reviews Deleted', life: 3000 })
  }

  const toggleStatus = (review: Review) => {
    const _reviews = reviews.map((r) => {
      if (r.id === review.id) {
        return { ...r, status: r.status === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE' } as Review
      }
      return r
    })
    setReviews(_reviews)
    toast.current?.show({
      severity: 'info',
      summary: 'Status Updated',
      detail: `Review ${review.status === 'ACTIVE' ? 'hidden' : 'activated'}`,
      life: 3000,
    })
  }

  const leftToolbarTemplate = () => {
    return (
      <div className="flex gap-4 items-center">
        <InputText
          placeholder="Search reviews..."
          id="search"
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            setGlobalFilter(target.value)
          }}
        />
        <Button className="p-button-primary flex items-center gap-2">
          <Search /> Search
        </Button>
        <MultiSelect
          value={selectedNumbeOfStar}
          onChange={(e) => setSelectedNumbeOfStar(e.value)}
          options={[1, 2, 3, 4, 5]}
          placeholder="Select number of star"
          className="min-w-[200px]"
        />
      </div>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedReviews || !selectedReviews.length}
        />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
      </div>
    )
  }

  const userBodyTemplate = (rowData: Review) => {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          {rowData.user.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium">{rowData.user}</span>
      </div>
    )
  }

  const ratingBodyTemplate = (rowData: Review) => {
    return (
      <div className="flex items-center gap-2">
        <Rating value={rowData.rating} readOnly cancel={false} />
        <span className="font-semibold">{rowData.rating}</span>
      </div>
    )
  }

  const statusBodyTemplate = (rowData: Review) => {
    return (
      <Tag
        value={rowData.status}
        severity={rowData.status === 'ACTIVE' ? 'success' : 'warning'}
        onClick={() => toggleStatus(rowData)}
        className="cursor-pointer"
      />
    )
  }

  const actionBodyTemplate = (rowData: Review) => {
    return (
      <div className="flex gap-2 items-center">
        <Button
          rounded
          outlined
          className="mr-2 p-2 aspect-square rounded-full"
          onClick={() => viewReview(rowData)}
          tooltip="View"
        >
          <Eye className="w-6" />
        </Button>
        <Button
          rounded
          outlined
          severity="danger"
          className="p-2 aspect-square rounded-full"
          onClick={() => confirmDeleteReview(rowData)}
          tooltip="Delete"
        >
          <Trash2 className="w-6" />
        </Button>
      </div>
    )
  }

  const reviewDialogFooter = (
    <div className="flex justify-end gap-4">
      <Button label="Close" icon="pi pi-times" outlined onClick={hideDialog} />
    </div>
  )

  const deleteReviewDialogFooter = (
    <div className="flex justify-end gap-4">
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteReviewDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteReview} />
    </div>
  )

  const deleteReviewsDialogFooter = (
    <div className="flex justify-end gap-4">
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteReviewsDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedReviews} />
    </div>
  )

  return (
    <div className="w-full">
      <Toast ref={toast} />
      <div className="">
        {/* Stats Card */}
        <div className="mb-6 p-6 bg-white rounded-lg  text-black">
          <div className="flex items-stretch gap-4">
            <p className="font-bold text-3xl">Công viên quốc gia 29/3</p>
            <div className="w-1 bg-black"></div>
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8 fill-yellow-300 text-yellow-300" />
              <div>
                <div className="text-3xl font-bold">{avgRating.toFixed(1)}</div>
                <div className="text-sm opacity-90">Average Rating</div>
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">{totalReviews}</div>
              <div className="text-sm opacity-90">Total Reviews</div>
            </div>
          </div>
        </div>

        {/* Toolbar and DataTable */}
        <div>
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            size="small"
            removableSort
            value={reviews}
            selection={selectedReviews}
            onSelectionChange={(e) => {
              if (Array.isArray(e.value)) {
                setSelectedReviews(e.value)
              }
            }}
            showGridlines
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} reviews"
            globalFilter={globalFilter}
            selectionMode="multiple"
          >
            <Column selectionMode="multiple" exportable={false}></Column>
            <Column header="User" body={userBodyTemplate} sortable field="user" style={{ minWidth: '12rem' }}></Column>
            <Column
              header="Rating"
              body={ratingBodyTemplate}
              sortable
              field="rating"
              style={{ minWidth: '12rem' }}
            ></Column>
            <Column field="comment" header="Comment" sortable style={{ minWidth: '20rem' }}></Column>
            <Column
              header="Status"
              body={statusBodyTemplate}
              sortable
              field="status"
              style={{ minWidth: '8rem' }}
            ></Column>
            <Column field="createdAt" header="Created At" sortable style={{ minWidth: '10rem' }}></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
          </DataTable>
        </div>
      </div>

      {/* View Review Dialog */}
      <Dialog
        visible={reviewDialog}
        style={{ width: '40rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Review Details"
        modal
        className="p-fluid"
        footer={reviewDialogFooter}
        onHide={hideDialog}
      >
        {review && (
          <div className="space-y-4">
            <div className="field">
              <label className="font-bold block mb-2">User</label>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg">
                  {review.user.charAt(0).toUpperCase()}
                </div>
                <span className="text-lg">{review.user}</span>
              </div>
            </div>
            <div className="field">
              <label className="font-bold block mb-2">Rating</label>
              <Rating value={review.rating} readOnly cancel={false} />
            </div>
            <div className="field">
              <label className="font-bold block mb-2">Comment</label>
              <p className="p-4 bg-gray-50 rounded border">{review.comment}</p>
            </div>
            <div className="field">
              <label className="font-bold block mb-2">Status</label>
              <Tag value={review.status} severity={review.status === 'ACTIVE' ? 'success' : 'warning'} />
            </div>
            <div className="field">
              <label className="font-bold block mb-2">Created At</label>
              <p>{review.createdAt}</p>
            </div>
          </div>
        )}
      </Dialog>

      {/* Delete Single Review Dialog */}
      <Dialog
        visible={deleteReviewDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteReviewDialogFooter}
        onHide={hideDeleteReviewDialog}
      >
        <div className="confirmation-content flex items-center gap-4">
          <i className="pi pi-exclamation-triangle text-red-500" style={{ fontSize: '2rem' }} />
          {review && (
            <span>
              Are you sure you want to delete review from <b>{review.user}</b>?
            </span>
          )}
        </div>
      </Dialog>

      {/* Delete Multiple Reviews Dialog */}
      <Dialog
        visible={deleteReviewsDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteReviewsDialogFooter}
        onHide={hideDeleteReviewsDialog}
      >
        <div className="confirmation-content flex items-center gap-4">
          <i className="pi pi-exclamation-triangle text-red-500" style={{ fontSize: '2rem' }} />
          <span>Are you sure you want to delete the selected reviews?</span>
        </div>
      </Dialog>
    </div>
  )
}
