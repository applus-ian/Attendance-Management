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
import { useManualRequest } from "@/hooks/useManualRequest"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import { RequestDetailsModal } from "@/components/request-details-modal"
import { MobileRequestView } from "@/components/mobile-request-view"
import { RequestFilters } from "./request-filter"

interface RequestTableProps {
  searchQuery: string
}

interface Request {
  id: string
  dateSubmitted: string
  member: string
  type: string
  dateRequested: string
  comment: string
  status: "Approved" | "Pending" | "Denied"
  feedback: string
}

function transformManualRequest(raw: any): Request {
  return {
    id: raw.request_id.toString(),
    dateSubmitted: new Date(raw.created_at).toLocaleDateString(),
    member: raw.employee?.name || "Unknown",
    type: raw.request_type.replace("_", " "),
    dateRequested: new Date(raw.time).toLocaleDateString(),
    comment: raw.reason,
    status: raw.approval_status.toLowerCase() === "rejected"
      ? "Denied"
      : (raw.approval_status.charAt(0).toUpperCase() + raw.approval_status.slice(1)) as Request["status"],
    feedback: raw.feedback || "",
  }
}

export function RequestTable({ searchQuery }: RequestTableProps) {
  const { requests: manualRequests, isLoading, error } = useManualRequest()
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

  // Transform and filter data
  const filteredAndSortedRequests = useMemo(() => {
    let data: Request[] = (manualRequests || [])
      .filter((raw: any) => raw && raw.request_id !== undefined && raw.created_at !== undefined)
      .map(transformManualRequest)

    // Filtering
    data = data.filter((request) => {
      if (searchQuery && !request.member.toLowerCase().includes(searchQuery.toLowerCase())) return false
      if (filters.status !== "all" && request.status.toLowerCase() !== filters.status.toLowerCase()) return false
      if (filters.type !== "all" && request.type.toLowerCase() !== filters.type.toLowerCase()) return false
      if (filters.dateRange.from || filters.dateRange.to) {
        const requestDate = new Date(request.dateRequested)
        if (filters.dateRange.from && requestDate < filters.dateRange.from) return false
        if (filters.dateRange.to) {
          const endDate = new Date(filters.dateRange.to)
          endDate.setHours(23, 59, 59, 999)
          if (requestDate > endDate) return false
        }
      }
      return true
    })

    // Sorting
    return [...data].sort((a, b) => {
      const aValue = a[sortField as keyof Request]
      const bValue = b[sortField as keyof Request]
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1
      if (sortDirection === "asc") return aValue > bValue ? 1 : -1
      else return aValue < bValue ? 1 : -1
    })
  }, [manualRequests, searchQuery, filters, sortField, sortDirection])

  // Table columns
  const columns: ColumnDef<Request>[] = [
    { accessorKey: "dateSubmitted", header: "Date Submitted", cell: ({ row }) => <div className="font-medium">{row.getValue("dateSubmitted")}</div> },
    { accessorKey: "member", header: "Member", cell: ({ row }) => <div>{row.getValue("member")}</div> },
    { accessorKey: "type", header: "Type", cell: ({ row }) => <div>{row.getValue("type")}</div> },
    { accessorKey: "dateRequested", header: "Date Requested", cell: ({ row }) => <div>{row.getValue("dateRequested")}</div> },
    { accessorKey: "comment", header: "Comment", cell: ({ row }) => <div>{row.getValue("comment")}</div> },
    {
      accessorKey: "status", header: "Status", cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={status === "Approved" ? "secondary" : status === "Pending" ? "default" : "destructive"} className="rounded-md">{status}</Badge>
      }
    },
    { accessorKey: "feedback", header: "Feedback", cell: ({ row }) => <div>{row.getValue("feedback") || "-"}</div> },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={e => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewRequest(row.original)}>View Request</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Approve Request: ${row.original.id}`)}>Approve Request</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Deny Request: ${row.original.id}`)}>Deny Request</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  // Table instance
  const table = useReactTable({
    data: filteredAndSortedRequests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    initialState: { pagination: { pageSize: 8 } },
  })

  // Pagination
  const pageSize = 8
  const pageCount = Math.ceil(filteredAndSortedRequests.length / pageSize)
  const displayedData = filteredAndSortedRequests.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  if (isLoading) return <div>Loading requests...</div>
  if (error) return <div>Error loading requests</div>

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
      <div className="rounded-md border overflow-hidden">
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedRequests.length > 0 ? currentPage * pageSize + 1 : 0}-
          {Math.min((currentPage + 1) * pageSize, filteredAndSortedRequests.length)} of{" "}
          {filteredAndSortedRequests.length} requests
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))} disabled={currentPage === 0}>
            Previous
          </Button>
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
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(pageCount - 1, prev + 1))} disabled={currentPage === pageCount - 1}>
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
