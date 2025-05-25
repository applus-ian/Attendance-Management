"use client";

import Navbar from "@/components/navbar";
import { RequestDataTable } from "@/components/request-data-table";
import { useState, useMemo } from "react";
import { useManualRequest, ManualRequest } from "@/hooks/useManualRequest";
import { parse, isWithinInterval, parseISO, format, startOfDay, endOfDay } from 'date-fns';

interface PayPeriod {
  label: string;
  value: string;
  startDate: Date;
  endDate: Date;
}

export default function EmployeeRequestPage() {
  const currentYear = new Date().getFullYear();

  // Generate pay periods for the current year
  const generatePayPeriods = (): PayPeriod[] => {
    const periods: PayPeriod[] = [];
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    months.forEach((month, index) => {
      const year = currentYear;

      // First half of the month
      const startDate1 = new Date(year, index, 1);
      const endDate1 = new Date(year, index, 15);
      periods.push({
        label: `${month} 1 - 15, ${year}`,
        value: `${month} 1 - 15, ${year}`,
        startDate: startOfDay(startDate1),
        endDate: endOfDay(endDate1)
      });

      // Second half of the month
      const lastDay = new Date(year, index + 1, 0).getDate();
      const startDate2 = new Date(year, index, 16);
      const endDate2 = new Date(year, index, lastDay);
      periods.push({
        label: `${month} 16 - ${lastDay}, ${year}`,
        value: `${month} 16 - ${lastDay}, ${year}`,
        startDate: startOfDay(startDate2),
        endDate: endOfDay(endDate2)
      });
    });

    return periods;
  };

  const payPeriods = useMemo(() => generatePayPeriods(), [currentYear]);

  const getInitialPeriod = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const day = now.getDate();
    const year = now.getFullYear();

    const periodString = day <= 15
      ? `1 - 15, ${year}`
      : `16 - ${new Date(year, currentMonth + 1, 0).getDate()}, ${year}`;

    return `${format(now, 'MMM')} ${periodString}`;
  };

  const [selectedPeriod, setSelectedPeriod] = useState(getInitialPeriod);
  const { requests, isLoading, error } = useManualRequest();

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  // Filter requests based on selected pay period
  const filteredRequests = useMemo(() => {
    if (!requests || !selectedPeriod) return requests;

    const selectedPeriodData = payPeriods.find(period => period.value === selectedPeriod);
    if (!selectedPeriodData) return requests;

    return requests.filter((request: ManualRequest) => {
      const requestDate = new Date(request.time);
      return isWithinInterval(requestDate, {
        start: selectedPeriodData.startDate,
        end: selectedPeriodData.endDate
      });
    });
  }, [requests, selectedPeriod, payPeriods]);

  return (
    <>
      <Navbar />
      <main className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Request</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {/* Pay Period Section */}
          <div className="flex justify-end items-center mb-4 flex-shrink-0">
            <span className="text-gray-600 mr-2 flex-shrink-0">Pay Period</span>
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="appearance-none border border-gray-300 rounded-md px-4 py-2 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {payPeriods.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                ▼
              </span>
            </div>
          </div>
          {/* Employee Data Table */}
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              Error loading requests. Please try again later.
            </div>
          ) : (
            <RequestDataTable data={filteredRequests} />
          )}
        </div>
      </main>
    </>
  );
}