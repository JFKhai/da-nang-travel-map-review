'use client'
import { clientAccessToken } from '@/lib/http'
import { UserResponseType } from '@/lib/schemas/user.schema'
import { createContext, useContext, useEffect, useState } from 'react'
import ToastProvider from './toast-provider'
import authApiClientRequest from '@/lib/api/client-api/auth.api'

const AppContext = createContext<{
  user: UserResponseType | undefined
  setUser: (user: UserResponseType | undefined) => void
  logout: () => Promise<void>
}>({
  user: undefined,
  setUser: () => {},
  logout: async () => {},
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

  const logout = async () => {
    try {
      // Xóa token từ cookie
      await authApiClientRequest.logout({ accessToken: clientAccessToken.value })
      // Xóa token từ memory
      if (typeof window !== 'undefined') {
        clientAccessToken.value = ''
      }
      // Xóa user từ context
      setUser(undefined)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AppContext.Provider value={{ user, setUser, logout }}>
      <ToastProvider>{children}</ToastProvider>
    </AppContext.Provider>
  )
}
