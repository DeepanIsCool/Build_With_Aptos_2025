"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  name: string
  address: string
  role: 'admin' | 'developer' | 'bettor'
}

interface WalletContextType {
  connectedUser: User | null
  connectWallet: (user: User) => void
  disconnectWallet: () => void
  isConnected: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connectedUser, setConnectedUser] = useState<User | null>(null)

  const connectWallet = (user: User) => {
    setConnectedUser(user)
    // Store in localStorage for persistence
    localStorage.setItem('connectedUser', JSON.stringify(user))
  }

  const disconnectWallet = () => {
    setConnectedUser(null)
    localStorage.removeItem('connectedUser')
  }

  // Load from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('connectedUser')
    if (stored) {
      setConnectedUser(JSON.parse(stored))
    }
  }, [])

  return (
    <WalletContext.Provider value={{
      connectedUser,
      connectWallet,
      disconnectWallet,
      isConnected: !!connectedUser
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
