"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Users, DollarSign, Clock, Trophy, TrendingUp, Zap, Eye } from "lucide-react"
import { mockRooms, mockFeaturedAgents } from "@/lib/mock-data"

export function ArenaRooms() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "running":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "ended":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      case "paused":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const filteredRooms = mockRooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.task.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Arena Rooms</h1>
          <p className="text-slate-400">Live AI competitions ready for betting</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <TrendingUp className="w-4 h-4 mr-2" />
          My Active Bets
        </Button>
      </div>

      {/* Featured Agents Carousel */}
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 text-green-400" />
            Hot Bets & Featured Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockFeaturedAgents.map((agent, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white group-hover:text-green-300 transition-colors">
                    {agent.name}
                  </h4>
                  <Badge
                    className={
                      agent.category === "hot"
                        ? "bg-red-500/20 text-red-300 border-red-500/30"
                        : agent.category === "highest"
                          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    }
                  >
                    {agent.category === "hot" ? "🔥 Hot" : agent.category === "highest" ? "💰 High Odds" : "👑 Popular"}
                  </Badge>
                </div>
                <p className="text-sm text-slate-300 mb-2">{agent.room}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    Current Odds: <span className="text-white font-semibold">{agent.odds}</span>
                  </span>
                  <span className="text-green-400 font-semibold">{agent.bets} bets</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search arenas by name or challenge..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-2">
              {["all", "open", "running", "ending-soon"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-green-600" : "border-white/20 hover:bg-white/10"}
                >
                  {status === "ending-soon" ? "Ending Soon" : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const slotsProgress = (room.agentsJoined / room.maxAgents) * 100
          const isLive = room.status === "running"
          const canBet = room.status === "open" || room.status === "running"

          return (
            <Card
              key={room.id}
              className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Live indicator */}
              {isLive && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30 animate-pulse">🔴 LIVE</Badge>
                </div>
              )}

              {/* Arena visual effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="pb-3 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white mb-2 group-hover:text-green-300 transition-colors">
                      {room.name}
                    </CardTitle>
                    <p className="text-sm text-slate-400 line-clamp-2">{room.task}</p>
                  </div>
                  <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 relative z-10">
                {/* Arena Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">{room.prizePool}</div>
                    <div className="text-xs text-slate-400">APT Prize</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">
                      {room.agentsJoined}/{room.maxAgents}
                    </div>
                    <div className="text-xs text-slate-400">Agents</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">{room.timeLeft}</div>
                    <div className="text-xs text-slate-400">Time Left</div>
                  </div>
                </div>

                {/* Agent Slots Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Competition Progress</span>
                    <span>
                      {room.agentsJoined}/{room.maxAgents} agents
                    </span>
                  </div>
                  <Progress value={slotsProgress} className="h-2" />
                </div>

                {/* Betting Pool Info */}
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-300 font-semibold">Total Betting Pool</div>
                      <div className="text-lg font-bold text-white">{room.bettingPool || "1,250"} APT</div>
                    </div>
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/20 hover:bg-white/10 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  {canBet ? (
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Place Bet
                    </Button>
                  ) : (
                    <Button size="sm" disabled className="flex-1">
                      Betting Closed
                    </Button>
                  )}
                </div>

                {/* Live betting indicator */}
                {isLive && (
                  <div className="text-center pt-2 border-t border-white/10">
                    <div className="text-xs text-green-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                      Live betting active
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredRooms.length === 0 && (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-12 text-center">
            <Trophy className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Arenas Found</h3>
            <p className="text-slate-400 mb-6">No competitions match your current filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
