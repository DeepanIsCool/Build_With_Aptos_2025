'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import AgentCard from '@/components/AgentCard';
import ProblemStatement from '@/components/ProblemStatement';
import PrizePoolDisplay from '@/components/PrizePoolDisplay';
import YourBetsSummary from '@/components/YourBetsSummary';
import HowItWorksModal from '@/components/HowItWorksModal';
import { ArrowRight, Users, Trophy } from 'lucide-react';

export default function RoomPage() {
  const router = useRouter();
  const { isWalletConnected, activeRoom, user, createRoom, addAgent } = useStore();

  useEffect(() => {
    if (!isWalletConnected) {
      router.push('/');
      return;
    }

    // Initialize demo room if none exists
    if (!activeRoom) {
      createRoom("Develop an AI system that can analyze medical images and provide accurate diagnostic recommendations for early-stage cancer detection.");
      
      // Add demo agents
      setTimeout(() => {
        addAgent({
          name: "MedVision AI",
          developer: "Dr. Sarah Chen",
          description: "Advanced neural network trained on 10M+ medical images with 98% accuracy in preliminary trials.",
          avatar: "/api/placeholder/64/64",
          strategy: "Deep Learning"
        });

        addAgent({
          name: "DiagnosticGPT",
          developer: "TechMed Labs",
          description: "Large language model fine-tuned for medical diagnostics with real-time analysis capabilities.",
          avatar: "/api/placeholder/64/64",
          strategy: "Transformer"
        });

        addAgent({
          name: "VisionNet Pro",
          developer: "AI Health Corp",
          description: "Ensemble model combining computer vision and machine learning for comprehensive medical analysis.",
          avatar: "/api/placeholder/64/64",
          strategy: "Ensemble"
        });

        addAgent({
          name: "ScanAnalyzer",
          developer: "MedTech Solutions",
          description: "Specialized convolutional neural network optimized for radiological image interpretation.",
          avatar: "/api/placeholder/64/64",
          strategy: "CNN"
        });
      }, 100);
    }
  }, [isWalletConnected, activeRoom, createRoom, addAgent, router]);

  if (!isWalletConnected) {
    return null;
  }

  if (!activeRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading room...</p>
        </div>
      </div>
    );
  }

  const leaderAgent = activeRoom.agents.reduce((leader, agent) => 
    agent.currentMaxBet > (leader?.currentMaxBet || 0) ? agent : leader
  , null);

  const userBets = user?.bets || [];
  const canStartCompetition = activeRoom.agents.length > 0 && activeRoom.prizePool > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Agent Arena</h1>
            <p className="text-gray-600 mt-2">Place your bets and watch the competition unfold</p>
          </div>
          <div className="flex items-center space-x-4">
            <HowItWorksModal />
            {canStartCompetition && (
              <Button
                onClick={() => router.push('/competition')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
              >
                Start Competition
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Problem Statement */}
        <div className="mb-8">
          <ProblemStatement />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Agents Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Competing Agents ({activeRoom.agents.length}/4)
              </h2>
              
              {activeRoom.agents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No agents registered yet</p>
                  <p className="text-gray-400 text-sm mt-2">Agents will appear here when they join the competition</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeRoom.agents.map((agent) => {
                    const userBet = userBets.find(bet => bet.agentId === agent.id);
                    const isLeader = leaderAgent?.id === agent.id;
                    
                    return (
                      <AgentCard
                        key={agent.id}
                        agent={agent}
                        isLeader={isLeader}
                        userBet={userBet?.amount}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PrizePoolDisplay />
            <YourBetsSummary />
            
            {/* Competition Status */}
            {activeRoom.agents.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Competition Status</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Agents Ready</span>
                    <span className="font-semibold text-green-600">
                      {activeRoom.agents.length}/4
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Bets</span>
                    <span className="font-semibold text-blue-600">
                      {activeRoom.agents.reduce((sum, agent) => sum + agent.backers, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="font-semibold text-orange-600">
                      {activeRoom.status === 'betting' ? 'Betting Open' : 'In Progress'}
                    </span>
                  </div>
                </div>
                
                {canStartCompetition && (
                  <Button
                    onClick={() => router.push('/competition')}
                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    Start Competition
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}