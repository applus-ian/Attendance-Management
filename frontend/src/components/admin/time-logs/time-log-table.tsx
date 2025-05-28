"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTimelog } from "@/hooks/useTimelog"
import TimeLogModal from "@/components/modal/time-logs/time-logs-modal"
import { useUserList } from "@/hooks/useUserList"
import { TimeLogDetailsModal } from "./time-log-details-modal"

interface TimeLogTableProps {
  userId: string
  filters: {
    logType: string
    dateRange: {
      from: Date | undefined
      to: Date | undefined
    }
    comment: string
  }
  onEdit?: (log: any) => void
}

export function TimeLogTable({ userId, filters, onEdit }: TimeLogTableProps) {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [editLog, setEditLog] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>("add")
  const [detailsLog, setDetailsLog] = useState<any | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const { data: users = [] } = useUserList()

  const {
    timelogs,
    isLoading,
    isError,
    error,
    createTimelog,
    updateTimelog,
    deleteTimelog,
  } = useTimelog(Number(userId))

  // --- Filtering, Sorting, Pagination ---
  const filteredLogs = timelogs.filter((log) => {
    if (filters.logType !== "all" && log.type !== filters.logType) {
      return false
    }
    if (filters.comment && !log.comment?.toLowerCase().includes(filters.comment.toLowerCase())) {
      return false
    }
    if (filters.dateRange.from || filters.dateRange.to) {
      const logDate = new Date(log.time)
      if (filters.dateRange.from && logDate < filters.dateRange.from) {
        return false
      }
      if (filters.dateRange.to) {
        const endDate = new Date(filters.dateRange.to)
        endDate.setHours(23, 59, 59, 999)
        if (logDate > endDate) {
          return false
        }
      }
    }
    return true
  })

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <ChevronDown className="inline w-4 h-4 text-gray-400" />
    return sortDirection === "asc"
      ? <ChevronUp className="inline w-4 h-4 text-orange-500" />
      : <ChevronDown className="inline w-4 h-4 text-orange-500" />
  }

  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortField === "date") {
      const aDate = a.created_at ? new Date(a.created_at) : new Date(0)
      const bDate = b.created_at ? new Date(b.created_at) : new Date(0)
      return sortDirection === "asc"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime()
    } else if (sortField === "time") {
      const aTime = a.time ? new Date(a.time).getHours() * 60 + new Date(a.time).getMinutes() : 0
      const bTime = b.time ? new Date(b.time).getHours() * 60 + new Date(b.time).getMinutes() : 0
      return sortDirection === "asc" ? aTime - bTime : bTime - aTime
    } else if (sortField === "logType") {
      return sortDirection === "asc" ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)
    } else if (sortField === "hrs_worked") {
      return sortDirection === "asc" ? (a.hrs_worked ?? 0) - (b.hrs_worked ?? 0) : (b.hrs_worked ?? 0) - (a.hrs_worked ?? 0)
    } else if (sortField === "overtime_hrs") {
      return sortDirection === "asc" ? (a.overtime_hrs ?? 0) - (b.overtime_hrs ?? 0) : (b.overtime_hrs ?? 0) - (a.overtime_hrs ?? 0)
    }
    return 0;
  })

  const pageSize = 10
  const totalPages = Math.ceil(sortedLogs.length / pageSize)
  const paginatedLogs = sortedLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // --- Modal Handlers ---
  const handleEdit = (log: any) => {
    setModalMode("edit")
    setEditLog(log)
    setShowModal(true)
    if (onEdit) onEdit(log)
  }
  const handleDelete = (timelog_id: number) => {
    deleteTimelog.mutate(timelog_id)
  }

  const getEmployee = (emp_id: number) => users.find((u) => u.emp_id === emp_id)

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer select-none" onClick={() => {
                if (sortField === "date") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                else { setSortField("date"); setSortDirection("asc") }
              }}>
                Date and Time (Created) {renderSortIcon("date")}
              </TableHead>
              <TableHead className="cursor-pointer select-none" onClick={() => {
                if (sortField === "time") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                else { setSortField("time"); setSortDirection("asc") }
              }}>
                Time {renderSortIcon("time")}
              </TableHead>
              <TableHead className="cursor-pointer select-none" onClick={() => {
                if (sortField === "logType") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                else { setSortField("logType"); setSortDirection("asc") }
              }}>
                Log Type {renderSortIcon("logType")}
              </TableHead>
              <TableHead>Present</TableHead>
              <TableHead>Absent</TableHead>
              <TableHead>Late</TableHead>
              <TableHead className="cursor-pointer select-none" onClick={() => {
                if (sortField === "hrs_worked") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                else { setSortField("hrs_worked"); setSortDirection("asc") }
              }}>
                Hours Worked {renderSortIcon("hrs_worked")}
              </TableHead>
              <TableHead className="cursor-pointer select-none" onClick={() => {
                if (sortField === "overtime_hrs") setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                else { setSortField("overtime_hrs"); setSortDirection("asc") }
              }}>
                Overtime {renderSortIcon("overtime_hrs")}
              </TableHead>
              <TableHead>Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <TableRow key={log.timelog_id} className="cursor-pointer hover:bg-orange-50" onClick={() => { setDetailsLog(log); setShowDetailsModal(true); }}>
                  <TableCell>{log.created_at ? new Date(log.created_at).toLocaleString() : ''}</TableCell>
                  <TableCell>{new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                  <TableCell>{log.type}</TableCell>
                  <TableCell>{log.is_present ? "Yes" : "No"}</TableCell>
                  <TableCell>{log.is_absent ? "Yes" : "No"}</TableCell>
                  <TableCell>{log.is_late ? "Yes" : "No"}</TableCell>
                  <TableCell>{log.hrs_worked}</TableCell>
                  <TableCell>{log.overtime_hrs}</TableCell>
                  <TableCell>{log.comment ? log.comment.split(' ').slice(0, 3).join(' ') + (log.comment.split(' ').length > 3 ? '...' : '') : ''}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No time logs found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {sortedLogs.length > 0 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, sortedLogs.length)} of{" "}
            {sortedLogs.length} logs
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
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
              {totalPages > 5 && <span className="px-2">...</span>}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      <TimeLogDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        timelog={detailsLog}
        getEmployee={getEmployee}
        onEdit={() => {
          setShowDetailsModal(false)
          if (onEdit) onEdit(detailsLog)
        }}
        onDelete={() => {
          if (detailsLog) handleDelete(detailsLog.timelog_id)
          setShowDetailsModal(false)
        }}
      />
    </div>
  )
}
