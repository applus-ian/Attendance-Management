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
        {data.length > 0 ? (
          data.map((row) => (
            <TableRow key={row.request_id}>
              <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{row.request_type}</TableCell>
              <TableCell>{new Date(row.time).toLocaleString()}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell>{row.approval_status}</TableCell>
            </TableRow>
          ))
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