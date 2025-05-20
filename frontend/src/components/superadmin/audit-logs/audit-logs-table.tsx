"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuditLogFilters } from "./audit-log-filters";
import { useAuditLog, AuditLog as RawAuditLog } from "@/hooks/useAuditLogs";
// import { TimelogResource } from "@/components/resources/TimelogResource";

export type AuditLogRow = {
  id: string;
  actionType: string;
  user: string;
  target: string;
  description: string;
  timestamp: string;
};

export function AuditLogsTable() {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof AuditLogRow>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({
    actionType: "all",
    user: "",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  });

  const pageSize = 9;

  // 🔥 Replace sample data with hook data
  const { auditLogs, isLoading, isError, error } = useAuditLog();

  // Map the raw shape to our UI row shape
  const rows: AuditLogRow[] = (auditLogs ?? []).map((log: RawAuditLog) => ({
    id: String(log.log_id),
    actionType: log.action_type,
    user: `${log.first_name} ${log.last_name}  (${log.role})`,
    target: log.target_type ? `${log.target_type} #${log.target_id}` : "—",
    description: log.description,
    timestamp: new Date(log.created_at).toLocaleString(),
  }));

  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Sort & filter logic (unchanged)
  const filteredAndSortedLogs = useMemo(() => {
    const filtered = rows.filter((log) => {
      if (
        searchQuery &&
        ![log.actionType, log.user, log.target, log.description]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.actionType !== "all" &&
        log.actionType !== filters.actionType
      ) {
        return false;
      }
      if (
        filters.user &&
        !log.user.toLowerCase().includes(filters.user.toLowerCase())
      ) {
        return false;
      }
      if (filters.dateRange.from || filters.dateRange.to) {
        const logDate = new Date(log.timestamp);
        if (filters.dateRange.from && logDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to) {
          const endDate = new Date(filters.dateRange.to);
          endDate.setHours(23, 59, 59, 999);
          if (logDate > endDate) {
            return false;
          }
        }
      }
      return true;
    });

    return filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortDirection === "asc") {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });
  }, [rows, searchQuery, filters, sortField, sortDirection]);

  const paginatedLogs = filteredAndSortedLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderSortIcon = (field: keyof AuditLogRow) => {
    if (sortField !== field) {
      return <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground/70" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  if (isLoading) {
    return <p className="text-center py-8">Loading audit logs…</p>;
  }
  if (isError) {
    return (
      <p className="text-center py-8 text-red-600">
        Error loading logs: {error!.message}
      </p>
    );
  }

  return (
    <div>
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search audit logs…"
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full sm:w-auto"
        >
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {showFilters && (
        <AuditLogFilters
          filters={filters}
          setFilters={setFilters}
          className="mb-6"
        />
      )}

      {/* Mobile View */}
      {isMobile ? (
        <div className="space-y-4">
          {paginatedLogs.length > 0 ? (
            paginatedLogs.map((log) => (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{log.actionType}</h3>
                      <p className="text-sm text-muted-foreground">
                        {log.timestamp}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => console.log("View", log.id)}
                        >
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">User</p>
                      <p className="text-sm">{log.user}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Target</p>
                      <p className="text-sm">{log.target}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground">
                        Description
                      </p>
                      <p className="text-sm">{log.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No audit logs found.
            </div>
          )}
        </div>
      ) : (
        /* Desktop Table */
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    sortField === "actionType"
                      ? setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        )
                      : setSortField("actionType");
                  }}
                >
                  <div className="flex items-center">
                    Action Type
                    {renderSortIcon("actionType")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    sortField === "user"
                      ? setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        )
                      : setSortField("user");
                  }}
                >
                  <div className="flex items-center">
                    User
                    {renderSortIcon("user")}
                  </div>
                </TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Description</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    sortField === "timestamp"
                      ? setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        )
                      : setSortField("timestamp");
                  }}
                >
                  <div className="flex items-center">
                    Timestamp
                    {renderSortIcon("timestamp")}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      {log.actionType}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.target}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No audit logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {filteredAndSortedLogs.length > 0
            ? (currentPage - 1) * pageSize + 1
            : 0}
          -{Math.min(currentPage * pageSize, filteredAndSortedLogs.length)} of{" "}
          {filteredAndSortedLogs.length}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>
          {!isMobile && (
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => (
                <Button
                  key={i}
                  variant={i + 1 === currentPage ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              {totalPages > 3 && <span className="px-2">…</span>}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
