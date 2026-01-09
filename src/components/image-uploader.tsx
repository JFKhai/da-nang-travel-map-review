'use client'

import { useState } from 'react'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Upload } from 'lucide-react'

type ImageItem = {
  id: string
  url: string
}

function SortableImage({ image, className }: { image: ImageItem; className?: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div className={`relative ${className}`}>
      {/* Placeholder - luôn hiển thị phía dưới */}
      <div
        className={`absolute inset-0 rounded-md border-2 border-dashed ${
          isOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <div className="flex h-full items-center justify-center text-sm font-medium">
          {isOver && <span className="text-blue-600">Drop here</span>}
        </div>
      </div>

      {/* Image đang được drag */}
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`relative cursor-move rounded-md border bg-white h-full ${isDragging ? 'ring-2 ring-blue-500 z-50' : 'z-10'}`}
      >
        <img src={image.url} alt="" className="h-full w-full object-cover rounded-md" />
      </div>
    </div>
  )
}

export default function ImageUploader({ imagesdata = [] }: { imagesdata?: ImageItem[] }) {
  const [images, setImages] = useState<ImageItem[]>(imagesdata)
  const [showAll, setShowAll] = useState(false)

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setImages((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id)
      const newIndex = items.findIndex((i) => i.id === over.id)
      return arrayMove(items, oldIndex, newIndex)
    })
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
    }))

    setImages((prev) => [...prev, ...newImages])
  }

  return (
    <div className="space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={images.map((i) => i.id)} strategy={rectSortingStrategy}>
          {!showAll ? (
            <div>
              <div className="flex justify-between grow-0 gap-4  items-center mb-4">
                <p className="self-end">Images</p>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {/* Image chính - slot 0 */}
                {images[0] && <SortableImage image={images[0]} className="col-span-2 row-span-2 h-[300px]" />}

                {/* Các ảnh còn lại - slots 1-3 */}
                {[1, 2, 3].map(
                  (index) =>
                    images[index] && (
                      <SortableImage key={images[index].id} image={images[index]} className="h-[140px]" />
                    ),
                )}

                {/* + more */}
                {images.length > 4 && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="flex h-[140px] items-center justify-center rounded-md border border-dashed text-gray-500 hover:bg-gray-50 hover:border-sky-600 hover:text-sky-600 transition-colors"
                  >
                    +{images.length - 4} more
                  </button>
                )}

                {/* Upload */}
                <label className="flex h-[140px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-sm text-gray-500 hover:bg-gray-50 hover:border-sky-600 hover:bg-sky-50 hover:border-2 group hover:text-sky-600">
                  <Upload className="group-hover:text-sky-600" /> Upload New Image
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
              </div>
            </div>
          ) : (
            // View đầy đủ - tất cả ảnh
            <div>
              <div className="flex justify-between grow-0 gap-4  items-center mb-4">
                <p className="self-end">Images</p>
                <button
                  onClick={() => setShowAll(false)}
                  className="text-sm shrink-0 text-white  p-2 bg-sky-600 rounded-md transition-colors hover:bg-sky-700"
                >
                  Show less
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {/* Image đầu tiên - chiếm 4 ô (2x2) */}
                {images[0] && <SortableImage image={images[0]} className="col-span-2 row-span-2 h-[300px]" />}

                {/* Các ảnh còn lại */}
                {images.slice(1).map((img) => (
                  <SortableImage key={img.id} image={img} className="h-[140px]" />
                ))}

                {/* Upload */}
                <label className="flex h-[140px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-sm text-gray-500 hover:bg-gray-50 hover:border-sky-600 hover:bg-sky-50 hover:border-2 group hover:text-sky-600">
                  <Upload className="group-hover:text-sky-600" /> Upload New Image
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
              </div>
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  )
}
