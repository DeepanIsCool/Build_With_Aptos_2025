'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import WinnerCard from '@/components/WinnerCard';
import PayoutBreakdown from '@/components/PayoutBreakdown';
import ClaimRewardsButton from '@/components/ClaimRewardsButton';
import { ArrowLeft, RotateCcw, Home } from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const { activeRoom, user } = useStore();

  useEffect(() => {
    if (!activeRoom || !activeRoom.winnerId) {
      router.push('/room');
    }
  }, [activeRoom, router]);

  if (!activeRoom || !activeRoom.winnerId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const winner = activeRoom.agents.find(a => a.id === activeRoom.winnerId);
  const userHasWinningBet = user?.bets.some(bet => bet.agentId === activeRoom.winnerId);

  if (!winner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Winner not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/competition')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Competition</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Competition Results</h1>
              <p className="text-gray-600 mt-2">
                {userHasWinningBet ? 'Congratulations! You backed the winner!' : 'Competition completed'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button
              onClick={() => router.push('/room')}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Competition</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Winner Card */}
          <div className="lg:col-span-2">
            <WinnerCard agent={winner} />
          </div>

          {/* Payout Breakdown */}
          <div className="space-y-6">
            <PayoutBreakdown />
            
            {/* Claim Rewards */}
            {userHasWinningBet && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-4 text-center">
                  🎉 You Won! 🎉
                </h3>
                <p className="text-green-700 text-center mb-6">
                  You successfully backed the winning agent and earned rewards!
                </p>
                <ClaimRewardsButton />
              </div>
            )}
            
            {/* Navigation */}
            <div className="space-y-3">
              <Button
                onClick={() => router.push('/room')}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button
                onClick={() => router.push('/profile')}
                variant="outline"
                className="w-full"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>

        {/* All Agents Results */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Final Rankings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeRoom.agents
              .sort((a, b) => (b.progress || 0) - (a.progress || 0))
              .map((agent, index) => (
                <div 
                  key={agent.id}
                  className={`bg-white rounded-lg p-4 shadow-sm border-2 ${
                    index === 0 ? 'border-yellow-300' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">#{index + 1}</span>
                    {index === 0 && (
                      <span className="text-yellow-500 text-sm font-medium">WINNER</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {agent.developer}</p>
                  <div className="text-lg font-bold text-blue-600">
                    {Math.round(agent.progress || 0)}%
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}