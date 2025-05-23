"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface RoleSwitchProps {
  isAdmin: boolean
  isSuperAdmin: boolean
  currentPath: string
}

export default function RoleSwitch({ isAdmin, isSuperAdmin, currentPath }: RoleSwitchProps) {
  const router = useRouter()

  // Don't show the switch if user is neither admin nor super admin
  if (!isAdmin && !isSuperAdmin) return null

  // Check if we're currently on an admin page
  const isAdminPage = currentPath.includes("/admin") || currentPath.includes("/super-admin")

  // Determine which admin page to navigate to
  const adminPath = isSuperAdmin ? "/super-admin/dashboard" : "/admin/dashboard"

  // Handle the toggle switch
  const handleToggle = () => {
    if (isAdminPage) {
      // If on admin page, go to employee view (home)
      router.push("/employee/schedule")
    } else {
      // If on employee page, go to appropriate admin dashboard
      router.push(adminPath)
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* Employee label */}
      <span
        className={cn("text-base font-medium transition-colors", !isAdminPage ? "text-orange-500" : "text-gray-500")}
      >
        Employee
      </span>

      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={isAdminPage}
        onClick={handleToggle}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "bg-orange-500", // Always orange background
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
            isAdminPage ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>

      {/* Admin/Super Admin label */}
      <span
        className={cn("text-base font-medium transition-colors", isAdminPage ? "text-orange-500" : "text-gray-500")}
      >
        {isSuperAdmin ? "Super Admin" : "Admin"}
      </span>
    </div>
  )
}
