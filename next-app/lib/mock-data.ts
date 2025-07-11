// Mock data for the AI Arena dApp
// TODO: Replace with actual API calls and blockchain data

export const mockAdminData = {
  overview: {
    totalRooms: 24,
    activeRooms: 8,
    totalAgents: 156,
    activeBets: 89,
    platformEarnings: "12,450",
    activeUsers: "1,234",
  },
  alerts: [
    {
      type: "warning",
      message: 'Room "Trading Championship" approaching agent limit (9/10)',
      time: "2 minutes ago",
    },
    {
      type: "info",
      message: 'New agent submitted for "AI Strategy Battle"',
      time: "5 minutes ago",
    },
    {
      type: "error",
      message: "Failed transaction detected in room #15",
      time: "12 minutes ago",
    },
  ],
  quickStats: [
    { label: "Daily Active Users", value: "456", change: "+12%" },
    { label: "Avg Bet Size", value: "25 APT", change: "+8%" },
    { label: "Platform Fee Revenue", value: "890 APT", change: "+15%" },
  ],
}

export const mockRooms = [
  {
    id: 1,
    name: "AI Trading Championship",
    task: "Develop trading algorithms that maximize profit in simulated market conditions",
    prizePool: "5,000",
    maxAgents: 10,
    agentsJoined: 8,
    betsPlaced: 45,
    status: "open",
    timeLeft: "2d 14h",
    entryFee: 50,
    bettingPool: "2,250",
  },
  {
    id: 2,
    name: "Strategy Bot Arena",
    task: "Create bots that can adapt to changing game mechanics in real-time",
    prizePool: "3,500",
    maxAgents: 8,
    agentsJoined: 6,
    betsPlaced: 32,
    status: "running",
    timeLeft: "1d 8h",
    entryFee: 25,
    bettingPool: "1,800",
  },
  {
    id: 3,
    name: "DeFi Yield Optimizer",
    task: "Build agents that optimize yield farming strategies across multiple protocols",
    prizePool: "7,500",
    maxAgents: 12,
    agentsJoined: 12,
    betsPlaced: 78,
    status: "running",
    timeLeft: "6h 23m",
    entryFee: 75,
    bettingPool: "4,200",
  },
  {
    id: 4,
    name: "NFT Market Predictor",
    task: "Develop AI that can predict NFT price movements and market trends",
    prizePool: "2,000",
    maxAgents: 6,
    agentsJoined: 4,
    betsPlaced: 18,
    status: "open",
    timeLeft: "3d 12h",
    entryFee: 20,
    bettingPool: "950",
  },
  {
    id: 5,
    name: "Liquidity Pool Manager",
    task: "Create agents that manage liquidity positions for maximum returns",
    prizePool: "4,200",
    maxAgents: 8,
    agentsJoined: 8,
    betsPlaced: 56,
    status: "ended",
    timeLeft: "Ended",
    entryFee: 40,
    bettingPool: "3,100",
  },
]

export const mockEarningsData = {
  totalEarnings: "12,450",
  availableBalance: "3,200",
  withdrawnAmount: "9,250",
  earningsHistory: [
    {
      room: "AI Trading Championship",
      amount: "450",
      date: "2024-01-15",
      status: "available",
    },
    {
      room: "Strategy Bot Arena",
      amount: "320",
      date: "2024-01-14",
      status: "withdrawn",
    },
    {
      room: "DeFi Yield Optimizer",
      amount: "680",
      date: "2024-01-13",
      status: "available",
    },
    {
      room: "NFT Market Predictor",
      amount: "180",
      date: "2024-01-12",
      status: "withdrawn",
    },
  ],
  monthlyStats: [
    { label: "This Month", value: "2,450 APT", change: "+15%" },
    { label: "Avg per Room", value: "285 APT", change: "+8%" },
    { label: "Fee Rate", value: "2.5%", change: "0%" },
    { label: "Active Rooms", value: "8", change: "+2" },
  ],
}

export const mockDeveloperData = {
  stats: {
    agentsSubmitted: 12,
    activeAgents: 5,
    activeCompetitions: 3,
    aptWon: "2,450",
    totalBets: "8,900",
  },
  topAgent: {
    name: "AlphaTrader Pro",
    description: "Advanced trading algorithm with ML-based market analysis",
    winRate: 78,
    totalBets: "3,200",
  },
  recentActivity: [
    {
      type: "submission",
      title: "Agent Submitted",
      description: "TradingBot v2.1 submitted to AI Trading Championship",
      time: "2 hours ago",
    },
    {
      type: "win",
      title: "Competition Won",
      description: "AlphaTrader Pro won Strategy Bot Arena",
      time: "1 day ago",
      amount: "1,200",
    },
    {
      type: "bet",
      title: "New Bet Placed",
      description: "Someone bet 150 APT on your QuickBot agent",
      time: "2 days ago",
    },
  ],
}

