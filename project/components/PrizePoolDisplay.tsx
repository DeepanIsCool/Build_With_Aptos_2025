'use client';

import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Coins, TrendingUp } from 'lucide-react';

export default function PrizePoolDisplay() {
  const { activeRoom } = useStore();

  if (!activeRoom) return null;

  const prizePool = activeRoom.prizePool;
  const winnerShare = prizePool * 0.4;
  const developerShare = prizePool * 0.4;
  const platformShare = prizePool * 0.2;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-purple-600" />
          <span className="text-purple-800">Prize Pool</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Coins className="w-8 h-8 text-yellow-500" />
            <span className="text-3xl font-bold text-yellow-600">
              {prizePool.toLocaleString()}
            </span>
            <span className="text-lg text-yellow-600">HC</span>
          </div>
          <p className="text-sm text-gray-600">Total Prize Pool</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-lg font-semibold text-green-600">
              {winnerShare.toLocaleString()} HC
            </div>
            <div className="text-xs text-gray-600">Winners (40%)</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-lg font-semibold text-blue-600">
              {developerShare.toLocaleString()} HC
            </div>
            <div className="text-xs text-gray-600">Developers (40%)</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-lg font-semibold text-purple-600">
              {platformShare.toLocaleString()} HC
            </div>
            <div className="text-xs text-gray-600">Platform (20%)</div>
          </div>
        </div>
        
        {prizePool > 0 && (
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Pool Growing!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}