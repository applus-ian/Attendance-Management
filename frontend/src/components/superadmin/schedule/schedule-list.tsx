"use client"

import { Schedule, useSchedules } from "@/hooks/useSchedules"
import { User, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { DeleteScheduleDialog } from "./delete-schedule-dialog"
import { EditScheduleV2Dialog } from "./editv2"
import { AssignUserModal } from "./assign-user-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"

// Helper function to convert 24-hour time to 12-hour formatas
function formatTimeTo12Hour(time: string): string {
  if (!time) return '';
  
  // Parse the hours and minutes
  const [hours, minutes] = time.split(':').map(Number);
  
  // Determine AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';
  
  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12; // Converts 0 to 12 for midnight
  
  // Format the time string
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export default function ScheduleTable() {
  const { schedules, loading, error, deleteSchedule, updateSchedule, fetchSchedules } = useSchedules()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignUserDialogOpen, setAssignUserDialogOpen] = useState(false);
  const [assignUserSchedule, setAssignUserSchedule] = useState<Schedule | null>(null);

  const itemsPerPage = 5
  const pageCount = Math.ceil(schedules.length / itemsPerPage)
  const paginatedSchedules = schedules.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )
  const handleDeleteClick = (schedule: Schedule) => {
    if (!schedule.sched_id) {
      console.error("Attempted to delete a schedule with missing sched_id:", schedule);
      return;
    }
    setSelectedSchedule(schedule);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSchedule || !selectedSchedule.sched_id) {
      console.error("No schedule selected or sched_id is missing!", selectedSchedule);
      return;
    }
    setIsDeleting(true);
    try {
      await deleteSchedule(selectedSchedule.sched_id);
      setDeleteDialogOpen(false);
      setSelectedSchedule(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setEditDialogOpen(true);
  };

  const handleAssignClick = (schedule: Schedule) => {
    setAssignUserSchedule(schedule);
    setAssignUserDialogOpen(true);
  };


  if (loading) return <p>Loading schedules...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <>
      <div className="w-full h-screen overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-4 px-6 text-left font-medium text-sm">Name</th>
              <th className="py-4 px-6 text-left font-medium text-sm">Days</th>
              <th className="py-4 px-6 text-left font-medium text-sm">Hours</th>
              <th className="py-4 px-6 text-left font-medium text-sm">Assigned</th>
              <th className="py-4 px-6 text-right font-medium text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSchedules.map((sched, index) => (
              <tr key={sched.sched_id ?? index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 text-sm">{sched.title}</td>
                <td className="py-4 px-6 text-sm">{sched.day.join(", ")}</td>
                <td className="py-4 px-6 text-sm">{`${formatTimeTo12Hour(sched.start)} - ${formatTimeTo12Hour(sched.end)}`}</td>
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2">{sched.num_assigned || 0}</span>
                    <User size={16} className="text-gray-400" />
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleAssignClick(sched)} 
                        disabled={sched.sched_id == null}
                        className="cursor-pointer hover:bg-orange-500 hover:text-white"
                      >
                        Assigned
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleEditClick(sched)} 
                        disabled={sched.sched_id == null}
                        className="cursor-pointer hover:bg-orange-500 hover:text-white"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(sched)} 
                        disabled={sched.sched_id == null}
                        className="cursor-pointer text-red-500 hover:bg-orange-500 hover:text-white"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <div className="text-sm text-gray-600">
            Showing {currentPage * itemsPerPage + 1} to{" "}
            {Math.min((currentPage + 1) * itemsPerPage, schedules.length)} of{" "}
            {schedules.length} schedules
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-1 border rounded ${
                currentPage === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
                let pageNum = i
                if (pageCount > 5) {
                  if (currentPage < 2) {
                    pageNum = i
                  } else if (currentPage > pageCount - 3) {
                    pageNum = pageCount - 5 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                }

                return (
                  <button
                    key={pageNum}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      currentPage === pageNum
                        ? "bg-orange-500 text-white"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum + 1}
                  </button>
                )
              })}
            </div>

            <button
              className={`px-3 py-1 border rounded ${
                currentPage === pageCount - 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() =>
                setCurrentPage((p) => Math.min(pageCount - 1, p + 1))
              }
              disabled={currentPage === pageCount - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {selectedSchedule && (
        <DeleteScheduleDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          schedule={selectedSchedule}
          onConfirmDelete={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}

      {/* Edit Dialog */}
      {selectedSchedule && (
        <EditScheduleV2Dialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          schedule={{
            sched_id: selectedSchedule.sched_id,
            name: selectedSchedule.title,
            days: selectedSchedule.day,
            start: selectedSchedule.start,
            end: selectedSchedule.end,
          }}
        />
      )}

      {/* Assign Members Dialog (old, now commented out) */}
      {/*assignSchedule && (
        <AssignShiftModal
          open={assignDialogOpen}
          onOpenChange={setAssignDialogOpen}
          scheduleId={assignSchedule.sched_id}
          onAssigned={fetchSchedules}
        />
      )*/}
      {/* Assign User Dialog (new) */}
      {assignUserSchedule && (
        <AssignUserModal
          open={assignUserDialogOpen}
          onOpenChange={setAssignUserDialogOpen}
          scheduleId={assignUserSchedule.sched_id}
          onAssigned={fetchSchedules}
        />
      )}
    </>
  )
}
