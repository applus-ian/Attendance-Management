"use client";

import { Bell, FileText, Menu, User, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Navbar from "@/components/navbar";
import { CircularClock } from "@/components/Clock"; // Import your updated CircularClock component
import "../../globals.css";

export default function MySchedulePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="md:grid md:grid-cols-2 md:gap-12">
          {/* Left Column - Clock */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 order-2 md:order-1 md:pl-20">
            {/* Use the CircularClock component */}
            <CircularClock greeting="Good Morning, Employee!" />
          </div>

          {/* Right Column - Upcoming Shift */}
          <div className="order-1 md:order-2">
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
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md flex items-center justify-center text-lg font-medium">
                <Clock className="w-6 h-6 mr-2" />
                Clock In
              </Button>

              <Button
                variant="outline"
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-md flex items-center justify-center text-lg font-medium"
              >
                <FileText className="w-6 h-6 mr-2" />
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