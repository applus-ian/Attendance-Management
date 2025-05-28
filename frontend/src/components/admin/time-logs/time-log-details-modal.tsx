import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import React from "react"

interface TimeLogDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  timelog: any
  getEmployee: (emp_id: number) => any
  onEdit: () => void
  onDelete: () => void
}

export const TimeLogDetailsModal: React.FC<TimeLogDetailsModalProps> = ({ open, onOpenChange, timelog, getEmployee, onEdit, onDelete }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Timelog Details</DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription>
          Detailed breakdown of the selected timelog.
        </DialogDescription>
        {!timelog ? (
          <div className="py-12 text-center text-gray-500">No details found.</div>
        ) : (
          <div className="space-y-6 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Log Type</label>
                <span className="text-base">{timelog.type}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Date & Time</label>
                <span className="text-base">{new Date(timelog.time).toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Present</label>
                <span className="text-base">{timelog.is_present ? "Yes" : "No"}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Absent</label>
                <span className="text-base">{timelog.is_absent ? "Yes" : "No"}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Late</label>
                <span className="text-base">{timelog.is_late ? "Yes" : "No"}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Comment</label>
                <span className="text-base">{timelog.comment || '-'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Hours Worked</label>
                <span className="text-base">{Number(timelog.hrs_worked).toFixed(2)}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Overtime</label>
                <span className="text-base">{Number(timelog.overtime_hrs).toFixed(2)}</span>
              </div>
            </div>
            {/* Edit and Delete buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onEdit}>Edit</Button>
              <Button variant="destructive" onClick={onDelete}>Delete</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 