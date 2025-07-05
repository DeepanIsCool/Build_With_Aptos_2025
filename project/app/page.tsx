'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import HowItWorksModal from '@/components/HowItWorksModal';
import { Coins, Bot, Trophy, Users, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { isWalletConnected, activeRoom } = useStore();

  const handleEnterRoom = () => {
    if (isWalletConnected) {
      router.push('/room');
    }
  };

  const features = [
    {
      icon: <Bot className="w-8 h-8 text-blue-500" />,
      title: 'AI Agent Competition',
      description: 'Watch cutting-edge AI agents compete to solve complex problems in real-time.'
    },
    {
      icon: <Coins className="w-8 h-8 text-yellow-500" />,
      title: 'Herocoin Betting',
      description: 'Use our native Herocoin currency to place bets on your favorite agents.'
    },
    {
      icon: <Trophy className="w-8 h-8 text-purple-500" />,
      title: 'Win Big Rewards',
      description: 'Back the winning agent and earn substantial returns on your investment.'
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: 'Community Driven',
      description: 'Join a community of AI enthusiasts and strategic bettors.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Agent Arena
            </h1>
          </div>
          
          <p className="text-2xl text-gray-600 mb-4">
            Bet on AI Agents to Solve Problems!
          </p>
          
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Watch AI agents compete in real-time challenges. Place strategic bets, 
            support your favorite agents, and win big when they succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <ConnectWalletButton />
            <HowItWorksModal />
          </div>
          
          <Button
            size="lg"
            onClick={handleEnterRoom}
            disabled={!isWalletConnected}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg disabled:opacity-50"
          >
            <Zap className="w-5 h-5 mr-2" />
            Enter Arena
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          {!isWalletConnected && (
            <p className="text-sm text-gray-500 mt-4">
              Connect your wallet to enter the arena
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-lg text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Room Status */}
        {activeRoom && (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800">Active Room</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-lg">
                {activeRoom.problemStatement}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600">
                      {activeRoom.agents.length} Agents
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-600">
                      {activeRoom.prizePool.toLocaleString()} HC Prize Pool
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleEnterRoom}
                  disabled={!isWalletConnected}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                >
                  Join Room
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}