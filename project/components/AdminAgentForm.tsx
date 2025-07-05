'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Bot, Plus } from 'lucide-react';

const STRATEGIES = [
  'Deep Learning',
  'Machine Learning',
  'Neural Network',
  'Transformer',
  'CNN',
  'RNN',
  'Ensemble',
  'Reinforcement Learning',
  'Genetic Algorithm',
  'Expert System'
];

const PRESET_AVATARS = [
  'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/8438979/pexels-photo-8438979.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=100',
];

export default function AdminAgentForm() {
  const [agentData, setAgentData] = useState({
    name: '',
    developer: '',
    description: '',
    strategy: '',
    avatar: PRESET_AVATARS[0],
  });
  const [isCreating, setIsCreating] = useState(false);
  const { activeRoom, addAgent } = useStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeRoom) {
      toast({
        title: "Error",
        description: "No active room found. Please create a room first.",
        variant: "destructive",
      });
      return;
    }

    if (activeRoom.agents.length >= 4) {
      toast({
        title: "Error",
        description: "Maximum 4 agents allowed per room.",
        variant: "destructive",
      });
      return;
    }

    if (!agentData.name || !agentData.developer || !agentData.description || !agentData.strategy) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addAgent({
      name: agentData.name,
      developer: agentData.developer,
      description: agentData.description,
      strategy: agentData.strategy,
      avatar: agentData.avatar,
    });
    
    setAgentData({
      name: '',
      developer: '',
      description: '',
      strategy: '',
      avatar: PRESET_AVATARS[0],
    });
    
    setIsCreating(false);
    
    toast({
      title: "Agent Added!",
      description: `${agentData.name} has been added to the competition.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-purple-600" />
          <span>Add AI Agent</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name *</Label>
              <Input
                id="agent-name"
                placeholder="e.g., MedVision AI"
                value={agentData.name}
                onChange={(e) => setAgentData(prev => ({ ...prev, name: e.target.value }))}
                maxLength={50}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="developer">Developer *</Label>
              <Input
                id="developer"
                placeholder="e.g., Dr. Sarah Chen"
                value={agentData.developer}
                onChange={(e) => setAgentData(prev => ({ ...prev, developer: e.target.value }))}
                maxLength={50}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the agent's capabilities and approach..."
              value={agentData.description}
              onChange={(e) => setAgentData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-20"
              maxLength={200}
            />
            <p className="text-sm text-gray-500">
              {agentData.description.length}/200 characters
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strategy">Strategy *</Label>
              <Select value={agentData.strategy} onValueChange={(value) => setAgentData(prev => ({ ...prev, strategy: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  {STRATEGIES.map(strategy => (
                    <SelectItem key={strategy} value={strategy}>
                      {strategy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <Select value={agentData.avatar} onValueChange={(value) => setAgentData(prev => ({ ...prev, avatar: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select avatar" />
                </SelectTrigger>
                <SelectContent>
                  {PRESET_AVATARS.map((avatar, index) => (
                    <SelectItem key={index} value={avatar}>
                      <div className="flex items-center space-x-2">
                        <img src={avatar} alt={`Avatar ${index + 1}`} className="w-6 h-6 rounded-full" />
                        <span>Avatar {index + 1}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Current Room Status</h4>
            <div className="text-sm text-gray-600">
              <p>Agents: {activeRoom?.agents.length || 0}/4</p>
              <p>Problem: {activeRoom?.problemStatement ? 'Set' : 'Not set'}</p>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={isCreating || !activeRoom || activeRoom.agents.length >= 4}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding Agent...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Agent
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}