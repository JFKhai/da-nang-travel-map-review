'use client'
import { clientAccessToken } from '@/lib/http'
import { UserResponseType } from '@/lib/schemas/user.schema'
import { createContext, useContext, useEffect, useState } from 'react'
import ToastProvider from './toast-provider'

const AppContext = createContext<{
  user: UserResponseType | undefined
  setUser: (user: UserResponseType | undefined) => void
}>({
  user: undefined,
  setUser: () => {},
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

export default function AppProvider({
  children,
  inititalAccessToken = '',
  user: userProp,
}: {
  children: React.ReactNode
  inititalAccessToken?: string
  user?: UserResponseType
}) {
  const [user, setUser] = useState<UserResponseType | undefined>(userProp)

  useEffect(() => {
    setUser(userProp)
  }, [userProp])

  useState(() => {
    if (typeof window !== 'undefined') {
      clientAccessToken.value = inititalAccessToken
    }
  })

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <ToastProvider>{children}</ToastProvider>
    </AppContext.Provider>
  )
}
