"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddScheduleDialog } from "@/components/schedule/add-schedule-dialog"
import ScheduleList from "./schedule-list"
import { HolidayList } from "@/components/superadmin/holiday/holiday-list"
import { AddHolidayDialog } from "@/components/superadmin/holiday/add-holiday-dialog"
import { useSchedules } from "@/hooks/useSchedules"
import toast from "react-hot-toast"




export function ScheduleHeader() {
  const [activeTab, setActiveTab] = useState("schedules")
  const [isAddScheduleDialogOpen, setIsAddScheduleDialogOpen] = useState(false)
  const [isAddHolidayDialogOpen, setIsAddHolidayDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0);

  
  const handleAddScheduleDialogChange = (open: boolean) => {
    setIsAddScheduleDialogOpen(open);
    if (!open) {
      setRefreshKey(prev => prev + 1); 
    }
  };

  return (
    <div className="mb-6">
      {/* Tabs and Button in one row */}
      <h1 className="text-2xl font-semibold mb-6">Schedules</h1>
      <div className="flex items-center justify-between mb-6">
        {/* Custom Tab Bar */}
        <div className="bg-gray-100 rounded-xl flex p-1">
          <button
            onClick={() => setActiveTab("schedules")}
            className={`px-6 py-2 rounded-xl transition-all font-semibold ${
              activeTab === "schedules"
                ? "bg-white shadow text-black"
                : "bg-transparent text-gray-500"
            }`}
          >
            Schedules
          </button>
          <button
            onClick={() => setActiveTab("holidays")}
            className={`px-6 py-2 rounded-xl transition-all font-semibold ${
              activeTab === "holidays"
                ? "bg-white shadow text-black"
                : "bg-transparent text-gray-500"
            }`}
          >
            Holidays
          </button>
        </div>
        {/* Add New Button */}
        {activeTab === "schedules" ? (
          <Button
            onClick={() => setIsAddScheduleDialogOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium ml-4"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Schedule
          </Button>
        ) : (
          <Button
            onClick={() => setIsAddHolidayDialogOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium ml-4"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Holiday
          </Button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "schedules" ? (
        <ScheduleList key={refreshKey} />
      ) : (
        <HolidayList />
      )}

      <AddScheduleDialog open={isAddScheduleDialogOpen}   onOpenChange={handleAddScheduleDialogChange}/>
      <AddHolidayDialog open={isAddHolidayDialogOpen} onOpenChange={setIsAddHolidayDialogOpen} />
    </div>
  )
}
