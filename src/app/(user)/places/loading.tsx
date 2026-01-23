import { PlacesSkeleton } from './_components/places-skeleton'
import { Sidebar } from './_components/sidebar'

export default function PlacesLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5">
      {/* Main Content */}
      <div className="lg:col-span-8">
        <PlacesSkeleton />
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4">
        <Sidebar popularPlaces={[]} recommendedPlaces={[]} />
      </div>
    </div>
  )
}
