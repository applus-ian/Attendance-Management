"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface AuditLogFiltersProps {
  filters: {
    actionType: string
    user: string
    dateRange: {
      from: Date | undefined
      to: Date | undefined
    }
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      actionType: string
      user: string
      dateRange: {
        from: Date | undefined
        to: Date | undefined
      }
    }>
  >
  className?: string
}

// Action type options
const actionTypes = [
  "Manual Request Approval",
  "User Login",
  "Schedule Change",
  "Permission Change",
  "System Update",
  "Password Reset",
  "Account Creation",
  "Data Export",
]

export function AuditLogFilters({ filters, setFilters, className }: AuditLogFiltersProps) {
  const isMobile = useIsMobile()
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: filters.dateRange.from,
    to: filters.dateRange.to,
  })

  const handleActionTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, actionType: value }))
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, user: e.target.value }))
  }

  const handleDateChange = (range: { from: Date | undefined; to?: Date | undefined } | undefined) => {
    const updatedRange = range ? { from: range.from, to: range.to ?? undefined } : { from: undefined, to: undefined }
    setDate(updatedRange)
    setFilters((prev) => ({ ...prev, dateRange: updatedRange }))
  }

  const clearFilters = () => {
    setFilters({
      actionType: "all",
      user: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
    })
    setDate({ from: undefined, to: undefined })
  }

  return (
    <div className={cn("space-y-4 rounded-lg border p-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="actionType">Action Type</Label>
          <Select value={filters.actionType} onValueChange={handleActionTypeChange}>
            <SelectTrigger id="actionType">
              <SelectValue placeholder="Select action type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Action Types</SelectItem>
              {actionTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user">User</Label>
          <Input id="user" placeholder="Filter by user" value={filters.user} onChange={handleUserChange} />
        </div>

        <div className="space-y-2">
          <Label>Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date.from && !date.to && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  "Select date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={isMobile ? 1 : 2}
              />
            </PopoverContent>
          </Popover>
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
