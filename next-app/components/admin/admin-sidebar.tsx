"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Trophy, Plus, DollarSign, FileText, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Rooms", href: "/admin/rooms", icon: Trophy },
  { name: "Create Room", href: "/admin/create-room", icon: Plus },
  { name: "Earnings", href: "/admin/earnings", icon: DollarSign },
  { name: "Audit Log", href: "/admin/audit", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
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
            <h2 className="text-xl font-bold text-red-400">Admin Panel</h2>
          ) : (
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-red-400" />
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
                    "w-full justify-start text-left hover:bg-red-500/10 hover:text-red-300",
                    isActive && "bg-red-500/20 text-red-300 border border-red-500/30",
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
