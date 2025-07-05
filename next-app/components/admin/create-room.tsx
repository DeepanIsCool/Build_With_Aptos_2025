"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Upload, Calendar, DollarSign, Eye, Zap } from "lucide-react"

export function CreateRoom() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    task: "",
    entryFee: 10,
    prizePool: 500,
    maxAgents: [10],
    deadline: "",
    minBet: 1,
    maxBet: 100,
  })

  const [step, setStep] = useState(1)
  const totalSteps = 4

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Basic Information</h3>
              <p className="text-slate-400">Set up the foundation of your competition arena</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Room Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Trading Bot Championship"
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the competition and what participants should expect..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="task" className="text-white">
                  Challenge/Task
                </Label>
                <Textarea
                  id="task"
                  value={formData.task}
                  onChange={(e) => handleInputChange("task", e.target.value)}
                  placeholder="Define the specific challenge agents must solve..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 min-h-[120px]"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Financial Settings</h3>
              <p className="text-slate-400">Configure entry fees, prize pools, and betting limits</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="entryFee" className="text-white">
                  Entry Fee (APT)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="entryFee"
                    type="number"
                    value={formData.entryFee}
                    onChange={(e) => handleInputChange("entryFee", Number(e.target.value))}
                    className="pl-10 bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="prizePool" className="text-white">
                  Prize Pool (APT)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="prizePool"
                    type="number"
                    value={formData.prizePool}
                    onChange={(e) => handleInputChange("prizePool", Number(e.target.value))}
                    className="pl-10 bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="minBet" className="text-white">
                  Minimum Bet (APT)
                </Label>
                <Input
                  id="minBet"
                  type="number"
                  value={formData.minBet}
                  onChange={(e) => handleInputChange("minBet", Number(e.target.value))}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="maxBet" className="text-white">
                  Maximum Bet (APT)
                </Label>
                <Input
                  id="maxBet"
                  type="number"
                  value={formData.maxBet}
                  onChange={(e) => handleInputChange("maxBet", Number(e.target.value))}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Competition Settings</h3>
              <p className="text-slate-400">Set agent limits and deadlines</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-4 block">Maximum Agents: {formData.maxAgents[0]}</Label>
                <Slider
                  value={formData.maxAgents}
                  onValueChange={(value) => handleInputChange("maxAgents", value)}
                  max={50}
                  min={2}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>2 agents</span>
                  <span>50 agents</span>
                </div>
              </div>

              <div>
                <Label htmlFor="deadline" className="text-white">
                  Competition Deadline
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Agent Type Requirements</Label>
                <div className="mt-2 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Move Agent Kit Compatible</Badge>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Latest Version</Badge>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">
                    Only agents built with the Move Agent Kit framework will be accepted
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Review & Create</h3>
              <p className="text-slate-400">Verify your settings before launching the arena</p>
            </div>

            {/* Preview Card */}
            <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Arena Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-400">Room Name</div>
                    <div className="text-white font-semibold">{formData.name || "Untitled Room"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Max Agents</div>
                    <div className="text-white font-semibold">{formData.maxAgents[0]} agents</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Prize Pool</div>
                    <div className="text-white font-semibold">{formData.prizePool} APT</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Entry Fee</div>
                    <div className="text-white font-semibold">{formData.entryFee} APT</div>
                  </div>
                </div>

                {formData.deadline && (
                  <div>
                    <div className="text-sm text-slate-400">Deadline</div>
                    <div className="text-white font-semibold">{new Date(formData.deadline).toLocaleString()}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File Upload */}
            <div>
              <Label className="text-white">Additional Resources (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400">Drop dataset or resource files here</p>
                <p className="text-xs text-slate-500 mt-1">Supports: .csv, .json, .txt, .zip</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Create Competition Arena</h1>
        <p className="text-slate-400">Spin up a new AI agent competition</p>
      </div>

      {/* Progress Steps */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    stepNum === step
                      ? "bg-red-600 text-white"
                      : stepNum < step
                        ? "bg-green-600 text-white"
                        : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {stepNum < step ? "✓" : stepNum}
                </div>
                {stepNum < totalSteps && (
                  <div className={`w-16 h-1 mx-2 ${stepNum < step ? "bg-green-600" : "bg-slate-700"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400">
              Step {step} of {totalSteps}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardContent className="p-8">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="border-white/20 hover:bg-white/10"
        >
          Previous
        </Button>

        {step < totalSteps ? (
          <Button onClick={() => setStep(Math.min(totalSteps, step + 1))} className="bg-red-600 hover:bg-red-700">
            Next Step
          </Button>
        ) : (
          <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:opacity-90">
            <Zap className="w-4 h-4 mr-2" />
            Create Arena
          </Button>
        )}
      </div>
    </div>
  )
}