export const mockAgents = [
  {
    id: 1,
    name: "AlphaTrader Pro",
    room: "AI Trading Championship",
    status: "active",
    betsPlaced: "3,200 APT",
    currentOdds: "2.5:1",
    description: "Advanced trading algorithm with machine learning capabilities",
    rank: 2,
  },
  {
    id: 2,
    name: "QuickBot",
    room: "Strategy Bot Arena",
    status: "pending",
    betsPlaced: "1,800 APT",
    currentOdds: "3.2:1",
    description: "Fast-response bot optimized for rapid decision making",
  },
  {
    id: 3,
    name: "YieldMaximizer",
    room: "DeFi Yield Optimizer",
    status: "completed",
    betsPlaced: "2,100 APT",
    currentOdds: "1.8:1",
    description: "Specialized in finding optimal yield farming opportunities",
  },
  {
    id: 4,
    name: "TrendAnalyzer",
    room: "NFT Market Predictor",
    status: "active",
    betsPlaced: "950 APT",
    currentOdds: "4.1:1",
    description: "AI-powered trend analysis for NFT market predictions",
    rank: 1,
  },
]

export const mockBettorData = {
  stats: {
    activeBets: 8,
    totalBetAmount: "1,250",
    totalWinnings: "3,400",
    winRate: 68,
    competitionsJoined: 15,
  },
  hotBets: [
    {
      agentName: "AlphaTrader Pro",
      room: "AI Trading Championship",
      odds: "2.5:1",
      currentPool: "3,200",
      potentialReturn: "150",
    },
    {
      agentName: "YieldBot Supreme",
      room: "DeFi Yield Optimizer",
      odds: "3.8:1",
      currentPool: "4,200",
      potentialReturn: "280",
    },
    {
      agentName: "TrendMaster AI",
      room: "NFT Market Predictor",
      odds: "4.2:1",
      currentPool: "950",
      potentialReturn: "320",
    },
  ],
  recentActivity: [
    {
      type: "bet",
      title: "Bet Placed",
      description: "Placed 150 APT on AlphaTrader Pro",
      time: "1 hour ago",
      amount: "150",
    },
    {
      type: "win",
      title: "Bet Won!",
      description: "QuickBot won Strategy Bot Arena",
      time: "1 day ago",
      amount: "450",
    },
    {
      type: "outbid",
      title: "Outbid Alert",
      description: "Your bet on TrendAnalyzer was outbid",
      time: "2 days ago",
    },
  ],
}

export const mockBets = [
  {
    id: 1,
    agent: "AlphaTrader Pro",
    room: "AI Trading Championship",
    amount: 150,
    odds: "2.5:1",
    potentialPayout: 375,
    status: "winning",
    timestamp: "2 hours ago",
    currentPosition: 1,
    competitionStatus: "Running",
  },
  {
    id: 2,
    agent: "QuickBot",
    room: "Strategy Bot Arena",
    amount: 200,
    odds: "3.2:1",
    potentialPayout: 640,
    status: "won",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    agent: "TrendAnalyzer",
    room: "NFT Market Predictor",
    amount: 100,
    odds: "4.1:1",
    potentialPayout: 410,
    status: "outbid",
    timestamp: "2 days ago",
    minToOutbid: 125,
    currentPosition: 3,
  },
  {
    id: 4,
    agent: "YieldMaximizer",
    room: "DeFi Yield Optimizer",
    amount: 300,
    odds: "1.8:1",
    potentialPayout: 540,
    status: "pending",
    timestamp: "3 days ago",
    currentPosition: 2,
    competitionStatus: "Running",
  },
  {
    id: 5,
    agent: "DataMiner Pro",
    room: "Analytics Challenge",
    amount: 75,
    odds: "5.0:1",
    potentialPayout: 375,
    status: "lost",
    timestamp: "1 week ago",
  },
]

export const mockFeaturedAgents = [
  {
    name: "AlphaTrader Pro",
    room: "AI Trading Championship",
    odds: "2.5:1",
    bets: "32",
    category: "hot",
  },
  {
    name: "YieldBot Supreme",
    room: "DeFi Yield Optimizer",
    odds: "4.8:1",
    bets: "18",
    category: "highest",
  },
  {
    name: "QuickStrategy AI",
    room: "Strategy Bot Arena",
    odds: "3.2:1",
    bets: "45",
    category: "popular",
  },
]
