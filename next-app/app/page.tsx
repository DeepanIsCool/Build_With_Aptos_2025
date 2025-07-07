"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Code, TrendingUp, Zap, Users, Trophy, Wallet, Smartphone } from "lucide-react"
import { useSimpleWallet } from "@/lib/simple-wallet-context"

// Demo users with correct addresses for hackathon
const users = {
  admin: [
    {
      name: "Deepan (Admin)",
      address: "0xbf63114b92ed90297f1886ede79305269d163a3b368ba8ff448f0b1b6a744bbb"
    }
  ],
  developer: [
    {
      name: "Aryan Da",
      address: "0x094d79cedba6ae2f4b4f9a8313696a5d8a15c56e7d3bbb6048eb17cd3ae99391"
    },
    {
      name: "Shinjini",
      address: "0x691375d8832bd23dc38debaf8e9453f955d4abc4cc5f75c56683347a20f56514"
    }
  ],
  bettor: [
    {
      name: "Sahitya Da",
      address: "0xa690588645193037a011ec1fe2b7056bb685619290d706b66765a589725db93d"
    },
    {
      name: "Manish",
      address: "0x17162e33182c646ebdbaca82376efd4ef7722cccf8919bc879604975dc5ac688"
    }
  ]
}

export default function LandingPage() {
  const router = useRouter()
  const { connectedUser, connectDemoWallet, connectRealWallet, isConnected, isConnecting } = useSimpleWallet()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)

  // Redirect if already connected
  useEffect(() => {
    if (isConnected && connectedUser) {
      router.push(`/${connectedUser.role}`)
    }
  }, [isConnected, connectedUser, router])

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Platform management and oversight",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      features: ["Create Competition Rooms", "Manage Competitions", "Declare Winners", "Platform Analytics"]
    },
    {
      id: "developer",
      title: "Developer",
      description: "Submit and manage AI agents",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      features: ["Submit AI Agents", "Join Competitions", "Track Performance", "Earn Rewards"]
    },
    {
      id: "bettor",
      title: "Bettor",
      description: "Bet on AI agent competitions",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      features: ["Browse Competitions", "Place Bets", "Track Winnings", "Live Results"]
    }
  ]

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    setShowWalletModal(true)
  }

  const handleDemoWalletSelect = (user: any) => {
    connectDemoWallet({
      ...user,
      role: selectedRole as 'admin' | 'developer' | 'bettor'
    })
    setShowWalletModal(false)
  }

  const handleRealWalletConnect = async () => {
    if (selectedRole) {
      await connectRealWallet(selectedRole as 'admin' | 'developer' | 'bettor')
      setShowWalletModal(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Subtle overlay for uniform appearance */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50" />
                <Trophy className="relative h-20 w-20 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SOLYRIX
              </span>
              <br />
              <span className="text-3xl md:text-5xl">ARENA</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              The ultimate blockchain-powered AI competition platform where intelligent agents battle for supremacy
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="px-4 py-2 text-sm bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Zap className="w-4 h-4 mr-2" />
                Powered by Aptos
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Users className="w-4 h-4 mr-2" />
                Decentralized Betting
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm bg-green-500/20 text-green-300 border-green-500/30">
                <Trophy className="w-4 h-4 mr-2" />
                AI Competitions
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Select your role to enter the arena and start your journey in the world of AI competitions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <Card 
                key={role.id}
                className="relative group cursor-pointer transition-all duration-300 hover:scale-105 bg-slate-800/40 border-slate-700/50 hover:border-slate-600/60 backdrop-blur-md glass-strong"
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`} />
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${role.color} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
                    <div className="relative bg-slate-800 rounded-full p-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-slate-300">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color} mr-3`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 bg-gradient-to-r ${role.color} hover:opacity-90 text-white border-0 transition-all duration-300 group-hover:shadow-lg`}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect as {role.title}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Enhanced Wallet Selection Modal */}
      <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
        <DialogContent className="bg-slate-800/90 border-slate-700/60 text-white max-w-md backdrop-blur-lg glass-strong">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Connect as {(selectedRole ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1) : "")}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="demo" className="data-[state=active]:bg-slate-600">
                Demo Profiles
              </TabsTrigger>
              <TabsTrigger value="real" className="data-[state=active]:bg-slate-600">
                Real Wallet
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="demo" className="space-y-3 mt-4">
              <div className="text-center mb-4">
                <p className="text-sm text-slate-400">
                  Use pre-configured demo accounts for smooth presentation
                </p>
              </div>
              {selectedRole && users[selectedRole as keyof typeof users].map((user, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer transition-all duration-200 hover:scale-105 bg-slate-700/40 border-slate-600/50 hover:border-purple-500/60 backdrop-blur-sm glass"
                  onClick={() => handleDemoWalletSelect(user)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{user.name}</h3>
                        <p className="text-sm text-slate-400 font-mono">
                          {user.address.slice(0, 6)}...{user.address.slice(-4)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                          Demo
                        </Badge>
                        <Wallet className="h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="real" className="space-y-4 mt-4">
              <div className="text-center mb-4">
                <p className="text-sm text-slate-400">
                  Connect your real Petra wallet for blockchain interaction
                </p>
              </div>
              
              <Card className="bg-slate-700/30 border-slate-600/50 backdrop-blur-sm glass">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-lg opacity-50" />
                      <Smartphone className="relative h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Petra Wallet</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Connect your Petra wallet to interact with Aptos blockchain
                  </p>
                  <Button 
                    onClick={handleRealWalletConnect}
                    disabled={isConnecting}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    {isConnecting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="h-4 w-4 mr-2" />
                        Connect Petra Wallet
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
              
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  Make sure you have Petra wallet installed and connected to Aptos testnet
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
