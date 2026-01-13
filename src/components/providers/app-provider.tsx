'use client'
import { clientAccessTokenToken } from '@/lib/http'
import { useState } from 'react'

export default function AppProvider({
  children,
  inititalAccessToken = '',
}: {
  children: React.ReactNode
  inititalAccessToken?: string
}) {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientAccessTokenToken.value = inititalAccessToken
    }
  })

  return <>{children}</>
}
