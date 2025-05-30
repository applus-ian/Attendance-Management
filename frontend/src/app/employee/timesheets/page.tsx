"use client";

import Navbar from "@/components/employee/navbar";
import { EmployeeDataTable } from "@/components/employee/employee-data-table";
import { useState } from "react";
import { useEmployeeTimesheet } from "@/hooks/useTimesheet";
import { useEmployeeSchedules } from "@/hooks/useAssignedSchedules";

export default function TimesheetsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("Jan 1 - 15, 2025");
    const { timesheets, isLoading, isError, error } = useEmployeeTimesheet();
    const { schedules: assignedSchedules } = useEmployeeSchedules();

    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedPeriod(event.target.value);
    };

    // Map timesheets to EmployeeDataTable row format
    const tableData = timesheets.map(ts => {
      // Find earliest clock_in and latest clock_out
      let inTime = "-";
      let outTime = "-";
      let comment = "";
      let worked = 0;
      if (ts.timelogs && ts.timelogs.length > 0) {
        const clockIns = ts.timelogs.filter(log => log.type === "clock_in");
        const clockOuts = ts.timelogs.filter(log => log.type === "clock_out");
        if (clockIns.length > 0) {
          const earliest = clockIns.reduce((a, b) => new Date(a.time) < new Date(b.time) ? a : b);
          inTime = new Date(earliest.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          comment = earliest.comment || "";
        }
        if (clockOuts.length > 0) {
          const latest = clockOuts.reduce((a, b) => new Date(a.time) > new Date(b.time) ? a : b);
          outTime = new Date(latest.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        // Sum hrs_worked for the day
        worked = ts.timelogs.reduce((sum, log) => sum + (log.hrs_worked || 0), 0);
      }
      // Find assigned schedule for this date
      const scheduleForDay = assignedSchedules.find(s => {
        // Compare date part only
        const assignedDate = new Date(s.assigned_at).toISOString().slice(0, 10);
        return assignedDate === ts.date;
      });
      let scheduled = "-";
      if (scheduleForDay && scheduleForDay.schedule) {
        // Calculate scheduled hours from start and end time
        const start = scheduleForDay.schedule.start;
        const end = scheduleForDay.schedule.end;
        if (start && end) {
          const [startH, startM] = start.split(":").map(Number);
          const [endH, endM] = end.split(":").map(Number);
          let diff = (endH * 60 + endM) - (startH * 60 + startM);
          if (diff < 0) diff += 24 * 60; // handle overnight shifts
          scheduled = (diff / 60).toFixed(2);
        }
      } else {
        scheduled = typeof ts.scheduled_hrs === 'number' ? ts.scheduled_hrs.toFixed(2) : (ts.scheduled_hrs || "0.00");
      }
      return {
        date: ts.date,
        inTime,
        outTime,
        worked: worked.toFixed(2),
        scheduled,
        comment,
      };
    });

    return (
      <>
        <Navbar />
        <main className="p-6 bg-gray-100 min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Timesheets</h1>
            
           
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-4">
            {/* Pay Period Section */}
            <div className="flex justify-end items-center mb-4">
              <span className="text-gray-600  mr-2">Pay Period</span>
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                  className="appearance-none border border-gray-300 rounded-md px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={isLoading}
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
            {isLoading ? (
              <div className="text-center py-8">Loading timesheets...</div>
            ) : isError ? (
              <div className="text-center py-8 text-red-500">{error?.message || "Failed to load timesheets."}</div>
            ) : (
              <EmployeeDataTable data={tableData} />
            )}
          </div>
        </main>
      </>
    );
  }