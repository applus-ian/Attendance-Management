"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAccountFiltersProps {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  className?: string;
  jobPositions?: string[];
  hideRoleFilter?: boolean;
}

// Mock data for filter options
const departments = [
  "IT",
  "HR",
  "Engineering",
  "Marketing",
  "Finance",
  "Operations",
];
const roles = ["Admin", "Employee", "Manager", "Director", "Supervisor"];
const jobPosition = ["Morning", "Afternoon", "Night", "Flexible"];

export function UserAccountFilters({
  filters,
  setFilters,
  className,
  jobPositions = [],
  hideRoleFilter = false,
}: UserAccountFiltersProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: any) => ({ ...prev, search: e.target.value }));
  };

  const handleRoleChange = (value: string) => {
    setFilters((prev: any) => ({ ...prev, role: value }));
  };

  const handleDepartmentChange = (value: string) => {
    setFilters((prev: any) => ({ ...prev, department: value }));
  };

  const handleStatusChange = (value: string) => {
    setFilters((prev: any) => ({ ...prev, status: value }));
  };

  const handleJobPositionChange = (value: string) => {
    setFilters((prev: any) => ({ ...prev, jobPosition: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      role: "all",
      department: "all",
      status: "all",
      jobPosition: "all",
    });
  };

  return (
    <div className={cn("space-y-4 rounded-lg border p-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by name, role, etc."
            value={filters.search}
            onChange={handleSearch}
          />
        </div>
        {!hideRoleFilter && (
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
        )}
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select
            value={filters.department}
            onValueChange={handleDepartmentChange}
          >
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
          <Label htmlFor="jobPosition">Job Position</Label>
          <Select
            value={filters.jobPosition}
            onValueChange={handleJobPositionChange}
          >
            <SelectTrigger id="jobPosition">
              <SelectValue placeholder="Select Job Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Job Position</SelectItem>
              {jobPositions.map((jobPosition) => (
                <SelectItem key={jobPosition} value={jobPosition}>
                  {jobPosition}
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
  );
}
