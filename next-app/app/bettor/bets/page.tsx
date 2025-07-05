"use client"

import { MyBets } from "@/components/bettor/my-bets"
import { BettorLayout } from "@/components/bettor/bettor-layout"

export default function MyBetsPage() {
  return (
    <BettorLayout>
      <MyBets />
    </BettorLayout>
  )
}
