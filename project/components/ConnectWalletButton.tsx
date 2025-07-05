'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle } from 'lucide-react';

export default function ConnectWalletButton() {
  const { connectWallet, isWalletConnected } = useStore();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock wallet address
    const mockAddress = `0x${Math.random().toString(16).slice(2, 42)}`;
    connectWallet(mockAddress);
    
    setIsConnecting(false);
  };

  if (isWalletConnected) {
    return (
      <Button size="lg" disabled className="bg-green-500 hover:bg-green-600">
        <CheckCircle className="w-5 h-5 mr-2" />
        Wallet Connected
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg"
    >
      <Wallet className="w-5 h-5 mr-2" />
      {isConnecting ? 'Connecting...' : 'Connect Petra Wallet'}
    </Button>
  );
}