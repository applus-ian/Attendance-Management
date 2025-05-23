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
import { useManualRequest } from "@/hooks/useManualRequest";

interface Request {
  id: string;
  dateSubmitted: string;
  requestType: string;
  requestDate: string;
  requestComment: string;
  requestStatus: string;
}

function transformManualRequest(raw: any): Request {
  return {
    id: raw.request_id.toString(),
    dateSubmitted: new Date(raw.created_at).toLocaleDateString(),
    requestType: raw.request_type.replace("_", " "),
    requestDate: new Date(raw.time).toLocaleDateString(),
    requestComment: raw.reason,
    requestStatus: raw.approval_status.charAt(0).toUpperCase() + raw.approval_status.slice(1),
  };
}

export function RequestDataTable() {
  const { requests, isLoading, error } = useManualRequest();
  const data = (requests || []).map(transformManualRequest);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          data.map((row: Request) => (
            <TableRow key={row.id}>
              <TableCell>{row.dateSubmitted}</TableCell>
              <TableCell>{row.requestType}</TableCell>
              <TableCell>{row.requestDate}</TableCell>
              <TableCell>{row.requestComment}</TableCell>
              <TableCell>{row.requestStatus}</TableCell>
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