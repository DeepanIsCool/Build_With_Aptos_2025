"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, Edit, Pause, Play, Trash2, Users, DollarSign, Clock } from "lucide-react"
import { mockRooms } from "@/lib/mock-data"

export function RoomManagement() {
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
          <h1 className="text-3xl font-bold text-white">Room Management</h1>
          <p className="text-slate-400">Create, monitor, and control competitive arenas</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">Create New Room</Button>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search rooms by name or task..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-2">
              {["all", "open", "running", "ended", "paused"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-red-600" : "border-white/20 hover:bg-white/10"}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card
            key={room.id}
            className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-white mb-2">{room.name}</CardTitle>
                  <p className="text-sm text-slate-400 line-clamp-2">{room.task}</p>
                </div>
                <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 rounded-lg bg-white/5">
                  <DollarSign className="w-4 h-4 text-green-400 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">{room.prizePool} APT</div>
                  <div className="text-xs text-slate-400">Prize Pool</div>
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
                  <div className="text-xs text-slate-400">Time Left</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Agent Slots</span>
                  <span>
                    {room.agentsJoined}/{room.maxAgents}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(room.agentsJoined / room.maxAgents) * 100}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 border-white/20 hover:bg-white/10 bg-transparent">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
                  {room.status === "paused" ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                {room.status === "open" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-12 text-center">
            <div className="text-slate-400 mb-4">No rooms found matching your criteria</div>
            <Button className="bg-red-600 hover:bg-red-700">Create First Room</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
