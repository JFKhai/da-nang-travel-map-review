'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// 1. Define User data type
interface User {
  id: string
  name: string
  email: string
  role: string
}

// 2. Define Context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (token: string, userData: User) => void
  logout: () => void
}

// Default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 3. Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  // Check authentication status on page reload
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = (token: string, userData: User) => {
    localStorage.setItem('accessToken', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    router.push('/')
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

// 4.Custom hook for easy usage in other components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
