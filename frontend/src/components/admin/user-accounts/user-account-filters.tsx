"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserAccountFiltersProps {
  filters: {
    search: string
    role: string
    department: string
    status: string
    shiftType: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string
      role: string
      department: string
      status: string
      shiftType: string
    }>
  >
  className?: string
}

// Mock data for filter options
const departments = ["IT", "HR", "Engineering", "Marketing", "Finance", "Operations"]
const roles = ["Admin", "Employee", "Manager", "Director", "Supervisor"]
const shiftTypes = ["Morning", "Afternoon", "Night", "Flexible"]

export function UserAccountFilters({ filters, setFilters, className }: UserAccountFiltersProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleRoleChange = (value: string) => {
    setFilters((prev) => ({ ...prev, role: value }))
  }

  const handleDepartmentChange = (value: string) => {
    setFilters((prev) => ({ ...prev, department: value }))
  }

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value }))
  }

  const handleShiftTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, shiftType: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      role: "all",
      department: "all",
      status: "all",
      shiftType: "all",
    })
  }

  return (
    <div className={cn("space-y-4 rounded-lg border p-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search by name, role, etc." value={filters.search} onChange={handleSearch} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select value={filters.role} onValueChange={handleRoleChange}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={filters.department} onValueChange={handleDepartmentChange}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shiftType">Shift Type</Label>
          <Select value={filters.shiftType} onValueChange={handleShiftTypeChange}>
            <SelectTrigger id="shiftType">
              <SelectValue placeholder="Select shift type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shift Types</SelectItem>
              {shiftTypes.map((shiftType) => (
                <SelectItem key={shiftType} value={shiftType}>
                  {shiftType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
