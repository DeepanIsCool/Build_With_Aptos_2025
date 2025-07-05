"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, DollarSign, Activity, AlertTriangle, Plus, Eye, TrendingUp } from "lucide-react"
import { mockAdminData } from "@/lib/mock-data"

export function AdminDashboard() {
  const { overview, alerts, quickStats } = mockAdminData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mission Control</h1>
          <p className="text-slate-400">Platform health and management overview</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Room
          </Button>
          <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
            <Eye className="w-4 h-4 mr-2" />
            View All Rooms
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Rooms",
            value: overview.totalRooms,
            subtitle: `${overview.activeRooms} active`,
            icon: Trophy,
            color: "text-red-400",
            bgColor: "bg-red-500/10",
          },
          {
            title: "Total Agents",
            value: overview.totalAgents,
            subtitle: `${overview.activeBets} bets placed`,
            icon: Users,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
          },
          {
            title: "Platform Earnings",
            value: `${overview.platformEarnings} APT`,
            subtitle: "+12% this week",
            icon: DollarSign,
            color: "text-green-400",
            bgColor: "bg-green-500/10",
          },
          {
            title: "Active Users",
            value: overview.activeUsers,
            subtitle: "Last 24h",
            icon: Activity,
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

      {/* System Status & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-400" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Network</span>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Testnet Live</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Last Block</span>
              <span className="text-white font-mono">#1,234,567</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Platform Wallet</span>
              <span className="text-white font-mono">0xabcd...1234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Uptime</span>
              <span className="text-green-400">99.9%</span>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Center */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
              Alerts Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === "warning" ? "bg-yellow-400" : alert.type === "error" ? "bg-red-400" : "bg-blue-400"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-white">{alert.message}</p>
                  <p className="text-xs text-slate-400">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
            Platform Analytics
          </CardTitle>
          <CardDescription>Real-time platform performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
                <div className={`text-xs ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
