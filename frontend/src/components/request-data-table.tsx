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
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";

interface RequestDataTableProps {
  data: ManualRequest[];
  isLoading?: boolean;
  error?: Error | null;
}

export function RequestDataTable({ data, isLoading, error }: RequestDataTableProps) {
  // Simple date formatter
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md">
        Error loading requests: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 text-gray-600">
        Loading requests...
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date Requested</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!data || data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No requests found
              </TableCell>
            </TableRow>
          ) : (
            data.map((request) => (
              <TableRow key={request.request_id}>
                <TableCell>{request.emp_id}</TableCell>
                <TableCell>{formatDate(request.created_at)}</TableCell>
                <TableCell>{request.request_type}</TableCell>
                <TableCell>{formatDate(request.time)}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                  <Badge 
                    className={getStatusColor(request.approval_status)}
                    variant="outline"
                  >
                    {request.approval_status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}