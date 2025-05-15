"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, ChevronLeft, ChevronRight, Filter, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import { TimesheetsFilters } from "@/components/superadmin/timesheets/timesheets-filters"
import { TimesheetDetailsModal } from "@/components/superadmin/timesheets/timesheet-details-modal"

// Mock timesheet data
const timesheetData = [
  {
    id: "1",
    date: "January 1, 2025",
    name: "Shiela Marie Arcillo",
    timeIn: "8:00 am",
    timeOut: "5:00 pm",
    totalHours: "8",
    scheduled: "8",
    overtime: "0",
    late: "0",
  },
  {
    id: "2",
    date: "January 1, 2025",
    name: "Cherry Ann Debby",
    timeIn: "8:05 am",
    timeOut: "5:00 pm",
    totalHours: "8",
    scheduled: "8",
    overtime: "0",
    late: "0",
  },
  {
    id: "3",
    date: "January 1, 2025",
    name: "Shiela Marie Dingon",
    timeIn: "8:05 am",
    timeOut: "5:00 pm",
    totalHours: "8",
    scheduled: "8",
    overtime: "0",
    late: "0",
  },
  {
    id: "4",
    date: "January 1, 2025",
    name: "Donna May Abais",
    timeIn: "8:05 am",
    timeOut: "5:00 pm",
    totalHours: "8",
    scheduled: "8",
    overtime: "0",
    late: "0",
  },
  {
    id: "5",
    date: "January 1, 2025",
    name: "Mike Arthur Minoza",
    timeIn: "8:05 am",
    timeOut: "5:00 pm",
    totalHours: "8",
    scheduled: "8",
    overtime: "0",
    late: "0",
  },
  {
    id: "6",
    date: "January 1, 2025",
    name: "Valey Austine Senoy",
    timeIn: "8:05 am",
    timeOut: "5:00 pm",
    totalHours: "8",
    scheduled: "8",
    overtime: "0",
    late: "0",
  },
  {
    id: "7",
    date: "January 1, 2025",
    name: "Yestin Roy Prado",
    timeIn: "8:05 am",
    timeOut: "5:00 pm",
    totalHours: "8",
    scheduled: "8",
    overtime: "0",
    late: "0",
  },
  {
    id: "8",
    date: "January 1, 2025",
    name: "Michelle Zoobrado",
    timeIn: "8:05 am",
    timeOut: "5:00 pm",
    totalHours: "8",
    scheduled: "8",
    overtime: "0",
    late: "0",
  },
  {
    id: "9",
    date: "January 1, 2025",
    name: "Arnulfo Estenso",
    timeIn: "8:05 am",
    timeOut: "5:00 pm",
    totalHours: "8",
    scheduled: "8",
    overtime: "0",
    late: "0",
  },
]

export function TimesheetsTable() {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    date: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
    employee: "",
    status: "all",
  })

  // Add modal state
  const [selectedTimesheet, setSelectedTimesheet] = useState<typeof timesheetData[number] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const pageSize = 10
  const totalItems = timesheetData.length
  const totalPages = Math.ceil(totalItems / pageSize)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  // Filter timesheets based on search and filters
  const filteredTimesheets = timesheetData.filter((timesheet) => {
    // Search filter
    if (
      searchQuery &&
      !timesheet.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !timesheet.date.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Employee filter
    if (filters.employee && !timesheet.name.toLowerCase().includes(filters.employee.toLowerCase())) {
      return false
    }

    // Date range filter
    if (filters.date.from || filters.date.to) {
      const timesheetDate = new Date(timesheet.date)

      if (filters.date.from && timesheetDate < filters.date.from) {
        return false
      }

      if (filters.date.to) {
        // Set the end of day for the to date
        const endDate = new Date(filters.date.to)
        endDate.setHours(23, 59, 59, 999)

        if (timesheetDate > endDate) {
          return false
        }
      }
    }

    // Status filter (late, overtime, etc.)
    if (filters.status !== "all") {
      if (filters.status === "late" && timesheet.late === "0") return false
      if (filters.status === "overtime" && timesheet.overtime === "0") return false
    }

    return true
  })

  // Paginate the filtered timesheets
  const paginatedTimesheets = filteredTimesheets.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Handle row click: open modal with details
  const handleRowClick = (timesheet: typeof timesheetData[number]) => {
    setSelectedTimesheet(timesheet)
    setDetailsOpen(true)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or date..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
      </div>

      {showFilters && <TimesheetsFilters filters={filters} setFilters={setFilters} className="mb-6" />}

      {isMobile ? (
        // Mobile view with cards
        <div className="space-y-4">
          {paginatedTimesheets.map((timesheet) => (
            <Card key={timesheet.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{timesheet.name}</h3>
                    <p className="text-sm text-muted-foreground">{timesheet.date}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => console.log("Edit", timesheet.id)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("View Details", timesheet.id)}>
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Time In</p>
                    <p className="text-sm">{timesheet.timeIn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time Out</p>
                    <p className="text-sm">{timesheet.timeOut}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Hours</p>
                    <p className="text-sm">{timesheet.totalHours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Scheduled</p>
                    <p className="text-sm">{timesheet.scheduled}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Overtime</p>
                    <p className="text-sm">{timesheet.overtime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Late</p>
                    <p className="text-sm">{timesheet.late}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Desktop view with table
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>In</TableHead>
                <TableHead>Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Late</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTimesheets.length > 0 ? (
                paginatedTimesheets.map((timesheet) => (
                  <TableRow
                    key={timesheet.id}
                    className="cursor-pointer hover:bg-orange-50"
                    onClick={() => handleRowClick(timesheet)}
                  >
                    <TableCell>{timesheet.date}</TableCell>
                    <TableCell className="font-medium">{timesheet.name}</TableCell>
                    <TableCell>{timesheet.timeIn}</TableCell>
                    <TableCell>{timesheet.timeOut}</TableCell>
                    <TableCell>{timesheet.totalHours}</TableCell>
                    <TableCell>{timesheet.scheduled}</TableCell>
                    <TableCell>{timesheet.overtime}</TableCell>
                    <TableCell>{timesheet.late}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No timesheets found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal for timesheet details */}
      <TimesheetDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        timesheet={selectedTimesheet}
      />

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredTimesheets.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
          {Math.min(currentPage * pageSize, filteredTimesheets.length)} of {filteredTimesheets.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-1">Previous</span>
          </Button>
          {!isMobile && (
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
                const pageNumber = i + 1
                return (
                  <Button
                    key={i}
                    variant={pageNumber === currentPage ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8"
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                )
              })}
              {totalPages > 3 && <span className="px-2">...</span>}
            </div>
          )}
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-1">Next</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
