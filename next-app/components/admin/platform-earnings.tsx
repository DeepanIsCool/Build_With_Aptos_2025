"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Download, Wallet, ArrowUpRight, Calendar } from "lucide-react"
import { mockEarningsData } from "@/lib/mock-data"

export function PlatformEarnings() {
  const { totalEarnings, availableBalance, withdrawnAmount, earningsHistory, monthlyStats } = mockEarningsData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Platform Earnings</h1>
          <p className="text-slate-400">Monitor and manage platform revenue</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Wallet className="w-4 h-4 mr-2" />
          Withdraw Available
        </Button>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-300 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-white">{totalEarnings} APT</p>
                <p className="text-xs text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15.3% this month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/20">
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-300 mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-white">{availableBalance} APT</p>
                <p className="text-xs text-blue-400">Ready to withdraw</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Wallet className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300 mb-1">Total Withdrawn</p>
                <p className="text-3xl font-bold text-white">{withdrawnAmount} APT</p>
                <p className="text-xs text-purple-400">Lifetime withdrawals</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/20">
                <ArrowUpRight className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-400" />
            Monthly Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
                <div className={`text-xs ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Earnings History */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Earnings History</CardTitle>
          <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {earningsHistory.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{entry.room}</div>
                    <div className="text-sm text-slate-400">{entry.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">+{entry.amount} APT</div>
                  <Badge
                    className={
                      entry.status === "withdrawn"
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        : "bg-green-500/20 text-green-300 border-green-500/30"
                    }
                  >
                    {entry.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
