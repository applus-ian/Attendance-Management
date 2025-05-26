// hooks/useAssignedSchedules.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { AssignedSchedule } from '../types/assignedSchedule';

interface AssignSchedulePayload {
  emp_id: number;
  sched_id: number;
}

export const useAssignedSchedules = () => {
  return useQuery<AssignedSchedule[], Error>({
    queryKey: ['assignedSchedules'],
    queryFn: async () => {
      const { data } = await api.get<{ data: AssignedSchedule[] }>('/assigned-schedules');
      return data.data;
    }
  });
};

export const useAssignSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<AssignedSchedule, Error, AssignSchedulePayload>({
    mutationFn: async (newAssignment: AssignSchedulePayload) => {
      const { data } = await api.post<{ data: AssignedSchedule }>('/assigned-schedules', newAssignment);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignedSchedules'] });
    },
  });
};

interface UpdateAssignedSchedulePayload {
  id: number;
  updates: Partial<AssignSchedulePayload>;
}

export const useUpdateAssignedSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<AssignedSchedule, Error, UpdateAssignedSchedulePayload>({
    mutationFn: async ({ id, updates }: UpdateAssignedSchedulePayload) => {
      const { data } = await api.put<{ data: AssignedSchedule }>(`/assigned-schedules/${id}`, updates);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignedSchedules'] });
    },
  });
};

export const useDeleteAssignedSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await api.delete(`/assigned-schedules/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignedSchedules'] });
    },
  });
};
