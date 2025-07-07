"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  LayoutDashboard, 
  Search, 
  Code, 
  Upload, 
  DollarSign, 
  History, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  Star,
  Settings,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSimpleWallet } from "@/lib/simple-wallet-context"

const navigation = [
  { name: "Dashboard", href: "/developer", icon: LayoutDashboard, badge: null },
  { name: "Room Explorer", href: "/developer/rooms", icon: Search, badge: "New" },
  { name: "My Agents", href: "/developer/agents", icon: Code, badge: "3" },
  { name: "Submit Agent", href: "/developer/submit", icon: Upload, badge: null },
  { name: "Earnings", href: "/developer/earnings", icon: DollarSign, badge: null },
  { name: "History", href: "/developer/history", icon: History, badge: null },
]

export function DeveloperSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { connectedUser } = useSimpleWallet()

  return (
    <div
      className={cn(
        "relative bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 flex flex-col h-full",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-blue-500/5 before:to-transparent before:pointer-events-none",
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
        {collapsed ? <ChevronRight className="w-4 h-4 text-blue-400" /> : <ChevronLeft className="w-4 h-4 text-blue-400" />}
      </Button>

      <div className="flex flex-col h-full p-4">
        {/* Header Section */}
        <div className="mb-8">
          {!collapsed ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Developer Hub</h2>
                  <p className="text-xs text-slate-400">Build & Deploy</p>
                </div>
              </div>
              
              {/* User Profile */}
              <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-blue-500/20 text-blue-400 text-sm">
                      {connectedUser?.name?.charAt(0) || 'D'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {connectedUser?.name || 'Developer'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-slate-900 animate-pulse" />
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-blue-500/20 text-blue-400 text-xs">
                  {connectedUser?.name?.charAt(0) || 'D'}
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
                    "hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/30",
                    "hover:shadow-lg hover:shadow-blue-500/10",
                    isActive && [
                      "bg-gradient-to-r from-blue-500/20 to-cyan-500/10",
                      "text-blue-300 border border-blue-500/30",
                      "shadow-lg shadow-blue-500/20",
                      "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1",
                      "before:bg-gradient-to-b before:from-blue-400 before:to-cyan-400 before:rounded-r"
                    ],
                    collapsed && "px-3",
                  )}
                >
                  <div className="flex items-center w-full">
                    <Icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400",
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
                              item.badge === "New" && "bg-green-500/20 text-green-300 border-green-500/30",
                              item.badge !== "New" && "bg-blue-500/20 text-blue-300 border-blue-500/30"
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
