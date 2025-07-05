"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp, DollarSign, Activity, Eye, Zap, Target } from "lucide-react"
import { mockBettorData } from "@/lib/mock-data"

export function BettorDashboard() {
  const { stats, hotBets, recentActivity } = mockBettorData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Betting Dashboard</h1>
          <p className="text-slate-400">Track your bets and discover winning opportunities</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-green-600 hover:bg-green-700">
            <Trophy className="w-4 h-4 mr-2" />
            View Arenas
          </Button>
          <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
            <Eye className="w-4 h-4 mr-2" />
            My Bets
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Active Bets",
            value: stats.activeBets,
            subtitle: `${stats.totalBetAmount} APT wagered`,
            icon: TrendingUp,
            color: "text-green-400",
            bgColor: "bg-green-500/10",
          },
          {
            title: "Total Winnings",
            value: `${stats.totalWinnings} APT`,
            subtitle: "+18% this week",
            icon: DollarSign,
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/10",
          },
          {
            title: "Win Rate",
            value: `${stats.winRate}%`,
            subtitle: "Last 30 days",
            icon: Target,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
          },
          {
            title: "Competitions Joined",
            value: stats.competitionsJoined,
            subtitle: "All time",
            icon: Trophy,
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
          },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300"
            >
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

      {/* Hot Bets Section */}
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 text-green-400" />
            Hot Betting Opportunities
          </CardTitle>
          <CardDescription>High-potential agents with favorable odds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hotBets.map((bet, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{bet.agentName}</h4>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{bet.odds}</Badge>
                </div>
                <p className="text-sm text-slate-300 mb-2">{bet.room}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Pool: {bet.currentPool} APT</span>
                  <span className="text-green-400 font-semibold">+{bet.potentialReturn}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Arenas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Arena */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Featured Arena
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
              <h3 className="text-lg font-bold text-white mb-2">AI Trading Championship</h3>
              <p className="text-sm text-slate-300 mb-3">Elite trading bots compete in live market simulation</p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 text-sm">
                  <span className="text-slate-400">
                    Prize: <span className="text-yellow-400 font-semibold">5,000 APT</span>
                  </span>
                  <span className="text-slate-400">
                    Agents: <span className="text-white">8/10</span>
                  </span>
                </div>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  Place Bet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activity.type === "bet"
                        ? "bg-green-500/20"
                        : activity.type === "win"
                          ? "bg-yellow-500/20"
                          : activity.type === "outbid"
                            ? "bg-red-500/20"
                            : "bg-blue-500/20"
                    }`}
                  >
                    {activity.type === "bet" && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {activity.type === "win" && <Trophy className="w-4 h-4 text-yellow-400" />}
                    {activity.type === "outbid" && <Activity className="w-4 h-4 text-red-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{activity.title}</p>
                    <p className="text-xs text-slate-400">{activity.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">{activity.time}</p>
                    {activity.amount && (
                      <p
                        className={`text-sm font-semibold ${
                          activity.type === "win"
                            ? "text-green-400"
                            : activity.type === "outbid"
                              ? "text-red-400"
                              : "text-white"
                        }`}
                      >
                        {activity.type === "win" ? "+" : activity.type === "outbid" ? "" : "-"}
                        {activity.amount} APT
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
              <Trophy className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Explore Arenas</h3>
            <p className="text-sm text-slate-400 mb-4">Find live competitions to bet on</p>
            <Button className="w-full bg-green-600 hover:bg-green-700">Browse Arenas</Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">My Active Bets</h3>
            <p className="text-sm text-slate-400 mb-4">Track your current positions</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">View Bets</Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/30 transition-colors">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Claim Winnings</h3>
            <p className="text-sm text-slate-400 mb-4">Collect your successful bets</p>
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Claim Rewards</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
