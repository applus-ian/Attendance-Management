"use client";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User } from "lucide-react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex w-full items-center border-b bg-white px-4 lg:px-6 transition-all duration-300 ${isScrolled ? "h-14" : "h-12"
        }`}
    >
      <div className="flex w-full items-center justify-between">
        {/* Left Section: Sidebar Trigger and Title */}
        <div className="flex items-center gap-2">
          {/* Sidebar Trigger */}
          <SidebarTrigger className="-ml-1" />

          {/* Separator */}
          <Separator orientation="vertical" className="mx-2 h-4" />
        </div>

        {/* Right Section: Always visible */}
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <button className="text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
          </button>

          {/* Role Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-orange-500">Super Admin</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={(e) => {
                  if (e.target.checked) {
                    window.location.href = "/employee/schedule"; // Navigate to Employee page
                  }
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
            </label>
            <span className="text-sm font-medium text-gray-600">Employee</span>
          </div>

          {/* Profile Avatar */}
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
