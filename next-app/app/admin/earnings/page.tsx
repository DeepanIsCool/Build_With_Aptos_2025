"use client"

import { PlatformEarnings } from "@/components/admin/platform-earnings"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminEarningsPage() {
  return (
    <AdminLayout>
      <PlatformEarnings />
    </AdminLayout>
  )
}
