"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Schedule {
  id: string
  name: string
  days: string
  hours: string
  assigned: number
  break: string
}

interface DeleteScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule: Schedule
}

export function DeleteScheduleDialog({ open, onOpenChange, schedule }: DeleteScheduleDialogProps) {
  const handleDelete = () => {
    console.log("Deleting schedule:", schedule.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete &quot;{schedule.name}&quot;?</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete the schedule.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="destructive" className="bg-orange-500 hover:bg-orange-600 text-white">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
