'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Users, Coins, Zap } from 'lucide-react';
import { Agent } from '@/lib/store';
import BetModal from './BetModal';

interface AgentCardProps {
  agent: Agent;
  isLeader: boolean;
  userBet?: number;
}

export default function AgentCard({ agent, isLeader, userBet }: AgentCardProps) {
  const [showBetModal, setShowBetModal] = useState(false);
  const { user } = useStore();

  return (
    <>
      <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isLeader 
          ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' 
          : 'hover:shadow-md'
      }`}>
        {isLeader && (
          <div className="absolute top-3 right-3 z-10">
            <Crown className="w-6 h-6 text-yellow-500 drop-shadow-md" />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 border-2 border-gray-200">
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold">
                {agent.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{agent.name}</h3>
              <p className="text-sm text-gray-600 truncate">by {agent.developer}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700 line-clamp-2">{agent.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Max Bet</span>
              <div className="flex items-center space-x-1">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-yellow-600">
                  {agent.currentMaxBet.toLocaleString()} HC
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Backers</span>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-blue-600">{agent.backers}</span>
              </div>
            </div>
          </div>
          
          {userBet && (
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  Your bet: {userBet.toLocaleString()} HC
                </span>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {agent.strategy}
            </Badge>
          </div>
          
          <Button 
            onClick={() => setShowBetModal(true)}
            disabled={!user}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
          >
            Place Bet
          </Button>
        </CardContent>
      </Card>
      
      {showBetModal && (
        <BetModal 
          agent={agent}
          isOpen={showBetModal}
          onClose={() => setShowBetModal(false)}
          currentBet={userBet}
        />
      )}
    </>
  );
}