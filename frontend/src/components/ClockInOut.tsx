"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";

interface ClockInOutProps {
  userId?: string | number;
  initialClockedIn?: boolean;
  initialLastClockInTime?: string | null;
  onClockInStatusChange?: (clockedIn: boolean, timestamp: string) => void;
}

export default function ClockInOut({
  userId,
  initialClockedIn = false,
  initialLastClockInTime = null,
  onClockInStatusChange,
}: ClockInOutProps) {
  const [isClockedIn, setIsClockedIn] = useState(initialClockedIn);
  const [comment, setComment] = useState("");
  const [lastClockInTime, setLastClockInTime] = useState<string | null>(
    initialLastClockInTime
  );
  const [loading, setLoading] = useState(false);

  const handleClockInOut = async () => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/api/clock-in", {
        user_id: userId,
        comment,
      });

      const { status, timestamp } = res.data;

      const clockedIn = status === "clocked_in";
      setIsClockedIn(clockedIn);
      setLastClockInTime(timestamp);
      setComment("");

      toast.success(
        clockedIn
          ? "You have successfully clocked in"
          : "You have successfully clocked out"
      );

      if (onClockInStatusChange) {
        onClockInStatusChange(clockedIn, timestamp);
      }
    } catch (err) {
      toast.error("Something went wrong with clocking in/out.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex flex-col items-center">
        {isClockedIn && lastClockInTime && (
          <div className="mb-4 text-green-700 bg-green-100 px-4 py-2 rounded">
            You clocked in at {new Date(lastClockInTime).toLocaleTimeString()}
          </div>
        )}

        <textarea
          placeholder="Add comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded p-2 mb-4 resize-none"
          rows={3}
          disabled={loading}
        />

        <Button
          className={`w-full flex items-center justify-center ${
            isClockedIn ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"
          } text-white py-3 rounded`}
          onClick={handleClockInOut}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : (
            <Clock className="w-6 h-6 mr-2" />
          )}
          {isClockedIn ? "Clock Out" : "Clock In"}
        </Button>
      </div>
    </div>
  );
}
