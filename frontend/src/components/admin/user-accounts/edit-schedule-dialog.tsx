"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

interface EditScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
}

interface TimeInputsProps {
  day: string
}

function TimeInputs({ day }: TimeInputsProps) {
  return (
    <div className="grid grid-cols-4 gap-2 items-center mb-2">
      <div className="text-sm font-medium">{day}</div>
      <Input type="time" defaultValue="00:00" className="col-span-1" />
      <Input type="time" defaultValue="00:00" className="col-span-1" />
      <div className="flex gap-2">
        <Input type="time" defaultValue="00:00" className="flex-1" />
        <Input type="time" defaultValue="00:00" className="flex-1" />
      </div>
    </div>
  )
}

export function EditScheduleDialog({ open, onOpenChange, user }: EditScheduleDialogProps) {
  const [scheduleType, setScheduleType] = useState("day")
  const [scheduleName, setScheduleName] = useState("Holy Week Special")

  const handleSubmit = () => {
    // Handle form submission
    console.log("Updating schedule for user:", user.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="employee-name">Employee Name</Label>
            <Input id="employee-name" value={user.name} readOnly />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="schedule-type">Schedule Type</Label>
            <RadioGroup id="schedule-type" defaultValue="day" className="flex gap-4" onValueChange={setScheduleType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="day" id="edit-day" checked={scheduleType === "day"} />
                <Label htmlFor="edit-day">Day Shift</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="night" id="edit-night" checked={scheduleType === "night"} />
                <Label htmlFor="edit-night">Night Shift</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="schedule-name">Schedule Name</Label>
            <Input id="schedule-name" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
          </div>

          <div className="grid gap-4 mt-2">
            <div className="grid grid-cols-4 gap-2 items-center mb-2">
              <div></div>
              <div className="text-sm text-center">Start</div>
              <div className="text-sm text-center">End</div>
              <div className="text-sm text-center">Lunch Break</div>
            </div>

            <TimeInputs day="Monday" />
            <TimeInputs day="Tuesday" />
            <TimeInputs day="Wednesday" />
            <TimeInputs day="Thursday" />
            <TimeInputs day="Friday" />
            <TimeInputs day="Saturday" />
            <TimeInputs day="Sunday" />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600">
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
