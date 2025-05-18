"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Holiday {
  id: string
  name: string
  date: string
  type: string
  isMovable: boolean
  status: boolean
}

interface DeleteHolidayDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  holiday: Holiday
}

export function DeleteHolidayDialog({ open, onOpenChange, holiday }: DeleteHolidayDialogProps) {
  const handleDelete = () => {
    console.log("Deleting holiday:", holiday.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete &quot;{holiday.name}&quot;?</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete the holiday and remove it from all schedules.
          </p>
          <p className="mt-2 text-sm font-medium">Date: {holiday.date}</p>
          <p className="text-sm font-medium">Type: {holiday.type}</p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="destructive" className="bg-orange-500 hover:bg-orange-600 text-white">
            Delete Holiday
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
