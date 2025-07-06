"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react'

interface User {
  name: string
  address: string
  role: 'admin' | 'developer' | 'bettor'
  isRealWallet?: boolean
}

interface EnhancedWalletContextType {
  connectedUser: User | null
  connectDemoWallet: (user: User) => void
  connectRealWallet: (role: 'admin' | 'developer' | 'bettor') => Promise<void>
  disconnectWallet: () => void
  isConnected: boolean
  isConnecting: boolean
}

const EnhancedWalletContext = createContext<EnhancedWalletContextType | undefined>(undefined)

export function EnhancedWalletProvider({ children }: { children: ReactNode }) {
  const [connectedUser, setConnectedUser] = useState<User | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const { connect, disconnect, account, connected } = useAptosWallet()

  const connectDemoWallet = (user: User) => {
    setConnectedUser({ ...user, isRealWallet: false })
    localStorage.setItem('connectedUser', JSON.stringify({ ...user, isRealWallet: false }))
  }

  const connectRealWallet = async (role: 'admin' | 'developer' | 'bettor') => {
    setIsConnecting(true)
    try {
      await connect('Petra' as any)
      if (account?.address) {
        const user: User = {
          name: `Real Wallet User`,
          address: account.address,
          role,
          isRealWallet: true
        }
        setConnectedUser(user)
        localStorage.setItem('connectedUser', JSON.stringify(user))
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setConnectedUser(null)
    localStorage.removeItem('connectedUser')
    if (connected) {
      disconnect()
    }
  }

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('connectedUser')
    if (stored) {
      const user = JSON.parse(stored)
      setConnectedUser(user)
    }
  }, [])

  // Update user when real wallet connects
  useEffect(() => {
    if (connected && account?.address && connectedUser?.isRealWallet) {
      setConnectedUser(prev => prev ? { ...prev, address: account.address } : null)
    }
  }, [connected, account, connectedUser?.isRealWallet])

  return (
    <EnhancedWalletContext.Provider value={{
      connectedUser,
      connectDemoWallet,
      connectRealWallet,
      disconnectWallet,
      isConnected: !!connectedUser,
      isConnecting
    }}>
      {children}
    </EnhancedWalletContext.Provider>
  )
}

export function useSimpleWallet() {
  const context = useContext(EnhancedWalletContext)
  if (context === undefined) {
    throw new Error('useSimpleWallet must be used within an EnhancedWalletProvider')
  }
  return context
}
