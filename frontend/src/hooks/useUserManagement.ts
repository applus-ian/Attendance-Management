"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Employee {
  emp_id: number;
  user_id: number;
  department: string;
  job_position: string;
  address: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string | null;
  gender: string;
  dob: string;
  civil_status: string;
  nationality: string;
  phone_number: string;
  emergency_contact1: string;
  emergency_contact2: string;
  date_hired: string;
  status: string;
  profile_pic_url: string | null;
  created_at: string;
  updated_at: string;
  assigned_schedule?: AssignedSchedule;
}

export interface Schedule {
  sched_id: number;
  title: string;
  start: string;
  end: string;
  day: string;
  num_assigned: number;
  created_at: string;
}

export interface AssignedSchedule {
  assigned_id: number;
  emp_id: number;
  assigned_at: string;
  created_by?: { user_id: number; email: string };
  updated_by?: { user_id: number; email: string };
  schedule?: Schedule;
}

export interface User {
  user_id: number;
  emp_id: number;
  name: string;
  email: string;
  is_active: boolean;
  roles: string[];
  created_at: string;
  updated_at: string;
  employee?: Employee;
}

export function useUserManagement(selectedUserId?: number) {
  const router = useRouter();
  const qc = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () =>
      api.get<{ data: User[] }>("/users").then((res) => res.data.data),
  });

  // Optionally fetch a single user
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery<User, Error>({
    queryKey: ["user", selectedUserId],
    queryFn: () =>
      api
        .get<{ data: User }>(`/users/${selectedUserId}`)
        .then((res) => res.data.data),
    enabled: typeof selectedUserId === "number",
  });

  // Activate user
  const activateUser = useMutation({
    mutationFn: (id: number) => api.patch(`/users/${id}/activate`),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["user", id] });
    },
    onError: (err: any) => setError(err.response?.data?.message ?? err.message),
  });

  // Deactivate user
  const deactivateUser = useMutation({
    mutationFn: (id: number) => api.patch(`/users/${id}/deactivate`),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["user", id] });
    },
    onError: (err: any) => setError(err.response?.data?.message ?? err.message),
  });

  // Delete user
  const deleteUser = useMutation({
    mutationFn: (id: number) => api.delete(`/users/${id}`),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      if (selectedUserId === id) {
        router.push("/users");
      }
    },
    onError: (err: any) => setError(err.response?.data?.message ?? err.message),
  });

  return {
    users,
    isLoadingUsers,
    isErrorUsers,

    user,
    isLoadingUser,
    isErrorUser,

    activate: (id: number) => activateUser.mutate(id),
    deactivate: (id: number) => deactivateUser.mutate(id),
    remove: (id: number) => deleteUser.mutate(id),

    error,
    clearError: () => setError(null),
  };
}
