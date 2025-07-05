'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import CompetitionProgress from '@/components/CompetitionProgress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CompetitionPage() {
  const router = useRouter();
  const { activeRoom, setCompetitionWinner, setActiveRoom } = useStore();
  const [competitionComplete, setCompetitionComplete] = useState(false);

  useEffect(() => {
    if (!activeRoom) {
      router.push('/room');
      return;
    }

    // Set room status to in_progress
    setActiveRoom({ ...activeRoom, status: 'in_progress' });
  }, [activeRoom, setActiveRoom, router]);

  const handleCompetitionComplete = () => {
    if (!activeRoom) return;

    // Find the agent with the highest progress
    const winner = activeRoom.agents.length > 0
      ? activeRoom.agents.reduce((leader, agent) =>
          (agent.progress || 0) > (leader.progress || 0) ? agent : leader
        )
      : null;

    if (winner) {
      setCompetitionWinner(winner.id);
      setCompetitionComplete(true);
      
      // Navigate to results after a brief delay
      setTimeout(() => {
        router.push('/results');
      }, 2000);
    }
  };

  if (!activeRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading competition...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/room')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Room</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Competition</h1>
              <p className="text-gray-600 mt-2">Watch the agents compete in real-time</p>
            </div>
          </div>
        </div>

        {/* Competition Progress */}
        <CompetitionProgress onComplete={handleCompetitionComplete} />

        {/* Competition Complete Message */}
        {competitionComplete && (
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Competition Complete!</h2>
              <p className="text-gray-600">Calculating results and preparing rewards...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}