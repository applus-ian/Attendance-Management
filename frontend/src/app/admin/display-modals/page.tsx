"use client"

import { useState } from "react"
import RequestModal from "@/components/admin/modal/request-modal/page"
import TimeLogModal from "@/components/admin/modal/time-logs/time-logs-modal"
import SchedulePage from "@/components/admin/modal/schedule/schedule-button"
import ShiftAssignmentPage from "@/components/admin/modal/schedule/shift-assignment-button"
import { YourComponent } from "@/components/admin/modal/schedule/confirm-delete"
import { ScheduleManager } from "@/components/admin/modal/remove-manual/remove-assigned-button"


export default function Modals() {
    const [isTimeLogOpen, setIsTimeLogOpen] = useState(false)

    const handleTimeLogSubmit = (data: {
        date: Date
        time: string
        logType: string
        comment: string
    }) => {
        // Handle the form submission here (e.g., API call)
        console.log('Time log submitted:', data)
        setIsTimeLogOpen(false)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Existing Buttons */}
                <div className="w-full">
                    <RequestModal />
                </div>

                {/* Container for Time Log Modal */}
                <div className="w-full">
                    <SchedulePage />
                </div>
                <div className="w-full">
                    <ShiftAssignmentPage />
                </div>
                <div className="w-full">
                    <YourComponent                    />
                </div>
                <div className="w-full">
                    <ScheduleManager />
                </div>
                <div className="w-full">
                    <button
                        onClick={() => setIsTimeLogOpen(true)}
                        className="w-full p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Time Log
                    </button>
                    <TimeLogModal
                        isOpen={isTimeLogOpen}
                        onClose={() => setIsTimeLogOpen(false)}
                        onSubmit={handleTimeLogSubmit}
                    />
                </div>
            </div>
        </div>
    )
}