"use client"

import type { ReactNode } from "react"
import { WalletBar } from "@/components/shared/wallet-bar"
import { AdminSidebar } from "./admin-sidebar"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
      <WalletBar userRole="admin" />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
