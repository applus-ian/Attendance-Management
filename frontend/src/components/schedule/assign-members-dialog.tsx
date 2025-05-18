"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AssignMembersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  scheduleId: string
}

// Mock user data
const users = [
  { id: "1", name: "Shiela Marie Arcillo", role: "UI/UX Designer", department: "Design" },
  { id: "2", name: "Valey Austin Senoy", role: "Senior Developer", department: "Engineering" },
  { id: "3", name: "Michelle Zoobrado", role: "Project Manager", department: "Management" },
  { id: "4", name: "Cherry Ann debby", role: "QA Engineer", department: "Quality Assurance" },
  { id: "5", name: "Sayda Marie Riggins", role: "Frontend Developer", department: "Engineering" },
  { id: "6", name: "Mike Arthur Minoza", role: "Backend Developer", department: "Engineering" },
  { id: "7", name: "Arnulfo Estenso IV", role: "DevOps Engineer", department: "Operations" },
  { id: "8", name: "Donna May Abais", role: "HR Manager", department: "Human Resources" },
  { id: "9", name: "Yestin Roy Prado", role: "Marketing Specialist", department: "Marketing" },
  { id: "10", name: "John Doe", role: "Data Analyst", department: "Analytics" },
]

export function AssignMembersDialog({ open, onOpenChange, scheduleId }: AssignMembersDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [filterType, setFilterType] = useState<"role" | "department">("role")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId])
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId))
    }
  }

  const handleAssign = () => {
    console.log("Assigning users to schedule:", scheduleId, selectedUsers)
    onOpenChange(false)
  }

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assigned Members</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Type a command or search..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select defaultValue="role" onValueChange={(value) => setFilterType(value as "role" | "department")}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="role">Role</SelectItem>
                <SelectItem value="department">Department</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filterType === "role" && <div className="mb-4 p-2 bg-orange-500 text-white rounded-md">Role</div>}

          {filterType === "department" && (
            <div className="mb-4 p-2 bg-orange-500 text-white rounded-md">Department</div>
          )}

          <div className="max-h-[300px] overflow-y-auto border rounded-md">
            <div className="p-2 border-b">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedUsers.length === users.length}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                />
                <Label htmlFor="select-all" className="font-medium">
                  Select All
                </Label>
              </div>
            </div>

            {filteredUsers.map((user) => (
              <div key={user.id} className="p-2 border-b last:border-0">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                  />
                  <Label htmlFor={`user-${user.id}`}>{user.name}</Label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} className="bg-orange-500 hover:bg-orange-600">
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
