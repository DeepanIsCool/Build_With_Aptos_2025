"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Bell, Settings, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface WalletBarProps {
  userRole: "admin" | "developer" | "bettor"
}

export function WalletBar({ userRole }: WalletBarProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress] = useState("0x1234...5678")
  const { theme, setTheme } = useTheme()

  const connectWallet = () => {
    // TODO: Integrate with Petra wallet
    setIsConnected(true)
  }

  const getRoleColor = () => {
    switch (userRole) {
      case "admin":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "developer":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "bettor":
        return "bg-green-500/20 text-green-300 border-green-500/30"
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Network status */}
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-green-500/50 text-green-300">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Aptos Testnet
            </Badge>
            <Badge variant="outline" className={getRoleColor()}>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>

          {/* Right side - Wallet and controls */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>

            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Wallet */}
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10">
                    <Wallet className="w-4 h-4 mr-2" />
                    {walletAddress}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-800/90 backdrop-blur-xl border-white/20">
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Wallet Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsConnected(false)}>Disconnect</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={connectWallet} className="bg-purple-600 hover:bg-purple-700">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Petra
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
