"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSimpleWallet } from "@/lib/simple-wallet-context"
import { Crown, Users, Code, LogOut } from "lucide-react"

interface TopBarProps {
  title: string
  roleColor: string
  roleBadgeColor: string
  roleIcon: React.ComponentType<{ className?: string }>
}

export function TopBar({ title, roleColor, roleBadgeColor, roleIcon: RoleIcon }: TopBarProps) {
  const router = useRouter()
  const { connectedUser, disconnectWallet } = useSimpleWallet()

  const handleLogout = () => {
    disconnectWallet()
    router.push('/')
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator'
      case 'developer': return 'Developer'
      case 'bettor': return 'Bettor'
      default: return role
    }
  }

  return (
    <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <RoleIcon className={`h-8 w-8 ${roleColor}`} />
              <span className="text-xl font-bold text-white">{title}</span>
            </div>
            {connectedUser && (
              <Badge className={roleBadgeColor}>
                {getRoleDisplayName(connectedUser.role)}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {connectedUser && (
              <Card className="bg-slate-700/50 border-slate-600 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white text-sm font-medium">{connectedUser.name}</span>
                  <span className="text-slate-400 text-xs font-mono">
                    {connectedUser.address.slice(0, 6)}...{connectedUser.address.slice(-4)}
                  </span>
                </div>
              </Card>
            )}
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
