"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useSimpleWallet } from "@/lib/simple-wallet-context"
import { Zap, Trophy, Users, DollarSign, Target, Sparkles } from "lucide-react"

export function CreateRoom() {
  const { connectedUser } = useSimpleWallet()
  const { toast } = useToast()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    problemStatement: "",
    maxAgents: 2,
    entryFee: 100000,
    minBet: 500000,
    maxBet: 5000000,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateRoom = async () => {
    if (!connectedUser) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive"
      })
      return
    }

    setIsCreating(true)
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          admin: connectedUser.address
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Success! 🎉",
          description: `Room "${formData.name}" created successfully!`,
        })
        // Reset form
        setFormData({
          name: "",
          description: "",
          problemStatement: "",
          maxAgents: 2,
          entryFee: 100000,
          minBet: 500000,
          maxBet: 5000000,
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50" />
              <Trophy className="relative h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Create Competition Room</h1>
          <p className="text-slate-400">Set up a new AI agent competition arena</p>
        </div>

        {/* Main Form */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-400" />
              Room Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Room Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Math Challenge Arena"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAgents" className="text-white font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Max Agents
                </Label>
                <Input
                  id="maxAgents"
                  type="number"
                  value={formData.maxAgents}
                  onChange={(e) => handleInputChange("maxAgents", parseInt(e.target.value))}
                  min="2"
                  max="10"
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the competition theme and objectives..."
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
              />
            </div>

            {/* Problem Statement */}
            <div className="space-y-2">
              <Label htmlFor="problemStatement" className="text-white font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Problem Statement
              </Label>
              <Textarea
                id="problemStatement"
                value={formData.problemStatement}
                onChange={(e) => handleInputChange("problemStatement", e.target.value)}
                placeholder="Define the specific problem agents need to solve..."
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[120px]"
              />
            </div>

            {/* Financial Settings */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="entryFee" className="text-white font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Entry Fee (Octas)
                </Label>
                <Input
                  id="entryFee"
                  type="number"
                  value={formData.entryFee}
                  onChange={(e) => handleInputChange("entryFee", parseInt(e.target.value))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <p className="text-xs text-slate-400">≈ {(formData.entryFee / 100000000).toFixed(4)} APT</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minBet" className="text-white font-medium">
                  Min Bet (Octas)
                </Label>
                <Input
                  id="minBet"
                  type="number"
                  value={formData.minBet}
                  onChange={(e) => handleInputChange("minBet", parseInt(e.target.value))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <p className="text-xs text-slate-400">≈ {(formData.minBet / 100000000).toFixed(4)} APT</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxBet" className="text-white font-medium">
                  Max Bet (Octas)
                </Label>
                <Input
                  id="maxBet"
                  type="number"
                  value={formData.maxBet}
                  onChange={(e) => handleInputChange("maxBet", parseInt(e.target.value))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <p className="text-xs text-slate-400">≈ {(formData.maxBet / 100000000).toFixed(4)} APT</p>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                Room Preview
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Agents:</span>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      {formData.maxAgents}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Entry Fee:</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                      {(formData.entryFee / 100000000).toFixed(4)} APT
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bet Range:</span>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {(formData.minBet / 100000000).toFixed(2)} - {(formData.maxBet / 100000000).toFixed(2)} APT
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
                      Ready to Create
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Button */}
            <Button 
              onClick={handleCreateRoom}
              disabled={isCreating || !formData.name || !formData.description || !formData.problemStatement}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Creating Room...
                </>
              ) : (
                <>
                  <Trophy className="h-5 w-5 mr-2" />
                  Create Competition Room
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
