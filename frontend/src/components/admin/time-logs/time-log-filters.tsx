
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

interface TimeLogFiltersProps {
  filters: {
    logType: string
    dateRange: {
      from: Date | undefined
      to: Date | undefined
    }
    comment: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      logType: string
      dateRange: {
        from: Date | undefined
        to: Date | undefined
      }
      comment: string
    }>
  >
  className?: string
}

export function TimeLogFilters({ filters, setFilters, className }: TimeLogFiltersProps) {
  const isMobile = useIsMobile()
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: filters.dateRange.from,
    to: filters.dateRange.to,
  })

  const handleLogTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, logType: value }))
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, comment: e.target.value }))
  }

  const handleDateChange = (range: { from: Date | undefined; to?: Date | undefined } | undefined) => {
    if (!range) return
    setDate({ from: range.from, to: range.to ?? undefined })
    setFilters((prev) => ({ ...prev, dateRange: { from: range.from, to: range.to ?? undefined } }))
  }

  const clearFilters = () => {
    setFilters({
      logType: "all",
      dateRange: {
        from: undefined,
        to: undefined,
      },
      comment: "",
    })
    setDate({ from: undefined, to: undefined })
  }

  return (
    <div className={cn("space-y-4 rounded-lg border p-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="logType">Log Type</Label>
          <Select value={filters.logType} onValueChange={handleLogTypeChange}>
            <SelectTrigger id="logType">
              <SelectValue placeholder="Select log type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Clock In">Clock In</SelectItem>
              <SelectItem value="Clock Out">Clock Out</SelectItem>
              <SelectItem value="Break Start">Break Start</SelectItem>
              <SelectItem value="Break End">Break End</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Comment</Label>
          <Input id="comment" placeholder="Search by comment" value={filters.comment} onChange={handleCommentChange} />
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
