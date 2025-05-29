"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Schedule } from "@/hooks/useSchedules"

interface DeleteScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule: Schedule
  onConfirmDelete: () => void
  isDeleting: boolean
}

export function DeleteScheduleDialog({
  open,
  onOpenChange,
  schedule,
  onConfirmDelete,
  isDeleting,
}: DeleteScheduleDialogProps) {
  // Close dialog handler (only if not deleting)
  const handleClose = () => {
    if (!isDeleting) onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete &quot;{schedule.title}&quot;?</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete the schedule.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirmDelete}
            disabled={isDeleting}
            className={isDeleting ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-400"}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
