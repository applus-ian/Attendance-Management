"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname hook
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Search, Moon, Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname(); // Get the current route

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
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input type="search" placeholder="Search..." className="pl-8 w-full" />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Toggle aria-label="Toggle dark mode" className="text-gray-500 rounded-full">
            <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" /> Employee
          </Toggle>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
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

