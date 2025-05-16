"use client"

import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface RemoveScheduleModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    scheduleName: string
}

export function RemoveScheduleModal({
    isOpen,
    onClose,
    onConfirm,
    scheduleName
}: RemoveScheduleModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>
                    Remove Schedule
                </DialogTitle>
                <div className="space-y-4">
                    <h2 className="text-lg font-medium">
                        Are you sure you want to remove {scheduleName} schedule?
                    </h2>
                    <p className="text-sm text-gray-500">
                        This action cannot be undone. This will permanently delete the schedule.
                    </p>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Continue
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}