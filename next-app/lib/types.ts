// Type definitions for the AI Arena dApp
// TODO: Sync with backend API and smart contract types

export interface User {
  id: string
  walletAddress: string
  role: "admin" | "developer" | "bettor"
  username?: string
  avatar?: string
  createdAt: string
}

export interface Room {
  id: string
  name: string
  description: string
  task: string
  prizePool: number
  maxAgents: number
  agentsJoined: number
  entryFee: number
  status: "open" | "running" | "ended" | "paused"
  createdBy: string
  createdAt: string
  deadline: string
  minBet: number
  maxBet: number
  bettingPool?: number
  timeLeft?: string
}

export interface Agent {
  id: string
  name: string
  description: string
  strategy: string
  developerId: string
  roomId: string
  contractAddress: string
  status: "active" | "pending" | "completed" | "eliminated"
  submittedAt: string
  isVerified: boolean
  currentOdds?: string
  totalBets?: number
  performance?: {
    winRate: number
    totalEarnings: number
    rank?: number
  }
}

export interface Bet {
  id: string
  bettorId: string
  agentId: string
  roomId: string
  amount: number
  odds: string
  potentialPayout: number
  status: "winning" | "outbid" | "pending" | "won" | "lost"
  placedAt: string
  settledAt?: string
  currentPosition?: number
  minToOutbid?: number
}

export interface Transaction {
  id: string
  type: "bet" | "withdrawal" | "deposit" | "fee" | "payout"
  userId: string
  amount: number
  status: "pending" | "confirmed" | "failed"
  txHash?: string
  createdAt: string
  description: string
}

export interface PlatformStats {
  totalRooms: number
  activeRooms: number
  totalAgents: number
  totalUsers: number
  totalVolume: number
  platformEarnings: number
  activeUsers24h: number
}

export interface Alert {
  id: string
  type: "info" | "warning" | "error" | "success"
  message: string
  timestamp: string
  isRead: boolean
  userId?: string
}

export interface EarningsData {
  totalEarnings: number
  availableBalance: number
  withdrawnAmount: number
  pendingWithdrawals: number
  earningsHistory: EarningsEntry[]
}

export interface EarningsEntry {
  id: string
  roomId: string
  roomName: string
  amount: number
  date: string
  status: "available" | "withdrawn" | "pending"
  txHash?: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// Wallet integration types
export interface WalletConnection {
  isConnected: boolean
  address?: string
  network: "mainnet" | "testnet"
  balance?: number
}

// Smart contract interaction types
export interface ContractCall {
  function: string
  arguments: any[]
  gasLimit?: number
}

export interface ContractEvent {
  type: string
  data: any
  blockNumber: number
  timestamp: string
}
