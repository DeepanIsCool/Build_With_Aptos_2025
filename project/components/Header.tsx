'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, LogOut, Coins } from 'lucide-react';

export default function Header() {
  const { user, isWalletConnected, disconnectWallet } = useStore();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Agent Arena
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {isWalletConnected && user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-yellow-600">
                    {user.balance.toLocaleString()} HC
                  </span>
                </div>
                <Badge variant="secondary" className="font-mono text-xs">
                  {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-gray-500">
                <Wallet className="w-4 h-4" />
                <span className="text-sm">Wallet not connected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}