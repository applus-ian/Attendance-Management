"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface AddHolidayDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddHolidayDialog({ open, onOpenChange }: AddHolidayDialogProps) {
  const [holidayType, setHolidayType] = useState("regular")
  const [date, setDate] = useState<Date>()
  const [isMovable, setIsMovable] = useState(false)
  const [isActive, setIsActive] = useState(true)

  const handleSubmit = () => {
    // Handle form submission
    console.log("Adding new holiday", {
      type: holidayType,
      date,
      isMovable,
      isActive,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Holiday</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="holiday-name">Holiday Name</Label>
            <Input id="holiday-name" placeholder="Enter holiday name" />
          </div>

          <div className="grid gap-2">
            <Label>Holiday Type</Label>
            <RadioGroup defaultValue="regular" className="flex flex-col gap-2" onValueChange={setHolidayType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular" />
                <Label htmlFor="regular">Regular Holiday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="special-non-working" id="special-non-working" />
                <Label htmlFor="special-non-working">Special Non-working Holiday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="special-working" id="special-working" />
                <Label htmlFor="special-working">Special Working Holiday</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="movable">Movable Holiday</Label>
            <Switch id="movable" checked={isMovable} onCheckedChange={setIsMovable} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="status">Active</Label>
            <Switch id="status" checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" placeholder="Enter holiday description or notes" />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600">
            Add Holiday
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
