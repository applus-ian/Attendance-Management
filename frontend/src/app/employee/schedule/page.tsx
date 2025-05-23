"use client";

import {
  FileText,
  Clock,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";
import ClockInModal from "@/components/employee/Clock-in-modal";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/employee/navbar";
import { CircularClock } from "@/components/employee/Clock";
import Footer from "@/components/Footer";
import { useEmployeeSchedule } from "@/hooks/useEmployeeSchedule";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import "../../globals.css";

export default function MySchedulePage() {
  const [showClockIn, setShowClockIn] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { schedules, loading, error, refreshSchedule } = useEmployeeSchedule();
  const { user } = useAuth();
  const [lastClockInTime, setLastClockInTime] = useState<string | null>(null);

  // Simplified clock-in status (no backend check)
  useEffect(() => {
    // Check local storage for clock-in status
    const savedStatus = localStorage.getItem('clockInStatus');
    if (savedStatus) {
      const parsed = JSON.parse(savedStatus);
      setIsClockedIn(parsed.status);
      setLastClockInTime(parsed.timestamp);
    }
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      const today = new Date();
      return today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time24h: string) => {
    if (!time24h) return "";
    const [hours, minutes] = time24h.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "P.M" : "A.M";
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minutes} ${period}`;
  };

  // Simplified clock-in/out handling (no backend)
  const handleClockIn = async (comment: string) => {
    setIsLoading(true);
    
    // Simulate a delay for better UX
    setTimeout(() => {
      // Toggle clock-in status
      const newStatus = !isClockedIn;
      setIsClockedIn(newStatus);
      
      // Save to local storage
      const timestamp = new Date().toISOString();
      localStorage.setItem('clockInStatus', JSON.stringify({
        status: newStatus,
        timestamp,
        comment
      }));
      
      if (newStatus) {
        setLastClockInTime(timestamp);
      }
      
      toast.success(
        isClockedIn
          ? "You have successfully clocked out"
          : "You have successfully clocked in"
      );
      
      setIsLoading(false);
      setShowClockIn(false);
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 order-2 md:order-1 md:pl-20">
            <CircularClock greeting="Good Morning, Employee!" />
            
            {isClockedIn && lastClockInTime && (
              <div className="mt-4 bg-green-100 p-3 rounded-md text-green-700">
                <p className="text-sm">
                  You clocked in at {new Date(lastClockInTime).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>

          <div className="order-1 md:order-2 md:mr-8">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Your Upcoming Shifts</h2>
                {(error || !loading) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={refreshSchedule}
                    className="text-gray-500 hover:text-orange-500"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : error ? (
                <div className="flex items-center text-red-500 mb-4">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>{error}</span>
                </div>
              ) : schedules.length === 0 ? (
                <div className="text-gray-500">No upcoming shifts</div>
              ) : (
                <ul className="space-y-4">
                  {schedules.map((shift) => (
                    <li key={shift.id} className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                        <Clock className="w-8 h-8 text-pink-500" />
                      </div>
                      <div>
                        <div className="font-medium text-lg">
                          {shift.date
                            ? formatDate(shift.date)
                            : Array.isArray(shift.day)
                            ? shift.day.join(", ")
                            : shift.day}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatTime(shift.start)} ~ {formatTime(shift.end)} Philippine Time
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{shift.title}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-4">
              <Button
                className={`w-full ${
                  isClockedIn
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white py-3 rounded-md flex items-center justify-center text-lg font-medium`}
                onClick={() => setShowClockIn(true)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-2"></div>
                ) : (
                  <Clock className="w-6 h-6 mr-2" />
                )}
                {isClockedIn ? "Clock Out" : "Clock In"}
              </Button>

              <Button
                variant="outline"
                className="w-full border hover:bg-orange-600 hover:text-white border-orange-500 text-gray-700 py-3 rounded-md flex items-center justify-center text-lg font-medium group"
              >
                <FileText className="w-6 h-6 mr-2 group-hover:text-white" />
                Manual Request
              </Button>
            </div>
          </div>
        </div>

        {showClockIn && (
          <ClockInModal
            show={showClockIn}
            onClose={() => setShowClockIn(false)}
            onClockIn={handleClockIn}
            currentTime={new Date().toLocaleTimeString()}
            shiftTime={schedules.length > 0 ? formatTime(schedules[0]?.start) : ""}
            isClockedIn={isClockedIn}
            userId={user?.id}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}