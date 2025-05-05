"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock time log data for different users
const userTimeLogsData = {
  "1": [
    // Valey Austine M. Senoy's logs
    {
      id: "1",
      date: "Apr 11, 2025 1:00 PM",
      day: "Fri",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.105",
    },
    {
      id: "2",
      date: "Apr 11, 2025 1:00 PM",
      day: "Fri",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.105",
    },
    {
      id: "3",
      date: "Apr 14, 2025 1:00 PM",
      day: "Mon",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.106",
    },
    {
      id: "4",
      date: "Apr 15, 2025 1:00 PM",
      day: "Tue",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.107",
    },
    {
      id: "5",
      date: "Apr 16, 2025 1:00 PM",
      day: "Wed",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.108",
    },
    {
      id: "6",
      date: "Apr 21, 2025 1:00 PM",
      day: "Thu",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.109",
    },
    {
      id: "7",
      date: "Apr 22, 2025 1:00 PM",
      day: "Fri",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.109",
    },
    {
      id: "8",
      date: "Apr 23, 2025 1:00 PM",
      day: "Mon",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.101",
    },
    {
      id: "9",
      date: "Apr 24, 2025 1:00 PM",
      day: "Tue",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.102",
    },
    {
      id: "10",
      date: "Apr 25, 2025 1:00 PM",
      day: "Wed",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.103",
    },
    {
      id: "11",
      date: "Apr 26, 2025 1:00 PM",
      day: "Thu",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.104",
    },
    {
      id: "12",
      date: "Apr 29, 2025 1:00 PM",
      day: "Fri",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.105",
    },
  ],
  "2": [
    // Shiela Marie Arcillo's logs
    {
      id: "1",
      date: "Apr 10, 2025 8:55 AM",
      day: "Thu",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.201",
    },
    {
      id: "2",
      date: "Apr 10, 2025 5:05 PM",
      day: "Thu",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.201",
    },
    {
      id: "3",
      date: "Apr 11, 2025 8:58 AM",
      day: "Fri",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.201",
    },
    {
      id: "4",
      date: "Apr 11, 2025 6:30 PM",
      day: "Fri",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.201",
    },
    {
      id: "5",
      date: "Apr 14, 2025 9:10 AM",
      day: "Mon",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.202",
    },
    {
      id: "6",
      date: "Apr 14, 2025 5:00 PM",
      day: "Mon",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.202",
    },
    {
      id: "7",
      date: "Apr 15, 2025 8:50 AM",
      day: "Tue",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.202",
    },
    {
      id: "8",
      date: "Apr 15, 2025 5:15 PM",
      day: "Tue",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.202",
    },
  ],
  "3": [
    // Michelle Zoobrado's logs
    {
      id: "1",
      date: "Apr 10, 2025 8:30 AM",
      day: "Thu",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.301",
    },
    {
      id: "2",
      date: "Apr 10, 2025 7:15 PM",
      day: "Thu",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.301",
    },
    {
      id: "3",
      date: "Apr 11, 2025 8:45 AM",
      day: "Fri",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.301",
    },
    {
      id: "4",
      date: "Apr 11, 2025 6:00 PM",
      day: "Fri",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.301",
    },
    {
      id: "5",
      date: "Apr 14, 2025 8:35 AM",
      day: "Mon",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.302",
    },
    {
      id: "6",
      date: "Apr 14, 2025 5:45 PM",
      day: "Mon",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.302",
    },
  ],
  "4": [
    // Mike Arthur Minoza's logs
    {
      id: "1",
      date: "Apr 10, 2025 9:15 AM",
      day: "Thu",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.401",
    },
    {
      id: "2",
      date: "Apr 10, 2025 5:30 PM",
      day: "Thu",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.401",
    },
    {
      id: "3",
      date: "Apr 11, 2025 9:05 AM",
      day: "Fri",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.401",
    },
    {
      id: "4",
      date: "Apr 11, 2025 5:10 PM",
      day: "Fri",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.401",
    },
  ],
  "5": [
    // Lyn Sanchez's logs
    {
      id: "1",
      date: "Apr 10, 2025 8:50 AM",
      day: "Thu",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.501",
    },
    {
      id: "2",
      date: "Apr 10, 2025 6:20 PM",
      day: "Thu",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.501",
    },
    {
      id: "3",
      date: "Apr 11, 2025 8:55 AM",
      day: "Fri",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.501",
    },
    {
      id: "4",
      date: "Apr 11, 2025 5:05 PM",
      day: "Fri",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.501",
    },
  ],
  "6": [
    // Robert Johnson's logs
    {
      id: "1",
      date: "Apr 10, 2025 8:45 AM",
      day: "Thu",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.601",
    },
    {
      id: "2",
      date: "Apr 10, 2025 7:30 PM",
      day: "Thu",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.601",
    },
    {
      id: "3",
      date: "Apr 11, 2025 8:40 AM",
      day: "Fri",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.601",
    },
    {
      id: "4",
      date: "Apr 11, 2025 6:15 PM",
      day: "Fri",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.601",
    },
  ],
  "7": [
    // Sarah Williams's logs
    {
      id: "1",
      date: "Apr 10, 2025 9:00 AM",
      day: "Thu",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.701",
    },
    {
      id: "2",
      date: "Apr 10, 2025 5:00 PM",
      day: "Thu",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.701",
    },
    {
      id: "3",
      date: "Apr 11, 2025 9:00 AM",
      day: "Fri",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.701",
    },
    {
      id: "4",
      date: "Apr 11, 2025 5:00 PM",
      day: "Fri",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.701",
    },
  ],
  "8": [
    // David Chen's logs
    {
      id: "1",
      date: "Apr 10, 2025 8:30 AM",
      day: "Thu",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.801",
    },
    {
      id: "2",
      date: "Apr 10, 2025 8:30 PM",
      day: "Thu",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.801",
    },
    {
      id: "3",
      date: "Apr 11, 2025 8:35 AM",
      day: "Fri",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.801",
    },
    {
      id: "4",
      date: "Apr 11, 2025 7:45 PM",
      day: "Fri",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.801",
    },
  ],
  "9": [
    // Maria Garcia's logs
    {
      id: "1",
      date: "Apr 10, 2025 9:10 AM",
      day: "Thu",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.901",
    },
    {
      id: "2",
      date: "Apr 10, 2025 5:15 PM",
      day: "Thu",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.901",
    },
    {
      id: "3",
      date: "Apr 11, 2025 9:05 AM",
      day: "Fri",
      logType: "Clock In",
      comment: "Late Clock In",
      ipAddress: "210.83.901",
    },
    {
      id: "4",
      date: "Apr 11, 2025 5:10 PM",
      day: "Fri",
      logType: "Clock Out",
      comment: "Regular Hours",
      ipAddress: "210.83.901",
    },
  ],
  "10": [
    // James Wilson's logs
    {
      id: "1",
      date: "Apr 10, 2025 8:55 AM",
      day: "Thu",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.1001",
    },
    {
      id: "2",
      date: "Apr 10, 2025 6:30 PM",
      day: "Thu",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.1001",
    },
    {
      id: "3",
      date: "Apr 11, 2025 8:50 AM",
      day: "Fri",
      logType: "Clock In",
      comment: "On Time",
      ipAddress: "210.83.1001",
    },
    {
      id: "4",
      date: "Apr 11, 2025 6:45 PM",
      day: "Fri",
      logType: "Clock Out",
      comment: "Overtime",
      ipAddress: "210.83.1001",
    },
  ],
}

