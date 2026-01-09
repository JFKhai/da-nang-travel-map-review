'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getAuthToken, type User } from '@/lib/api/auth'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  setAuth: (user: User | null) => void
  clearAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setIsAuthenticated(true)
        } catch (e) {
          console.error('Error parsing user data:', e)
        }
      }
    }
  }, [])

  // Listen for storage changes (when login happens in another tab/window)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        const token = getAuthToken()
        if (token) {
          const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser)
              setUser(userData)
              setIsAuthenticated(true)
            } catch (e) {
              console.error('Error parsing user data:', e)
            }
          }
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Listen for custom auth events (for same-tab updates)
  useEffect(() => {
    const handleAuthChange = (e: CustomEvent) => {
      const { user: newUser } = e.detail as { user: User | null }
      if (newUser) {
        setUser(newUser)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    }

    window.addEventListener('auth-change', handleAuthChange as EventListener)
    return () => window.removeEventListener('auth-change', handleAuthChange as EventListener)
  }, [])

  const setAuth = (newUser: User | null) => {
    setUser(newUser)
    setIsAuthenticated(!!newUser)

    // Dispatch custom event for same-tab updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { user: newUser } }))
    }
  }

  const clearAuth = () => {
    setUser(null)
    setIsAuthenticated(false)

    // Dispatch custom event for same-tab updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { user: null } }))
    }
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, setAuth, clearAuth }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
