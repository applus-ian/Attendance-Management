"use client";

import { useState, useEffect } from "react";
import { Bell, Clock, FileText, Menu, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Navbar from "@/components/navbar";
import "../../globals.css";

export default function MySchedulePage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM AM/PM
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Format date as Day, Month Date Year
  const shortFormatDate = (date: Date) => {
    return `${date.toLocaleDateString("en-US", { weekday: "long" })} ${date.getDate()}, ${date.toLocaleDateString("en-US", { month: "long" })} ${date.getFullYear()}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Left Column - Clock */}
          <div className="mb-8 md:mb-0 order-2 md:order-1">
            <h2 className="text-xl font-medium mb-6 text-center md:text-left">Good Morning, Employee!</h2>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border-8 border-orange-500 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full">
                    {/* Clock Markings */}
                    {[...Array(60)].map((_, i) => {
                      const rotation = `rotate(${i * 6}deg)`;
                      const isHour = i % 5 === 0;
                      return (
                        <div
                          key={i}
                          className={`absolute w-1 top-0 left-1/2 -translate-x-1/2 origin-bottom ${isHour ? "h-3 bg-black" : "h-1.5 bg-gray-400"}`}
                          style={{ transform: `${rotation} translateY(4px)` }}
                        />
                      );
                    })}
                  </div>

                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold">{formatTime(currentTime)}</div>
                    <div className="text-sm text-gray-500 mt-2">{shortFormatDate(currentTime)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming Shift */}
          <div className="order-1 md:order-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Your Upcoming Shift</h2>

              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <div className="font-medium">April 10, 2025</div>
                  <div className="text-sm text-gray-600">9 A.M - 6 P.M Philippine Time</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md flex items-center justify-center">
                <Clock className="w-5 h-5 mr-2" />
                Clock In
              </Button>

              <Button
                variant="outline"
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-md flex items-center justify-center"
              >
                <FileText className="w-5 h-5 mr-2" />
                Manual Request
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-orange-500 text-white py-3 text-center">
        <div className="container mx-auto">© 2025 Applus+</div>
      </footer>
    </div>
  );
}