"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/admin/site-header";
import { TimeLogTable } from "@/components/admin/time-logs/time-log-table";
import { TimeLogFilters } from "@/components/admin/time-logs/time-log-filters";
import { useUserManagement } from "@/hooks/useUserManagement";
import { useTimelog } from "@/hooks/useTimelog";
import { use as usePromise } from "react";
import TimeLogModal from "@/components/modal/time-logs/time-logs-modal";

export default function UserTimeLogs({ params }: { params: { userId: string } | Promise<{ userId: string }> }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    logType: "all",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
    comment: "",
  });
  const [showTimeLogsModal, setShowTimeLogsModal] = useState(false);
  const [editLog, setEditLog] = useState<any | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // Unwrap params if it's a Promise (Next.js 14+)
  function isPromise<T>(value: any): value is Promise<T> {
    return typeof value?.then === "function";
  }
  const unwrappedParams = isPromise<{ userId: string }>(params) ? usePromise(params as Promise<{ userId: string }>) : params;
  const userId = unwrappedParams.userId;

  // --- User List ---
  const { users: allUsers = [], isLoadingUsers: usersLoading } = useUserManagement();
  // Only include users with the 'employee' role
  const users = allUsers.filter(u => u.roles && u.roles.includes('employee'));
  const totalUsers = users.length;

  // --- Sidebar User List ---
  const filteredUsers = useMemo(
    () =>
      users
        .filter((user) => `${user.employee?.first_name ?? ''} ${user.employee?.last_name ?? ''}`.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((user) => ({
          id: user.emp_id,
          name: `${user.employee?.first_name ?? ''} ${user.employee?.last_name ?? ''}`,
        })),
    [users, searchQuery]
  );

  // --- Selected User ---
  const selectedUser = useMemo(() => users.find(u => String(u.emp_id) === userId), [users, userId]);
  useEffect(() => {
    // Only redirect if the userId is invalid, there are visible users, and the search is empty (initial load or after clearing search)
    if (!selectedUser && filteredUsers.length > 0 && !searchQuery) {
      router.replace(`/admin/time-logs/${filteredUsers[0].id}`);
    }
  }, [selectedUser, filteredUsers.length, router, userId, searchQuery]);

  // --- Timelogs ---
  const {
    timelogs,
    isLoading: timelogsLoading,
    totalHoursWorked,
    totalOvertimeHours,
    createTimelog,
    updateTimelog,
    deleteTimelog,
  } = useTimelog(selectedUser?.emp_id);

  // --- Modal Handlers ---
  const handleAddTimeLog = () => {
    setModalMode('add');
    setEditLog(null);
    setShowTimeLogsModal(true);
  };
  const handleEditTimeLog = (log: any) => {
    setModalMode('edit');
    setEditLog(log);
    setShowTimeLogsModal(true);
  };
  const handleModalSubmit = (data: any) => {
    const normalized = {
      ...data,
      time: data.time,
      date: data.date ? data.date.toISOString().split('T')[0] : undefined,
      timelog_type: data.logType || data.timelog_type || data.type,
    };
    if (modalMode === 'add') {
      createTimelog.mutate({ emp_id: selectedUser?.emp_id, ...normalized });
    } else if (modalMode === 'edit' && editLog) {
      updateTimelog.mutate({ timelog_id: editLog.timelog_id, emp_id: selectedUser?.emp_id, ...normalized });
    }
    setShowTimeLogsModal(false);
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
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 bg-[#E4E0E0] w-full h-full min-h-[calc(100vh-100px)]">
              <div className="flex-1 flex justify-center items-start">
                <div className="w-full max-w-6xl mx-auto px-6 py-6 mt-6 bg-white rounded-lg shadow-sm">
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
                      <div className="md:block hidden max-h-[calc(100vh-120px)] overflow-y-auto">
                        {usersLoading ? (
                          <div>Loading users...</div>
                        ) : filteredUsers.length === 0 ? (
                          <div className="text-gray-400 text-center py-4">No users found.</div>
                        ) : (
                          filteredUsers.map((user) => (
                            <div
                              key={user.id}
                              className={`px-3 py-2 rounded-md text-sm cursor-pointer ${String(user.id) === userId ? "bg-orange-100 text-orange-900" : "hover:bg-muted"}`}
                              onClick={() => router.push(`/admin/time-logs/${user.id}`)}
                            >
                              {user.name}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-4 md:p-6 overflow-auto">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h1 className="text-xl font-semibold">
                          {selectedUser
                            ? `${selectedUser.employee?.first_name ?? ''} ${selectedUser.employee?.last_name ?? ''}`
                            : searchQuery
                              ? "Searching User"
                              : "User"}
                        </h1>
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex flex-col items-stretch">
                          <div className="flex-1 bg-white rounded-xl shadow border border-gray-200 flex items-center justify-between p-6 min-h-[120px]">
                            <div>
                              <div className="text-base text-gray-500 mb-1">Total Hours Worked</div>
                              <div className="text-3xl font-bold">{Number(totalHoursWorked ?? 0).toFixed(2)} <span className="text-lg font-medium text-gray-400">hrs</span></div>
                            </div>
                            <div className="flex items-center justify-center bg-orange-50 rounded-full p-3">
                              <Clock className="h-8 w-8 text-orange-400" />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-stretch">
                          <div className="flex-1 bg-white rounded-xl shadow border border-gray-200 flex items-center justify-between p-6 min-h-[120px]">
                            <div>
                              <div className="text-base text-gray-500 mb-1">Total Overtime Hours</div>
                              <div className="text-3xl font-bold">{Number(totalOvertimeHours ?? 0).toFixed(2)} <span className="text-lg font-medium text-gray-400">hrs</span></div>
                            </div>
                            <div className="flex items-center justify-center bg-orange-50 rounded-full p-3">
                              <Clock className="h-8 w-8 text-orange-400" />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-stretch">
                          <div className="flex-1 bg-white rounded-xl shadow border border-gray-200 flex items-center justify-between p-6 min-h-[120px]">
                            <div>
                              <div className="text-base text-gray-500 mb-1">Total Users</div>
                              <div className="text-3xl font-bold">{totalUsers}</div>
                            </div>
                            <div className="flex items-center justify-center bg-orange-50 rounded-full p-3">
                              <Users className="h-8 w-8 text-orange-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Time logs table */}
                      <TimeLogTable userId={userId} filters={filters} onEdit={handleEditTimeLog} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      {showTimeLogsModal && (
        <TimeLogModal
          isOpen={showTimeLogsModal}
          onClose={() => setShowTimeLogsModal(false)}
          onSubmit={handleModalSubmit}
          mode={modalMode}
          initialData={editLog}
        />
      )}
    </SidebarProvider>
  );
}
