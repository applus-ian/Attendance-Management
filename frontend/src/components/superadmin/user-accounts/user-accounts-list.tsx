"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import { UserAccountFilters } from "@/components/superadmin/user-accounts/user-account-filters"
import { EditScheduleDialog } from "@/components/superadmin/user-accounts/edit-schedule-dialog"
import { RemoveScheduleDialog } from "@/components/superadmin/user-accounts/remove-schedule-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock user account data
const userAccounts = [
  {
    id: "1",
    name: "Sarah Lim",
    role: "Admin",
    department: "IT",
    status: "Active",
    shiftType: "Morning",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "8:00 am - 5:00 pm",
    avatar: "SL",
  },
  {
    id: "2",
    name: "Valey Austine M. Senoy",
    role: "Employee",
    department: "IT",
    status: "Active",
    shiftType: "Morning",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "8:00 am - 5:00 pm",
    avatar: "VS",
  },
  {
    id: "3",
    name: "Sarah Lim",
    role: "Admin",
    department: "IT",
    status: "Active",
    shiftType: "Morning",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "8:00 am - 5:00 pm",
    avatar: "SL",
  },
  {
    id: "4",
    name: "Sarah Lim",
    role: "Admin",
    department: "IT",
    status: "Active",
    shiftType: "Morning",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "9:00 am - 6:00 pm",
    avatar: "SL",
  },
  {
    id: "5",
    name: "Sarah Lim",
    role: "Admin",
    department: "IT",
    status: "Active",
    shiftType: "Morning",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "9:00 am - 6:00 pm",
    avatar: "SL",
  },
  {
    id: "6",
    name: "Sarah Lim",
    role: "Admin",
    department: "IT",
    status: "Active",
    shiftType: "Morning",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "9:00 am - 6:00 pm",
    avatar: "SL",
  },
  {
    id: "7",
    name: "Sarah Lim",
    role: "Admin",
    department: "IT",
    status: "Active",
    shiftType: "Morning",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "9:00 am - 6:00 pm",
    avatar: "SL",
  },
  {
    id: "8",
    name: "Michelle Zoobrado",
    role: "Manager",
    department: "HR",
    status: "Active",
    shiftType: "Morning",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "8:30 am - 5:30 pm",
    avatar: "MZ",
  },
  {
    id: "9",
    name: "Mike Arthur Minoza",
    role: "Employee",
    department: "Engineering",
    status: "Inactive",
    shiftType: "Night",
    days: "Mon, Tue, Wed, Thu, Fri",
    hours: "10:00 pm - 7:00 am",
    avatar: "MM",
  },
  {
    id: "10",
    name: "Cherry Ann Debby",
    role: "Employee",
    department: "Marketing",
    status: "Active",
    shiftType: "Flexible",
    days: "Mon, Wed, Fri",
    hours: "9:00 am - 3:00 pm",
    avatar: "CD",
  },
]

export function UserAccountsList() {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(1)
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [removingUser, setRemovingUser] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    department: "all",
    status: "all",
    shiftType: "all",
  })

  const pageSize = 7
  const totalItems = userAccounts.length
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

  const getUserById = (id: string) => {
    return userAccounts.find((user) => user.id === id) || userAccounts[0]
  }

  // Filter users based on active tab and filters
  const filteredUsers = userAccounts.filter((user) => {
    // Tab filters
    if (activeTab === "admins" && user.role !== "Admin") return false
    if (activeTab === "active" && user.status !== "Active") return false
    if (activeTab === "inactive" && user.status !== "Inactive") return false

    // Search filter
    if (
      filters.search &&
      !user.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !user.role.toLowerCase().includes(filters.search.toLowerCase()) &&
      !user.department.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    // Role filter
    if (filters.role !== "all" && user.role !== filters.role) {
      return false
    }

    // Department filter
    if (filters.department !== "all" && user.department !== filters.department) {
      return false
    }

    // Status filter
    if (filters.status !== "all" && user.status !== filters.status) {
      return false
    }

    // Shift Type filter
    if (filters.shiftType !== "all" && user.shiftType !== filters.shiftType) {
      return false
    }

    return true
  })

  // Paginate the filtered users
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">All User Accounts</h1>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex overflow-x-auto mb-6 pb-2">
          <div className="flex space-x-1">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("all")}
              className="whitespace-nowrap"
            >
              All
            </Button>
            <Button
              variant={activeTab === "admins" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("admins")}
              className="whitespace-nowrap"
            >
              Admins
            </Button>
            <Button
              variant={activeTab === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("active")}
              className="whitespace-nowrap"
            >
              Active
            </Button>
            <Button
              variant={activeTab === "inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("inactive")}
              className="whitespace-nowrap"
            >
              Inactive
            </Button>
          </div>
        </div>

        {showFilters && <UserAccountFilters filters={filters} setFilters={setFilters} className="mb-6" />}
      </div>

      {isMobile ? (
        // Mobile view with cards
        <div className="space-y-4">
          {paginatedUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingUser(user.id)}>Edit Schedule</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRemovingUser(user.id)}>Remove Schedule</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="text-sm">{user.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge
                      variant={user.status === "Active" ? "default" : "secondary"}
                      className={
                        user.status === "Active"
                          ? "bg-green-500 hover:bg-green-600 mt-1"
                          : "bg-gray-500 hover:bg-gray-600 mt-1"
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Shift Type</p>
                    <p className="text-sm">{user.shiftType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Days</p>
                    <p className="text-sm">{user.days}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Hours</p>
                    <p className="text-sm">{user.hours}</p>
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
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Shift Type</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "Active" ? "default" : "secondary"}
                        className={
                          user.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.shiftType}</TableCell>
                    <TableCell>{user.days}</TableCell>
                    <TableCell>{user.hours}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingUser(user.id)}>Edit Schedule</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setRemovingUser(user.id)}>Remove Schedule</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No users found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredUsers.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
          {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
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

      {editingUser && (
        <EditScheduleDialog
          open={!!editingUser}
          onOpenChange={() => setEditingUser(null)}
          user={getUserById(editingUser)}
        />
      )}

      {removingUser && (
        <RemoveScheduleDialog
          open={!!removingUser}
          onOpenChange={() => setRemovingUser(null)}
          user={getUserById(removingUser)}
        />
      )}
    </div>
  )
}
