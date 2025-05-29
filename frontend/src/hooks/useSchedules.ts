import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export interface Schedule {
  assigned: number;
  sched_id: number;
  title: string;
  start: string;
  end: string;
  day: string[];
  num_assigned: number;
}

// Helper to normalize days array (make sure lowercase)
function normalizeDays(days: string[]): string[] {
  return days.map(d => d.toLowerCase());
}

// Helper to format time to "HH:mm" (strip seconds if present)
function formatTime(time: string): string {
  // If time is like "13:00:00", slice first 5 chars
  if (time.length > 5) return time.slice(0, 5);
  return time;
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
          sched_id: item.sched_id ?? item.id,
          title: item.title,
          start: item.start,
          end: item.end,
          num_assigned: item.num_assigned ?? 0,
          day: days,
        };
      });

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
        const normalizedSchedule = {
          ...schedule,
          day: normalizeDays(schedule.day),
          start: formatTime(schedule.start),
          end: formatTime(schedule.end),
        };

        await api.post("/schedules", normalizedSchedule);
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
        const normalizedSchedule = {
          ...schedule,
          ...(schedule.day ? { day: normalizeDays(schedule.day) } : {}),
          ...(schedule.start ? { start: formatTime(schedule.start) } : {}),
          ...(schedule.end ? { end: formatTime(schedule.end) } : {}),
        };

        await api.put(`/schedules/${sched_id}`, normalizedSchedule);
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
        setSchedules((prev) => prev.filter((s) => s.sched_id !== sched_id));
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to delete schedule");
      } finally {
        setLoading(false);
      }
    },
    []
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
