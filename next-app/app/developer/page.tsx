"use client"

import { DeveloperDashboard } from "@/components/developer/developer-dashboard"
import { DeveloperLayout } from "@/components/developer/developer-layout"

export default function DeveloperPage() {
  return (
    <DeveloperLayout>
      <DeveloperDashboard />
    </DeveloperLayout>
  )
}
