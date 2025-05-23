import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ClockInModalProps {
  show: boolean;
  onClose: () => void;
  onClockIn: (comment: string) => void;
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
  isClockedIn
}: ClockInModalProps) {
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClockAction = () => {
    setIsSubmitting(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Notify parent component of clock in/out
      onClockIn(comment);
      
      // Show success message
      toast.success(isClockedIn ? "Clocked out successfully" : "Clocked in successfully");
      
      // Reset state
      setComment("");
      setIsSubmitting(false);
      
      // Close modal
      onClose();
    }, 800);
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
            {isClockedIn ? "Clock out" : "Clock in"} at {currentTime}
          </h2>

          <div className="border-t border-gray-200 my-3"></div>

          {!isClockedIn && <p className="text-sm text-gray-600 mb-4">Your shift starts at {shiftTime}</p>}
          {isClockedIn && <p className="text-sm text-gray-600 mb-4">You've been clocked in since your shift started.</p>}

          {/* Optional: Add a comment field */}
          <div className="mt-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Comment (optional)
            </label>
            <Textarea
              id="comment"
              placeholder={isClockedIn ? "Add a comment about your clock out..." : "Add a comment about your clock in..."}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

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
              className={`${isClockedIn ? 
                "bg-green-500 hover:bg-green-600" : 
                "bg-[#FF7A45] hover:bg-[#F05E21]"} text-white border-0 rounded-md px-4`}
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
              ) : isClockedIn ? "Clock Out" : "Clock In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}