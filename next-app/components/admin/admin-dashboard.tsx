"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useSimpleWallet } from "@/lib/simple-wallet-context"
import { Room } from "@/lib/room-service"
import { Trophy, Users, DollarSign, Play, Crown, Eye, Zap } from "lucide-react"

export function AdminDashboard() {
  const { connectedUser } = useSimpleWallet()
  const { toast } = useToast()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

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

  const handleStartCompetition = async (roomId: number) => {
    if (!connectedUser) return

    try {
      const response = await fetch(`/api/rooms/${roomId}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin: connectedUser.address
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Competition Started! 🚀",
          description: `Competition in room ${roomId} is now running!`,
        })
        fetchRooms()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start competition",
        variant: "destructive"
      })
    }
  }

  const handleDeclareWinner = async (roomId: number, winnerAddress: string) => {
    if (!connectedUser) return

    try {
      const response = await fetch(`/api/rooms/${roomId}/winner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          winner: winnerAddress,
          admin: connectedUser.address
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Winner Declared! 👑",
          description: `Competition completed successfully!`,
        })
        fetchRooms()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to declare winner",
        variant: "destructive"
      })
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-xl opacity-50" />
              <Crown className="relative h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Manage competitions and oversee the arena</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Rooms</p>
                  <p className="text-2xl font-bold text-white">{rooms.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Competitions</p>
                  <p className="text-2xl font-bold text-white">
                    {rooms.filter(r => r.state === 'RUNNING').length}
                  </p>
                </div>
                <Play className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Agents</p>
                  <p className="text-2xl font-bold text-white">
                    {rooms.reduce((acc, room) => acc + room.agents.length, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Prize Pool</p>
                  <p className="text-2xl font-bold text-white">
                    {(rooms.reduce((acc, room) => acc + room.prizePool, 0) / 100000000).toFixed(2)} APT
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rooms */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Competition Rooms</h2>
          {rooms.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Trophy className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Rooms Yet</h3>
                <p className="text-slate-400">Create your first competition room to get started!</p>
              </CardContent>
            </Card>
          ) : (
            rooms.map((room) => (
              <Card key={room.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">{room.name}</CardTitle>
                    <Badge className={getStateColor(room.state)}>
                      {room.state}
                    </Badge>
                  </div>
                  <p className="text-slate-400">{room.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Agents:</span>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                          {room.agents.length}/{room.maxAgents}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Bets:</span>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                          {room.bets.length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Prize Pool:</span>
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                          {(room.prizePool / 100000000).toFixed(4)} APT
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-slate-400 text-sm mb-2">Problem:</p>
                        <p className="text-white text-sm bg-slate-700/30 p-2 rounded">
                          {room.problemStatement}
                        </p>
                      </div>
                      {room.agents.length > 0 && (
                        <div>
                          <p className="text-slate-400 text-sm mb-2">Agents:</p>
                          <div className="space-y-1">
                            {room.agents.map((agent, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-white">{agent.name}</span>
                                <span className="text-slate-400 font-mono">
                                  {agent.developer.slice(0, 6)}...{agent.developer.slice(-4)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    {room.state === 'BETTING' && room.bets.length > 0 && (
                      <Button 
                        onClick={() => handleStartCompetition(room.id)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Competition
                      </Button>
                    )}
                    {room.state === 'RUNNING' && room.agents.length > 0 && (
                      <div className="flex gap-2">
                        {room.agents.map((agent, idx) => (
                          <Button 
                            key={idx}
                            onClick={() => handleDeclareWinner(room.id, agent.address)}
                            variant="outline"
                            className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
                          >
                            <Crown className="h-4 w-4 mr-2" />
                            Declare {agent.name} Winner
                          </Button>
                        ))}
                      </div>
                    )}
                    {room.state === 'FINISHED' && room.winner && (
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        <Crown className="h-4 w-4 mr-2" />
                        Winner: {room.agents.find(a => a.address === room.winner)?.name || 'Unknown'}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
