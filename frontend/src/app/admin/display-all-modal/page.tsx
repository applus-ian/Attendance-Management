"use client"

import { useState } from "react"
import RequestModal from "@/components/admin-modals/request-modal/reqmodal-page"
import TimeLogModal from "@/components/admin-modals/time-logs/time-logs-modal"

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