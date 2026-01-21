// app/(admin)/admin/places/_components/skeleton.tsx
import { Skeleton } from 'primereact/skeleton'

export default function PlacesSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton height="3rem" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} height="2.5rem" />
      ))}
    </div>
  )
}
