"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useSchedules } from "@/hooks/useSchedules"
import { useState } from "react"

interface Schedule {
  sched_id: number
  title: string
  day: string[]
  start: string
  end: string
}

interface DeleteScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule;
  onConfirmDelete: () => Promise<void>;
}


export function DeleteScheduleDialog({
  open,
  onOpenChange,
  schedule,
}: DeleteScheduleDialogProps) {
  const { deleteSchedule } = useSchedules()
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    setMessage(null)
    try {
      await deleteSchedule(schedule.sched_id)
      setMessage("Schedule deleted successfully!")
      setTimeout(() => {
        onOpenChange(false)
        setMessage(null)
      }, 1000) // delay to show message
    } catch (err) {
      setMessage("Failed to delete the schedule.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete &quot;{schedule.title}&quot;?
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete the schedule.
          </p>
          {message && (
            <p className={`text-sm mt-2 ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
