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

type ShiftManagementModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ShiftManagementModal({ open, onOpenChange }: ShiftManagementModalProps) {
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] px-8 py-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">Add Schedule</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          {/* Schedule Type */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Schedule Type</h3>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="day-shift"
                  checked={schedule.type === "day"}
                  onCheckedChange={(checked: boolean | "indeterminate") => checked === true && handleTypeChange("day")}
                  className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 rounded"
                />
                <Label htmlFor="day-shift" className="text-base">Day Shift</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="night-shift"
                  checked={schedule.type === "night"}
                  onCheckedChange={(checked: boolean | "indeterminate") => checked === true && handleTypeChange("night")}
                  className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 rounded"
                />
                <Label htmlFor="night-shift" className="text-base">Night Shift</Label>
              </div>
            </div>
          </div>

          {/* Schedule Name */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Schedule Name</h3>
            <Input
              placeholder="Holy Week Special"
              value={schedule.name}
              onChange={handleNameChange}
              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-base"
            />
          </div>

          {/* Days and Times */}
          <div>
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-2 items-center mb-2">
              <div className="w-24"></div>
              <div className="text-center text-sm font-medium">Start</div>
              <div className="text-center text-sm font-medium">End</div>
              <div className="text-center text-sm font-medium col-span-2">Lunch Break</div>
            </div>
            {Object.entries(schedule.days).map(([day, dayData]) => (
              <div key={day} className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-2 items-center mb-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${day}-toggle`}
                    checked={dayData.enabled}
                    onCheckedChange={(checked: boolean | "indeterminate") => handleDayToggle(day as keyof typeof schedule.days, checked)}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 rounded"
                  />
                  <Label htmlFor={`${day}-toggle`} className="capitalize text-base">{day}</Label>
                </div>
                <Input
                  type="time"
                  value={dayData.times.start}
                  onChange={(e) => handleTimeChange(day as keyof typeof schedule.days, "start", e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1"
                />
                <Input
                  type="time"
                  value={dayData.times.end}
                  onChange={(e) => handleTimeChange(day as keyof typeof schedule.days, "end", e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1"
                />
                <Input
                  type="time"
                  value={dayData.times.lunchStart}
                  onChange={(e) => handleTimeChange(day as keyof typeof schedule.days, "lunchStart", e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1"
                />
                <Input
                  type="time"
                  value={dayData.times.lunchEnd}
                  onChange={(e) => handleTimeChange(day as keyof typeof schedule.days, "lunchEnd", e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1"
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-center gap-4 mt-4">
          <Button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-2 rounded-lg text-base font-medium"
          >
            Add
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-10 py-2 rounded-lg text-base font-medium border-gray-300"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}