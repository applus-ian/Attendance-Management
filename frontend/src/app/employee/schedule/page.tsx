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
import api from "@/lib/api";
import "../../globals.css";

export default function MySchedulePage() {
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { schedules, loading, error, refreshSchedule } = useEmployeeSchedule();
  const { user } = useAuth();
  const [lastClockTime, setLastClockTime] = useState<string | null>(null);

  // Fetch current clock-in status from backend
  async function fetchClockStatus() {
    if (!user?.id) return;
    try {
      const res = await api.get("/employee/current-status", {
        params: { user_id: user.id },
      });
      const { status, timestamp } = res.data;
      setIsClockedIn(status === "clocked_in");
      setLastClockTime(timestamp);
    } catch (err) {
      console.error("Failed to fetch clock-in status", err);
    }
  }

  useEffect(() => {
    fetchClockStatus();
  }, [user]);

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

  // Unified clock handler toggling between clock-in and clock-out
  const handleClock = async () => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }
  
    setIsLoading(true);
  
    try {
      let res;
      if (!isClockedIn) {
        // Clock in
        res = await api.post("/timelogs/clock-in", {
          emp_id: user.id,
          timelog_type: "clock_in",
        });
      } else {
        // Clock out
        res = await api.post("/timelogs/clock-out", {
          emp_id: user.id,
          timelog_type: "clock_out",
        });
      }
  
      const { status, timestamp } = res.data;
      setIsClockedIn(status === "clocked_in");
      setLastClockTime(timestamp);
  
      toast.success(
        status === "clocked_in"
          ? "You have successfully clocked in"
          : "You have successfully clocked out"
      );
  
      setShowClockInModal(false);
    } catch (error: any) {
      console.error("Clock action failed:", error);
      toast.error("Something went wrong while updating clock status.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 order-2 md:order-1 md:pl-20">
            <CircularClock greeting="Good Morning, Employee!" />

            {isClockedIn && lastClockTime && (
              <div className="mt-4 bg-green-100 p-3 rounded-md text-green-700">
                <p className="text-sm">
                  You clocked in at {new Date(lastClockTime).toLocaleTimeString()}
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
                onClick={() => setShowClockInModal(true)}
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

        {showClockInModal && (
          <ClockInModal
            show={showClockInModal}
            onClose={() => setShowClockInModal(false)}
            onClockIn={handleClock}
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
