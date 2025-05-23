import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { toast } from "sonner";

interface ClockInModalProps {
  show: boolean;
  onClose: () => void;
  onClockIn: (comment: string) => void;
  currentTime: string;
  shiftTime: string;
  isClockedIn: boolean;
  userId?: number; // Added user ID for API calls
}

export default function ClockInModal({
  show,
  onClose,
  onClockIn,
  currentTime,
  shiftTime,
  isClockedIn,
  userId
}: ClockInModalProps) {
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClockAction = async () => {
    if (!userId) {
      toast.error("User ID is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = isClockedIn ? '/timelogs/clock-out' : '/timelogs/clock-in';
      const response = await api.post(endpoint, {
        emp_id: userId,
        comment
      });

      if (response.data && response.data.data) {
        toast.success(isClockedIn ? "Clocked out successfully" : "Clocked in successfully");
        onClockIn(comment);
      }
    } catch (error: any) {
      console.error("Error during clock action:", error);
      toast.error(error.response?.data?.message || "Failed to process your request");
      return;
    } finally {
      setIsSubmitting(false);
    }

    setComment("");
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
      style={{ display: show ? "flex" : "none" }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        <div className="p-5">
          <h2 className="text-lg font-normal">
            {isClockedIn ? `Clock out at ${currentTime}` : `Clock in at ${currentTime}`}
          </h2>

          <div className="border-t border-gray-200 my-3"></div>

          <p className="text-sm text-gray-600 mb-4">Your shift starts at {shiftTime}</p>



          <div className="flex justify-end gap-2 mt-6">
            <Button 
              onClick={onClose} 
              variant="outline" 
              className="rounded-md px-4"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClockAction}
              className={`${
                isClockedIn ? "bg-green-500 hover:bg-green-600" : "bg-[#FF7A45] hover:bg-[#F05E21]"
              } text-white border-0 rounded-md px-4`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isClockedIn ? "Clock Out" : "Clock In"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
