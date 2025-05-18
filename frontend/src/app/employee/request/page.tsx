"use client";

import Navbar from "@/components/navbar";
import { RequestDataTable } from "@/components/request-data-table";
import { useState } from "react";

const requestData = [
  { dateSubmitted: "January 2, 2025", requestType: "Clockin",requestDate: "January 2, 2025",requestComment: "request for clockin", requestStatus: "Approved"},
  { dateSubmitted: "January 2, 2025", requestType: "Clockin",requestDate: "January 2, 2025",requestComment: "request for clockin", requestStatus: "Approved"},
  { dateSubmitted: "January 2, 2025", requestType: "Clockin",requestDate: "January 2, 2025",requestComment: "request for clockin", requestStatus: "Approved"},
];
export default function EmployeeRequestPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("Jan 1 - 15, 2025");
  
    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedPeriod(event.target.value);
    };
  
    return (
      <>
        <Navbar />
        <main className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">Request</h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            {/* Pay Period Section */}
            <div className="flex justify-end items-center mb-4">
              <span className="text-gray-600  mr-2">Pay Period</span>
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                  className="appearance-none border border-gray-300 rounded-md px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <optgroup label="January 2025">
                    <option>Jan 1 - 15, 2025</option>
                    <option>Jan 16 - 31, 2025</option>
                  </optgroup>
                  <optgroup label="February 2025">
                    <option>Feb 1 - 15, 2025</option>
                    <option>Feb 16 - 28, 2025</option>
                  </optgroup>
                  <optgroup label="March 2025">
                    <option>Mar 1 - 15, 2025</option>
                    <option>Mar 16 - 31, 2025</option>
                  </optgroup>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>
            {/* Employee Data Table */}
            <RequestDataTable data={requestData} />
          </div>
          
        </main>
      </>
    );
  }