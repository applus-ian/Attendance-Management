import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { CalendarIcon, UserIcon, ClockIcon, X } from "lucide-react";

type Timesheet = {
  id: string;
  date: string;
  name: string;
  timeIn: string;
  timeOut: string;
  totalHours: string;
  scheduled: string;
  overtime: string;
  late: string;
};

type TimesheetDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timesheet: Timesheet | null;
};

export function TimesheetDetailsModal({ open, onOpenChange, timesheet }: TimesheetDetailsModalProps) {
  if (!timesheet) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Timesheet Details</DialogTitle>
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
        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{timesheet.date}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
              <UserIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{timesheet.name}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time In</label>
              <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{timesheet.timeIn}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time Out</label>
              <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{timesheet.timeOut}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Total Hours</label>
              <input
                className="w-full bg-gray-100 rounded px-3 py-2 text-sm"
                value={timesheet.totalHours}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Scheduled</label>
              <input
                className="w-full bg-gray-100 rounded px-3 py-2 text-sm"
                value={timesheet.scheduled}
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Overtime</label>
              <input
                className="w-full bg-gray-100 rounded px-3 py-2 text-sm"
                value={timesheet.overtime}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Late</label>
              <input
                className="w-full bg-gray-100 rounded px-3 py-2 text-sm"
                value={timesheet.late}
                readOnly
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}