'use client'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { PlaceWithRelations } from '@/lib/schemas/place.schema'
import { placeApiServerRequest } from '@/lib/api/server-api/place.api'
import { useToast } from '@/components/providers/toast-provider'
import { AlertCircle } from 'lucide-react'

type Props = {
  place: PlaceWithRelations | null
  visible: boolean
  onHide: () => void
  onSuccess: () => void
}

export default function DeletePlaceDialog({ place, visible, onHide, onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const { showSuccess, showError } = useToast()

  const handleDelete = async () => {
    if (!place) return

    setIsLoading(true)
    try {
      await placeApiServerRequest.deletePlace(place.id)
      showSuccess('Place deleted successfully')
      onHide()
      onSuccess()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete place'
      showError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="Delete Place"
      modal
      style={{ width: '32rem' }}
      className="border-red-200"
    >
      <div className="flex gap-3 mb-4">
        <div className="flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Delete &quot;{place?.name}&quot;</h3>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this place? This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button label="Cancel" severity="secondary" onClick={onHide} disabled={isLoading} />
        <Button label="Delete" severity="danger" onClick={handleDelete} loading={isLoading} disabled={isLoading} />
      </div>
    </Dialog>
  )
}
