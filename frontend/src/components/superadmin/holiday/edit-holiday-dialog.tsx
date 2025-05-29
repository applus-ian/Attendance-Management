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
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Holiday, EditHolidayDialogProps } from "@/types/holiday"

export function EditHolidayDialog({ open, onOpenChange, holiday }: EditHolidayDialogProps) {
  // Parse the date string to a Date object
  const parsedDate = parse(holiday.date, "MMMM d, yyyy", new Date())

  const [holidayName, setHolidayName] = useState(holiday.name)
  const [holidayType, setHolidayType] = useState(
    holiday.type === "Regular Holiday"
      ? "regular"
      : holiday.type === "Special Non-working Holiday"
        ? "special-non-working"
        : "special-working",
  )
  const [date, setDate] = useState<Date>(parsedDate)
  const [isMovable, setIsMovable] = useState(holiday.isMovable)
  const [isActive, setIsActive] = useState(holiday.status)
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    // Handle form submission
    console.log("Updating holiday", {
      id: holiday.id,
      name: holidayName,
      type: holidayType,
      date,
      isMovable,
      isActive,
      description,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Holiday</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="holiday-name">Holiday Name</Label>
            <Input id="holiday-name" value={holidayName} onChange={(e) => setHolidayName(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Holiday Type</Label>
            <RadioGroup value={holidayType} className="flex flex-col gap-2" onValueChange={setHolidayType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="edit-regular" />
                <Label htmlFor="edit-regular">Regular Holiday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="special-non-working" id="edit-special-non-working" />
                <Label htmlFor="edit-special-non-working">Special Non-working Holiday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="special-working" id="edit-special-working" />
                <Label htmlFor="edit-special-working">Special Working Holiday</Label>
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
                <Calendar mode="single" selected={date} onSelect={setDate} required={true} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="edit-movable">Movable Holiday</Label>
            <Switch id="edit-movable" checked={isMovable} onCheckedChange={setIsMovable} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="edit-status">Active</Label>
            <Switch id="edit-status" checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description (Optional)</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter holiday description or notes"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600">
            Update Holiday
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
