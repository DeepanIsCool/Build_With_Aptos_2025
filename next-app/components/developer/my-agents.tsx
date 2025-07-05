"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Eye, Copy, Share, Trophy, TrendingUp, DollarSign, Activity } from "lucide-react"
import { mockAgents } from "@/lib/mock-data"

export function MyAgents() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "eliminated":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Agents</h1>
          <p className="text-slate-400">Manage and monitor your AI agent portfolio</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Code className="w-4 h-4 mr-2" />
          Submit New Agent
        </Button>
      </div>

      {/* Agent Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Agents", value: "12", icon: Code, color: "text-blue-400" },
          { label: "Active Competitions", value: "5", icon: Activity, color: "text-green-400" },
          { label: "Total Winnings", value: "2,450 APT", icon: Trophy, color: "text-yellow-400" },
          { label: "Avg Win Rate", value: "68%", icon: TrendingUp, color: "text-purple-400" },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4 text-center">
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockAgents.map((agent) => (
          <Card
            key={agent.id}
            className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Code className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white group-hover:text-blue-300 transition-colors">
                      {agent.name}
                    </CardTitle>
                    <p className="text-sm text-slate-400">{agent.room}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(agent.status)}>{agent.status}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5 text-center">
                  <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">{agent.betsPlaced}</div>
                  <div className="text-xs text-slate-400">Bets Placed</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 text-center">
                  <DollarSign className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">{agent.currentOdds}</div>
                  <div className="text-xs text-slate-400">Current Odds</div>
                </div>
              </div>

              {/* Agent Description */}
              <p className="text-sm text-slate-400 line-clamp-2">{agent.description}</p>

              {/* Verification Badge */}
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                  ✓ Move Agent Kit Verified
                </Badge>
                {agent.status === "active" && (
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">Live</Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 border-white/20 hover:bg-white/10 bg-transparent">
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
                  <Share className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Stats */}
              {agent.status === "active" && (
                <div className="pt-2 border-t border-white/10">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Performance Rank</span>
                    <span className="text-white font-semibold">#{agent.rank || "N/A"}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockAgents.length === 0 && (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-12 text-center">
            <Code className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Agents Yet</h3>
            <p className="text-slate-400 mb-6">Create your first AI agent to start competing</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Code className="w-4 h-4 mr-2" />
              Submit Your First Agent
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
