"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClockInModalProps } from "@/types/clockInModal";

export default function ClockInModal({
  show,
  onClose,
  onClockIn,
  currentTime,
  shiftTime,
  isClockedIn,
  isLoading = false,
}: ClockInModalProps) {
  const handleClose = () => {
    if (!isLoading) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onClockIn();
  };

  return (
    <Dialog open={show} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isClockedIn
              ? `Clock out at ${currentTime}`
              : `Clock in at ${currentTime}`}
          </DialogTitle>
        </DialogHeader>
        {shiftTime && (
          <div className="mb-6 text-gray-700">
            Your shift starts at {shiftTime}.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin mr-2">⏳</span>
              ) : null}
              {isClockedIn ? "Clock Out" : "Clock In"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}