"use client";

import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type TimeInputs = {
  start: string;
  end: string;
  lunchStart: string;
  lunchEnd: string;
};

type DaySchedule = {
  enabled: boolean;
  times: TimeInputs;
};

type ScheduleData = {
  name: string;
  type: "day" | "night";
  days: {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
  };
};

export function ShiftManagementModal() {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleData>({
    name: "",
    type: "day",
    days: {
      monday: { enabled: false, times: { start: "00:00", end: "00:00", lunchStart: "00:00", lunchEnd: "00:00" } },
      tuesday: { enabled: false, times: { start: "00:00", end: "00:00", lunchStart: "00:00", lunchEnd: "00:00" } },
      wednesday: { enabled: false, times: { start: "00:00", end: "00:00", lunchStart: "00:00", lunchEnd: "00:00" } },
      thursday: { enabled: false, times: { start: "00:00", end: "00:00", lunchStart: "00:00", lunchEnd: "00:00" } },
      friday: { enabled: false, times: { start: "00:00", end: "00:00", lunchStart: "00:00", lunchEnd: "00:00" } },
      saturday: { enabled: false, times: { start: "00:00", end: "00:00", lunchStart: "00:00", lunchEnd: "00:00" } },
      sunday: { enabled: false, times: { start: "00:00", end: "00:00", lunchStart: "00:00", lunchEnd: "00:00" } },
    }
  });

  const handleTypeChange = (type: "day" | "night") => {
    setSchedule({ ...schedule, type });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchedule({ ...schedule, name: e.target.value });
  };

  const handleDayToggle = (day: keyof typeof schedule.days, checked: boolean | "indeterminate") => {
    setSchedule({
      ...schedule,
      days: {
        ...schedule.days,
        [day]: {
          ...schedule.days[day],
          enabled: checked === true
        }
      }
    });
  };

  const handleTimeChange = (
    day: keyof typeof schedule.days,
    field: keyof TimeInputs,
    value: string
  ) => {
    setSchedule({
      ...schedule,
      days: {
        ...schedule.days,
        [day]: {
          ...schedule.days[day],
          times: {
            ...schedule.days[day].times,
            [field]: value
          }
        }
      }
    });
  };

  const handleSubmit = () => {
    // Here you would handle submission to your backend
    console.log("Schedule submitted:", schedule);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Schedule</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Schedule</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-6">
            <h3 className="font-medium mb-2">Schedule Type</h3>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="day-shift" 
                  checked={schedule.type === "day"} 
                  onCheckedChange={(checked: boolean | "indeterminate") => checked === true && handleTypeChange("day")}
                />
                <Label htmlFor="day-shift">Day Shift</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="night-shift" 
                  checked={schedule.type === "night"} 
                  onCheckedChange={(checked: boolean | "indeterminate") => checked === true && handleTypeChange("night")}
                />
                <Label htmlFor="night-shift">Night Shift</Label>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Schedule Name</h3>
            <Input 
              placeholder="e.g., Holy Week Special" 
              value={schedule.name}
              onChange={handleNameChange}
            />
          </div>

          <div>
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-2 items-center mb-2">
              <div className="w-24"></div>
              <div className="text-center text-sm">Start</div>
              <div className="text-center text-sm">End</div>
              <div className="text-center text-sm">Lunch Break</div>
              <div></div>
            </div>

            {Object.entries(schedule.days).map(([day, dayData]) => (
              <div key={day} className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-2 items-center mb-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${day}-toggle`} 
                    checked={dayData.enabled}
                    onCheckedChange={(checked: boolean | "indeterminate") => handleDayToggle(day as keyof typeof schedule.days, checked)}
                  />
                  <Label htmlFor={`${day}-toggle`} className="capitalize">{day}</Label>
                </div>
                <Input 
                  type="time" 
                  value={dayData.times.start}
                  onChange={(e) => handleTimeChange(day as keyof typeof schedule.days, "start", e.target.value)}
                />
                <Input 
                  type="time" 
                  value={dayData.times.end}
                  onChange={(e) => handleTimeChange(day as keyof typeof schedule.days, "end", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-1">
                  <Input 
                    type="time" 
                    value={dayData.times.lunchStart}
                    onChange={(e) => handleTimeChange(day as keyof typeof schedule.days, "lunchStart", e.target.value)}
                  />
                  <Input 
                    type="time" 
                    value={dayData.times.lunchEnd}
                    onChange={(e) => handleTimeChange(day as keyof typeof schedule.days, "lunchEnd", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 