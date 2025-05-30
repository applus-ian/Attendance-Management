import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Timelog } from "@/types/timelog";
import { Timesheet } from "@/types/timesheet";

export function useEmployeeTimesheet() {
  const { user } = useAuth();

  const empId = user?.emp_id || user?.employee?.emp_id || user?.id;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Timesheet[], Error>({
    queryKey: ["employee-timesheets", empId],
    queryFn: async () => {
      if (!empId) return [];
      const res = await api.get(`/users/me/timesheets`);
      // If the API returns { data: Timesheet[] }
      return res.data.data || res.data;
    },
    enabled: !!empId,
  });

  return {
    timesheets: data ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
}

// Super-admin: fetch timesheets for any user or all users
export function useTimesheet(emp_id?: number) {
  return useQuery<Timesheet[], Error>({
    queryKey: ["timesheets", emp_id],
    queryFn: async () => {
      const url = emp_id ? `/timesheets?emp_id=${emp_id}` : "/timesheets";
      const res = await api.get(url);
      return res.data.data || res.data;
    },
    enabled: emp_id !== undefined || emp_id === undefined, // always enabled
  });
}

// Fetch details for a specific timesheet (for modal)
export function useTimesheetDetails(timesheet_id: number | undefined) {
  return useQuery<Timesheet | null, Error>({
    queryKey: ["timesheet-details", timesheet_id],
    queryFn: async () => {
      if (!timesheet_id) return null;
      const res = await api.get(`/timesheets/${timesheet_id}`);
      return res.data.data || res.data;
    },
    enabled: !!timesheet_id,
  });
}
