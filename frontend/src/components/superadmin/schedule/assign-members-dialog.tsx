"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUsers, User as ApiUser } from "@/hooks/useUsers";
import { Loader2 } from "lucide-react";

type Member = {
  id: string;
  name: string;
  department: string;
  role: string;
  selected: boolean;
};

type AssignShiftModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleId: number; // Changed from optional string|number to required number
};

export function AssignShiftModal({ open, onOpenChange, scheduleId }: AssignShiftModalProps) {
  console.log("AssignShiftModal received scheduleId:", scheduleId, "type:", typeof scheduleId);
  
  const { users, loading: loadingUsers, error: usersError, assignUsersToSchedule } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [filterOption, setFilterOption] = useState<"Role" | "Department">("Role");
  const [selectedDepartment, setSelectedDepartment] = useState<string | "All">("All");
  const [selectedRole, setSelectedRole] = useState<string | "All">("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Convert API users to members when users are loaded
  useEffect(() => {
    if (users && users.length > 0) {
      console.log("Loading users from API:", users.length, "users found");
      const convertedMembers = users.map((user: ApiUser) => ({
        id: user.user_id.toString(),
        name: user.name,
        department: user.department || 'Unassigned',
        role: user.role || 'Unassigned',
        selected: false
      }));
      setMembers(convertedMembers);
    } else if (users) {
      console.log("No users found in API response");
      setMembers([]);
    }
  }, [users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMemberToggle = (memberId: string, checked: boolean | "indeterminate") => {
    setMembers(members.map(member =>
      member.id === memberId
        ? { ...member, selected: checked === true }
        : member
    ));
  };

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    setMembers(members.map(member => ({ ...member, selected: checked === true })));
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === "All" || member.department === selectedDepartment;

    const matchesRole = selectedRole === "All" || member.role === selectedRole;

    return matchesSearch && matchesDepartment && matchesRole;
  });

  const selectedCount = members.filter(m => m.selected).length;

 const handleSubmit = async () => {
  const selectedMembers = members.filter(m => m.selected);
  
  // More comprehensive ID validation
  console.log("Members assigned:", selectedMembers);
  console.log("Schedule ID for assignment:", scheduleId, "type:", typeof scheduleId);
  
  if (typeof scheduleId !== 'number' || isNaN(scheduleId)) {
    console.error("Invalid schedule ID provided for assignment:", scheduleId);
    setSubmitError("Cannot assign members: Invalid schedule ID");
    return;
  }
  
  if (selectedMembers.length === 0) {
    setSubmitError("Please select at least one member to assign");
    return;
  }
  
  try {
    setSubmitting(true);
    setSubmitError(null);
    
    // Call the API to assign users to the schedule with consistent type
    await assignUsersToSchedule(
      scheduleId,
      selectedMembers.map(member => member.id)
    );
    
    onOpenChange(false);
  } catch (error: any) {
    console.error("Error assigning users:", error);
    setSubmitError(error.message || "Failed to assign users to schedule");
  } finally {
    setSubmitting(false);
  }
};
useEffect(() => {
  console.log("AssignShiftModal rendered with scheduleId:", scheduleId);
  console.log("scheduleId type:", typeof scheduleId);
  console.log("scheduleId is valid number:", !isNaN(Number(scheduleId)));
}, [scheduleId]);

  const handleFilterSelect = (option: "Role" | "Department") => {
    setFilterOption(option);
    setIsFilterOpen(true);
  };

  const handleDepartmentSelect = (department: string | "All") => {
    setSelectedDepartment(department);
    setIsFilterOpen(false);
  };

  const handleRoleSelect = (role: string | "All") => {
    setSelectedRole(role);
    setIsFilterOpen(false);
  };

  // Get unique departments from real data
  const uniqueDepartments = ["All", ...new Set(members.map(member => member.department))];
  
  // Get unique roles from real data
  const uniqueRoles = ["All", ...new Set(members.map(member => member.role))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Assigned Members</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <Input
                className="pl-10"
                placeholder="Type a command or search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2 min-w-[100px]">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <div>
                  <div
                    className={`px-4 py-2 cursor-pointer ${filterOption === "Role" ? "bg-orange-500 text-white" : ""}`}
                    onClick={() => handleFilterSelect("Role")}
                  >
                    Role
                  </div>
                  <div
                    className={`px-4 py-2 cursor-pointer ${filterOption === "Department" ? "bg-orange-500 text-white" : ""}`}
                    onClick={() => handleFilterSelect("Department")}
                  >
                    Department
                  </div>
                </div>

                {filterOption === "Department" && (
                  <div>
                    {uniqueDepartments.map(department => (
                      <div
                        key={department}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${department === "All" ? "pl-6" : "pl-10"} text-sm`}
                        onClick={() => handleDepartmentSelect(department)}
                      >
                        {department === "All" ? "All Departments" : department}
                      </div>
                    ))}
                  </div>
                )}

                {filterOption === "Role" && (
                  <div>
                    {uniqueRoles.map(role => (
                      <div
                        key={role}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${role === "All" ? "pl-6" : "pl-10"
                          } text-sm`}
                        onClick={() => handleRoleSelect(role)}
                      >
                        {role === "All" ? "All Roles" : role}
                      </div>
                    ))}
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            {loadingUsers ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                <span className="mt-2 text-gray-600">Loading users from database...</span>
              </div>
            ) : usersError ? (
              <div className="py-8 text-center text-red-500">
                <p>Error loading users: {usersError}</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <Checkbox
                    id="select-all"
                    className="border-gray-300 rounded-sm"
                    checked={selectedCount === filteredMembers.length && filteredMembers.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="ml-3 text-sm font-medium">
                    Select All
                  </label>
                </div>

                <div className="mt-1 space-y-1 max-h-[350px] overflow-y-auto">
                  {filteredMembers.map(member => (
                    <div key={member.id} className="flex items-center py-1">
                      <Checkbox
                        id={`member-${member.id}`}
                        className="border-gray-300 rounded-sm"
                        checked={member.selected}
                        onCheckedChange={(checked) => handleMemberToggle(member.id, checked)}
                      />
                      <label htmlFor={`member-${member.id}`} className="ml-3 text-sm font-medium">
                        {member.name}
                      </label>
                    </div>
                  ))}
                  {filteredMembers.length === 0 && members.length > 0 && (
                    <div className="py-2 text-center text-gray-500">No users found matching your search</div>
                  )}
                  {members.length === 0 && !loadingUsers && !usersError && (
                    <div className="py-4 text-center text-gray-500">
                      <p>No users available in the database</p>
                      <p className="text-xs mt-1">Please add users to the system first</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          {submitError && (
            <p className="text-sm text-red-500 mb-2">{submitError}</p>
          )}
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleSubmit}
            disabled={selectedCount === 0 || submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning...
              </>
            ) : (
              "Assign"
            )}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}