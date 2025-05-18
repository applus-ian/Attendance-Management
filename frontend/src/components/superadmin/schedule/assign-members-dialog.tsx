"use client";

import React, { useState } from "react";
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

type Member = {
  id: string;
  name: string;
  department: "Malaysia" | "Australia" | "Spain";
  role: string;
  selected: boolean;
};

const mockMembers: Member[] = [
  { id: '1', name: 'Shiela Marie Arcillo', department: 'Malaysia', role: 'Manager', selected: false },
  { id: '2', name: 'Valey Austin Senoy', department: 'Australia', role: 'Developer', selected: false },
  { id: '3', name: 'Michelle Zozobrado', department: 'Spain', role: 'Accountant', selected: false },
  { id: '4', name: 'Cherry Ann deloy', department: 'Malaysia', role: 'Specialist', selected: false },
  { id: '5', name: 'Sayde Marie Elegino', department: 'Australia', role: 'Coordinator', selected: false },
  { id: '6', name: 'Mike Arthur Minoza', department: 'Spain', role: 'Designer', selected: false },
  { id: '7', name: 'Arnulfo Estenzo IV', department: 'Malaysia', role: 'Representative', selected: false },
  { id: '8', name: 'Donna May Alcos', department: 'Australia', role: 'Agent', selected: false },
  { id: '9', name: 'Yestin Roy Prado', department: 'Spain', role: 'Recruiter', selected: false },
  { id: '10', name: 'John Doe', department: 'Malaysia', role: 'CEO', selected: false },
];

type AssignShiftModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleId?: string;
};

export function AssignShiftModal({ open, onOpenChange, scheduleId }: AssignShiftModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([...mockMembers]);
  const [filterOption, setFilterOption] = useState<"Role" | "Department">("Role");
  const [selectedDepartment, setSelectedDepartment] = useState<"Malaysia" | "Australia" | "Spain" | "All">("All");
  const [selectedRole, setSelectedRole] = useState<string | "All">("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const handleSubmit = () => {
    const selectedMembers = members.filter(m => m.selected);
    console.log("Members assigned:", selectedMembers, "to schedule:", scheduleId);
    onOpenChange(false);
  };

  const handleFilterSelect = (option: "Role" | "Department") => {
    setFilterOption(option);
    setIsFilterOpen(true);
  };

  const handleDepartmentSelect = (department: "Malaysia" | "Australia" | "Spain" | "All") => {
    setSelectedDepartment(department);
    setIsFilterOpen(false);
  };

  const handleRoleSelect = (role: string | "All") => {
    setSelectedRole(role);
    setIsFilterOpen(false);
  };

  const uniqueRoles = ["All", ...new Set(members.map(member => member.role))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Assign Members</Button>
      </DialogTrigger>
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
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 pl-6 text-sm"
                      onClick={() => handleDepartmentSelect("All")}
                    >
                      All Departments
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 pl-10 text-sm"
                      onClick={() => handleDepartmentSelect("Malaysia")}
                    >
                      Malaysia
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 pl-10 text-sm"
                      onClick={() => handleDepartmentSelect("Australia")}
                    >
                      Australia
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 pl-10 text-sm"
                      onClick={() => handleDepartmentSelect("Spain")}
                    >
                      Spain
                    </div>
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
              {filteredMembers.length === 0 && (
                <div className="py-2 text-center text-gray-500">No members found</div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleSubmit}
            disabled={selectedCount === 0}
          >
            Assign
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}