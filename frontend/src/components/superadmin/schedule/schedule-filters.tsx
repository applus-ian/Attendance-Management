"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScheduleFiltersProps {
  filters: {
    search: string
    days: string
    assignedStatus: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string
      days: string
      assignedStatus: string
    }>
  >
  className?: string
}

export function ScheduleFilters({ filters, setFilters, className }: ScheduleFiltersProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleDaysChange = (value: string) => {
    setFilters((prev) => ({ ...prev, days: value }))
  }

  const handleAssignedStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, assignedStatus: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      days: "all",
      assignedStatus: "all",
    })
  }

  return (
    <div className={cn("space-y-4 rounded-lg border p-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search by name or hours" value={filters.search} onChange={handleSearch} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="days">Days</Label>
          <Select value={filters.days} onValueChange={handleDaysChange}>
            <SelectTrigger id="days">
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Days</SelectItem>
              <SelectItem value="mon">Monday</SelectItem>
              <SelectItem value="tue">Tuesday</SelectItem>
              <SelectItem value="wed">Wednesday</SelectItem>
              <SelectItem value="thu">Thursday</SelectItem>
              <SelectItem value="fri">Friday</SelectItem>
              <SelectItem value="sat">Saturday</SelectItem>
              <SelectItem value="sun">Sunday</SelectItem>
              <SelectItem value="weekday">Weekdays</SelectItem>
              <SelectItem value="weekend">Weekends</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedStatus">Assigned Status</Label>
          <Select value={filters.assignedStatus} onValueChange={handleAssignedStatusChange}>
            <SelectTrigger id="assignedStatus">
              <SelectValue placeholder="Select assigned status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
