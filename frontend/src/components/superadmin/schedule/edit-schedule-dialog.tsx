"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useSchedules } from "@/hooks/useSchedules"

export interface EditScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule: {
    id: string
    name: string
    days: string[]
    start: string
    end: string
  }
}

export function EditScheduleDialog({ open, onOpenChange, schedule }: EditScheduleDialogProps) {
  const { updateSchedule } = useSchedules();

  const [scheduleName, setScheduleName] = useState(schedule.name)
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({})
  const [start, setStart] = useState(schedule.start)
  const [end, setEnd] = useState(schedule.end)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset local state whenever `schedule` changes
  useEffect(() => {
    setScheduleName(schedule.name)
    const dayMap: Record<string, boolean> = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }
    schedule.days.forEach(day => {
      dayMap[day.toLowerCase()] = true
    })
    setSelectedDays(dayMap)
    setStart(schedule.start)
    setEnd(schedule.end)
  }, [schedule])

  const handleDayChange = (day: string, checked: boolean) => {
    setSelectedDays((prev) => ({ ...prev, [day.toLowerCase()]: checked }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Gather selected days as capitalized strings
      const days = Object.entries(selectedDays)
        .filter(([_, checked]) => checked)
        .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))

      // Send updated schedule data
      await updateSchedule(Number(schedule.id), {
        title: scheduleName,  // use 'title' to match backend
        day: days,            // use 'day' to match backend
        start,
        end,
      })

      onOpenChange(false)
    } catch (error) {
      console.error("Error updating schedule:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="schedule-name">Schedule Name</Label>
            <Input id="schedule-name" value={scheduleName} onChange={e => setScheduleName(e.target.value)} />
          </div>
          <div className="grid gap-4 mt-2">
            <div className="grid grid-cols-4 gap-2 items-center mb-2">
              <div>Day</div>
              <div className="text-sm text-center">Start</div>
              <div className="text-sm text-center">End</div>
              <div></div>
            </div>
            {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
              <div className="grid grid-cols-4 gap-2 items-center mb-2" key={day}>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day.toLowerCase()}`}
                    checked={selectedDays[day.toLowerCase()] || false}
                    onCheckedChange={checked => handleDayChange(day, !!checked)}
                  />
                  <Label htmlFor={`day-${day.toLowerCase()}`} className="text-sm font-medium">{day}</Label>
                </div>
                <Input
                  type="time"
                  value={start}
                  onChange={e => setStart(e.target.value)}
                  disabled={!selectedDays[day.toLowerCase()]}
                />
                <Input
                  type="time"
                  value={end}
                  onChange={e => setEnd(e.target.value)}
                  disabled={!selectedDays[day.toLowerCase()]}
                />
                <div></div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
