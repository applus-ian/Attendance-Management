"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Bell, Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import Notification from "@/components/notification";

export default function Navbar() {
  const pathname = usePathname(); // Get the current route
  const [showNotifications, setShowNotifications] = useState(false);

  // Initial notifications
  const [notifications, setNotifications] = useState<{
    id: number;
    title: string;
    description: string;
    type: "info" | "success" | "error" | "warning";
  }[]>([
    { id: 1, title: "New Message", description: "You have a new message from HR.", type: "info" },
    { id: 2, title: "Shift Reminder", description: "Your shift starts at 9:00 AM.", type: "success" },
    { id: 3, title: "System Alert", description: "System maintenance at midnight.", type: "warning" },
  ]);

  // Function to dismiss a notification
  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-1 pl-2 md:pl-0" prefetch={false}>
          <img
            src="/LOGO1.svg" // Replace with your logo path
            alt="Acme Inc Logo"
            className="h-10 w-auto"
          />
          <span className="sr-only">Acme Inc</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/employee/schedule"
            className={`px-5 py-5 text-sm font-medium ${
              pathname === "/employee/schedule"
                ? "text-orange-500 border-b-2 border-orange-500 dark:text-orange-400"
                : "text-gray-600 border-b-2 border-transparent hover:text-orange-500 hover:border-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
            }`}
            prefetch={false}
          >
            My Schedule
          </Link>
          <Link
            href="/employee/timesheets"
            className={`px-5 py-5 text-sm font-medium ${
              pathname === "/employee/timesheets"
                ? "text-orange-500 border-b-2 border-orange-500 dark:text-orange-400"
                : "text-gray-600 border-b-2 border-transparent hover:text-orange-500 hover:border-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
            }`}
            prefetch={false}
          >
            Timesheets
          </Link>
          <Link
            href="/employee/request"
            className={`px-5 py-5 text-sm font-medium ${
              pathname === "/employee/request"
                ? "text-orange-500 border-b-2 border-orange-500 dark:text-orange-400"
                : "text-gray-600 border-b-2 border-transparent hover:text-orange-500 hover:border-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
            }`}
            prefetch={false}
          >
            Request
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
          </button>

          {/* Notifications */}
          {showNotifications && (
            <div className="absolute top-16 right-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Notification
                    key={notification.id}
                    id={notification.id}
                    title={notification.title}
                    description={notification.description}
                    type={notification.type}
                    onClose={dismissNotification}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">Empty notifications</div>
              )}
            </div>
          )}

          {/* Employee Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                {/* Profile Picture */}
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src="/avatar.svg" // Replace with the actual profile picture path
                    alt="Employee Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="hidden md:inline">Employee</span>
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <button className="rounded-full md:hidden">
                <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                <Link
                  href="/employee/schedule"
                  className={`text-sm font-medium ${
                    pathname === "/employee/schedule"
                      ? "text-orange-500"
                      : "text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
                  }`}
                  prefetch={false}
                >
                  My Schedule
                </Link>
                <Link
                  href="/employee/timesheets"
                  className={`text-sm font-medium ${
                    pathname === "/employee/timesheets"
                      ? "text-orange-500"
                      : "text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
                  }`}
                  prefetch={false}
                >
                  Timesheets
                </Link>
                <Link
                  href="/employee/request"
                  className={`text-sm font-medium ${
                    pathname === "/employee/request"
                      ? "text-orange-500"
                      : "text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
                  }`}
                  prefetch={false}
                >
                  Request
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}