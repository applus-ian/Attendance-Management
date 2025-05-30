"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useSchedules } from "@/hooks/useSchedules"
import { toast } from "react-hot-toast"

interface AddScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  
}

interface TimeInputsProps {
  day: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  start: string
  end: string
  onStartChange: (value: string) => void
  onEndChange: (value: string) => void
}

function TimeInputs({ day, checked, onCheckedChange, start, end, onStartChange, onEndChange }: TimeInputsProps) {
  return (
    <div className="grid grid-cols-4 gap-2 items-center mb-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          checked={checked} 
          onCheckedChange={onCheckedChange} 
          id={day} 
          className="border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
        />
        <Label htmlFor={day} className="text-sm font-medium">{day}</Label>
      </div>
      <Input type="time" value={start} onChange={e => onStartChange(e.target.value)} className="col-span-1" placeholder="Start" disabled={!checked} />
      <Input type="time" value={end} onChange={e => onEndChange(e.target.value)} className="col-span-1" placeholder="End" disabled={!checked} />
    </div>
  )
}

export function AddScheduleDialog({ open, onOpenChange }: AddScheduleDialogProps) {
  const { addSchedule, loading } = useSchedules();
  const [days, setDays] = useState([
    { name: "Monday", checked: false, start: "", end: "" },
    { name: "Tuesday", checked: false, start: "", end: "" },
    { name: "Wednesday", checked: false, start: "", end: "" },
    { name: "Thursday", checked: false, start: "", end: "" },
    { name: "Friday", checked: false, start: "", end: "" },
    { name: "Saturday", checked: false, start: "", end: "" },
    { name: "Sunday", checked: false, start: "", end: "" },
  ])
  const [scheduleName, setScheduleName] = useState("")
  const [selectAll, setSelectAll] = useState(false);

  const handleDayCheckedChange = (idx: number, checked: boolean) => {
    const updatedDays = days.map((d, i) => i === idx ? { ...d, checked } : d);
    setDays(updatedDays);
    setSelectAll(updatedDays.every(d => d.checked));
  }
  const handleStartChange = (idx: number, value: string) => {
    setDays(prev => prev.map((d, i) => i === idx ? { ...d, start: value } : d))
  }
  const handleEndChange = (idx: number, value: string) => {
    setDays(prev => prev.map((d, i) => i === idx ? { ...d, end: value } : d))
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      const firstCheckedDay = days.find(d => d.checked);
      const startTime = firstCheckedDay?.start || '';
      const endTime = firstCheckedDay?.end || '';
      setDays(prev => prev.map(d => ({
        ...d,
        checked,
        start: d.start || startTime,
        end: d.end || endTime
      })));
    } else {
      setDays(prev => prev.map(d => ({
        ...d,
        checked
      })));
    }
  };

  const handleSubmit = async () => {
    const selectedDays = days.filter(d => d.checked);
    if (!scheduleName || selectedDays.length === 0) return;
    const start = selectedDays[0].start;
    const end = selectedDays[0].end;
    const day = selectedDays.map(d => d.name.toLowerCase());
    try {
      await addSchedule({
        title: scheduleName, 
        start, 
        end, 
        day,
        num_assigned: 0,
        assigned: 0
      });
      toast.success("Schedule added!");
      setScheduleName("");
      setDays([
        { name: "Monday", checked: false, start: "", end: "" },
        { name: "Tuesday", checked: false, start: "", end: "" },
        { name: "Wednesday", checked: false, start: "", end: "" },
        { name: "Thursday", checked: false, start: "", end: "" },
        { name: "Friday", checked: false, start: "", end: "" },
        { name: "Saturday", checked: false, start: "", end: "" },
        { name: "Sunday", checked: false, start: "", end: "" },
      ]);
      onOpenChange(false);
    } catch (e) {
      toast.error("Failed to add schedule.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Schedule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="schedule-name">Schedule Name</Label>
            <Input id="schedule-name" placeholder="Enter schedule name" value={scheduleName} onChange={e => setScheduleName(e.target.value)} />
          </div>
          <div className="grid gap-4 mt-2">
            <div className="grid grid-cols-4 gap-2 items-center mb-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="select-all"
                  checked={selectAll} 
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  className="border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label htmlFor="select-all" className="text-sm font-medium">Select All</Label>
              </div>
              <div className="text-sm text-center">Start</div>
              <div className="text-sm text-center">End</div>
            </div>
            {days.map((d, idx) => (
              <TimeInputs
                key={d.name}
                day={d.name}
                checked={d.checked}
                onCheckedChange={checked => handleDayCheckedChange(idx, !!checked)}
                start={d.start}
                end={d.end}
                onStartChange={value => handleStartChange(idx, value)}
                onEndChange={value => handleEndChange(idx, value)}
              />
            ))}
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
