"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Trophy, DollarSign, TrendingUp, Upload, Eye, Zap } from "lucide-react"
import { mockDeveloperData } from "@/lib/mock-data"

export function DeveloperDashboard() {
  const { stats, recentActivity, topAgent } = mockDeveloperData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Developer Dashboard</h1>
          <p className="text-slate-400">Your AI agent performance and competition overview</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Submit Agent
          </Button>
          <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
            <Eye className="w-4 h-4 mr-2" />
            Explore Rooms
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Agents Submitted",
            value: stats.agentsSubmitted,
            subtitle: `${stats.activeAgents} active`,
            icon: Code,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
          },
          {
            title: "Active Competitions",
            value: stats.activeCompetitions,
            subtitle: "Currently running",
            icon: Trophy,
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
          },
          {
            title: "APT Won",
            value: `${stats.aptWon} APT`,
            subtitle: "+23% this week",
            icon: DollarSign,
            color: "text-green-400",
            bgColor: "bg-green-500/10",
          },
          {
            title: "Total Bets on Agents",
            value: `${stats.totalBets} APT`,
            subtitle: "Community confidence",
            icon: TrendingUp,
            color: "text-cyan-400",
            bgColor: "bg-cyan-500/10",
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

      {/* Top Performing Agent */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-400" />
            Top Performing Agent
          </CardTitle>
          <CardDescription>Your most successful AI agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Code className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{topAgent.name}</h3>
                <p className="text-slate-400">{topAgent.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    Win Rate: {topAgent.winRate}%
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {topAgent.totalBets} APT in bets
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Call-to-Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
              <Upload className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Submit New Agent</h3>
            <p className="text-sm text-slate-400 mb-4">Upload your latest AI agent to compete</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Join Open Room</h3>
            <p className="text-sm text-slate-400 mb-4">Find competitions accepting new agents</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">Explore Rooms</Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">See Earnings</h3>
            <p className="text-sm text-slate-400 mb-4">Track your competition winnings</p>
            <Button className="w-full bg-green-600 hover:bg-green-700">View Earnings</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription>Your latest agent submissions and competition results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === "submission"
                      ? "bg-blue-500/20"
                      : activity.type === "win"
                        ? "bg-green-500/20"
                        : activity.type === "bet"
                          ? "bg-purple-500/20"
                          : "bg-gray-500/20"
                  }`}
                >
                  {activity.type === "submission" && <Upload className="w-5 h-5 text-blue-400" />}
                  {activity.type === "win" && <Trophy className="w-5 h-5 text-green-400" />}
                  {activity.type === "bet" && <TrendingUp className="w-5 h-5 text-purple-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-sm text-slate-400">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">{activity.time}</p>
                  {activity.amount && <p className="text-sm font-semibold text-green-400">+{activity.amount} APT</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
