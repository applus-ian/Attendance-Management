"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, User } from "lucide-react"
import RoleSwitch from "@/components/RoleSwitch"
import { useAuth } from "@/hooks/useAuth"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()

  // Determine role flags from user.role (string array)
  const isAdmin = user?.role.includes("admin") ?? false
  const isSuperAdmin = user?.role.includes("super_admin") ?? false

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Optional: function to handle role switch (if needed in header)
  const handleRoleSwitch = () => {
    router.push("/employee/schedule")
  }

  return (
    <header
      className={`sticky top-0 z-50 flex w-full items-center border-b bg-white px-4 lg:px-6 transition-all duration-300 ${
        isScrolled ? "h-14" : "h-12"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
          </button>

          {/* Pass user roles & current path */}
          <div className="hidden md:block">
            <RoleSwitch
              isAdmin={isAdmin}
              isSuperAdmin={isSuperAdmin}
              currentPath={pathname}
            />
          </div>

          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  )
}
