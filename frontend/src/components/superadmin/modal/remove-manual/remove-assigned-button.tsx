
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RemoveScheduleModal } from "./remove-assigned-schedule"


export function ScheduleManager() {
    const [showModal, setShowModal] = useState(false)

    const handleConfirmRemove = () => {
        // Add your remove logic here
        console.log("Schedule removed")
        setShowModal(false)
    }

    return (
        <div className="flex items-center justify-end p-4">
            <Button
                variant="destructive"
                onClick={() => setShowModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-6 py-2"
            >
                Delete Manual Schedule
            </Button>

            <RemoveScheduleModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmRemove}
                scheduleName="Sarah Lim"
            />
        </div>
    )
}