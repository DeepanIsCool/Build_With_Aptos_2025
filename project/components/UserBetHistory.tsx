'use client';

import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { History, Coins, Trophy, Calendar } from 'lucide-react';

export default function UserBetHistory() {
  const { user } = useStore();

  if (!user || user.betHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5 text-gray-500" />
            <span>Bet History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No betting history yet</p>
            <p className="text-gray-400 text-sm mt-2">Your past bets will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="w-5 h-5 text-blue-600" />
          <span>Bet History</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {user.betHistory.length}
            </div>
            <div className="text-sm text-blue-600">Total Bets</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {user.totalWinnings.toLocaleString()}
            </div>
            <div className="text-sm text-green-600">Total Winnings (HC)</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {user.betHistory.reduce((sum, bet) => sum + bet.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-purple-600">Total Bet (HC)</div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Recent Bets</h4>
          {user.betHistory.slice(-10).reverse().map((bet, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {bet.agentId.slice(-2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Agent {bet.agentId.slice(-4)}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(bet.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-yellow-600">
                      {bet.amount.toLocaleString()} HC
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}