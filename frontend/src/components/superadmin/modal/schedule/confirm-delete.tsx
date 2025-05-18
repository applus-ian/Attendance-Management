import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export function YourComponent() {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [scheduleToDelete, setScheduleToDelete] = useState("Malaysia Schedule") // Example schedule name

    const handleDelete = (scheduleName: string) => {
        setScheduleToDelete(scheduleName)
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        // Handle the deletion logic here
        console.log(`Deleting schedule: ${scheduleToDelete}`)
        setShowDeleteModal(false)
    }

    return (
        <div className="p-4">
            <Button
                variant="destructive"
                onClick={() => handleDelete("Malaysia Schedule")}
                className="bg-red-500 hover:bg-red-600"
            >
                Delete Schedule
            </Button>

            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle className="sr-only">Delete Schedule Confirmation</DialogTitle>
                    <div className="space-y-4">
                        <h2 className="text-lg font-medium">
                            Are you sure you want to delete {scheduleToDelete}?
                        </h2>
                        <p className="text-sm text-gray-500">
                            This action cannot be undone. This will permanently delete the schedule.
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirmDelete}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}