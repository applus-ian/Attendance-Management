"use client";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User } from "lucide-react";
import RoleSwitch from "@/components/RoleSwitch";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const isAdmin = Array.isArray(user?.role) && user.role.includes("admin");
  const isSuperAdmin = Array.isArray(user?.role) && user.role.includes("super_admin");

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
      className={`sticky top-0 z-50 flex w-full items-center border-b bg-white px-4 lg:px-6 transition-all duration-300 ${
        isScrolled ? "h-14" : "h-12"
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
          {(isAdmin || isSuperAdmin) && (
            <RoleSwitch
              onSwitch={() => {
                if (isSuperAdmin) {
                  window.location.href = "/employee/schedule";
                } else {
                  window.location.href = "/admin/dashboard";
                }
              }}
              userRole={"admin"}
              currentPage={"admin"}
            />
          )}

          {/* Profile Avatar */}
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
