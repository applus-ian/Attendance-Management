"use client";

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

export function RequestDataTable({ data }: { data: ManualRequest[] }) {
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  return (
    <Table>
      <TableHeader className="bg-gray-200">
        <TableRow>
          <TableHead>Date Submitted</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {safeData.length > 0 ? (
          safeData.map((row, index) => {
            // Create a unique key using multiple fields
            const uniqueKey = `${row.request_id || ''}-${row.created_at || ''}-${index}`;

            return (
              <TableRow key={uniqueKey}>
                <TableCell>{row.created_at ? new Date(row.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{row.request_type || 'N/A'}</TableCell>
                <TableCell>{row.time ? new Date(row.time).toLocaleString() : 'N/A'}</TableCell>
                <TableCell>{row.reason || 'N/A'}</TableCell>
                <TableCell>{row.approval_status || 'N/A'}</TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No data available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}