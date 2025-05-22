"use client";

import { AppSidebar } from "@/components/App-sidebar";
import { SiteHeader } from "@/components/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Search } from "@/components/search";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserList } from "@/components/user-list";
import { TimeLogTable } from "@/components/time-log-table";

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
  // Add more users as needed
};

export default function UserTimeLogs({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Get user data or use default if not found
  const selectedUser = userSummaryData[params.userId as keyof typeof userSummaryData] || {
    name: "Unknown User",
    totalHoursWorked: "0:00",
    totalOvertimeHours: "0:00",
    totalUsers: "123",
  };

  const handleAddTimeLog = () => {
    console.log("Add time log for user:", params.userId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

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
                        {/* Use the Search component */}
                        <Search
                          placeholder="Search User"
                          value={searchQuery}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                        />
                      </div>
                      <UserList selectedUserId={params.userId} />
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h1 className="text-lg md:text-xl font-semibold">{selectedUser.name}</h1>
                        <Button onClick={handleAddTimeLog} className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600">
                          Add Time Log
                        </Button>
                      </div>

                      {/* Summary cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <Card>
                          <CardContent className="flex items-center justify-between p-6">
                            <div>
                              <div className="text-sm text-muted-foreground">Total Hours Worked</div>
                              <div className="text-lg md:text-2xl font-bold">{selectedUser.totalHoursWorked} hrs</div>
                            </div>
                            <Clock className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground" />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="flex items-center justify-between p-6">
                            <div>
                              <div className="text-sm text-muted-foreground">Total Overtime Hours</div>
                              <div className="text-lg md:text-2xl font-bold">{selectedUser.totalOvertimeHours} hrs</div>
                            </div>
                            <Clock className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground" />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="flex items-center justify-between p-6">
                            <div>
                              <div className="text-sm text-muted-foreground">Total Users</div>
                              <div className="text-lg md:text-2xl font-bold">{selectedUser.totalUsers}</div>
                            </div>
                            <Users className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground" />
                          </CardContent>
                        </Card>
                      </div>

                      {/* Time logs table */}
                      <TimeLogTable userId={params.userId} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
