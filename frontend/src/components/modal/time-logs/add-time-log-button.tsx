"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import TimeLogModal from "./time-logs-modal"

export default function AddTimeLogButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmit = (data: { date: Date; time: string; logType: string; comment: string }) => {
        console.log('Submitted data:', { ...data, type: data.logType })
    }

    return (
        <>
            <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
            >
                Add Time Log
            </Button>

            <TimeLogModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </>
    )
}