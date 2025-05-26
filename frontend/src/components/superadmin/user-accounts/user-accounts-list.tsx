"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserAccountFilters } from "@/components/superadmin/user-accounts/user-account-filters";
import { useUserManagement } from "@/hooks/useUserManagement";

// Helper to convert 24h time string to 12h format with am/pm
function formatHour24To12(time24?: string) {
  if (!time24) return "-";

  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const ampm = hour >= 12 ? "pm" : "am";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  // Only hours (no minutes) as per example (10pm)
  return `${hour}${ampm}`;
}

// Map roles from database to display values
const roleDisplayMap: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  employee: "Employee",
};

// Map days from full name to abbreviated
const dayAbbreviationMap: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export function UserAccountsList() {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    department: "all",
    status: "all",
    jobPosition: "all",
  });

  const { users, isLoadingUsers, isErrorUsers, activate, deactivate, remove } =
    useUserManagement();

  const userAccounts = users ?? [];

  const pageSize = 7;
  const totalItems = userAccounts.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const filteredUsers = userAccounts.filter((user) => {
    if (activeTab === "admins" && !user.roles.includes("Admin")) return false;
    if (activeTab === "active" && !user.is_active) return false;
    if (activeTab === "inactive" && user.is_active) return false;

    const searchTerm = filters.search.toLowerCase();
    if (
      filters.search &&
      !user.name.toLowerCase().includes(searchTerm) &&
      !user.roles.some((r) => r.toLowerCase().includes(searchTerm)) &&
      !(user.employee?.department.toLowerCase().includes(searchTerm) ?? false)
    ) {
      return false;
    }

    if (filters.role !== "all" && !user.roles.includes(filters.role))
      return false;
    if (
      filters.department !== "all" &&
      user.employee?.department !== filters.department
    )
      return false;
    if (
      filters.status !== "all" &&
      ((filters.status === "active" && !user.is_active) ||
        (filters.status === "inactive" && user.is_active))
    )
      return false;

    return true;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Helper to get display role string (first matching role mapped)
  function getDisplayRole(roles: string[]) {
    for (const role of roles) {
      const key = role.toLowerCase().replace(" ", "_"); // normalize
      if (roleDisplayMap[key]) {
        return roleDisplayMap[key];
      }
    }
    // fallback to join roles as is if no mapping found
    return roles.join(", ");
  }

  // Helper to get day abbreviation from schedule day string
  function getDayAbbreviation(day?: string) {
    if (!day) return "-";
    const key = day.toLowerCase();
    return dayAbbreviationMap[key] ?? day;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex bg-[#F5F6FA] rounded-xl p-2 space-x-2 shadow-sm">
          {[
            { label: "All", value: "all" },
            { label: "Admins", value: "admins" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                activeTab === tab.value
                  ? "bg-white shadow text-gray-900"
                  : "bg-transparent text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="search"
              placeholder="Type a command or search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-lg"
          >
            <Filter className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border">
        <h2 className="text-xl font-semibold px-6 pt-6 pb-2">
          All User Accounts
        </h2>
        {showFilters && (
          <UserAccountFilters
            filters={filters}
            setFilters={setFilters}
            className="mb-6 px-6"
          />
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F5F6FA]">
                <TableHead className="py-3 px-6">Name</TableHead>
                <TableHead className="py-3 px-6">Role</TableHead>
                <TableHead className="py-3 px-6">Department</TableHead>
                <TableHead className="py-3 px-6">Job Position</TableHead>
                <TableHead className="py-3 px-6">Status</TableHead>
                <TableHead className="py-3 px-6">Days</TableHead>
                <TableHead className="py-3 px-6">Hours</TableHead>
                <TableHead className="py-3 px-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.user_id} className="hover:bg-[#F5F6FA]">
                    <TableCell className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-gray-100 text-gray-500">
                          <AvatarFallback className="text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {user.employee?.first_name}{" "}
                          {user.employee?.middle_name}{" "}
                          {user.employee?.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      {getDisplayRole(user.roles)}
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      {user.employee?.department ?? "-"}
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      {user.employee?.job_position ?? "-"}
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      <span
                        className={
                          user.is_active
                            ? "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200"
                            : "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200"
                        }
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      {getDayAbbreviation(
                        user.employee?.assigned_schedule?.schedule?.day
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      {formatHour24To12(
                        user.employee?.assigned_schedule?.schedule?.start
                      )}{" "}
                      -{" "}
                      {formatHour24To12(
                        user.employee?.assigned_schedule?.schedule?.end
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              user.is_active
                                ? deactivate(user.user_id)
                                : activate(user.user_id)
                            }
                          >
                            {user.is_active ? "Set Inactive" : "Set Active"}
                          </DropdownMenuItem>

                          {!user.is_active && (
                            <DropdownMenuItem
                              onClick={() => remove(user.user_id)}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center">
                    No user accounts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex items-center gap-2"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
