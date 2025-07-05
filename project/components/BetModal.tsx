'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Coins, AlertTriangle, Crown, CheckCircle } from 'lucide-react';
import { Agent } from '@/lib/store';

interface BetModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
  currentBet?: number;
}

export default function BetModal({ agent, isOpen, onClose, currentBet }: BetModalProps) {
  const { user, placeBet } = useStore();
  const [betAmount, setBetAmount] = useState(currentBet?.toString() || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const amount = parseFloat(betAmount);
    
    if (!amount || amount <= 0) {
      setError('Please enter a valid bet amount');
      return;
    }
    
    if (!user) {
      setError('Please connect your wallet first');
      return;
    }
    
    if (amount > user.balance) {
      setError('Insufficient balance');
      return;
    }
    
    // Check if user already has 2 bets on different agents
    const existingBets = user.bets.filter(bet => bet.agentId !== agent.id);
    if (existingBets.length >= 2) {
      setError('You can only bet on up to 2 agents');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    placeBet(agent.id, amount);
    setIsProcessing(false);
    onClose();
  };

  const willBecomeLeader = user && parseFloat(betAmount) > agent.currentMaxBet;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold">
                {agent.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-lg font-semibold">{agent.name}</span>
              <p className="text-sm text-gray-600 font-normal">by {agent.developer}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bet-amount">Bet Amount (HC)</Label>
            <div className="relative">
              <Coins className="absolute left-3 top-3 h-4 w-4 text-yellow-500" />
              <Input
                id="bet-amount"
                type="number"
                placeholder="Enter amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="pl-10"
                min="1"
                step="1"
              />
            </div>
          </div>
          
          {user && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Your Balance:</span>
                <span className="font-semibold text-gray-900">
                  {user.balance.toLocaleString()} HC
                </span>
              </div>
            </div>
          )}
          
          {willBecomeLeader && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <Crown className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                You'll become the agent's top backer with this bet!
              </AlertDescription>
            </Alert>
          )}
          
          {currentBet && (
            <Alert className="bg-blue-50 border-blue-200">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                You currently have {currentBet.toLocaleString()} HC bet on this agent.
              </AlertDescription>
            </Alert>
          )}
          
          <Alert className="bg-orange-50 border-orange-200">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              You can bet on up to 2 agents per room.
            </AlertDescription>
          </Alert>
          
          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isProcessing || !betAmount || !user}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
            >
              {isProcessing ? 'Processing...' : 'Confirm Bet'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}