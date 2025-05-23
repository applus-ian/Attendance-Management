"use client";

import Navbar from "@/components/employee/navbar";
import { EmployeeDataTable } from "@/components/employee/Employee-data-table";
import { useState, useEffect, useCallback } from "react";
import ClockInModal from "@/components/employee/Clock-in-modal";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Timesheet = {
  date: string;
  inTime: string;
  outTime: string;
  worked: string;
  scheduled: string;
  comment: string;
};

// Static data for initial display - will be replaced by API data
const initialTimesheetData = [
  { date: "January 2, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
  { date: "January 3, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
  { date: "January 6, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
  { date: "January 7, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
  { date: "January 8, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
  { date: "January 9, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
  { date: "January 10, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
  { date: "January 13, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
  { date: "January 14, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
  { date: "January 15, 2025", inTime: "6 a.m", outTime: "3:00 p.m", worked: "8 h", scheduled: "8 h", comment: "" },
];
export default function TimesheetsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("Jan 1 - 15, 2025");
    const [showClockIn, setShowClockIn] = useState(false);
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [timesheetData, setTimesheetData] = useState<Timesheet[]>(initialTimesheetData);
    const [isLoadingTimesheets, setIsLoadingTimesheets] = useState(false);
    const { user } = useAuth();
  
    // Fetch timesheet data
    const fetchTimesheets = useCallback(async () => {
      if (!user) return;
      
      setIsLoadingTimesheets(true);
      try {
        // Get the start and end dates from the selected period
        const [startStr, endStr] = selectedPeriod.split(' - ');
        
        const response = await api.get(`/timesheets`, {
          params: {
            // You may need to format these dates according to your API
            start_date: startStr,
            end_date: endStr
          }
        });
        
        if (response.data && Array.isArray(response.data.data)) {
          // Transform the API response to match our Timesheet type
          const formattedData = response.data.data.map((item: any) => ({
            date: new Date(item.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            inTime: item.clock_in_time || '-',
            outTime: item.clock_out_time || '-',
            worked: `${item.hrs_worked || 0} h`,
            scheduled: `${item.scheduled_hours || 8} h`,
            comment: item.comment || ''
          }));
          
          setTimesheetData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching timesheets:", error);
        // Don't show error toast as this is refreshed automatically
      } finally {
        setIsLoadingTimesheets(false);
      }
    }, [user, selectedPeriod]);
  
    
    useEffect(() => {
      fetchTimesheets();
    }, [selectedPeriod, fetchTimesheets]);
  
    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedPeriod(event.target.value);
    };
    
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const shiftTime = "9:00 AM"; // You can replace this with actual shift time from schedules
    
    
  
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
                  disabled={isLoadingTimesheets}
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
            
            {/* Timesheet Data Table with Loading State */}
            {isLoadingTimesheets ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <EmployeeDataTable data={timesheetData} />
            )}
          </div>
          
          
        </main>
      </>
    );
  }