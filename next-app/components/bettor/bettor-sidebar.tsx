"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  LayoutDashboard, 
  Trophy, 
  TrendingUp, 
  DollarSign, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Target,
  Crown,
  Settings,
  LogOut,
  Flame
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSimpleWallet } from "@/lib/simple-wallet-context"

const navigation = [
  { name: "Dashboard", href: "/bettor", icon: LayoutDashboard, badge: null },
  { name: "Arena Rooms", href: "/bettor/rooms", icon: Trophy, badge: "5 Live" },
  { name: "My Bets", href: "/bettor/bets", icon: TrendingUp, badge: "7" },
  { name: "Winnings", href: "/bettor/winnings", icon: DollarSign, badge: "Hot" },
  { name: "Profile", href: "/bettor/profile", icon: User, badge: null },
]

export function BettorSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { connectedUser } = useSimpleWallet()

  return (
    <div
      className={cn(
        "relative bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 flex flex-col h-full",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-green-500/5 before:to-transparent before:pointer-events-none",
        collapsed ? "w-16" : "w-72",
      )}
    >
      {/* Collapse toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-20 bg-slate-800/90 border border-slate-600/50 hover:bg-slate-700/90 shadow-lg backdrop-blur-sm"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="w-4 h-4 text-green-400" /> : <ChevronLeft className="w-4 h-4 text-green-400" />}
      </Button>

      <div className="flex flex-col h-full p-4">
        {/* Header Section */}
        <div className="mb-8">
          {!collapsed ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-slate-900">
                    <Flame className="w-2.5 h-2.5 text-white ml-0.5 mt-0.5" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Betting Arena</h2>
                  <p className="text-xs text-slate-400">Win Big</p>
                </div>
              </div>
              
              {/* User Profile */}
              <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-green-500/20 text-green-400 text-sm">
                      {connectedUser?.name?.charAt(0) || 'B'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {connectedUser?.name || 'Bettor'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        <Crown className="w-3 h-3 mr-1" />
                        VIP
                      </Badge>
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                        <Flame className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                    <p className="text-xs text-slate-400">Win Rate</p>
                    <p className="text-sm font-bold text-green-400">78%</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                    <p className="text-xs text-slate-400">Balance</p>
                    <p className="text-sm font-bold text-white">$2,450</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border border-slate-900">
                  <Flame className="w-2 h-2 text-white ml-0.5" />
                </div>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-green-500/20 text-green-400 text-xs">
                  {connectedUser?.name?.charAt(0) || 'B'}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left relative group transition-all duration-200",
                    "hover:bg-green-500/10 hover:text-green-300 hover:border-green-500/30",
                    "hover:shadow-lg hover:shadow-green-500/10",
                    isActive && [
                      "bg-gradient-to-r from-green-500/20 to-emerald-500/10",
                      "text-green-300 border border-green-500/30",
                      "shadow-lg shadow-green-500/20",
                      "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1",
                      "before:bg-gradient-to-b before:from-green-400 before:to-emerald-400 before:rounded-r"
                    ],
                    collapsed && "px-3",
                  )}
                >
                  <div className="flex items-center w-full">
                    <Icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-green-400" : "text-slate-400 group-hover:text-green-400",
                      !collapsed && "mr-3"
                    )} />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "ml-auto text-xs",
                              item.badge === "Hot" && "bg-orange-500/20 text-orange-300 border-orange-500/30 animate-pulse",
                              item.badge.includes("Live") && "bg-red-500/20 text-red-300 border-red-500/30",
                              !item.badge.includes("Hot") && !item.badge.includes("Live") && "bg-green-500/20 text-green-300 border-green-500/30"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto space-y-2">
          {!collapsed ? (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
