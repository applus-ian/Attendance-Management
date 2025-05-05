"use client"

import { useState, useMemo } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import { RequestDetailsModal } from "@/components/request-details-modal"
import { MobileRequestView } from "@/components/mobile-request-view"
import { RequestFilters } from "./request-filter"

// Define the request data type
export type Request = {
  id: string
  dateSubmitted: string
  member: string
  type: string
  dateRequested: string
  comment: string
  status: "Approved" | "Pending" | "Denied"
  feedback: string
}

// Sample data
const requests: Request[] = [
  {
    id: "1",
    dateSubmitted: "Jan 2, 2025",
    member: "Shiela Marie Arcillo",
    type: "Clock Out",
    dateRequested: "January 2, 2025",
    comment: "Forgot to Clock In",
    status: "Approved",
    feedback: "Done",
  },
  {
    id: "2",
    dateSubmitted: "Jan 2, 2025",
    member: "Mike Minoza",
    type: "Clock Out",
    dateRequested: "January 2, 2025",
    comment: "Forgot to Clock In",
    status: "Approved",
    feedback: "Done",
  },
  {
    id: "3",
    dateSubmitted: "Jan 2, 2025",
    member: "Arnulfo IV Estenso",
    type: "Clock Out",
    dateRequested: "January 2, 2025",
    comment: "Forgot to Clock In",
    status: "Approved",
    feedback: "Done",
  },
  {
    id: "4",
    dateSubmitted: "Jan 2, 2025",
    member: "Lynn Sanchez",
    type: "Clock Out",
    dateRequested: "January 2, 2025",
    comment: "Forgot to Clock In",
    status: "Approved",
    feedback: "Done",
  },
  {
    id: "5",
    dateSubmitted: "Jan 2, 2025",
    member: "Valley Austine Senoy",
    type: "Clock Out",
    dateRequested: "January 2, 2025",
    comment: "Forgot to Clock In",
    status: "Approved",
    feedback: "Done",
  },
  {
    id: "6",
    dateSubmitted: "Jan 2, 2025",
    member: "Michelle Zoobrado",
    type: "Clock Out",
    dateRequested: "January 2, 2025",
    comment: "Forgot to Clock In",
    status: "Approved",
    feedback: "Done",
  },
  {
    id: "7",
    dateSubmitted: "Jan 2, 2025",
    member: "Yestin Roy Prado",
    type: "Clock Out",
    dateRequested: "January 2, 2025",
    comment: "Forgot to Clock In",
    status: "Approved",
    feedback: "Done",
  },
  {
    id: "8",
    dateSubmitted: "Jan 2, 2025",
    member: "Cherry Deloy",
    type: "Clock Out",
    dateRequested: "January 2, 2025",
    comment: "Forgot to Clock In",
    status: "Pending",
    feedback: "",
  },
]

interface RequestTableProps {
  searchQuery: string; // Add the searchQuery prop
}

export function RequestTable({ searchQuery }: RequestTableProps) {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const [sortField, setSortField] = useState<string>("dateSubmitted")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  })

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

  // Filter and sort requests using useMemo to prevent unnecessary recalculations
  const filteredAndSortedRequests = useMemo(() => {
    // First filter the requests
    const filtered = requests.filter((request) => {
      // Search query filter
      if (searchQuery && !request.member.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Status filter
      if (filters.status !== "all" && request.status !== filters.status) {
        return false
      }

      // Type filter
      if (filters.type !== "all" && request.type !== filters.type) {
        return false
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const requestDate = new Date(request.dateSubmitted)

        if (filters.dateRange.from && requestDate < filters.dateRange.from) {
          return false
        }

        if (filters.dateRange.to) {
          // Set the end of day for the to date
          const endDate = new Date(filters.dateRange.to)
          endDate.setHours(23, 59, 59, 999)

          if (requestDate > endDate) {
            return false
          }
        }
      }

      return true
    })

    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      const aValue = a[sortField as keyof Request]
      const bValue = b[sortField as keyof Request]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [searchQuery, filters, sortField, sortDirection])

  // Define columns
  const columns: ColumnDef<Request>[] = [
    {
      accessorKey: "dateSubmitted",
      header: "Date Submitted",
      cell: ({ row }) => <div className="font-medium">{row.getValue("dateSubmitted")}</div>,
    },
    {
      accessorKey: "member",
      header: "Member",
      cell: ({ row }) => <div>{row.getValue("member")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "dateRequested",
      header: "Date Requested",
      cell: ({ row }) => <div>{row.getValue("dateRequested")}</div>,
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) => <div>{row.getValue("comment")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={status === "Approved" ? "secondary" : status === "Pending" ? "default" : "destructive"}
            className="rounded-md"
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "feedback",
      header: "Feedback",
      cell: ({ row }) => <div>{row.getValue("feedback")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const request = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()} // Prevent row click when clicking dropdown
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewRequest(request)}>View Request</DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("Approve", request.id)
                }}
              >
                Approve Request
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("Deny", request.id)
                }}
              >
                Deny Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredAndSortedRequests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  })

  // Pagination
  const pageSize = 8
  const pageCount = Math.ceil(filteredAndSortedRequests.length / pageSize)
  const displayedData = filteredAndSortedRequests.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  return (
    <div>
      <div className="mb-6">
        <RequestFilters
          filters={filters}
          setFilters={setFilters}
          sortField={sortField}
          sortDirection={sortDirection}
          setSortField={setSortField}
          setSortDirection={setSortDirection}
        />
      </div>

      {isMobile ? (
        <MobileRequestView requests={displayedData} onViewRequest={handleViewRequest} />
      ) : (
        <div className="rounded-md border overflow-hidden">
          <div className="w-full overflow-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleViewRequest(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedRequests.length > 0 ? currentPage * pageSize + 1 : 0}-
          {Math.min((currentPage + 1) * pageSize, filteredAndSortedRequests.length)} of{" "}
          {filteredAndSortedRequests.length} requests
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          {!isMobile && (
            <div className="flex items-center gap-1">
              {Array.from({ length: pageCount }).map((_, i) => (
                <Button
                  key={i}
                  variant={i === currentPage ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8"
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1))}
            disabled={currentPage === pageCount - 1}
          >
            Next
          </Button>
        </div>
      </div>

      {selectedRequest && (
        <RequestDetailsModal request={selectedRequest} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
