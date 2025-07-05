import { create } from 'zustand';

export interface Agent {
  id: string;
  name: string;
  developer: string;
  description: string;
  avatar: string;
  currentMaxBet: number;
  backers: number;
  strategy: string;
  progress?: number;
}

export interface UserBet {
  agentId: string;
  amount: number;
  timestamp: number;
}

export interface Room {
  id: string;
  problemStatement: string;
  agents: Agent[];
  status: 'betting' | 'in_progress' | 'settled';
  prizePool: number;
  winnerId?: string;
  competitionEndTime?: number;
}

export interface User {
  walletAddress: string;
  balance: number;
  bets: UserBet[];
  totalWinnings: number;
  betHistory: UserBet[];
}

interface AppState {
  user: User | null;
  activeRoom: Room | null;
  isWalletConnected: boolean;
  
  // Actions
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  setActiveRoom: (room: Room) => void;
  placeBet: (agentId: string, amount: number) => void;
  updateAgentProgress: (agentId: string, progress: number) => void;
  setCompetitionWinner: (winnerId: string) => void;
  claimRewards: () => void;
  createRoom: (problemStatement: string) => void;
  addAgent: (agent: Omit<Agent, 'id' | 'currentMaxBet' | 'backers'>) => void;
  updateAgent: (agentId: string, updates: Partial<Agent>) => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  activeRoom: null,
  isWalletConnected: false,

  connectWallet: (address: string) => {
    set({
      user: {
        walletAddress: address,
        balance: 1000, // Mock balance
        bets: [],
        totalWinnings: 0,
        betHistory: [],
      },
      isWalletConnected: true,
    });
  },

  disconnectWallet: () => {
    set({
      user: null,
      isWalletConnected: false,
    });
  },

  setActiveRoom: (room: Room) => {
    set({ activeRoom: room });
  },

  placeBet: (agentId: string, amount: number) => {
    const state = get();
    if (!state.user || !state.activeRoom) return;

    // Check if user already has 2 bets
    const currentBets = state.user.bets;
    if (currentBets.length >= 2 && !currentBets.find(bet => bet.agentId === agentId)) {
      return; // Max 2 agents
    }

    // Check if user has sufficient balance
    if (state.user.balance < amount) return;

    const newBet: UserBet = {
      agentId,
      amount,
      timestamp: Date.now(),
    };

    // Update user bets and balance
    const updatedBets = currentBets.filter(bet => bet.agentId !== agentId);
    updatedBets.push(newBet);

    // Update agent max bet and backers
    const updatedAgents = state.activeRoom.agents.map(agent => {
      if (agent.id === agentId) {
        const newMaxBet = Math.max(agent.currentMaxBet, amount);
        const newBackers = agent.backers + (currentBets.find(bet => bet.agentId === agentId) ? 0 : 1);
        return { ...agent, currentMaxBet: newMaxBet, backers: newBackers };
      }
      return agent;
    });

    const totalBetAmount = updatedBets.reduce((sum, bet) => sum + bet.amount, 0);
    const prizePool = updatedAgents.reduce((sum, agent) => sum + agent.currentMaxBet, 0);

    set({
      user: {
        ...state.user,
        bets: updatedBets,
        balance: 1000 - totalBetAmount, // Mock balance calculation
        betHistory: [...state.user.betHistory, newBet],
      },
      activeRoom: {
        ...state.activeRoom,
        agents: updatedAgents,
        prizePool,
      },
    });
  },

  updateAgentProgress: (agentId: string, progress: number) => {
    const state = get();
    if (!state.activeRoom) return;

    const updatedAgents = state.activeRoom.agents.map(agent =>
      agent.id === agentId ? { ...agent, progress } : agent
    );

    set({
      activeRoom: {
        ...state.activeRoom,
        agents: updatedAgents,
      },
    });
  },

  setCompetitionWinner: (winnerId: string) => {
    const state = get();
    if (!state.activeRoom) return;

    set({
      activeRoom: {
        ...state.activeRoom,
        winnerId,
        status: 'settled',
      },
    });
  },

  claimRewards: () => {
    const state = get();
    if (!state.user || !state.activeRoom || !state.activeRoom.winnerId) return;

    const winningBet = state.user.bets.find(bet => bet.agentId === state.activeRoom!.winnerId);
    if (!winningBet) return;

    const totalPrizePool = state.activeRoom.prizePool;
    const userReward = winningBet.amount + (totalPrizePool * 0.4); // 40% of profit

    set({
      user: {
        ...state.user,
        balance: state.user.balance + userReward,
        totalWinnings: state.user.totalWinnings + userReward,
        bets: [], // Clear current bets
      },
    });
  },

  createRoom: (problemStatement: string) => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      problemStatement,
      agents: [],
      status: 'betting',
      prizePool: 0,
    };

    set({ activeRoom: newRoom });
  },

  addAgent: (agent: Omit<Agent, 'id' | 'currentMaxBet' | 'backers'>) => {
    const state = get();
    if (!state.activeRoom || state.activeRoom.agents.length >= 4) return;

    const newAgent: Agent = {
      ...agent,
      id: `agent-${Date.now()}`,
      currentMaxBet: 0,
      backers: 0,
    };

    set({
      activeRoom: {
        ...state.activeRoom,
        agents: [...state.activeRoom.agents, newAgent],
      },
    });
  },

  updateAgent: (agentId: string, updates: Partial<Agent>) => {
    const state = get();
    if (!state.activeRoom) return;

    const updatedAgents = state.activeRoom.agents.map(agent =>
      agent.id === agentId ? { ...agent, ...updates } : agent
    );

    set({
      activeRoom: {
        ...state.activeRoom,
        agents: updatedAgents,
      },
    });
  },
}));