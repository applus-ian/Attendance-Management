"use client"

import { useState } from "react"
import ClockInButtons from "@/components/employee-modals/clock-in/clock-in-buttons"
import ManualRequestButton from "@/components/employee-modals/manual-clock-in/manual-request-button"
import ClockOutButton from "@/components/employee-modals/clock-out/clock-out-button"

export default function EmployeeModalsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
          <div className="flex flex-wrap gap-3">
            <ClockInButtons />
            <ManualRequestButton />
            <ClockOutButton />
          </div>
        </div>
        </div>
  )
}