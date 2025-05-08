"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Clock, Users, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { UserList } from "@/components/user-list"
import { TimeLogTable } from "@/components/time-log-table"
import { TimeLogFilters } from "@/components/time-logs/time-log-filters"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

// Mock user summary data
const userSummaryData = {
  "1": {
    name: "Valey Austine Senoy",
    totalHoursWorked: "123:123",
    totalOvertimeHours: "12:123",
    totalUsers: "123",
  },
  "2": {
    name: "Shiela Marie Arcillo",
    totalHoursWorked: "87:45",
    totalOvertimeHours: "5:30",
    totalUsers: "123",
  },
  "3": {
    name: "Michelle Zoobrado",
    totalHoursWorked: "92:15",
    totalOvertimeHours: "8:45",
    totalUsers: "123",
  },
  "4": {
    name: "Mike Arthur Minoza",
    totalHoursWorked: "76:30",
    totalOvertimeHours: "2:15",
    totalUsers: "123",
  },
  "5": {
    name: "Lyn Sanchez",
    totalHoursWorked: "82:10",
    totalOvertimeHours: "4:20",
    totalUsers: "123",
  },
  "6": {
    name: "Robert Johnson",
    totalHoursWorked: "95:45",
    totalOvertimeHours: "10:30",
    totalUsers: "123",
  },
  "7": {
    name: "Sarah Williams",
    totalHoursWorked: "80:00",
    totalOvertimeHours: "0:00",
    totalUsers: "123",
  },
  "8": {
    name: "David Chen",
    totalHoursWorked: "105:15",
    totalOvertimeHours: "15:15",
    totalUsers: "123",
  },
  "9": {
    name: "Maria Garcia",
    totalHoursWorked: "78:25",
    totalOvertimeHours: "1:25",
    totalUsers: "123",
  },
  "10": {
    name: "James Wilson",
    totalHoursWorked: "90:30",
    totalOvertimeHours: "6:30",
    totalUsers: "123",
  },
}

export default function UserTimeLogs({ params }: { params: { userId: string } }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    logType: "all",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
    comment: "",
  })

  // Get user data or use default if not found
  const selectedUser = userSummaryData[params.userId as keyof typeof userSummaryData] || {
    name: "Unknown User",
    totalHoursWorked: "0:00",
    totalOvertimeHours: "0:00",
    totalUsers: "123",
  }

  const handleAddTimeLog = () => {
    console.log("Add time log for user:", params.userId)
  }

  return (
    <SidebarProvider
    style={
      {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }
  >
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 bg-[#E4E0E0]">
            <div className="px-4 lg:px-6">
              <div className="container mx-auto px-4 lg:px-6 py-6 mt-6 bg-white rounded-lg shadow-sm">
               

              <div className="flex flex-col md:flex-row h-full">
{/* Left sidebar - User search and list */}
<div className="w-full md:w-[220px] border-b md:border-b-0 md:border-r bg-background p-4">
  <div className="relative mb-4">
    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search User"
      className="pl-8"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
  <div className="md:block hidden">
    <UserList selectedUserId={params.userId} />
  </div>
</div>

{/* Main content */}
<div className="flex-1 p-4 md:p-6 overflow-auto">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <h1 className="text-xl font-semibold">{selectedUser.name}</h1>
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full sm:w-auto">
        <Filter className="mr-2 h-4 w-4" />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
      <Button onClick={handleAddTimeLog} className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
        Add Time Log
      </Button>
    </div>
  </div>

  {showFilters && <TimeLogFilters filters={filters} setFilters={setFilters} className="mb-6" />}

  {/* Summary cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <div className="text-sm text-muted-foreground">Total Hours Worked</div>
          <div className="text-2xl font-bold">{selectedUser.totalHoursWorked} hrs</div>
        </div>
        <Clock className="h-8 w-8 text-muted-foreground" />
      </CardContent>
    </Card>

    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <div className="text-sm text-muted-foreground">Total Overtime Hours</div>
          <div className="text-2xl font-bold">{selectedUser.totalOvertimeHours} hrs</div>
        </div>
        <Clock className="h-8 w-8 text-muted-foreground" />
      </CardContent>
    </Card>

    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <div className="text-sm text-muted-foreground">Total Users</div>
          <div className="text-2xl font-bold">{selectedUser.totalUsers}</div>
        </div>
        <Users className="h-8 w-8 text-muted-foreground" />
      </CardContent>
    </Card>
  </div>

  {/* Time logs table */}
  <TimeLogTable userId={params.userId} filters={filters} />
</div>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
  )
}
