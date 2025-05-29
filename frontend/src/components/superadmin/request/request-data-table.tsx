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

export interface Request {
  id: string;
  dateSubmitted: string;
  member: string;
  type: 'clock_in' | 'clock_out' | 'overtime';
  dateRequested: string;
  comment: string;
  status: "Approved" | "Pending" | "Denied";
  feedback: string;
}

interface EmployeeRequest {
  dateSubmitted: string;
  requestType: string;
  requestDate: string;
  requestComment: string;
  requestStatus: string;
}

export function RequestDataTable({ data }: { data: EmployeeRequest[] }) {
  return (
    <Table>
      <TableHeader className="bg-gray-200">
        <TableRow>
          <TableHead>Date Submitted</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date requested</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.dateSubmitted}</TableCell>
              <TableCell>{row.requestType}</TableCell>
              <TableCell>{row.requestDate}</TableCell>
              <TableCell>{row.requestComment}</TableCell>
              <TableCell>{row.requestStatus}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No data available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}