"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUsers, User as ApiUser } from "@/hooks/useUsers";
import { Loader2 } from "lucide-react";

// For single user assignment
export type AssignUserModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleId: number;
  onAssigned?: () => void;
};

export function AssignUserModal({ open, onOpenChange, scheduleId, onAssigned }: AssignUserModalProps) {
  const { users, loading: loadingUsers, error: usersError, assignUsersToSchedule } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [filterOption, setFilterOption] = useState<"Role" | "Department">("Role");
  const [selectedDepartment, setSelectedDepartment] = useState<string | "All">("All");
  const [selectedRole, setSelectedRole] = useState<string | "All">("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Filtered users
  const filteredUsers = (users || []).filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.role || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || user.department === selectedDepartment;
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const handleSubmit = async () => {
    if (!selectedUserId) {
      setSubmitError("Please select a user to assign");
      return;
    }
    if (typeof scheduleId !== 'number' || isNaN(scheduleId)) {
      setSubmitError("Invalid schedule ID");
      return;
    }
    try {
      setSubmitting(true);
      setSubmitError(null);
      await assignUsersToSchedule(scheduleId, [selectedUserId]);
      if (onAssigned) onAssigned();
      onOpenChange(false);
    } catch (error: any) {
      setSubmitError(error.message || "Failed to assign user");
    } finally {
      setSubmitting(false);
    }
  };

  // Get unique departments and roles
  const uniqueDepartments = ["All", ...new Set(users.map(u => u.department || "Unassigned"))];
  const uniqueRoles = ["All", ...new Set(users.map(u => u.role || "Unassigned"))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Assign User</DialogTitle>
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
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2 min-w-[100px]">
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <div>
                  <div
                    className={`px-4 py-2 cursor-pointer ${filterOption === "Role" ? "bg-orange-500 text-white" : ""}`}
                    onClick={() => { setFilterOption("Role"); setIsFilterOpen(true); }}
                  >
                    Role
                  </div>
                  <div
                    className={`px-4 py-2 cursor-pointer ${filterOption === "Department" ? "bg-orange-500 text-white" : ""}`}
                    onClick={() => { setFilterOption("Department"); setIsFilterOpen(true); }}
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
                        onClick={() => { setSelectedDepartment(department); setIsFilterOpen(false); }}
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
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${role === "All" ? "pl-6" : "pl-10"} text-sm`}
                        onClick={() => { setSelectedRole(role); setIsFilterOpen(false); }}
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
              <div className="mt-1 space-y-1 max-h-[350px] overflow-y-auto">
                {filteredUsers.map(user => (
                  <div key={user.user_id} className="flex items-center py-1">
                    <Checkbox
                      id={`user-${user.user_id}`}
                      className="border-gray-300 rounded-sm"
                      checked={selectedUserId === user.user_id}
                      onCheckedChange={() => setSelectedUserId(user.user_id)}
                    />
                    <label htmlFor={`user-${user.user_id}`} className="ml-3 text-sm font-medium">
                      {user.name}
                    </label>
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="py-2 text-center text-gray-500">No users found matching your search</div>
                )}
              </div>
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
            disabled={!selectedUserId || submitting}
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
