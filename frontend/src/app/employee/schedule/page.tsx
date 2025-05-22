"use client";

import { Bell, FileText, Menu, User, Clock } from "lucide-react";
import { useState } from "react";
import ClockInModal from "@/components/employee/clock-in-modal";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/employee/navbar";
import { CircularClock } from "@/components/employee/Clock"; 
import Footer from "@/components/Footer";
import "../../globals.css";

export default function MySchedulePage() {
  const [showClockIn, setShowClockIn] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false); // Track clock-in status

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const shiftTime = "9:00 AM";

  // Handle clock in/out action
  const handleClockIn = (comment: string) => {
    if (!isClockedIn) {
      // TODO: Send clock-in request to backend here
      alert(`Clocked in!\nComment: ${comment}`);
      setIsClockedIn(true);
    } else {
      // TODO: Send clock-out request to backend here
      alert(`Clocked out!\nComment: ${comment}`);
      setIsClockedIn(false);
    }
    setShowClockIn(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 order-2 md:order-1 md:pl-20">
            <CircularClock greeting="Good Morning, Employee!" />
          </div>

          <div className="order-1 md:order-2 md:mr-8 lg:mr-">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Your Upcoming Shift</h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  <Clock className="w-8 h-8 text-pink-500" />
                </div>
                <div>
                  <div className="font-medium text-lg">April 10, 2025</div>
                  <div className="text-sm text-gray-600">9 A.M ~ 6 P.M Philippine Time</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className={`w-full ${isClockedIn ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"} text-white py-3 rounded-md flex items-center justify-center text-lg font-medium`}
                onClick={() => setShowClockIn(true)}
              >
                <Clock className="w-6 h-6 mr-2" />
                {isClockedIn ? "Clock Out" : "Clock In"}
              </Button>

              <Button
                variant="outline"
                className="w-full border hover:bg-orange-600 text-white border-orange-500 text-gray-700 py-3 rounded-md flex items-center justify-center text-lg font-medium"
              >
                <FileText className="w-6 h-6 mr-2" />
                Manual Request
              </Button>
            </div>
          </div>
        </div>
        <ClockInModal
          show={showClockIn}
          onHide={() => setShowClockIn(false)}
          onClockIn={handleClockIn}
          currentTime={currentTime}
          shiftTime={shiftTime} isClockedIn={false}        />
      </main>
      <Footer />
    </div>
  );
}