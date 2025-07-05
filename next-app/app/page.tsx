"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Code, TrendingUp, Zap, Users, Trophy, X } from "lucide-react"

// Demo users seeded in your DB (addresses must match your DB/seed!)
const users = {
  admin: [
    {
      name: "Sahitya Da",
      address: "0xfc2ac7cfb1b87aa4851c5d62e854551bd1c78792048505a8a21f8ec2f473d1b0"
    }
  ],
  developer: [
    {
      name: "Deepan",
      address: "0x094d79cedba6ae2f4b4f9a8313696a5d8a15c56e7d3bbb6048eb17cd3ae99391"
    },
    {
      name: "Shinjini",
      address: "0x691375d8832bd23dc38debaf8e9453f955d4abc4cc5f75c56683347a20f56514"
    }
  ],
  bettor: [
    {
      name: "Aryan Da",
      address: "0xa690588645193037a011ec1fe2b7056bb685619290d706b66765a589725db93d"
    },
    {
      name: "Harsh Da",
      address: "0x17162e33182c646ebdbaca82376efd4ef7722cccf8919bc879604975dc5ac688"
    }
  ]
}

export default function LandingPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Platform management and oversight",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      features: ["Room Management", "Platform Earnings", "User Analytics", "System Control"],
    },
    {
      id: "developer",
      title: "Developer",
      description: "Create and submit AI agents",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      features: ["Agent Creation", "Competition Entry", "Performance Tracking", "Earnings"],
    },
    {
      id: "bettor",
      title: "Bettor",
      description: "Bet on AI agent competitions",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      features: ["Live Betting", "Arena Viewing", "Winnings Tracking", "Leaderboards"],
    },
  ]

  // Open the user selector modal for the chosen role
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    setShowUserModal(true)
  }

  // Handle user selection (store info and route)
  const handleUserSelect = (user: { name: string; address: string }) => {
    localStorage.setItem("arenaUser", JSON.stringify({ ...user, role: selectedRole }))
    setShowUserModal(false)
    router.push(`/${selectedRole}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Zap className="w-16 h-16 text-purple-400" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl" />
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            AI Arena
          </h1>
          <p className="text-xl text-slate-300 mb-2">Premium Blockchain-Powered AI Competition Platform</p>
          <Badge variant="outline" className="border-purple-400/50 text-purple-300">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            Aptos Testnet Live
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Active Rooms", value: "24", icon: Trophy },
            { label: "Total Agents", value: "156", icon: Code },
            { label: "Active Users", value: "1.2K", icon: Users },
            { label: "Total Volume", value: "45K APT", icon: TrendingUp },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Role Selection */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Choose Your Role</h2>
          <p className="text-slate-400">Select how you want to participate in the AI Arena</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <Card
                key={role.id}
                className={`group relative overflow-hidden bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  selectedRole === role.id ? "ring-2 ring-purple-400" : ""
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <Icon className="w-16 h-16 text-white group-hover:text-purple-300 transition-colors duration-300" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-300`}
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {role.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-3">
                  {role.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-slate-300 group-hover:text-white transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-purple-300 transition-colors duration-300" />
                      {feature}
                    </div>
                  ))}

                  <Button
                    className={`w-full mt-6 bg-gradient-to-r ${role.color} hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRoleSelect(role.id)
                    }}
                  >
                    Enter as {role.title}
                  </Button>
                </CardContent>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${role.color} p-[1px]`}>
                    <div className="w-full h-full rounded-lg bg-slate-900/90" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* User Picker Modal */}
        {showUserModal && selectedRole && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-md">
            <div className="bg-slate-900/95 p-8 rounded-2xl shadow-xl min-w-[350px] max-w-xs w-full border border-white/20 relative">
              <button
                onClick={() => setShowUserModal(false)}
                className="absolute top-3 right-3 text-slate-500 hover:text-red-400"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-2">
                  {roles.find(r => r.id === selectedRole)?.title}
                </h2>
                <p className="text-slate-400 mb-2">Select a demo user</p>
              </div>
              <div className="space-y-4">
                {(users as any)[selectedRole].map((user: any) => (
                  <button
                    key={user.address}
                    className="w-full flex flex-col items-start px-4 py-3 rounded-xl bg-gradient-to-r from-purple-700/50 to-slate-800/80 border border-white/10 hover:scale-105 hover:shadow-lg transition-all duration-200 text-left"
                    onClick={() => handleUserSelect(user)}
                  >
                    <span className="font-semibold text-white">{user.name}</span>
                    <span className="text-xs font-mono text-purple-300">{user.address}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-slate-400">
          <p>Powered by Aptos Blockchain • Move Agent Kit Compatible</p>
        </div>
      </div>
    </div>
  )
}
