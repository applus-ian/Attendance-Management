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
import { useManualRequest, useApproveManualRequest, useRejectManualRequest } from "@/hooks/useManualRequest"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import { RequestDetailsModal } from "@/components/request-details-modal"
import { MobileRequestView } from "@/components/mobile-request-view"
import { RequestFilters } from "./request-filter"
import type { ManualRequest } from "@/hooks/useManualRequest"

interface RequestTableProps {
  searchQuery: string
}

function transformManualRequest(raw: ManualRequest) {
  return {
    id: raw.request_id ? raw.request_id.toString() : `${raw.emp_id}_${raw.time}`,
    emp_id: raw.emp_id,
    member: raw.employee ? `${raw.employee.first_name} ${raw.employee.last_name}` : `Employee #${raw.emp_id}`,
    type: raw.request_type.replace("_", " "),
    time: raw.time,
    reason: raw.reason,
    approval_status: raw.approval_status,
    created_at: raw.created_at,
    reviewed_by: raw.reviewed_by,
    reviewed_at: raw.reviewed_at,
    raw, // keep the full ManualRequest object for actions
  }
}

export function RequestTable({ searchQuery }: RequestTableProps) {
  const { requests: manualRequests, isLoading, error } = useManualRequest()
  const approveManualRequest = useApproveManualRequest();
  const rejectManualRequest = useRejectManualRequest();
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const [sortField, setSortField] = useState<string>("dateSubmitted")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRequest, setSelectedRequest] = useState<ManualRequest | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  })

  const handleViewRequest = (raw: ManualRequest) => {
    setSelectedRequest(raw)
    setIsModalOpen(true)
  }

  // Transform and filter data
  const filteredAndSortedRequests = useMemo(() => {
    let data = (manualRequests || [])
      .filter((raw: any) => raw && raw.emp_id !== undefined && raw.time !== undefined)
      .map((raw: ManualRequest) => {
        const transformed = transformManualRequest(raw)
        return { ...transformed, raw }
      })

    // Filtering
    data = data.filter((request: ReturnType<typeof transformManualRequest>) => {
      if (searchQuery && !request.member.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      // Status filter
      if (filters.status !== "all") {
        let status = request.approval_status?.toLowerCase();
        let filterStatus = filters.status.toLowerCase();
        if (filterStatus === "denied") filterStatus = "rejected";
        if (status !== filterStatus) return false;
      }
      // Type filter
      if (filters.type !== "all") {
        if (request.type.toLowerCase() !== filters.type.toLowerCase()) return false;
      }
      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const reqDate = new Date(request.created_at);
        if (filters.dateRange.from && reqDate < filters.dateRange.from) return false;
        if (filters.dateRange.to) {
          const endDate = new Date(filters.dateRange.to);
          endDate.setHours(23, 59, 59, 999);
          if (reqDate > endDate) return false;
        }
      }
      return true;
    });

    // Sorting
    return [...data].sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1
      if (sortDirection === "asc") return aValue > bValue ? 1 : -1
      else return aValue < bValue ? 1 : -1
    })
  }, [manualRequests, searchQuery, filters, sortField, sortDirection])

  // Table columns
  const columns: ColumnDef<any>[] = [
    { accessorKey: "emp_id", header: () => <span className="text-center w-full block">Employee ID</span>, cell: ({ row }) => <span className="text-center w-full block">{row.getValue("emp_id")}</span> },
    { accessorKey: "member", header: "Full Name", cell: ({ row }) => row.getValue("member") },
    { accessorKey: "type", header: "Request Type", cell: ({ row }) => row.getValue("type") },
    { accessorKey: "time", header: "Time", cell: ({ row }) => row.original.raw.time },
    { accessorKey: "reason", header: "Reason", cell: ({ row }) => row.getValue("reason") },
    { accessorKey: "approval_status", header: "Approval Status", cell: ({ row }) => {
      const status = row.original.raw.approval_status?.toLowerCase();
      let color = "";
      if (status === "approved") color = "bg-green-500 text-white";
      else if (status === "pending") color = "bg-yellow-400 text-black";
      else if (status === "rejected") color = "bg-red-500 text-white";
      else color = "bg-gray-300 text-black";
      return (
        <Badge className={color + " capitalize"}>{row.original.raw.approval_status}</Badge>
      );
    }
    },
    { accessorKey: "created_at", header: "Created At", cell: ({ row }) => new Date(row.original.raw.created_at).toLocaleString() },
    { accessorKey: "reviewed_by", header: "Reviewed By", cell: ({ row }) => row.original.raw.reviewed_by || "-" },
    { accessorKey: "reviewed_at", header: "Reviewed At", cell: ({ row }) => row.original.raw.reviewed_at ? new Date(row.original.raw.reviewed_at).toLocaleString() : "-" },
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
                <TableRow key={row.id} className="cursor-pointer hover:bg-orange-50" onClick={() => handleViewRequest(row.original.raw)}>
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
        <RequestDetailsModal 
          request={selectedRequest} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onApprove={() => approveManualRequest.mutate(selectedRequest.request_id, {
            onSuccess: () => { setIsModalOpen(false); alert("Request approved!"); },
            onError: () => alert("Failed to approve request")
          })}
          onReject={() => rejectManualRequest.mutate(selectedRequest.request_id, {
            onSuccess: () => { setIsModalOpen(false); alert("Request denied!"); },
            onError: () => alert("Failed to deny request")
          })}
        />
      )}
    </div>
  )
}
