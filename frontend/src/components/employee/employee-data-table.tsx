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

interface EmployeeTimesheet {
  date: string;
  inTime: string;
  outTime: string;
  worked: string;
  scheduled: string;
  comment: string;
}

export function EmployeeDataTable({ data }: { data: EmployeeTimesheet[] }) {
  return (
    
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>In</TableHead>
            <TableHead>Out</TableHead>
            <TableHead>Worked</TableHead>
            <TableHead>Scheduled</TableHead>
            <TableHead>Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.inTime}</TableCell>
                <TableCell>{row.outTime}</TableCell>
                <TableCell>{row.worked}</TableCell>
                <TableCell>{row.scheduled}</TableCell>
                <TableCell>{row.comment}</TableCell>
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