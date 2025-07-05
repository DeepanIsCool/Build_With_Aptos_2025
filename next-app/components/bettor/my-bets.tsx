"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Trophy, AlertCircle, RefreshCw, Eye } from "lucide-react"
import { mockBets } from "@/lib/mock-data"

export function MyBets() {
  const [filter, setFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "winning":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "outbid":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "won":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "lost":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const filteredBets = mockBets.filter((bet) => {
    if (filter === "all") return true
    if (filter === "active") return ["winning", "outbid", "pending"].includes(bet.status)
    if (filter === "claimable") return bet.status === "won"
    return bet.status === filter
  })

  const activeBets = mockBets.filter((bet) => ["winning", "outbid", "pending"].includes(bet.status))
  const claimableBets = mockBets.filter((bet) => bet.status === "won")
  const totalStaked = mockBets.reduce((sum, bet) => sum + bet.amount, 0)
  const potentialWinnings = activeBets.reduce((sum, bet) => sum + bet.potentialPayout, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Bets</h1>
          <p className="text-slate-400">Track and manage your betting positions</p>
        </div>
        <div className="flex space-x-3">
          {claimableBets.length > 0 && (
            <Button className="bg-green-600 hover:bg-green-700">
              <Trophy className="w-4 h-4 mr-2" />
              Claim Winnings ({claimableBets.length})
            </Button>
          )}
          <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Active Bets",
            value: activeBets.length,
            subtitle: "Currently running",
            icon: TrendingUp,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
          },
          {
            title: "Total Staked",
            value: `${totalStaked} APT`,
            subtitle: "All time",
            icon: DollarSign,
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
          },
          {
            title: "Potential Winnings",
            value: `${potentialWinnings} APT`,
            subtitle: "From active bets",
            icon: Trophy,
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/10",
          },
          {
            title: "Claimable",
            value: `${claimableBets.reduce((sum, bet) => sum + bet.potentialPayout, 0)} APT`,
            subtitle: `${claimableBets.length} winning bets`,
            icon: DollarSign,
            color: "text-green-400",
            bgColor: "bg-green-500/10",
          },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardContent className="p-4">
          <div className="flex gap-2">
            {[
              { key: "all", label: "All Bets" },
              { key: "active", label: "Active" },
              { key: "claimable", label: "Claimable" },
              { key: "won", label: "Won" },
              { key: "lost", label: "Lost" },
            ].map((filterOption) => (
              <Button
                key={filterOption.key}
                variant={filter === filterOption.key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption.key)}
                className={filter === filterOption.key ? "bg-green-600" : "border-white/20 hover:bg-white/10"}
              >
                {filterOption.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bets List */}
      <div className="space-y-4">
        {filteredBets.map((bet) => (
          <Card
            key={bet.id}
            className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{bet.agent}</h3>
                    <p className="text-sm text-slate-400">{bet.room}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-slate-300">
                        Bet: <span className="font-semibold text-white">{bet.amount} APT</span>
                      </span>
                      <span className="text-sm text-slate-300">
                        Odds: <span className="font-semibold text-white">{bet.odds}</span>
                      </span>
                      <span className="text-sm text-slate-300">
                        Potential: <span className="font-semibold text-green-400">{bet.potentialPayout} APT</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getStatusColor(bet.status)}>
                      {bet.status === "winning" && "🏆 Winning"}
                      {bet.status === "outbid" && "⚠️ Outbid"}
                      {bet.status === "pending" && "⏳ Pending"}
                      {bet.status === "won" && "✅ Won"}
                      {bet.status === "lost" && "❌ Lost"}
                    </Badge>
                    <p className="text-xs text-slate-400 mt-1">{bet.timestamp}</p>
                  </div>

                  <div className="flex space-x-2">
                    {bet.status === "outbid" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Re-bet
                      </Button>
                    )}
                    {bet.status === "won" && (
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        <Trophy className="w-4 h-4 mr-1" />
                        Claim
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Info for Active Bets */}
              {["winning", "outbid", "pending"].includes(bet.status) && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-400">
                        Current Position:{" "}
                        <span className="text-white font-semibold">#{bet.currentPosition || "N/A"}</span>
                      </span>
                      <span className="text-slate-400">
                        Competition Status: <span className="text-white">{bet.competitionStatus || "Running"}</span>
                      </span>
                    </div>
                    {bet.status === "outbid" && (
                      <div className="flex items-center text-red-400">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>Minimum to outbid: {bet.minToOutbid} APT</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBets.length === 0 && (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-12 text-center">
            <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Bets Found</h3>
            <p className="text-slate-400 mb-6">
              {filter === "all" ? "You haven't placed any bets yet" : `No ${filter} bets found`}
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Trophy className="w-4 h-4 mr-2" />
              Explore Arenas
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
