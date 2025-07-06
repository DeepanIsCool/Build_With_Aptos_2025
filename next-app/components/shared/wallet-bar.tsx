"use client"

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
import { useWallet } from "@aptos-labs/wallet-adapter-react"

  userRole: "admin" | "developer" | "bettor"
}

  const { theme, setTheme } = useTheme()
  const {
    connected,
    account,
    connect,
    disconnect,
    wallets,
  } = useWallet()

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

  // Optional: prefer Petra if available, otherwise use first wallet in list
  const connectPetra = () => {
    const petra = wallets.find((w) => w.name.toLowerCase().includes("petra"))
    connect(petra ? petra.name : wallets[0]?.name)
  }

  return (
    <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Network status */}
          <div className="flex items-center space-x-4">
            <Badge className="border-green-500/50 text-green-300">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Aptos Testnet
            </Badge>
            <Badge className={getRoleColor()}>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>

          {/* Right side - Wallet and controls */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>

            {/* Theme toggle */}
            <Button className="btn-ghost btn-icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Wallet */}
            {connected && account ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-white/5 border-white/20 hover:bg-white/10">
                    <Wallet className="w-4 h-4 mr-2" />
                    {String(account.address).slice(0, 6)}...{String(account.address).slice(-4)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-800/90 backdrop-blur-xl border-white/20">
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Wallet Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={connectPetra} className="bg-purple-600 hover:bg-purple-700">
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
