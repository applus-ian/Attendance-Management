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
import type { DateRange } from "react-day-picker"
import { HolidayFiltersProps } from "@/types/holiday"

export function HolidayFilters({ filters, setFilters, className }: HolidayFiltersProps) {
  const isMobile = useIsMobile()
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: filters.dateRange.from,
    to: filters.dateRange.to,
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value }))
  }

  const handleMovableChange = (value: string) => {
    setFilters((prev) => ({ ...prev, movable: value }))
  }

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value }))
  }

  
  
  const handleDateChange = (range: DateRange | undefined) => {
    setDate({ from: range?.from, to: range?.to ?? undefined })
    setFilters((prev) => ({
      ...prev,
      dateRange: {
        from: range?.from,
        to: range?.to ?? undefined,
      },
    }))
  }

  function clearFilters(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.")
  }

  return (
    <div className={cn("space-y-4 rounded-lg border p-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search by name or date" value={filters.search} onChange={handleSearch} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Holiday Type</Label>
          <Select value={filters.type} onValueChange={handleTypeChange}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Regular Holiday">Regular Holiday</SelectItem>
              <SelectItem value="Special Non-working Holiday">Special Non-working</SelectItem>
              <SelectItem value="Special Working Holiday">Special Working</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="movable">Movable</Label>
          <Select value={filters.movable} onValueChange={handleMovableChange}>
            <SelectTrigger id="movable">
              <SelectValue placeholder="Select movable status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="movable">Movable</SelectItem>
              <SelectItem value="fixed">Fixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <div className="flex items-end">
          <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
