"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { AddScheduleDialog } from "@/components/schedule/add-schedule-dialog"
import { ScheduleList } from "@/components/schedule/schedule-list"
import { HolidayList } from "@/components/holiday/holiday-list"
import { AddHolidayDialog } from "@/components/holiday/add-holiday-dialog"

export function ScheduleHeader() {
  const [activeTab, setActiveTab] = useState("schedules")
  const [isAddScheduleDialogOpen, setIsAddScheduleDialogOpen] = useState(false)
  const [isAddHolidayDialogOpen, setIsAddHolidayDialogOpen] = useState(false)

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Schedule</h1>
        {activeTab === "schedules" ? (
          <Button
            onClick={() => setIsAddScheduleDialogOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Schedule
          </Button>
        ) : (
          <Button
            onClick={() => setIsAddHolidayDialogOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Holiday
          </Button>
        )}
      </div>

      <Tabs defaultValue="schedules" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger
            value="schedules"
            className={`flex-1 sm:flex-none ${activeTab === "schedules" ? "bg-muted" : ""}`}
          >
            Schedules
          </TabsTrigger>
          <TabsTrigger value="holidays" className={`flex-1 sm:flex-none ${activeTab === "holidays" ? "bg-muted" : ""}`}>
            Holidays
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedules">
          <ScheduleList />
        </TabsContent>

        <TabsContent value="holidays">
          <HolidayList />
        </TabsContent>
      </Tabs>

      <AddScheduleDialog open={isAddScheduleDialogOpen} onOpenChange={setIsAddScheduleDialogOpen} />
      <AddHolidayDialog open={isAddHolidayDialogOpen} onOpenChange={setIsAddHolidayDialogOpen} />
    </div>
  )
}
