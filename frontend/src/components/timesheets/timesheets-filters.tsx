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

interface TimesheetsFiltersProps {
  filters: {
    date: {
      from: Date | undefined
      to: Date | undefined
    }
    employee: string
    status: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      date: {
        from: Date | undefined
        to: Date | undefined
      }
      employee: string
      status: string
    }>
  >
  className?: string
}

export function TimesheetsFilters({ filters, setFilters, className }: TimesheetsFiltersProps) {
  const isMobile = useIsMobile()
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: filters.date.from,
    to: filters.date.to,
  })

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, employee: e.target.value }))
  }

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value }))
  }

  const handleDateChange = (range: { from: Date | undefined; to?: Date | undefined } | undefined) => {
    const updatedRange = range ? { from: range.from, to: range.to ?? undefined } : { from: undefined, to: undefined }
    setDate(updatedRange)
    setFilters((prev) => ({ ...prev, date: updatedRange }))
  }

  const clearFilters = () => {
    setFilters({
      date: {
        from: undefined,
        to: undefined,
      },
      employee: "",
      status: "all",
    })
    setDate({ from: undefined, to: undefined })
  }

  return (
    <div className={cn("space-y-4 rounded-lg border p-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employee">Employee</Label>
          <Input
            id="employee"
            placeholder="Search by employee name"
            value={filters.employee}
            onChange={handleEmployeeChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="overtime">Overtime</SelectItem>
            </SelectContent>
          </Select>
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
                mode="range"
                defaultMonth={date.from}
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
