"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, ChevronLeft, ChevronRight, Filter, Search, ChevronDown, ChevronUp } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import { TimesheetsFilters } from "@/components/superadmin/timesheets/timesheets-filters"
import { TimesheetDetailsModal } from "@/components/superadmin/timesheets/timesheet-details-modal"
import { useTimesheet, useTimesheetDetails } from "@/hooks/useTimesheet"
import { useUserList } from "@/hooks/useUserList"

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
  const [sortField, setSortField] = useState<string>("emp_id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // --- Integration: Fetch real timesheets ---
  const { data: timesheets = [], isLoading, isError, error } = useTimesheet()
  const { data: users = [] } = useUserList();

  // Modal state for details
  const [selectedTimesheetId, setSelectedTimesheetId] = useState<number | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const { data: timesheetDetails, isLoading: isLoadingDetails } = useTimesheetDetails(selectedTimesheetId ?? undefined)

  const pageSize = 10
  const totalItems = timesheets.length
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

  // Helper to get full name and profile pic by emp_id
  const getEmployee = (emp_id: number) => users.find((u) => u.emp_id === emp_id);
  const getName = (ts: any) => {
    const employee = getEmployee(ts.emp_id);
    return employee ? [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(" ") : `Employee #${ts.emp_id}`;
  }

  // Filter timesheets based on search and filters
  const filteredTimesheets = timesheets.filter((ts) => {
    // Search filter (by name, employee ID, or date)
    const name = getName(ts).toLowerCase();
    const empIdStr = `${ts.emp_id}`;
    const dateStr = ts.date ? ts.date.toLowerCase() : '';
    const search = searchQuery.toLowerCase();
    if (
      search &&
      !(
        name.includes(search) ||
        empIdStr.includes(search) ||
        dateStr.includes(search)
      )
    ) {
      return false;
    }
    // Employee filter (by name or emp_id)
    if (filters.employee) {
      const empFilter = filters.employee.toLowerCase();
      if (!name.includes(empFilter) && empIdStr !== filters.employee) {
        return false;
      }
    }
    // Date range filter
    if (filters.date.from || filters.date.to) {
      const tsDate = new Date(ts.date);
      if (filters.date.from && tsDate < filters.date.from) return false;
      if (filters.date.to) {
        const endDate = new Date(filters.date.to);
        endDate.setHours(23, 59, 59, 999);
        if (tsDate > endDate) return false;
      }
    }
    // Status filter (late, overtime, etc.)
    if (filters.status !== "all") {
      if (filters.status === "late" && (!ts.total_lates || ts.total_lates === 0)) return false;
      if (filters.status === "overtime" && (!ts.total_overtime_hrs || ts.total_overtime_hrs === 0)) return false;
    }
    return true;
  });

  // Sorting logic
  const sortedTimesheets = [...filteredTimesheets].sort((a, b) => {
    let aValue, bValue
    switch (sortField) {
      case "emp_id":
        aValue = a.emp_id; bValue = b.emp_id; break;
      case "name":
        aValue = getName(a).toLowerCase(); bValue = getName(b).toLowerCase(); break;
      case "total_hrs_work":
        aValue = a.total_hrs_work; bValue = b.total_hrs_work; break;
      case "total_overtime_hrs":
        aValue = a.total_overtime_hrs; bValue = b.total_overtime_hrs; break;
      case "total_present":
        aValue = a.total_present; bValue = b.total_present; break;
      case "total_absent":
        aValue = a.total_absent; bValue = b.total_absent; break;
      case "total_lates":
        aValue = a.total_lates; bValue = b.total_lates; break;
      case "scheduled_hrs":
        aValue = a.scheduled_hrs; bValue = b.scheduled_hrs; break;
      default:
        aValue = a.emp_id; bValue = b.emp_id;
    }
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Paginate the sorted timesheets
  const paginatedTimesheets = sortedTimesheets.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Handle row click: open modal with details
  const handleRowClick = (timesheet: any) => {
    setSelectedTimesheetId(timesheet.timesheet_id)
    setDetailsOpen(true)
  }

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <ChevronDown className="inline w-4 h-4 text-gray-400" />
    return sortDirection === "asc"
      ? <ChevronUp className="inline w-4 h-4 text-orange-500" />
      : <ChevronDown className="inline w-4 h-4 text-orange-500" />
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by employee ID or date..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {showFilters && <TimesheetsFilters filters={filters} setFilters={setFilters} className="mb-6" />}

      {isLoading ? (
        <div className="text-center py-8">Loading timesheets...</div>
      ) : isError ? (
        <div className="text-center text-red-500 py-8">Error: {error?.message}</div>
      ) : isMobile ? (
        // Mobile view with cards
        <div className="space-y-4">
          {paginatedTimesheets.map((ts) => {
            const employee = getEmployee(ts.emp_id);
            const name = employee ? [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(" ") : `Employee #${ts.emp_id}`;
            const profilePic = employee?.profile_pic_url || "/default-avatar.png";
            return (
              <Card key={ts.timesheet_id}>
                <CardContent className="p-4 cursor-pointer hover:bg-orange-50" onClick={() => handleRowClick(ts)}>
                  <div className="text-xs text-muted-foreground mb-2">Employee ID: <span className="font-semibold">{ts.emp_id}</span></div>
                  <div className="flex items-center gap-3 mb-2">
                    <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full object-cover border" />
                    <h3 className="font-medium">{name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Hours</p>
                      <p className="text-sm">{Number(ts.total_hrs_work).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Overtime</p>
                      <p className="text-sm">{Number(ts.total_overtime_hrs).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Present</p>
                      <p className="text-sm">{ts.total_present}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Absent</p>
                      <p className="text-sm">{ts.total_absent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        // Desktop view with table
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer select-none" onClick={() => {
                  if (sortField === "emp_id") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  else { setSortField("emp_id"); setSortDirection("asc") }
                }}>
                  Employee ID {renderSortIcon("emp_id")}
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => {
                  if (sortField === "name") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  else { setSortField("name"); setSortDirection("asc") }
                }}>
                  Name {renderSortIcon("name")}
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => {
                  if (sortField === "total_hrs_work") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  else { setSortField("total_hrs_work"); setSortDirection("asc") }
                }}>
                  Total Hours {renderSortIcon("total_hrs_work")}
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => {
                  if (sortField === "total_overtime_hrs") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  else { setSortField("total_overtime_hrs"); setSortDirection("asc") }
                }}>
                  Overtime {renderSortIcon("total_overtime_hrs")}
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => {
                  if (sortField === "total_present") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  else { setSortField("total_present"); setSortDirection("asc") }
                }}>
                  Present {renderSortIcon("total_present")}
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => {
                  if (sortField === "total_absent") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  else { setSortField("total_absent"); setSortDirection("asc") }
                }}>
                  Absent {renderSortIcon("total_absent")}
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => {
                  if (sortField === "total_lates") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  else { setSortField("total_lates"); setSortDirection("asc") }
                }}>
                  Lates {renderSortIcon("total_lates")}
                </TableHead>
                <TableHead className="cursor-pointer select-none" onClick={() => {
                  if (sortField === "scheduled_hrs") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  else { setSortField("scheduled_hrs"); setSortDirection("asc") }
                }}>
                  Scheduled {renderSortIcon("scheduled_hrs")}
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTimesheets.length > 0 ? (
                paginatedTimesheets.map((ts) => {
                  const employee = getEmployee(ts.emp_id);
                  const name = employee ? [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(" ") : `Employee #${ts.emp_id}`;
                  const profilePic = employee?.profile_pic_url || "/default-avatar.png";
                  return (
                    <TableRow
                      key={ts.timesheet_id}
                      className="cursor-pointer hover:bg-orange-50"
                      onClick={() => handleRowClick(ts)}
                    >
                      <TableCell className="font-medium">{ts.emp_id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img src={profilePic} alt="Profile" className="w-7 h-7 rounded-full object-cover border" />
                          <span>{name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{Number(ts.total_hrs_work).toFixed(2)}</TableCell>
                      <TableCell>{Number(ts.total_overtime_hrs).toFixed(2)}</TableCell>
                      <TableCell>{ts.total_present}</TableCell>
                      <TableCell>{ts.total_absent}</TableCell>
                      <TableCell>{ts.total_lates}</TableCell>
                      <TableCell>{ts.scheduled_hrs}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  );
                })
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
        timesheet={timesheetDetails ?? null}
        isLoading={isLoadingDetails}
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
