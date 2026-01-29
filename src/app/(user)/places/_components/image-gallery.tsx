'use client'

import { Galleria } from 'primereact/galleria'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

interface ImageGalleryProps {
  coverImage: {
    url: string
  }
  images: Array<{
    id: number
    url: string
    caption?: string
  }>
  title: string
}

export default function ImageGallery({ coverImage, images, title }: ImageGalleryProps) {
  // Combine cover image with other images for gallery
  const allImages = [{ id: 0, url: coverImage.url, caption: title }, ...images]

  const itemTemplate = (item: { id: number; url: string; caption: string }) => {
    return <img src={item.url} alt={item.caption} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
  }

  const thumbnailTemplate = (item: { id: number; url: string; caption: string }) => {
    return <img src={item.url} alt={item.caption} style={{ width: '100px', height: '60px', objectFit: 'cover' }} />
  }

  return (
    <div className="mb-8">
      <Galleria
        value={allImages}
        numVisible={6}
        circular
        showItemNavigators
        showThumbnails
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        responsiveOptions={[
          {
            breakpoint: '1024px',
            numVisible: 5,
          },
          {
            breakpoint: '768px',
            numVisible: 3,
          },
          {
            breakpoint: '560px',
            numVisible: 2,
          },
        ]}
        style={{ maxWidth: '100%' }}
        className="rounded-2xl overflow-hidden"
      />
    </div>
  )
}
