'use client';

import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Coins, Users, Building, Crown } from 'lucide-react';

export default function PayoutBreakdown() {
  const { activeRoom, user } = useStore();

  if (!activeRoom || !activeRoom.winnerId) return null;

  const winner = activeRoom.agents.find(a => a.id === activeRoom.winnerId);
  if (!winner) return null;

  const totalPrizePool = activeRoom.prizePool;
  const winnerShare = totalPrizePool * 0.4;
  const developerShare = totalPrizePool * 0.4;
  const platformShare = totalPrizePool * 0.2;

  const userWinningBet = user?.bets.find(bet => bet.agentId === activeRoom.winnerId);
  const userPayout = userWinningBet ? userWinningBet.amount + winnerShare : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span>Payout Breakdown</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {totalPrizePool.toLocaleString()} HC
          </div>
          <p className="text-gray-600">Total Prize Pool</p>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold text-green-800">Winners</div>
                <div className="text-sm text-green-600">Backers of {winner.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-600">
                {winnerShare.toLocaleString()} HC
              </div>
              <div className="text-sm text-green-600">40% of pool</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Crown className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-semibold text-blue-800">Developer</div>
                <div className="text-sm text-blue-600">{winner.developer}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">
                {developerShare.toLocaleString()} HC
              </div>
              <div className="text-sm text-blue-600">40% of pool</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-semibold text-purple-800">Platform</div>
                <div className="text-sm text-purple-600">AI Agent Arena</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-purple-600">
                {platformShare.toLocaleString()} HC
              </div>
              <div className="text-sm text-purple-600">20% of pool</div>
            </div>
          </div>
        </div>
        
        {userWinningBet && (
          <>
            <Separator />
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center space-x-2 mb-3">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-yellow-800">Your Winnings</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-700">Original Bet:</span>
                  <span className="font-medium text-yellow-800">
                    {userWinningBet.amount.toLocaleString()} HC
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-700">Bonus Reward:</span>
                  <span className="font-medium text-yellow-800">
                    {winnerShare.toLocaleString()} HC
                  </span>
                </div>
                <Separator className="bg-yellow-200" />
                <div className="flex justify-between">
                  <span className="font-semibold text-yellow-800">Total Payout:</span>
                  <span className="text-xl font-bold text-yellow-600">
                    {userPayout.toLocaleString()} HC
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}