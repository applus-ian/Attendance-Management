"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  name: string
  role: string
  department: string
  status: string
  shiftType: string
  days: string
  hours: string
  avatar: string
}

interface RemoveScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
}

export function RemoveScheduleDialog({ open, onOpenChange, user }: RemoveScheduleDialogProps) {
  const handleRemove = () => {
    console.log("Removing schedule for user:", user.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove {user.name} schedule?</DialogTitle>
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
          <Button onClick={handleRemove} variant="destructive" className="bg-orange-500 hover:bg-orange-600 text-white">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
