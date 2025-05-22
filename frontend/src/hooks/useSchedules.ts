import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export interface Schedule {
  assigned: number;
  sched_id: number;
  title: string;
  start: string;
  end: string;
  day: string[];
}

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all schedules
  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/schedules");

      // Normalize day into a string[]
      const normalized: Schedule[] = (res.data.data || []).map((item: any) => {
        let days: string[] = [];

        if (Array.isArray(item.day)) {
          days = item.day;
        } else if (typeof item.day === "string") {
          try {
            days = JSON.parse(item.day);
          } catch {
            days = item.day.split(",").map((d: string) => d.trim());
          }
        }

        return {
          ...item,
          day: days,
        };
      });

      // Sort by sched_id descending so newest appears first
      normalized.sort((a, b) => b.sched_id - a.sched_id);
      setSchedules(normalized);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch schedules");
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new schedule
  const addSchedule = useCallback(
    async (schedule: Omit<Schedule, "sched_id">) => {
      setLoading(true);
      setError(null);
      try {
        await api.post("/schedules", schedule);
        await fetchSchedules();
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to add schedule");
      } finally {
        setLoading(false);
      }
    },
    [fetchSchedules]
  );

  // Update a schedule
  const updateSchedule = useCallback(
    async (sched_id: number, schedule: Partial<Schedule>) => {
      setLoading(true);
      setError(null);
      try {
        await api.put(`/schedules/${sched_id}`, schedule);
        await fetchSchedules();
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to update schedule");
      } finally {
        setLoading(false);
      }
    },
    [fetchSchedules]
  );

  // Delete a schedule
  const deleteSchedule = useCallback(
    async (sched_id: number) => {
      setLoading(true);
      setError(null);
      try {
        await api.delete(`/schedules/${sched_id}`);
        await fetchSchedules();
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to delete schedule");
      } finally {
        setLoading(false);
      }
    },
    [fetchSchedules]
  );

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  return {
    schedules,
    loading,
    error,
    fetchSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
  };
}
