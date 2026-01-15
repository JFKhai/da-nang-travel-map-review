import Image from 'next/image'
import GoBackButton from '@/components/go-back-button'

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center gap-2">
      <Image src="/images/not-found.png" alt="Not Found" width={600} height={400} className="mx-auto w-1/2" />
      <h1 className="text-4xl font-bold text-center mt-6 text-gray-800 uppercase">Page not found</h1>
      <p className="text-center text-xl"> {"We can't find the page that you are looking for... !"}</p>
      <GoBackButton />
    </div>
  )
}
