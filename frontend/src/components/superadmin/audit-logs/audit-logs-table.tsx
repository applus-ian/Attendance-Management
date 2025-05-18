"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Filter, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { AuditLogFilters } from "./audit-log-filters"


export type AuditLog = {
  id: string
  actionType: string
  user: string
  target: string
  description: string
  timestamp: string
}

// Sample data
const auditLogs: AuditLog[] = [
  {
    id: "1",
    actionType: "Manual Request Approval",
    user: "John Doe (Admin)",
    target: "Request #204",
    description: "Approved clock-in edit for John Smith",
    timestamp: "Apr 4, 2025 - 09:15 AM",
  },
  {
    id: "2",
    actionType: "Manual Request Approval",
    user: "John Doe (Admin)",
    target: "Request #204",
    description: "Approved clock-in edit for John Smith",
    timestamp: "Apr 4, 2025 - 09:15 AM",
  },
  {
    id: "3",
    actionType: "Manual Request Approval",
    user: "John Doe (Admin)",
    target: "Request #204",
    description: "Approved clock-in edit for John Smith",
    timestamp: "Apr 4, 2025 - 09:15 AM",
  },
  {
    id: "4",
    actionType: "Manual Request Approval",
    user: "John Doe (Admin)",
    target: "Request #204",
    description: "Approved clock-in edit for John Smith",
    timestamp: "Apr 4, 2025 - 09:15 AM",
  },
  {
    id: "5",
    actionType: "Manual Request Approval",
    user: "John Doe (Admin)",
    target: "Request #204",
    description: "Approved clock-in edit for John Smith",
    timestamp: "Apr 4, 2025 - 09:15 AM",
  },
  {
    id: "6",
    actionType: "Manual Request Approval",
    user: "John Doe (Admin)",
    target: "Request #204",
    description: "Approved clock-in edit for John Smith",
    timestamp: "Apr 4, 2025 - 09:15 AM",
  },
  {
    id: "7",
    actionType: "Manual Request Approval",
    user: "John Doe (Admin)",
    target: "Request #204",
    description: "Approved clock-in edit for John Smith",
    timestamp: "Apr 4, 2025 - 09:15 AM",
  },
  {
    id: "8",
    actionType: "Manual Request Approval",
    user: "John Doe (Admin)",
    target: "Request #204",
    description: "Approved clock-in edit for John Smith",
    timestamp: "Apr 4, 2025 - 09:15 AM",
  },
  {
    id: "9",
    actionType: "Manual Request Approval",
    user: "John Doe (Admin)",
    target: "Request #204",
    description: "Approved clock-in edit for John Smith",
    timestamp: "Apr 4, 2025 - 09:15 AM",
  },
  {
    id: "10",
    actionType: "User Login",
    user: "Jane Smith (User)",
    target: "System",
    description: "User logged in successfully",
    timestamp: "Apr 4, 2025 - 08:30 AM",
  },
  {
    id: "11",
    actionType: "Schedule Change",
    user: "Mike Johnson (Manager)",
    target: "Schedule #123",
    description: "Modified work hours for team Alpha",
    timestamp: "Apr 3, 2025 - 14:45 PM",
  },
  {
    id: "12",
    actionType: "Permission Change",
    user: "John Doe (Admin)",
    target: "User #456",
    description: "Granted admin privileges to Sarah Williams",
    timestamp: "Apr 3, 2025 - 11:20 AM",
  },
]

export function AuditLogsTable() {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState<keyof AuditLog>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filters, setFilters] = useState({
    actionType: "all",
    user: "",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  })

  const pageSize = 9
  const totalItems = auditLogs.length
  const totalPages = Math.ceil(totalItems / pageSize)

  // Handle sorting
  const handleSort = (field: keyof AuditLog) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort logs using useMemo to prevent unnecessary recalculations
  const filteredAndSortedLogs = useMemo(() => {
    // First filter the logs
    const filtered = auditLogs.filter((log) => {
      // Search filter
      if (
        searchQuery &&
        !log.actionType.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.target.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Action type filter
      if (filters.actionType !== "all" && log.actionType !== filters.actionType) {
        return false
      }

      // User filter
      if (filters.user && !log.user.toLowerCase().includes(filters.user.toLowerCase())) {
        return false
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const logDate = new Date(log.timestamp)

        if (filters.dateRange.from && logDate < filters.dateRange.from) {
          return false
        }

        if (filters.dateRange.to) {
          // Set the end of day for the to date
          const endDate = new Date(filters.dateRange.to)
          endDate.setHours(23, 59, 59, 999)

          if (logDate > endDate) {
            return false
          }
        }
      }

      return true
    })

    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [filters, searchQuery, sortField, sortDirection])

  // Paginate the filtered and sorted logs
  const paginatedLogs = filteredAndSortedLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Render sort icon
  const renderSortIcon = (field: keyof AuditLog) => {
    if (sortField !== field) {
      return <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground/70" />
    }
    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search audit logs..."
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

      {showFilters && <AuditLogFilters filters={filters} setFilters={setFilters} className="mb-6" />}

      {isMobile ? (
        // Mobile view with cards
        <div className="space-y-4">
          {paginatedLogs.length > 0 ? (
            paginatedLogs.map((log) => (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{log.actionType}</h3>
                      <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log("View details", log.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Export", log.id)}>Export</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">User</p>
                      <p className="text-sm">{log.user}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Target</p>
                      <p className="text-sm">{log.target}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground">Description</p>
                      <p className="text-sm">{log.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">No audit logs found matching your filters.</div>
          )}
        </div>
      ) : (
        // Desktop view with table
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort("actionType")}>
                  <div className="flex items-center">
                    Action Type
                    {renderSortIcon("actionType")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("user")}>
                  <div className="flex items-center">
                    User
                    {renderSortIcon("user")}
                  </div>
                </TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("timestamp")}>
                  <div className="flex items-center">
                    Timestamp
                    {renderSortIcon("timestamp")}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.actionType}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.target}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No audit logs found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedLogs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
          {Math.min(currentPage * pageSize, filteredAndSortedLogs.length)} of {filteredAndSortedLogs.length} logs
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only">Previous</span>
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
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                )
              })}
              {totalPages > 3 && <span className="px-2">...</span>}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only md:not-sr-only mr-1">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
