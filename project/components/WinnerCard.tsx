'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Star, Sparkles } from 'lucide-react';
import { Agent } from '@/lib/store';

interface WinnerCardProps {
  agent: Agent;
}

export default function WinnerCard({ agent }: WinnerCardProps) {
  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-xl relative overflow-hidden">
      {/* Confetti Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-4 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </div>
        <div className="absolute top-8 right-8 animate-bounce delay-100">
          <Star className="w-3 h-3 text-orange-500" />
        </div>
        <div className="absolute bottom-8 left-8 animate-bounce delay-200">
          <Star className="w-3 h-3 text-yellow-500" />
        </div>
        <div className="absolute bottom-4 right-4 animate-bounce delay-300">
          <Sparkles className="w-4 h-4 text-orange-500" />
        </div>
      </div>

      {/* Crown */}
      <div className="absolute top-4 right-4 z-10">
        <Crown className="w-8 h-8 text-yellow-500 drop-shadow-md" />
      </div>

      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 font-bold">
            WINNER
          </Badge>
        </div>
        
        <Avatar className="w-24 h-24 mx-auto border-4 border-yellow-300 shadow-lg">
          <AvatarImage src={agent.avatar} alt={agent.name} />
          <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-2xl">
            {agent.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <h1 className="text-3xl font-bold text-gray-900 mt-4">{agent.name}</h1>
        <p className="text-lg text-gray-600">by {agent.developer}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-2">
            {Math.round(agent.progress || 0)}% Complete
          </div>
          <p className="text-gray-700">
            Successfully solved the problem with {agent.strategy} approach
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Strategy Details</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {agent.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {agent.currentMaxBet.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Max Bet (HC)</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {agent.backers}
            </div>
            <div className="text-sm text-gray-600">Backers</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}