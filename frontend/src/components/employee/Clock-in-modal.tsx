"use client";

import { Button } from "@/components/ui/button";

interface ClockInModalProps {
  show: boolean;
  onClose: () => void;
  onClockIn: () => Promise<void>;
  currentTime: string;
  shiftTime: string;
  isClockedIn: boolean;
  userId?: string | number;
}

export default function ClockInModal({
  show,
  onClose,
  onClockIn,
  currentTime,
  shiftTime,
  isClockedIn,
}: ClockInModalProps) {
  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onClockIn();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed z-50 inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h3 className="text-xl font-semibold mb-4">
            {isClockedIn ? "Clock Out" : "Clock In"}
          </h3>

          <p className="mb-2">
            Current Time: <strong>{currentTime}</strong>
          </p>
          {shiftTime && (
            <p className="mb-4 text-sm text-gray-600">
              Scheduled Shift Start: {shiftTime}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                className="py-2 px-4"
              >
                Cancel
              </Button>
              <Button type="submit" className="py-2 px-4">
                {isClockedIn ? "Clock Out" : "Clock In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
