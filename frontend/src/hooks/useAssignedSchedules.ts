import { useState, useEffect } from "react";
import api from "../lib/api";

// Define a type for AssignedSchedule (adjust fields as needed)
type AssignedSchedule = {
  id: number;
  emp_id: number;
  sched_id: number;
  assigned_at: string;
};

// Hook to fetch all assigned schedules
export function useAssignedSchedules() {
  const [schedules, setSchedules] = useState<AssignedSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/assigned-schedules");
      setSchedules(data.data); // assuming format { data: [...] }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch assigned schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return { schedules, loading, error, refetch: fetchSchedules };
}

// Hook to assign a new schedule
export function useAssignSchedule() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function assignSchedule(payload: {
    emp_id: number;
    sched_id: number;
    assigned_at?: string;
  }) {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/assigned-schedules", payload);
      return data.data; // newly created resource
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to assign schedule");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { assignSchedule, loading, error };
}

// Hook to update an assigned schedule
export function useUpdateAssignedSchedule() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function updateSchedule(
    assigned_id: number,
    payload: {
      emp_id: number;
      sched_id: number;
      assigned_at: string;
    }
  ) {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.put(`/assigned-schedules/${assigned_id}`, payload);
      return data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update schedule");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { updateSchedule, loading, error };
}

// Hook to delete an assigned schedule
export function useDeleteAssignedSchedule() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function deleteSchedule(assigned_id: number) {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/assigned-schedules/${assigned_id}`);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete schedule");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { deleteSchedule, loading, error };
}

// Hook to get schedules for currently authenticated employee
export function useEmployeeSchedules() {
  const [schedules, setSchedules] = useState<AssignedSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchEmployeeSchedules() {
      setLoading(true);
      try {
        const { data } = await api.get("/assigned-schedules/employee");
        setSchedules(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch employee schedules");
      } finally {
        setLoading(false);
      }
    }
    fetchEmployeeSchedules();
  }, []);

  return { schedules, loading, error };
}

// Hook for bulk assignment
export function useBulkAssignSchedules() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function bulkAssign(payload: {
    sched_id: number;
    emp_ids: number[];
    assigned_at?: string;
  }) {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/assigned-schedules/bulk", payload);
      return data.data; // array of assigned schedules
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to bulk assign schedules");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { bulkAssign, loading, error };
}
