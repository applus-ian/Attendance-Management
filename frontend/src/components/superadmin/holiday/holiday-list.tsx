"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { EditHolidayDialog } from "@/components/superadmin/holiday/edit-holiday-dialog"
import { DeleteHolidayDialog } from "@/components/superadmin/holiday/delete-holiday-dialog"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import { HolidayFilters } from "@/components/superadmin/holiday/holiday-filters"

// Mock holiday data
const holidays = [
  {
    id: "1",
    name: "New Year's Day",
    date: "January 1, 2025",
    type: "Regular Holiday",
    isMovable: false,
    status: true,
  },
  {
    id: "2",
    name: "Araw ng Kagitingan",
    date: "April 9, 2025",
    type: "Regular Holiday",
    isMovable: true,
    status: true,
  },
  {
    id: "3",
    name: "Labor Day",
    date: "May 1, 2025",
    type: "Regular Holiday",
    isMovable: false,
    status: true,
  },
  {
    id: "4",
    name: "Independence Day",
    date: "June 12, 2025",
    type: "Regular Holiday",
    isMovable: false,
    status: true,
  },
  {
    id: "5",
    name: "National Heroes Day",
    date: "August 25, 2025",
    type: "Regular Holiday",
    isMovable: true,
    status: true,
  },
  {
    id: "6",
    name: "Bonifacio Day",
    date: "November 30, 2025",
    type: "Regular Holiday",
    isMovable: true,
    status: true,
  },
  {
    id: "7",
    name: "Christmas Day",
    date: "December 25, 2025",
    type: "Regular Holiday",
    isMovable: false,
    status: true,
  },
  {
    id: "8",
    name: "Rizal Day",
    date: "December 30, 2025",
    type: "Regular Holiday",
    isMovable: true,
    status: true,
  },
  {
    id: "9",
    name: "All Saints' Day",
    date: "November 1, 2025",
    type: "Special Non-working Holiday",
    isMovable: false,
    status: true,
  },
  {
    id: "10",
    name: "Last Day of the Year",
    date: "December 31, 2025",
    type: "Special Non-working Holiday",
    isMovable: false,
    status: true,
  },
]

export function HolidayList() {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(1)
  const [editingHoliday, setEditingHoliday] = useState<string | null>(null)
  const [deletingHoliday, setDeletingHoliday] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    movable: "all",
    status: "all",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  })

  const totalPages = 2 // Mock total pages
  const totalItems = holidays.length

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const getHolidayById = (id: string) => {
    return holidays.find((holiday) => holiday.id === id) || holidays[0]
  }

  const handleStatusChange = (id: string, checked: boolean) => {
    console.log(`Holiday ${id} status changed to ${checked ? "active" : "inactive"}`)
  }

  // Filter holidays based on current filters
  const filteredHolidays = holidays.filter((holiday) => {
    // Search filter
    if (
      filters.search &&
      !holiday.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !holiday.date.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    // Type filter
    if (filters.type !== "all" && holiday.type !== filters.type) {
      return false
    }

    // Movable filter
    if (filters.movable !== "all") {
      const isMovable = filters.movable === "movable"
      if (holiday.isMovable !== isMovable) {
        return false
      }
    }

    // Status filter
    if (filters.status !== "all") {
      const isActive = filters.status === "active"
      if (holiday.status !== isActive) {
        return false
      }
    }

    // Date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      const holidayDate = new Date(holiday.date)

      if (filters.dateRange.from && holidayDate < filters.dateRange.from) {
        return false
      }

      if (filters.dateRange.to && holidayDate > filters.dateRange.to) {
        return false
      }
    }

    return true
  })

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {showFilters && <HolidayFilters filters={filters} setFilters={setFilters} className="mb-6" />}

      {isMobile ? (
        // Mobile view with cards
        <div className="space-y-4">
          {filteredHolidays.map((holiday) => (
            <Card key={holiday.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{holiday.name}</h3>
                    <p className="text-sm text-muted-foreground">{holiday.date}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingHoliday(holiday.id)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDeletingHoliday(holiday.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <Badge
                      variant={holiday.type === "Regular Holiday" ? "default" : "secondary"}
                      className={
                        holiday.type === "Regular Holiday"
                          ? "bg-blue-500 hover:bg-blue-600 mt-1"
                          : "bg-green-500 hover:bg-green-600 mt-1"
                      }
                    >
                      {holiday.type}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Movable</p>
                    <p className="text-sm">{holiday.isMovable ? "Yes" : "No"}</p>
                  </div>
                  <div className="col-span-2 flex justify-between items-center mt-2">
                    <p className="text-sm">Status</p>
                    <Switch
                      checked={holiday.status}
                      onCheckedChange={(checked) => handleStatusChange(holiday.id, checked)}
                    />
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
                <TableHead>Holiday Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Movable</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHolidays.length > 0 ? (
                filteredHolidays.map((holiday) => (
                  <TableRow key={holiday.id}>
                    <TableCell className="font-medium">{holiday.name}</TableCell>
                    <TableCell>{holiday.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={holiday.type === "Regular Holiday" ? "default" : "secondary"}
                        className={
                          holiday.type === "Regular Holiday"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-green-500 hover:bg-green-600"
                        }
                      >
                        {holiday.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{holiday.isMovable ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Switch
                        checked={holiday.status}
                        onCheckedChange={(checked) => handleStatusChange(holiday.id, checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingHoliday(holiday.id)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeletingHoliday(holiday.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No holidays found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {filteredHolidays.length > 0
            ? `1-${Math.min(10, filteredHolidays.length)} of ${filteredHolidays.length}`
            : "0"}{" "}
          holidays
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
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
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      {editingHoliday && (
        <EditHolidayDialog
          open={!!editingHoliday}
          onOpenChange={() => setEditingHoliday(null)}
          holiday={getHolidayById(editingHoliday)}
        />
      )}

      {deletingHoliday && (
        <DeleteHolidayDialog
          open={!!deletingHoliday}
          onOpenChange={() => setDeletingHoliday(null)}
          holiday={getHolidayById(deletingHoliday)}
        />
      )}
    </div>
  )
}
