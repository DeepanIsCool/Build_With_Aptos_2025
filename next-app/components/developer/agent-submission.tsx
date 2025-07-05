"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, Code, CheckCircle, AlertCircle, FileText, Zap, ExternalLink } from "lucide-react"

export function AgentSubmission() {
  const [submissionType, setSubmissionType] = useState<"upload" | "contract">("upload")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [contractAddress, setContractAddress] = useState("")
  const [isValidated, setIsValidated] = useState(false)
  const [agentMetadata, setAgentMetadata] = useState({
    name: "",
    description: "",
    strategy: "",
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Simulate validation
      setTimeout(() => setIsValidated(true), 1500)
    }
  }

  const validateContract = () => {
    // Simulate contract validation
    setTimeout(() => setIsValidated(true), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Submit AI Agent</h1>
        <p className="text-slate-400">Deploy your agent to compete in the arena</p>
      </div>

      {/* Submission Type Tabs */}
      <Tabs value={submissionType} onValueChange={(value) => setSubmissionType(value as "upload" | "contract")}>
        <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
          <TabsTrigger value="upload" className="data-[state=active]:bg-blue-600">
            <Upload className="w-4 h-4 mr-2" />
            Upload Agent (Simple)
          </TabsTrigger>
          <TabsTrigger value="contract" className="data-[state=active]:bg-blue-600">
            <Code className="w-4 h-4 mr-2" />
            Contract Address (Advanced)
          </TabsTrigger>
        </TabsList>

        {/* Upload Flow */}
        <TabsContent value="upload" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Download className="w-5 h-5 mr-2 text-blue-400" />
                Step 1: Download Starter Agent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-400">Get the Move Agent Kit-compliant boilerplate to build your agent</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download Move Agent Kit Template
              </Button>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <FileText className="w-4 h-4" />
                <span>Includes: agent.move, examples, documentation</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Step 2: Edit Locally</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-white/10">
                <p className="text-slate-300 mb-2">Edit your agent using your preferred IDE:</p>
                <code className="text-sm text-green-400 block">
                  {`// agent.move
module MyAgent {
    // Implement your strategy here
    public fun execute_strategy(): u64 {
        // Your AI logic
    }
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="w-5 h-5 mr-2 text-blue-400" />
                Step 3: Upload Your Agent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-blue-400/50 transition-colors">
                <input
                  type="file"
                  accept=".move,.zip"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="agent-upload"
                />
                <label htmlFor="agent-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 mb-2">Drop your agent files here or click to browse</p>
                  <p className="text-sm text-slate-500">Supports: .move files, .zip archives</p>
                </label>
              </div>

              {uploadedFile && (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-slate-400">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    {isValidated ? (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Move Agent Kit Detected!
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Validating...
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contract Address Flow */}
        <TabsContent value="contract" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-400" />
                Deploy Contract Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contract-address" className="text-white">
                  On-Chain Contract Address
                </Label>
                <Input
                  id="contract-address"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="0x1234567890abcdef..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 font-mono"
                />
              </div>

              <Button onClick={validateContract} disabled={!contractAddress} className="bg-blue-600 hover:bg-blue-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Fetch & Validate Contract
              </Button>

              {isValidated && contractAddress && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-medium">Contract Verified!</span>
                  </div>
                  <p className="text-sm text-slate-300">Move Agent Kit compliance confirmed</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-green-500/30 text-green-300 hover:bg-green-500/10 bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View on Aptos Explorer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Agent Metadata */}
      {isValidated && (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Agent Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="agent-name" className="text-white">
                Agent Name
              </Label>
              <Input
                id="agent-name"
                value={agentMetadata.name}
                onChange={(e) => setAgentMetadata((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., TradingBot Pro"
                className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>

            <div>
              <Label htmlFor="agent-description" className="text-white">
                Description
              </Label>
              <Textarea
                id="agent-description"
                value={agentMetadata.description}
                onChange={(e) => setAgentMetadata((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your agent's capabilities and approach..."
                className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>

            <div>
              <Label htmlFor="agent-strategy" className="text-white">
                Strategy Highlights
              </Label>
              <Textarea
                id="agent-strategy"
                value={agentMetadata.strategy}
                onChange={(e) => setAgentMetadata((prev) => ({ ...prev, strategy: e.target.value }))}
                placeholder="Key features of your agent's strategy..."
                className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      {isValidated && (
        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 px-8">
            <Zap className="w-5 h-5 mr-2" />
            Submit Agent to Arena
          </Button>
          <p className="text-sm text-slate-400 mt-2">
            This will deploy your agent to Aptos Testnet and register it for competitions
          </p>
        </div>
      )}
    </div>
  )
}
