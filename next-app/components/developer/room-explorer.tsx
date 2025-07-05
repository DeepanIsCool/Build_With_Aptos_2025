"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Users, DollarSign, Clock, Trophy, Plus, Eye } from "lucide-react"
import { mockRooms } from "@/lib/mock-data"

export function RoomExplorer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("open")

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

  const openRooms = filteredRooms.filter((room) => room.status === "open")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Room Explorer</h1>
          <p className="text-slate-400">Find and join open AI competitions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Submit Agent
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search competitions by name or challenge..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-2">
              {["open", "running", "all"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-blue-600" : "border-white/20 hover:bg-white/10"}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Competitions */}
      {statusFilter === "open" && (
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-blue-400" />
              Featured Competitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {openRooms.slice(0, 3).map((room) => (
                <div key={room.id} className="p-4 rounded-lg bg-white/10 border border-white/20">
                  <h4 className="font-semibold text-white mb-2">{room.name}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{room.prizePool} APT Prize</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                      {room.agentsJoined}/{room.maxAgents} slots
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const slotsProgress = (room.agentsJoined / room.maxAgents) * 100
          const canJoin = room.status === "open" && room.agentsJoined < room.maxAgents

          return (
            <Card
              key={room.id}
              className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {room.name}
                    </CardTitle>
                    <p className="text-sm text-slate-400 line-clamp-2">{room.task}</p>
                  </div>
                  <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-white/5">
                    <DollarSign className="w-4 h-4 text-green-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">{room.prizePool}</div>
                    <div className="text-xs text-slate-400">APT Prize</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5">
                    <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">
                      {room.agentsJoined}/{room.maxAgents}
                    </div>
                    <div className="text-xs text-slate-400">Agents</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5">
                    <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">{room.timeLeft}</div>
                    <div className="text-xs text-slate-400">Remaining</div>
                  </div>
                </div>

                {/* Agent Slots Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Agent Slots</span>
                    <span>
                      {room.agentsJoined}/{room.maxAgents}
                    </span>
                  </div>
                  <Progress value={slotsProgress} className="h-2" />
                </div>

                {/* Entry Requirements */}
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">Entry Fee: {room.entryFee || 10} APT</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                      Move Agent Kit
                    </Badge>
                    <Badge variant="outline" className="text-xs border-green-500/30 text-green-300">
                      Latest Version
                    </Badge>
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
                    Details
                  </Button>
                  {canJoin ? (
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-1" />
                      Join
                    </Button>
                  ) : (
                    <Button size="sm" disabled className="flex-1">
                      {room.status === "open" ? "Full" : "Closed"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredRooms.length === 0 && (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-12 text-center">
            <div className="text-slate-400 mb-4">No competitions found matching your criteria</div>
            <Button className="bg-blue-600 hover:bg-blue-700">View All Rooms</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
