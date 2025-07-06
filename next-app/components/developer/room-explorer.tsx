"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useSimpleWallet } from "@/lib/simple-wallet-context"
import { Room } from "@/lib/room-service"
import { Trophy, Users, DollarSign, Target, Code, Zap } from "lucide-react"

export function RoomExplorer() {
  const { connectedUser } = useSimpleWallet()
  const { toast } = useToast()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [agentData, setAgentData] = useState({
    name: "",
    description: ""
  })
  const [isRegistering, setIsRegistering] = useState(false)

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

  const handleRegisterAgent = async () => {
    if (!connectedUser || !selectedRoom) return

    setIsRegistering(true)
    try {
      const response = await fetch(`/api/rooms/${selectedRoom.id}/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: connectedUser.address,
          developer: connectedUser.address,
          name: agentData.name,
          description: agentData.description
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Agent Registered! 🤖",
          description: `${agentData.name} has been registered for the competition!`,
        })
        setSelectedRoom(null)
        setAgentData({ name: "", description: "" })
        fetchRooms()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to register agent. You may have already registered for this room.",
        variant: "destructive"
      })
    } finally {
      setIsRegistering(false)
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

  const canRegister = (room: Room) => {
    if (!connectedUser) return false
    if (room.state !== 'OPEN') return false
    if (room.agents.length >= room.maxAgents) return false
    // Check if already registered
    return !room.agents.some(agent => agent.developer === connectedUser.address)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-xl opacity-50" />
              <Code className="relative h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Competition Rooms</h1>
          <p className="text-slate-400">Join competitions and register your AI agents</p>
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
                    <span className="text-slate-400">Entry Fee:</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                      {(room.entryFee / 100000000).toFixed(4)} APT
                    </Badge>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded p-3 mb-4">
                  <p className="text-slate-400 text-xs mb-1">Problem:</p>
                  <p className="text-white text-sm">{room.problemStatement}</p>
                </div>

                {room.agents.length > 0 && (
                  <div className="mb-4">
                    <p className="text-slate-400 text-xs mb-2">Registered Agents:</p>
                    <div className="space-y-1">
                      {room.agents.map((agent, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-white">{agent.name}</span>
                          <span className="text-slate-400 font-mono">
                            {agent.developer.slice(0, 6)}...{agent.developer.slice(-4)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => setSelectedRoom(room)}
                  disabled={!canRegister(room)}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
                >
                  {canRegister(room) ? (
                    <>
                      <Trophy className="h-4 w-4 mr-2" />
                      Register Agent
                    </>
                  ) : room.agents.some(a => a.developer === connectedUser?.address) ? (
                    "Already Registered"
                  ) : room.state !== 'OPEN' ? (
                    "Registration Closed"
                  ) : (
                    "Room Full"
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

        {/* Registration Modal */}
        {selectedRoom && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-white">Register Agent for {selectedRoom.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="agentName" className="text-white">Agent Name</Label>
                  <Input
                    id="agentName"
                    value={agentData.name}
                    onChange={(e) => setAgentData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., My Smart Agent"
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="agentDescription" className="text-white">Description</Label>
                  <Textarea
                    id="agentDescription"
                    value={agentData.description}
                    onChange={(e) => setAgentData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your agent's approach..."
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleRegisterAgent}
                    disabled={isRegistering || !agentData.name || !agentData.description}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    {isRegistering ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Register Agent
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={() => setSelectedRoom(null)}
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
    </div>
  )
}
