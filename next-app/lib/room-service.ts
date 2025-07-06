// Mock room service for hackathon demo
export interface Agent {
  address: string
  developer: string
  name: string
  description: string
}

export interface Bet {
  bettor: string
  agentAddress: string
  amount: number
}

export interface Room {
  id: number
  name: string
  description: string
  problemStatement: string
  admin: string
  agents: Agent[]
  bets: Bet[]
  state: 'OPEN' | 'BETTING' | 'RUNNING' | 'FINISHED'
  prizePool: number
  winner?: string
  maxAgents: number
  entryFee: number
  minBet: number
  maxBet: number
}

// Mock data store
let rooms: Room[] = [
  {
    id: 0,
    name: "Math Challenge Arena",
    description: "Solve complex mathematical problems",
    problemStatement: "Calculate the optimal solution for: 2x + 3y = 15, x - y = 2",
    admin: "0xbf63114b92ed90297f1886ede79305269d163a3b368ba8ff448f0b1b6a744bbb",
    agents: [],
    bets: [],
    state: 'OPEN',
    prizePool: 0,
    maxAgents: 2,
    entryFee: 100000,
    minBet: 500000,
    maxBet: 5000000
  }
]

export const roomService = {
  // Get all rooms
  getRooms: (): Room[] => {
    return rooms
  },

  // Get room by ID
  getRoom: (id: number): Room | undefined => {
    return rooms.find(room => room.id === id)
  },

  // Create new room
  createRoom: (roomData: Omit<Room, 'id' | 'agents' | 'bets' | 'prizePool' | 'state'>): Room => {
    const newRoom: Room = {
      ...roomData,
      id: rooms.length,
      agents: [],
      bets: [],
      prizePool: 0,
      state: 'OPEN'
    }
    rooms.push(newRoom)
    return newRoom
  },

  // Register agent to room
  registerAgent: (roomId: number, agent: Agent): boolean => {
    const room = rooms.find(r => r.id === roomId)
    if (!room || room.agents.length >= room.maxAgents) return false
    
    // Check if developer already has an agent in this room
    if (room.agents.some(a => a.developer === agent.developer)) return false
    
    room.agents.push(agent)
    if (room.agents.length === room.maxAgents) {
      room.state = 'BETTING'
    }
    return true
  },

  // Place bet
  placeBet: (roomId: number, bet: Bet): boolean => {
    const room = rooms.find(r => r.id === roomId)
    if (!room || room.state === 'FINISHED') return false
    
    // Check if agent exists in room
    if (!room.agents.some(a => a.address === bet.agentAddress)) return false
    
    room.bets.push(bet)
    room.prizePool += bet.amount
    room.state = 'BETTING'
    return true
  },

  // Start competition
  startCompetition: (roomId: number, adminAddress: string): boolean => {
    const room = rooms.find(r => r.id === roomId)
    if (!room || room.admin !== adminAddress || room.state !== 'BETTING') return false
    
    room.state = 'RUNNING'
    return true
  },

  // Declare winner
  declareWinner: (roomId: number, winnerAddress: string, adminAddress: string): boolean => {
    const room = rooms.find(r => r.id === roomId)
    if (!room || room.admin !== adminAddress || room.state !== 'RUNNING') return false
    
    room.winner = winnerAddress
    room.state = 'FINISHED'
    return true
  }
}
