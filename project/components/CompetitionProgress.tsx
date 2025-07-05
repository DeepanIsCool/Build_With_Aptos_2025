'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, Trophy, Clock } from 'lucide-react';

interface CompetitionProgressProps {
  onComplete: () => void;
}

export default function CompetitionProgress({ onComplete }: CompetitionProgressProps) {
  const { activeRoom, updateAgentProgress } = useStore();
  const [timeLeft, setTimeLeft] = useState(30);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!activeRoom) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsComplete(true);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeRoom, onComplete]);

  useEffect(() => {
    if (!activeRoom || isComplete) return;

    const progressInterval = setInterval(() => {
      activeRoom.agents.forEach(agent => {
        const currentProgress = agent.progress || 0;
        const increment = Math.random() * 8 + 2; // Random progress 2-10%
        const newProgress = Math.min(currentProgress + increment, 100);
        updateAgentProgress(agent.id, newProgress);
      });
    }, 800);

    return () => clearInterval(progressInterval);
  }, [activeRoom, updateAgentProgress, isComplete]);

  if (!activeRoom) return null;

  const sortedAgents = [...activeRoom.agents].sort((a, b) => (b.progress || 0) - (a.progress || 0));

  return (
    <div className="space-y-6">
      {/* Timer */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
              <div className="text-4xl font-bold text-blue-600">
                {timeLeft}s
              </div>
            </div>
            <p className="text-blue-800 font-medium">Competition in Progress</p>
            <div className="mt-4 bg-white rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000"
                style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedAgents.map((agent, index) => (
          <Card key={agent.id} className={`relative overflow-hidden ${
            index === 0 ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''
          }`}>
            {index === 0 && (
              <div className="absolute top-3 right-3 z-10">
                <Trophy className="w-6 h-6 text-yellow-500 drop-shadow-md" />
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
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 truncate">{agent.name}</h3>
                    {index === 0 && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        Leading
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">by {agent.developer}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Progress</span>
                  <span className="text-sm font-bold text-gray-900">
                    {Math.round(agent.progress || 0)}%
                  </span>
                </div>
                <Progress 
                  value={agent.progress || 0} 
                  className="h-3"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{agent.strategy}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-600">
                    {agent.currentMaxBet.toLocaleString()} HC
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                {agent.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Message */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="animate-pulse">
              <Bot className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-lg font-medium text-purple-800">
              AI agents are analyzing the problem...
            </span>
          </div>
          <p className="text-purple-600 text-sm">
            Advanced algorithms are working to provide the best solution
          </p>
        </CardContent>
      </Card>
    </div>
  );
}