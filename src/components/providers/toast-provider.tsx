'use client'
import { Toast } from 'primereact/toast'
import { createContext, useContext, useRef, ReactNode } from 'react'

type ToastSeverity = 'error' | 'success' | 'info' | 'warn' | 'secondary' | 'contrast'

interface ToastContextType {
  showToast: (severity: ToastSeverity, summary: string, detail?: string) => void
  showSuccess: (summary: string, detail?: string) => void
  showError: (summary: string, detail?: string) => void
  showInfo: (summary: string, detail?: string) => void
  showWarn: (summary: string, detail?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const toast = useRef<Toast>(null)

  const showToast = (severity: ToastSeverity, summary: string, detail?: string) => {
    toast.current?.show({ severity, summary, detail })
  }

  const showSuccess = (summary: string, detail?: string) => {
    showToast('success', summary, detail)
  }

  const showError = (summary: string, detail?: string) => {
    showToast('error', summary, detail)
  }

  const showInfo = (summary: string, detail?: string) => {
    showToast('info', summary, detail)
  }

  const showWarn = (summary: string, detail?: string) => {
    showToast('warn', summary, detail)
  }

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showInfo, showWarn }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  )
}
