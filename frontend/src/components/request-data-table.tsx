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
import { format, parseISO } from 'date-fns';

export function RequestDataTable({ data }: { data: ManualRequest[] }) {
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatTime = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      return format(date, 'HH:mm:ss');
    } catch (error) {
      return 'Invalid Time';
    }
  };

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
                <TableCell>{formatDate(row.time)}</TableCell>
                <TableCell>{row.request_type || 'N/A'}</TableCell>
                <TableCell>{formatTime(row.time)}</TableCell>
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