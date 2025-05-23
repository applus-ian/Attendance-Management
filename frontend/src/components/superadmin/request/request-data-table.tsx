import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ManualRequest } from "@/hooks/useManualRequest";
import clsx from "clsx";

export function RequestDataTable({ data }: { data: ManualRequest[] }) {
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  return (
    <Table>
      <TableHeader className="bg-gray-200">
        <TableRow>
          <TableHead>Date Submitted</TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date Requested</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Feedback</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {safeData.length > 0 ? (
          safeData.map((row, index) => {
            const uniqueKey = `${row.request_id || ''}-${row.created_at || ''}-${index}`;
            // Format dates
            const dateSubmitted = row.created_at
              ? new Date(row.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : "N/A";
            const dateRequested = row.time
              ? new Date(row.time).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
              : "N/A";
            // Status badge
            const status = row.approval_status || "N/A";
            const statusClass = clsx(
              "px-3 py-1 rounded-full text-xs font-semibold",
              status === "Approved" && "bg-gray-200 text-gray-700",
              status === "Pending" && "bg-orange-400 text-white",
              status === "Denied" && "bg-red-400 text-white"
            );
            // Feedback
            const feedback = row.feedback ? row.feedback : "—";
            const feedbackClass = clsx(
              "text-sm",
              row.feedback === "Done" ? "text-gray-700" : "text-gray-400 italic"
            );

            return (
              <TableRow key={uniqueKey}>
                <TableCell>{dateSubmitted}</TableCell>
                <TableCell>{row.employee?.name || "N/A"}</TableCell>
                <TableCell>{row.request_type || "N/A"}</TableCell>
                <TableCell>{dateRequested}</TableCell>
                <TableCell>{row.reason || "N/A"}</TableCell>
                <TableCell>
                  <span className={statusClass}>{status}</span>
                </TableCell>
                <TableCell>
                  <span className={feedbackClass}>{feedback}</span>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No data available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}