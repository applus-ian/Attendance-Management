import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Timelog, TimelogInput } from "@/types/timelog";

export function useTimelog(emp_id?: number) {
  const qc = useQueryClient();

  
  const {
    data: timelogs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Timelog[], Error>({
    queryKey: ["timelogs", emp_id],
    queryFn: async () => {
      if (!emp_id) return [];
      const res = await api.get(`/timelogs?emp_id=${emp_id}`);
      return res.data.data || res.data;
    },
    enabled: !!emp_id,
  });

  // Create timelog
  const createTimelog = useMutation({
    mutationFn: async (input: TimelogInput) => {
      const res = await api.post("/timelogs", input);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["timelogs", emp_id] }),
  });

  // Update timelog
  const updateTimelog = useMutation({
    mutationFn: async ({ timelog_id, ...input }: TimelogInput & { timelog_id: number }) => {
      const res = await api.put(`/timelogs/${timelog_id}`, input);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["timelogs", emp_id] }),
  });

  // Delete timelog
  const deleteTimelog = useMutation({
    mutationFn: async (timelog_id: number) => {
      const res = await api.delete(`/timelogs/${timelog_id}`);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["timelogs", emp_id] }),
  });

  // Aggregates
  const totalHoursWorked = timelogs?.reduce((sum, t) => sum + (t.hrs_worked || 0), 0) || 0;
  const totalOvertimeHours = timelogs?.reduce((sum, t) => sum + (t.overtime_hrs || 0), 0) || 0;

  return {
    timelogs: timelogs ?? [],
    isLoading,
    isError,
    error,
    refetch,
    createTimelog,
    updateTimelog,
    deleteTimelog,
    totalHoursWorked,
    totalOvertimeHours,
  };
}
