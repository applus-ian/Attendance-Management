"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/lib/api";

export type AuditLog = {
  log_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  role: "employee" | "admin" | "super_admin";
  action_type: string;
  target_type: string | null;
  target_id: number | null;
  description: string;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
};

export const useAuditLog = () => {
  const queryClient = useQueryClient();

  const {
    data: auditLogs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<AuditLog[], Error>({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      const response = await api.get("/audit-logs");
      return response.data.data; // assuming it's wrapped in a 'data' key
    },
  });

  // Optional: mutation example if you ever allow adding audit logs manually
  const createAuditLog = useMutation({
    mutationFn: async (newLog: Partial<AuditLog>) => {
      const response = await api.post("/audit-logs", newLog);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auditLogs"] });
    },
  });

  // Optional: mutation for deleting an audit log
  const deleteAuditLog = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/audit-logs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auditLogs"] });
    },
  });

  return {
    auditLogs,
    isLoading,
    isError,
    error,
    refetch,
    createAuditLog,
    deleteAuditLog,
  };
};
