"use client";

import Navbar from "@/components/navbar";
import { useAuth } from "@/hooks/useAuth";
import { useManualRequest, ManualRequest } from "@/hooks/useManualRequest";
import { RequestDataTable } from "@/components/request-data-table";

export default function EmployeeRequestPage() {
  // Get the authenticated user's employee ID
  const { user } = useAuth();
  
  // Fetch all requests
  const { requests: allRequests, isLoading, error } = useManualRequest();

  // Filter requests for the current employee
  const myRequests = allRequests.filter((request: ManualRequest) => request.emp_id === user?.emp_id);

  return (
    <>
      <Navbar />
      <main className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Requests</h1>
            </div>
            <RequestDataTable 
              data={myRequests} 
              isLoading={isLoading}
              error={error as Error | null}
            />
          </div>
        </div>
      </main>
    </>
  );
}