interface TimeLogTableProps {
  userId: string
}

export function TimeLogTable({ userId }: TimeLogTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Get time logs for the selected user or return empty array if not found
  const timeLogs = userTimeLogsData[userId as keyof typeof userTimeLogsData] || []
  const pageSize = 10
  const totalPages = Math.ceil(timeLogs.length / pageSize)

  // Sort and paginate logs
  const sortedLogs = [...timeLogs].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortField === "logType") {
      return sortDirection === "asc" ? a.logType.localeCompare(b.logType) : b.logType.localeCompare(a.logType)
    }
    return 0
  })

  const paginatedLogs = sortedLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                <div className="flex items-center">
                  Date and Time
                  <div className="flex flex-col ml-1">
                    <ChevronUp
                      className={`h-2 w-2 ${
                        sortField === "date" && sortDirection === "asc" ? "text-black" : "text-gray-400"
                      }`}
                    />
                    <ChevronDown
                      className={`h-2 w-2 ${
                        sortField === "date" && sortDirection === "desc" ? "text-black" : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </TableHead>
              <TableHead>Day</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("logType")}>
                <div className="flex items-center">
                  Log Type
                  <div className="flex flex-col ml-1">
                    <ChevronUp
                      className={`h-2 w-2 ${
                        sortField === "logType" && sortDirection === "asc" ? "text-black" : "text-gray-400"
                      }`}
                    />
                    <ChevronDown
                      className={`h-2 w-2 ${
                        sortField === "logType" && sortDirection === "desc" ? "text-black" : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.day}</TableCell>
                  <TableCell>{log.logType}</TableCell>
                  <TableCell>{log.comment}</TableCell>
                  <TableCell>{log.ipAddress}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log("Edit", log.id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Delete", log.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No time logs found for this user.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {timeLogs.length > 0 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, timeLogs.length)} of{" "}
            {timeLogs.length} logs
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
    </div>
  )
}
