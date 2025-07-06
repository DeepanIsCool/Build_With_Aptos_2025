"use client"

import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSimpleWallet } from "@/lib/simple-wallet-context"
import { Crown, Plus, BarChart3, Trophy, LogOut, Home } from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const { connectedUser, disconnectWallet } = useSimpleWallet()

  const handleLogout = () => {
    disconnectWallet()
    router.push('/')
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Create Room', href: '/admin/create-room', icon: Plus },
    { name: 'Rooms', href: '/admin/rooms', icon: Trophy },
    { name: 'Earnings', href: '/admin/earnings', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Bar */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Crown className="h-8 w-8 text-red-400" />
                <span className="text-xl font-bold text-white">Admin Panel</span>
              </div>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                Administrator
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              {connectedUser && (
                <Card className="bg-slate-700/50 border-slate-600 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm font-medium">{connectedUser.name}</span>
                    <span className="text-slate-400 text-xs font-mono">
                      {connectedUser.address.slice(0, 6)}...{connectedUser.address.slice(-4)}
                    </span>
                  </div>
                </Card>
              )}
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-slate-700 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className="flex items-center gap-2 px-3 py-4 text-sm font-medium text-slate-300 hover:text-white border-b-2 border-transparent hover:border-red-400 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}
