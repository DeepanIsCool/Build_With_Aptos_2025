"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Search, Code, Upload, DollarSign, History, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/developer", icon: LayoutDashboard },
  { name: "Room Explorer", href: "/developer/rooms", icon: Search },
  { name: "My Agents", href: "/developer/agents", icon: Code },
  { name: "Submit Agent", href: "/developer/submit", icon: Upload },
  { name: "Earnings", href: "/developer/earnings", icon: DollarSign },
  { name: "History", href: "/developer/history", icon: History },
]

export function DeveloperSidebar() {
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
            <h2 className="text-xl font-bold text-blue-400">Developer Hub</h2>
          ) : (
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-blue-400" />
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
                    "w-full justify-start text-left hover:bg-blue-500/10 hover:text-blue-300",
                    isActive && "bg-blue-500/20 text-blue-300 border border-blue-500/30",
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
