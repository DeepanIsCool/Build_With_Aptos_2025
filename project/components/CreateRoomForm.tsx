'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Target } from 'lucide-react';

export default function CreateRoomForm() {
  const [problemStatement, setProblemStatement] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { createRoom } = useStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!problemStatement.trim()) {
      toast({
        title: "Error",
        description: "Please enter a problem statement",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    createRoom(problemStatement.trim());
    setProblemStatement('');
    setIsCreating(false);
    
    toast({
      title: "Room Created!",
      description: "New competition room has been created successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-600" />
          <span>Create New Room</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="problem-statement">Problem Statement</Label>
            <Textarea
              id="problem-statement"
              placeholder="Describe the problem that AI agents should solve..."
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              className="min-h-32"
              maxLength={500}
            />
            <p className="text-sm text-gray-500">
              {problemStatement.length}/500 characters
            </p>
          </div>
          
          <Button
            type="submit"
            disabled={isCreating || !problemStatement.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Room...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Start New Room
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}