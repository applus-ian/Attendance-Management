"use client"

import { Schedule, useSchedules } from "@/hooks/useSchedules"
import { User } from "lucide-react"
import { useState } from "react"
import { DeleteScheduleDialog } from "./delete-schedule-dialog"
import { EditScheduleV2Dialog } from "./editv2"
import { AssignShiftModal } from "./assign-members-dialog"

export default function ScheduleTable() {
  const { schedules, loading, error, deleteSchedule, updateSchedule } = useSchedules()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [assignSchedule, setAssignSchedule] = useState<Schedule | null>(null);

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
    setAssignSchedule(schedule);
    setAssignDialogOpen(true);
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
                <td className="py-4 px-6 text-sm">{`${sched.start} - ${sched.end}`}</td>
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2">{sched.num_assigned || 0}</span>
                    <User size={16} className="text-gray-400" />
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm"
                      onClick={() => handleEditClick(sched)}
                      disabled={sched.sched_id == null}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                      onClick={() => handleDeleteClick(sched)}
                      disabled={sched.sched_id == null}
                    >
                      Delete
                    </button>
                    <button
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                      onClick={() => handleAssignClick(sched)}
                      disabled={sched.sched_id == null}
                    >
                      Assign
                    </button>
                  </div>
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

      {/* Assign Members Dialog */}
      {assignSchedule && (
        <AssignShiftModal
          open={assignDialogOpen}
          onOpenChange={setAssignDialogOpen}
          scheduleId={assignSchedule.sched_id}
        />
      )}
    </>
  )
}
