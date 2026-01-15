'use client'

import { useRouter } from 'next/navigation'

export default function GoBackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="block mx-auto mt-4 px-6 py-2 bg-brand-teal text-white  rounded-lg hover:bg-brand-dark transition-colors"
    >
      Go Back
    </button>
  )
}
