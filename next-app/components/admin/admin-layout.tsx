"use client"

import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { TopBar } from "@/components/shared/top-bar"
import { Crown, Plus, BarChart3, Trophy, Home } from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Create Room', href: '/admin/create-room', icon: Plus },
    { name: 'Rooms', href: '/admin/rooms', icon: Trophy },
    { name: 'Earnings', href: '/admin/earnings', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Bar */}
      <TopBar 
        title="Admin Panel"
        roleColor="text-red-400"
        roleBadgeColor="bg-red-500/20 text-red-300 border-red-500/30"
        roleIcon={Crown}
      />

      {/* Navigation */}
      <div className="border-b border-slate-700 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className="flex items-center gap-2 px-3 py-4 text-sm font-medium text-slate-300 hover:text-white border-b-2 border-transparent hover:border-red-400 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}
