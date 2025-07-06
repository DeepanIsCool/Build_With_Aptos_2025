"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface User {
  name: string
  address: string
  role: 'admin' | 'developer' | 'bettor'
  isRealWallet?: boolean
}

interface SimpleWalletContextType {
  connectedUser: User | null
  connectDemoWallet: (user: User) => void
  connectRealWallet: (role: 'admin' | 'developer' | 'bettor') => Promise<void>
  disconnectWallet: () => void
  isConnected: boolean
  isConnecting: boolean
}

const SimpleWalletContext = createContext<SimpleWalletContextType | undefined>(undefined)

export function SimpleWalletProvider({ children }: { children: ReactNode }) {
  const [connectedUser, setConnectedUser] = useState<User | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectDemoWallet = (user: User) => {
    setConnectedUser({ ...user, isRealWallet: false })
    localStorage.setItem('connectedUser', JSON.stringify({ ...user, isRealWallet: false }))
  }

  const connectRealWallet = async (role: 'admin' | 'developer' | 'bettor') => {
    setIsConnecting(true)
    try {
      // Simulate wallet connection for demo
      // In production, this would connect to actual Petra wallet
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const user: User = {
        name: `Real Wallet User`,
        address: `0x${Math.random().toString(16).substr(2, 40)}`, // Mock address
        role,
        isRealWallet: true
      }
      setConnectedUser(user)
      localStorage.setItem('connectedUser', JSON.stringify(user))
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setConnectedUser(null)
    localStorage.removeItem('connectedUser')
  }

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('connectedUser')
    if (stored) {
      const user = JSON.parse(stored)
      setConnectedUser(user)
    }
  }, [])

  return (
    <SimpleWalletContext.Provider value={{
      connectedUser,
      connectDemoWallet,
      connectRealWallet,
      disconnectWallet,
      isConnected: !!connectedUser,
      isConnecting
    }}>
      {children}
    </SimpleWalletContext.Provider>
  )
}

export function useSimpleWallet() {
  const context = useContext(SimpleWalletContext)
  if (context === undefined) {
    throw new Error('useSimpleWallet must be used within a SimpleWalletProvider')
  }
  return context
}
