'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CreateRoomForm from '@/components/CreateRoomForm';
import AdminAgentForm from '@/components/AdminAgentForm';
import { ArrowLeft, Settings, Users, Target, Trophy } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { activeRoom, isWalletConnected } = useStore();

  useEffect(() => {
    if (!isWalletConnected) {
      router.push('/');
    }
  }, [isWalletConnected, router]);

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-2">Manage rooms and agents</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-500" />
            <Badge variant="secondary">Admin Mode</Badge>
          </div>
        </div>

        {/* Current Room Status */}
        {activeRoom && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-green-600" />
                <span>Current Room Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">Problem Set</span>
                  </div>
                  <p className="text-sm text-blue-700 line-clamp-2">
                    {activeRoom.problemStatement}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-purple-800">Agents</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">
                    {activeRoom.agents.length}/4
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-800">Prize Pool</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {activeRoom.prizePool.toLocaleString()} HC
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Room Form */}
          <div>
            <CreateRoomForm />
          </div>

          {/* Add Agent Form */}
          <div>
            <AdminAgentForm />
          </div>
        </div>

        {/* Current Agents */}
        {activeRoom && activeRoom.agents.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Current Agents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeRoom.agents.map((agent, index) => (
                  <div key={agent.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                        <p className="text-xs text-gray-600">by {agent.developer}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Strategy:</span>
                        <span className="font-medium">{agent.strategy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Bet:</span>
                        <span className="font-medium">{agent.currentMaxBet} HC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Backers:</span>
                        <span className="font-medium">{agent.backers}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}