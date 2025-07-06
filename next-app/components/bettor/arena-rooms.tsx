"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useSimpleWallet } from "@/lib/simple-wallet-context"
import { Room } from "@/lib/room-service"
import { Trophy, Users, DollarSign, Target, TrendingUp, Zap } from "lucide-react"

export function ArenaRooms() {
  const { connectedUser } = useSimpleWallet()
  const { toast } = useToast()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [selectedAgent, setSelectedAgent] = useState<string>("")
  const [betAmount, setBetAmount] = useState<string>("500000")
  const [isBetting, setIsBetting] = useState(false)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms')
      const result = await response.json()
      if (result.success) {
        setRooms(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlaceBet = async () => {
    if (!connectedUser || !selectedRoom || !selectedAgent) return

    setIsBetting(true)
    try {
      const response = await fetch(`/api/rooms/${selectedRoom.id}/bets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bettor: connectedUser.address,
          agentAddress: selectedAgent,
          amount: parseInt(betAmount)
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Bet Placed! 🎯",
          description: `Successfully bet ${(parseInt(betAmount) / 100000000).toFixed(4)} APT!`,
        })
        setSelectedRoom(null)
        setSelectedAgent("")
        setBetAmount("500000")
        fetchRooms()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Bet Failed",
        description: "Failed to place bet. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsBetting(false)
    }
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case 'OPEN': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'BETTING': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'RUNNING': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'FINISHED': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const canBet = (room: Room) => {
    return room.state === 'BETTING' && room.agents.length > 0
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-xl opacity-50" />
            <TrendingUp className="relative h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Betting Arena</h1>
        <p className="text-slate-400">Place bets on AI agent competitions</p>
      </div>

      {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">{room.name}</CardTitle>
                  <Badge className={getStateColor(room.state)}>
                    {room.state}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm">{room.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Agents:</span>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      {room.agents.length}/{room.maxAgents}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Prize Pool:</span>
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                      {(room.prizePool / 100000000).toFixed(4)} APT
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Total Bets:</span>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {room.bets.length}
                    </Badge>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded p-3 mb-4">
                  <p className="text-slate-400 text-xs mb-1">Problem:</p>
                  <p className="text-white text-sm">{room.problemStatement}</p>
                </div>

                {room.agents.length > 0 && (
                  <div className="mb-4">
                    <p className="text-slate-400 text-xs mb-2">Competing Agents:</p>
                    <div className="space-y-2">
                      {room.agents.map((agent, idx) => (
                        <div key={idx} className="bg-slate-700/20 rounded p-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white font-medium">{agent.name}</span>
                            <span className="text-slate-400 font-mono">
                              {agent.developer.slice(0, 6)}...{agent.developer.slice(-4)}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs mt-1">{agent.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => setSelectedRoom(room)}
                  disabled={!canBet(room)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
                >
                  {canBet(room) ? (
                    <>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Place Bet
                    </>
                  ) : room.state === 'OPEN' ? (
                    "Waiting for Agents"
                  ) : room.state === 'RUNNING' ? (
                    "Competition Running"
                  ) : room.state === 'FINISHED' ? (
                    "Competition Finished"
                  ) : (
                    "Betting Closed"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {rooms.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Trophy className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Rooms Available</h3>
              <p className="text-slate-400">Check back later for new competitions!</p>
            </CardContent>
          </Card>
        )}

        {/* Betting Modal */}
        {selectedRoom && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-white">Place Bet on {selectedRoom.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Select Agent</Label>
                  <div className="space-y-2 mt-2">
                    {selectedRoom.agents.map((agent, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded border cursor-pointer transition-colors ${
                          selectedAgent === agent.address 
                            ? 'border-green-500 bg-green-500/10' 
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                        onClick={() => setSelectedAgent(agent.address)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{agent.name}</span>
                          <span className="text-slate-400 text-xs font-mono">
                            {agent.developer.slice(0, 6)}...{agent.developer.slice(-4)}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mt-1">{agent.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="betAmount" className="text-white">Bet Amount (Octas)</Label>
                  <Input
                    id="betAmount"
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    min={selectedRoom.minBet}
                    max={selectedRoom.maxBet}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    ≈ {(parseInt(betAmount || "0") / 100000000).toFixed(4)} APT
                    <br />
                    Range: {(selectedRoom.minBet / 100000000).toFixed(2)} - {(selectedRoom.maxBet / 100000000).toFixed(2)} APT
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handlePlaceBet}
                    disabled={isBetting || !selectedAgent || !betAmount}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {isBetting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Placing Bet...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Place Bet
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={() => {
                      setSelectedRoom(null)
                      setSelectedAgent("")
                      setBetAmount("500000")
                    }}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
    </div>
  )
}
