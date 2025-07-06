"use client"

import type { ReactNode } from "react"
import { DeveloperSidebar } from "./developer-sidebar"

interface DeveloperLayoutProps {
  children: ReactNode
}

export function DeveloperLayout({ children }: DeveloperLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      <div className="flex">
        <DeveloperSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
