'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trophy, CheckCircle } from 'lucide-react';

export default function ClaimRewardsButton() {
  const { user, activeRoom, claimRewards } = useStore();
  const { toast } = useToast();
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  const userHasWinningBet = user?.bets.some(bet => bet.agentId === activeRoom?.winnerId);

  if (!userHasWinningBet || hasClaimed) {
    return null;
  }

  const handleClaim = async () => {
    setIsClaiming(true);
    
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    claimRewards();
    setHasClaimed(true);
    setIsClaiming(false);
    
    toast({
      title: "Rewards Claimed!",
      description: "Your winnings have been added to your wallet balance.",
      duration: 5000,
    });
  };

  return (
    <Button
      onClick={handleClaim}
      disabled={isClaiming}
      size="lg"
      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
    >
      {isClaiming ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Claiming Rewards...
        </>
      ) : (
        <>
          <Trophy className="w-5 h-5 mr-2" />
          Claim Your Rewards
        </>
      )}
    </Button>
  );
}