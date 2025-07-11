import { useState } from "react"

interface Toast {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (toast: Toast) => {
    setToasts(prev => [...prev, toast])
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.slice(1))
    }, 3000)
    
    // For demo purposes, just console.log
    console.log(`Toast: ${toast.title}`, toast.description)
  }

  return { toast, toasts }
}
