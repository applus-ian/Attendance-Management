"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronDown, CalendarIcon, Filter, SortAsc, SortDesc } from "lucide-react"
import { format } from "date-fns"
import { useIsMobile } from "@/hooks/use-mobile"

interface RequestFiltersProps {
  filters: {
    status: string
    type: string
    dateRange: {
      from: Date | undefined
      to: Date | undefined
    }
  }
  setFilters: (filters: {
    status: string
    type: string
    dateRange: {
      from: Date | undefined
      to: Date | undefined
    }
  }) => void
  sortField: string
  sortDirection: "asc" | "desc"
  setSortField: (field: string) => void
  setSortDirection: (direction: "asc" | "desc") => void
}

export function RequestFilters({
  filters,
  setFilters,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
}: RequestFiltersProps) {
  const isMobile = useIsMobile()
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: filters.dateRange.from,
    to: filters.dateRange.to,
  })

  const handleStatusChange = (status: string) => {
    setFilters({ ...filters, status })
  }

  const handleTypeChange = (type: string) => {
    setFilters({ ...filters, type })
  }

  const handleDateChange = (range: { from: Date | undefined; to?: Date | undefined } | undefined) => {
    if (range) {
      // Normalize the range to ensure 'to' is always defined
      const normalizedRange = { from: range.from, to: range.to ?? undefined }
      // Only update if the dates are actually changing
      if (normalizedRange.from?.getTime() !== date.from?.getTime() || normalizedRange.to?.getTime() !== date.to?.getTime()) {
        setDate(normalizedRange)
        setFilters({ ...filters, dateRange: normalizedRange })
      }
    } else {
      // Handle undefined case
      setDate({ from: undefined, to: undefined })
      setFilters({ ...filters, dateRange: { from: undefined, to: undefined } })
    }
  }

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      // Only update if the direction is actually changing
      const newDirection = sortDirection === "asc" ? "desc" : "asc"
      if (newDirection !== sortDirection) {
        setSortDirection(newDirection)
      }
    } else {
      // Only update if the field is actually changing
      if (field !== sortField) {
        setSortField(field)
        // Reset direction to asc when changing fields
        if (sortDirection !== "asc") {
          setSortDirection("asc")
        }
      }
    }
  }

  const clearFilters = () => {
    setFilters({
      status: "all",
      type: "all",
      dateRange: {
        from: undefined,
        to: undefined,
      },
    })
    setDate({ from: undefined, to: undefined })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Status
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleStatusChange("all")}>
              {filters.status === "all" && <Check className="mr-2 h-4 w-4" />}
              <span className={filters.status === "all" ? "font-medium" : ""}>All</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("Approved")}>
              {filters.status === "Approved" && <Check className="mr-2 h-4 w-4" />}
              <span className={filters.status === "Approved" ? "font-medium" : ""}>Approved</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("Pending")}>
              {filters.status === "Pending" && <Check className="mr-2 h-4 w-4" />}
              <span className={filters.status === "Pending" ? "font-medium" : ""}>Pending</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("Denied")}>
              {filters.status === "Denied" && <Check className="mr-2 h-4 w-4" />}
              <span className={filters.status === "Denied" ? "font-medium" : ""}>Denied</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Request Type Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Type
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleTypeChange("all")}>
              {filters.type === "all" && <Check className="mr-2 h-4 w-4" />}
              <span className={filters.type === "all" ? "font-medium" : ""}>All</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTypeChange("Clock In")}>
              {filters.type === "Clock In" && <Check className="mr-2 h-4 w-4" />}
              <span className={filters.type === "Clock In" ? "font-medium" : ""}>Clock In</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTypeChange("Clock Out")}>
              {filters.type === "Clock Out" && <Check className="mr-2 h-4 w-4" />}
              <span className={filters.type === "Clock Out" ? "font-medium" : ""}>Clock Out</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTypeChange("Leave")}>
              {filters.type === "Leave" && <Check className="mr-2 h-4 w-4" />}
              <span className={filters.type === "Leave" ? "font-medium" : ""}>Leave</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Date Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            {date.from || date.to ? (
              date.from && date.to ? (
                <>
                  {format(date.from, "MMM d, yyyy")} - {format(date.to, "MMM d, yyyy")}
                </>
              ) : (
                format(date.from || date.to || new Date(), "MMM d, yyyy")
              )
            ) : (
              "Select Date Range"
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col gap-2 p-4">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={isMobile ? 1 : 2}
            />
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => handleDateChange(undefined)}
            >
              Clear Date Range
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            Sort
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleSortChange("dateSubmitted")}>
              {sortField === "dateSubmitted" && <Check className="mr-2 h-4 w-4" />}
              <span className={sortField === "dateSubmitted" ? "font-medium" : ""}>Date Submitted</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("member")}>
              {sortField === "member" && <Check className="mr-2 h-4 w-4" />}
              <span className={sortField === "member" ? "font-medium" : ""}>Member Name</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("type")}>
              {sortField === "type" && <Check className="mr-2 h-4 w-4" />}
              <span className={sortField === "type" ? "font-medium" : ""}>Request Type</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("status")}>
              {sortField === "status" && <Check className="mr-2 h-4 w-4" />}
              <span className={sortField === "status" ? "font-medium" : ""}>Status</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setSortDirection("asc")}>
              {sortDirection === "asc" && <Check className="mr-2 h-4 w-4" />}
              <span className={sortDirection === "asc" ? "font-medium" : ""}>Ascending</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortDirection("desc")}>
              {sortDirection === "desc" && <Check className="mr-2 h-4 w-4" />}
              <span className={sortDirection === "desc" ? "font-medium" : ""}>Descending</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters Button */}
      <Button variant="ghost" onClick={clearFilters} className="ml-auto">
        Clear Filters
      </Button>
    </div>
  )
}
