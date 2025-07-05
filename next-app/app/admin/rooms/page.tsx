"use client"

import { RoomManagement } from "@/components/admin/room-management"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminRoomsPage() {
  return (
    <AdminLayout>
      <RoomManagement />
    </AdminLayout>
  )
}
