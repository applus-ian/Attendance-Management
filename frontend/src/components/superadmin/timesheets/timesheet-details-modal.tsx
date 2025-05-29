import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { CalendarIcon, UserIcon, ClockIcon, X } from "lucide-react";
import { useUserList } from "@/hooks/useUserList";
import { Timesheet as ApiTimesheet } from "@/hooks/useTimesheet";

type TimesheetDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timesheet: ApiTimesheet | null;
  isLoading?: boolean;
};

export function TimesheetDetailsModal({ open, onOpenChange, timesheet, isLoading }: TimesheetDetailsModalProps) {
  const { data: users = [] } = useUserList();

  // Helper to get full name and profile pic by emp_id
  const getEmployee = (emp_id: number) => users.find((u) => u.emp_id === emp_id);
  const employee = timesheet ? getEmployee(timesheet.emp_id) : null;
  const profilePic = employee?.profile_pic_url || "/default-avatar.png";
  const fullName = employee ? [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(" ") : `Employee #${timesheet?.emp_id}`;

  // Helper to get Time In and Time Out
  const getTimeIn = (timelogs: any[] = []) => {
    if (!timelogs.length) return '-';
    // Find earliest clock_in
    const clockIns = timelogs.filter(log => log.type === 'clock_in');
    if (clockIns.length > 0) {
      const earliest = clockIns.reduce((a, b) => new Date(a.time) < new Date(b.time) ? a : b);
      return new Date(earliest.time).toLocaleTimeString();
    }
    // Fallback: earliest timelog
    const earliest = timelogs.reduce((a, b) => new Date(a.time) < new Date(b.time) ? a : b);
    return new Date(earliest.time).toLocaleTimeString();
  };
  const getTimeOut = (timelogs: any[] = []) => {
    if (!timelogs.length) return '-';
    // Find latest clock_out
    const clockOuts = timelogs.filter(log => log.type === 'clock_out');
    if (clockOuts.length > 0) {
      const latest = clockOuts.reduce((a, b) => new Date(a.time) > new Date(b.time) ? a : b);
      return new Date(latest.time).toLocaleTimeString();
    }
    // Fallback: latest timelog
    const latest = timelogs.reduce((a, b) => new Date(a.time) > new Date(b.time) ? a : b);
    return new Date(latest.time).toLocaleTimeString();
  };

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
        <DialogDescription>
          Detailed breakdown of the selected timesheet and timelogs.
        </DialogDescription>
        {isLoading ? (
          <div className="py-12 text-center text-gray-500">Loading timesheet details...</div>
        ) : !timesheet ? (
          <div className="py-12 text-center text-gray-500">No details found.</div>
        ) : (
          <div className="space-y-6 mt-2">
            <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-3 shadow-sm">
              <div className="flex flex-col gap-1">
                <label className="block text-xs font-semibold text-gray-500">Employee ID</label>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium">{timesheet.emp_id}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs font-semibold text-gray-500">Name</label>
                <div className="flex items-center gap-3">
                  <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full object-cover border" />
                  <span className="text-base font-medium">{fullName}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Total Hours</label>
                <span className="text-base">{Number(timesheet.total_hrs_work).toFixed(2)}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Scheduled</label>
                <span className="text-base">{timesheet.scheduled_hrs}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Overtime</label>
                <span className="text-base">{Number(timesheet.total_overtime_hrs).toFixed(2)}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <label className="block text-xs font-semibold text-gray-500">Late</label>
                <span className="text-base">{timesheet.total_lates}</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}