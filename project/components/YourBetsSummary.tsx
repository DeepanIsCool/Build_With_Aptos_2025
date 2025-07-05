'use client';

import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Zap, Coins, Users } from 'lucide-react';

export default function YourBetsSummary() {
  const { user, activeRoom } = useStore();

  if (!user || !activeRoom || user.bets.length === 0) {
    return null;
  }

  const totalBets = user.bets.reduce((sum, bet) => sum + bet.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <span>Your Bets</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Total Bet Amount</span>
          <div className="flex items-center space-x-1">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="font-bold text-yellow-600">
              {totalBets.toLocaleString()} HC
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          {user.bets.map((bet) => {
            const agent = activeRoom.agents.find(a => a.id === bet.agentId);
            if (!agent) return null;
            
            return (
              <div key={bet.agentId} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold text-sm">
                      {agent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 truncate">
                        {agent.name}
                      </span>
                      {bet.amount === agent.currentMaxBet && (
                        <Badge variant="secondary" className="text-xs">
                          Top Backer
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Coins className="w-3 h-3 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-600">
                          {bet.amount.toLocaleString()} HC
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-blue-500" />
                        <span className="text-sm text-blue-600">
                          {agent.backers} backers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center text-sm text-gray-500">
          {user.bets.length < 2 && (
            <p>You can bet on {2 - user.bets.length} more agent{2 - user.bets.length > 1 ? 's' : ''}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}