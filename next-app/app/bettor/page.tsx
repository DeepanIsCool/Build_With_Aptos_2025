"use client"

import { BettorDashboard } from "@/components/bettor/bettor-dashboard"
import { BettorLayout } from "@/components/bettor/bettor-layout"

export default function BettorPage() {
  return (
    <BettorLayout>
      <BettorDashboard />
    </BettorLayout>
  )
}
