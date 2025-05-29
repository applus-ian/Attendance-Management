"use client";

import { useAuth } from "@/hooks/useAuth";
import { useManualRequest } from "@/hooks/useManualRequest";
import { RequestDataTable } from "@/components/request-data-table";

export function EmployeeManualRequests() {
  // Get the authenticated user's employee ID
  const { user } = useAuth();
  
  // Fetch only the requests for this employee
  const { requests, isLoading } = useManualRequest(user?.emp_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <RequestDataTable data={requests} />;
} 