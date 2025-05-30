"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useSchedules } from "@/hooks/useSchedules"
import { toast } from "react-hot-toast"

export interface EditScheduleV2DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule: {
    sched_id: number
    name: string
    days: string[]
    start: string
    end: string
  }
  onScheduleUpdated?: () => void 
}

export function EditScheduleV2Dialog({ open, onOpenChange, schedule, onScheduleUpdated }: EditScheduleV2DialogProps) {
  const { updateSchedule } = useSchedules()

  const [scheduleName, setScheduleName] = useState(schedule.name)
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({})
  const [timePerDay, setTimePerDay] = useState<Record<string, { start: string; end: string }>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!open || !schedule || !Array.isArray(schedule.days)) return

    setScheduleName(schedule.name)

    const initialDays: Record<string, boolean> = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }

    const initialTimes: Record<string, { start: string; end: string }> = {}

    schedule.days.forEach(day => {
      const key = day.toLowerCase()
      initialDays[key] = true
      initialTimes[key] = {
        start: schedule.start,
        end: schedule.end,
      }
    })

    setSelectedDays(initialDays)
    setTimePerDay(initialTimes)
  }, [schedule, open])

  const handleDayChange = (day: string, checked: boolean) => {
    const key = day.toLowerCase()
    setSelectedDays(prev => ({ ...prev, [key]: checked }))
    if (checked && !timePerDay[key]) {
      setTimePerDay(prev => ({
        ...prev,
        [key]: { start: schedule.start, end: schedule.end },
      }))
    }
  }

  const handleTimeChange = (day: string, type: "start" | "end", value: string) => {
    const key = day.toLowerCase()
    setTimePerDay(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: value,
      },
    }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      const selected = Object.entries(selectedDays).filter(([_, checked]) => checked)

      if (selected.length === 0) {
        alert("Please select at least one day.")
        return
      }

      const days = selected.map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
      const firstDay = selected[0][0]
      const start = timePerDay[firstDay]?.start || ""
      const end = timePerDay[firstDay]?.end || ""

      await updateSchedule(schedule.sched_id, {
        title: scheduleName,
        day: days,
        start,
        end,
      })
      toast.success("Schedule updated!");
      onOpenChange(false)
      if (onScheduleUpdated) onScheduleUpdated(); 
    } catch (error) {
      toast.error("Failed to update schedule.");
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
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => {
              const key = day.toLowerCase()
              return (
                <div className="grid grid-cols-4 gap-2 items-center mb-2" key={day}>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${key}`}
                      checked={selectedDays[key] || false}
                      onCheckedChange={checked => handleDayChange(day, !!checked)}
                      className="border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label htmlFor={`day-${key}`} className="text-sm font-medium">{day}</Label>
                  </div>
                  <Input
                    type="time"
                    value={timePerDay[key]?.start || ""}
                    onChange={e => handleTimeChange(day, "start", e.target.value)}
                    disabled={!selectedDays[key]}
                  />
                  <Input
                    type="time"
                    value={timePerDay[key]?.end || ""}
                    onChange={e => handleTimeChange(day, "end", e.target.value)}
                    disabled={!selectedDays[key]}
                  />
                  <div></div>
                </div>
              )
            })}
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
