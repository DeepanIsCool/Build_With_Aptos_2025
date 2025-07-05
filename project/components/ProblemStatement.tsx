'use client';

import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, Users } from 'lucide-react';

export default function ProblemStatement() {
  const { activeRoom } = useStore();

  if (!activeRoom) return null;

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-slate-600" />
          <span className="text-slate-800">Problem Statement</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {activeRoom.problemStatement}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">
                {activeRoom.agents.length} Agents
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-500" />
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {activeRoom.status === 'betting' ? 'Betting Open' : 
                 activeRoom.status === 'in_progress' ? 'In Progress' : 'Settled'}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}