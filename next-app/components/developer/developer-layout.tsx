"use client"

import type { ReactNode } from "react"
import { TopBar } from "@/components/shared/top-bar"
import { DeveloperSidebar } from "./developer-sidebar"
import { Code } from "lucide-react"

interface DeveloperLayoutProps {
  children: ReactNode
}

export function DeveloperLayout({ children }: DeveloperLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Top Bar */}
      <TopBar 
        title="Developer Panel"
        roleColor="text-blue-400"
        roleBadgeColor="bg-blue-500/20 text-blue-300 border-blue-500/30"
        roleIcon={Code}
      />
      <div className="flex">
        <DeveloperSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
