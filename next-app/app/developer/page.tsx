"use client"

import { RoomExplorer } from "@/components/developer/room-explorer"
import { DeveloperLayout } from "@/components/developer/developer-layout"

export default function DeveloperPage() {
  return (
    <DeveloperLayout>
      <RoomExplorer />
    </DeveloperLayout>
  )
}
