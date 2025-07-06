"use client"

import type { ReactNode } from "react"
import { BettorSidebar } from "./bettor-sidebar"

interface BettorLayoutProps {
  children: ReactNode
}

export function BettorLayout({ children }: BettorLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900">
      <div className="flex">
        <BettorSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
