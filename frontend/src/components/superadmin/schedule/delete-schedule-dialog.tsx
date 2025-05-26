"use client"

import * as React from "react"
import { Schedule } from "@/hooks/useSchedules"

interface DeleteScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule: Schedule
  onConfirmDelete: () => void
  isDeleting: boolean
}

export function DeleteScheduleDialog({
  open,
  onOpenChange,
  schedule,
  onConfirmDelete,
  isDeleting,
}: DeleteScheduleDialogProps) {
  // Close dialog handler
  const handleClose = () => {
    if (!isDeleting) onOpenChange(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-md shadow-lg max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dialog
      >
        <h2 className="text-lg font-semibold mb-4 text-red-600">Delete Schedule</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete the schedule <strong>{schedule.title}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
            onClick={handleClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${
              isDeleting ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={onConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
