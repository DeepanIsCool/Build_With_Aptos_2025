"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Trophy, TrendingUp, DollarSign, User, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/bettor", icon: LayoutDashboard },
  { name: "Arena Rooms", href: "/bettor/rooms", icon: Trophy },
  { name: "My Bets", href: "/bettor/bets", icon: TrendingUp },
  { name: "Winnings", href: "/bettor/winnings", icon: DollarSign },
  { name: "Profile", href: "/bettor/profile", icon: User },
]

export function BettorSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative bg-slate-800/50 backdrop-blur-xl border-r border-white/10 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Collapse toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-10 bg-slate-800 border border-white/20 hover:bg-slate-700"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>

      <div className="p-4">
        {/* Logo/Title */}
        <div className="mb-8">
          {!collapsed ? (
            <h2 className="text-xl font-bold text-green-400">Betting Arena</h2>
          ) : (
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left hover:bg-green-500/10 hover:text-green-300",
                    isActive && "bg-green-500/20 text-green-300 border border-green-500/30",
                    collapsed && "px-2",
                  )}
                >
                  <Icon className={cn("w-5 h-5", !collapsed && "mr-3")} />
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
