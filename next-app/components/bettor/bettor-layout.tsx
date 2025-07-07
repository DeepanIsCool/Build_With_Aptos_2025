"use client"

import type { ReactNode } from "react"
import { TopBar } from "@/components/shared/top-bar"
import { BettorSidebar } from "./bettor-sidebar"
import { Users } from "lucide-react"

interface BettorLayoutProps {
  children: ReactNode
}

export function BettorLayout({ children }: BettorLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <TopBar 
        title="Bettor Panel"
        roleColor="text-green-400"
        roleBadgeColor="bg-green-500/20 text-green-300 border-green-500/30"
        roleIcon={Users}
      />
      <div className="flex">
        <BettorSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
