"use client"

import { useSchedules } from "@/hooks/useSchedules"
import { User, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { DeleteScheduleDialog } from "./delete-schedule-dialog"
import { AssignShiftModal } from "./assign-members-dialog"
import { EditScheduleDialog } from "./edit-schedule-dialog"
import { EditScheduleV2Dialog } from "./editv2"

export default function ScheduleTable() {
  const { schedules, loading, error, deleteSchedule } = useSchedules()
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5


  useEffect(() => {
    console.log("Schedules:", schedules)
  }, [schedules])

    const handleEditClick = (schedule: any) => {
    setSelectedSchedule({
      id: schedule.sched_id,
      name: schedule.title,
      days: schedule.day,
      start: schedule.start,
      end: schedule.end,
    })
    setEditDialogOpen(true)
    setOpenDropdown(null)
  }

  const handleDeleteClick = (schedule: any) => {
    setSelectedSchedule(schedule)
    setDeleteDialogOpen(true)
    setOpenDropdown(null)
  }

const handleAssignClick = (schedule: any) => {
  if (!schedule.sched_id) {
    console.error("Missing sched_id for assign action!", schedule)
    return
  }

  setSelectedSchedule(schedule)
  setAssignDialogOpen(true)
  setOpenDropdown(null)
}


  const handleConfirmDelete = async () => {
    if (selectedSchedule) {
      await deleteSchedule(selectedSchedule.sched_id)
      setDeleteDialogOpen(false)
      setSelectedSchedule(null)
    }
  }

  if (loading) return <p>Loading schedules...</p>
  if (error) return <p className="text-red-500">{error}</p>

  // Calculate pagination
  const pageCount = Math.ceil(schedules.length / itemsPerPage)
  const paginatedSchedules = schedules.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <>
      <div className="w-full overflow-auto">
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
                    <span className="mr-2">{sched.assigned || 0}</span>
                    <User size={16} className="text-gray-400" />
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                      id={`menu-button-${index}`}
                      aria-expanded={openDropdown === index}
                      aria-haspopup="true"
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    {openDropdown === index && (
                      <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-lg bg-white focus:outline-none z-10 border border-gray-100" role="menu" aria-orientation="vertical" aria-labelledby={`menu-button-${index}`}> 
                        <div className="py-1" role="none">
                          <button 
                            className="w-full text-left px-4 py-3 text-lg text-gray-800 rounded-t-xl hover:bg-orange-500 hover:text-white transition-colors duration-150" 
                            role="menuitem"
                            onClick={() => handleAssignClick(sched)}
                          >
                            Assign
                          </button>
                                                <button
                        className="w-full text-left px-4 py-3 text-lg text-gray-800 hover:bg-orange-500 hover:text-white transition-colors duration-150"
                        role="menuitem"
                        onClick={() => handleEditClick(sched)} // <-- add this
                      >
                        Edit
                      </button>
                          <button
                            className="w-full text-left px-4 py-3 text-lg text-gray-800 hover:bg-orange-500 hover:text-white rounded-b-xl transition-colors duration-150"
                            role="menuitem"
                            onClick={() => handleDeleteClick(sched)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Simple Pagination Controls */}
      {pageCount > 1 && (
        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <div className="text-sm text-gray-600">
            Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, schedules.length)} of {schedules.length} schedules
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-1 border rounded ${currentPage === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
                // Show first page, last page, current page, and pages around current
                let pageNum = i;
                if (pageCount > 5) {
                  if (currentPage < 2) { // Near the start
                    pageNum = i;
                  } else if (currentPage > pageCount - 3) { // Near the end
                    pageNum = pageCount - 5 + i;
                  } else { // In the middle
                    pageNum = currentPage - 2 + i;
                  }
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === pageNum ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-50'}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
            </div>
            
            <button
              className={`px-3 py-1 border rounded ${currentPage === pageCount - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setCurrentPage(p => Math.min(pageCount - 1, p + 1))}
              disabled={currentPage === pageCount - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {selectedSchedule && (
        <EditScheduleV2Dialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          schedule={selectedSchedule}
        />
      )}
      {selectedSchedule && (
        <DeleteScheduleDialog
          open={deleteDialogOpen}
          onOpenChange={(open) => setDeleteDialogOpen(open)}
          schedule={selectedSchedule}
          onConfirmDelete={handleConfirmDelete}
        />
      )}

      {selectedSchedule && (
        <AssignShiftModal
          open={assignDialogOpen}
          onOpenChange={(open) => setAssignDialogOpen(open)}
          scheduleId={selectedSchedule.sched_id}
        />
      )}
    </>
  )
}
