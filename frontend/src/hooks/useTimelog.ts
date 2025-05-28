// lib/hooks/useTimelog.ts
import { useEffect, useState } from "react";
import api from "@/lib/api";

export type TimelogStatus = "clocked_in" | "clocked_out" | null;

export default function useTimelog(emp_id: number) {
  const [status, setStatus] = useState<TimelogStatus>(null);
  const [lastActivity, setLastActivity] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await api.get("/employee/current-status"); // Corrected endpoint
      setStatus(response.data.status);
      setLastActivity(response.data.last_activity);
      setError(null);
    } catch (err: any) {
      setError("Failed to fetch timelog status");
    } finally {
      setLoading(false);
    }
  };

  const clockIn = async (comment: string | null = null) => {
    try {
      const response = await api.post("/timelogs/clock-in", {
        emp_id,
        timelog_type: "clock_in",
        
      });
      await fetchStatus();
      return response.data;
    } catch (err: any) {
      throw err;
    }
  };

  const clockOut = async (comment: string | null = null) => {
    try {
      const response = await api.post("/timelogs/clock-out", {
        emp_id,
        timelog_type: "clock_out",
        
      });
      await fetchStatus();
      return response.data;
    } catch (err: any) {
      throw err;
    }
  };

  useEffect(() => {
    if (emp_id) {
      fetchStatus();
    }
  }, [emp_id]);

  return {
    status,
    lastActivity,
    loading,
    error,
    clockIn,
    clockOut,
    refreshStatus: fetchStatus,
  };
}
