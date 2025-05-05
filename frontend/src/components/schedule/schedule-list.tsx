"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ChevronLeft, ChevronRight, Users, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditScheduleDialog } from "@/components/schedule/edit-schedule-dialog"
import { DeleteScheduleDialog } from "@/components/schedule/delete-schedule-dialog"
import { AssignMembersDialog } from "@/components/schedule/assign-members-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import { ScheduleFilters } from "@/components/schedule/schedule-filters"


const schedules = [
  {
    id: "1",
    name: "Malaysia Schedule",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "8:00 am - 5:00 pm",
    assigned: 0,
    break: "30 mins",
  },
  {
    id: "2",
    name: "Malaysia Schedule",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "8:00 am - 5:00 pm",
    assigned: 20,
    break: "30 mins",
  },
  {
    id: "3",
    name: "Philippines Schedule",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "9:00 am - 6:00 pm",
    assigned: 15,
    break: "1 hour",
  },
  {
    id: "4",
    name: "Night Shift Schedule",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "10:00 pm - 7:00 am",
    assigned: 8,
    break: "45 mins",
  },
  {
    id: "5",
    name: "Weekend Schedule",
    days: "Sat, Sun",
    hours: "10:00 am - 7:00 pm",
    assigned: 5,
    break: "1 hour",
  },
  {
    id: "6",
    name: "Flexible Schedule",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "Flexible",
    assigned: 12,
    break: "As needed",
  },
  {
    id: "7",
    name: "Part-time Schedule",
    days: "Mon, Wed, Fri",
    hours: "1:00 pm - 5:00 pm",
    assigned: 7,
    break: "15 mins",
  },
]

export function ScheduleList() {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(1)
  const [editingSchedule, setEditingSchedule] = useState<string | null>(null)
  const [deletingSchedule, setDeletingSchedule] = useState<string | null>(null)
  const [assigningSchedule, setAssigningSchedule] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    days: "all",
    assignedStatus: "all",
  })

  const totalPages = 3 // Mock total pages
  const totalItems = 32 // Mock total items

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const getScheduleById = (id: string) => {
    return schedules.find((schedule) => schedule.id === id) || schedules[0]
  }

  // Filter schedules based on current filters
  const filteredSchedules = schedules.filter((schedule) => {
    // Search filter
    if (
      filters.search &&
      !schedule.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !schedule.hours.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    // Days filter
    if (filters.days !== "all" && !schedule.days.toLowerCase().includes(filters.days.toLowerCase())) {
      return false
    }

    // Assigned status filter
    if (filters.assignedStatus === "assigned" && schedule.assigned === 0) {
      return false
    } else if (filters.assignedStatus === "unassigned" && schedule.assigned > 0) {
      return false
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

      {showFilters && <ScheduleFilters filters={filters} setFilters={setFilters} className="mb-6" />}

      {isMobile ? (
        // Mobile view with cards
        <div className="space-y-4">
          {filteredSchedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{schedule.name}</h3>
                    <p className="text-sm text-muted-foreground">{schedule.hours}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setAssigningSchedule(schedule.id)}>Assigned</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingSchedule(schedule.id)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDeletingSchedule(schedule.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Days</p>
                    <p className="text-sm">{schedule.days}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Break</p>
                    <p className="text-sm">{schedule.break}</p>
                  </div>
                  <div className="col-span-2 mt-2">
                    <p className="text-xs text-muted-foreground">Assigned</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm">{schedule.assigned}</span>
                      {schedule.assigned > 0 && <Users className="ml-2 h-4 w-4 text-muted-foreground" />}
                    </div>
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
                <TableHead>Name</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Break</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{schedule.name}</TableCell>
                    <TableCell>{schedule.days}</TableCell>
                    <TableCell>{schedule.hours}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {schedule.assigned}
                        {schedule.assigned > 0 && <Users className="ml-2 h-4 w-4 text-muted-foreground" />}
                      </div>
                    </TableCell>
                    <TableCell>{schedule.break}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setAssigningSchedule(schedule.id)}>
                            Assigned
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditingSchedule(schedule.id)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeletingSchedule(schedule.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No schedules found matching your filters.
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
          {filteredSchedules.length > 0
            ? `1-${Math.min(10, filteredSchedules.length)} of ${filteredSchedules.length}`
            : "0"}{" "}
          schedules
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

      {editingSchedule && (
        <EditScheduleDialog
          open={!!editingSchedule}
          onOpenChange={() => setEditingSchedule(null)}
          schedule={getScheduleById(editingSchedule)}
        />
      )}

      {deletingSchedule && (
        <DeleteScheduleDialog
          open={!!deletingSchedule}
          onOpenChange={() => setDeletingSchedule(null)}
          schedule={getScheduleById(deletingSchedule)}
        />
      )}

      {assigningSchedule && (
        <AssignMembersDialog
          open={!!assigningSchedule}
          onOpenChange={() => setAssigningSchedule(null)}
          scheduleId={assigningSchedule}
        />
      )}
    </div>
  )
}
