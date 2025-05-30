"use Client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "sonner";
import { User } from "@/types/user";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [clockStatus, setClockStatus] = useState<{ status: string; last_activity: string | null } | null>(null);

  const token = Cookies.get("auth_token");

  const { data: user } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/auth/me");
        return data.original as User;
      } catch {
        Cookies.remove("auth_token");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        return null;
      }
    },
    enabled: !!token,
    retry: false,
  });

  const fetchClockStatus = async () => {
    if (!user?.emp_id) return;
    try {
      const res = await api.get("/employee/current-status", {
        params: { emp_id: user.emp_id },
      });
      setClockStatus({ status: res.data.status, last_activity: res.data.last_activity });
      return res.data;
    } catch (err) {
      setClockStatus(null);
      return null;
    }
  };

  const clockInMutation = useMutation({
    mutationFn: async () => {
      if (!user?.emp_id) throw new Error("User not authenticated");
      const now = new Date();
      const time = now.toTimeString().slice(0, 5);
      await api.post("/timelogs/clock-in", {
        emp_id: user.emp_id,
        timelog_type: "clock_in",
        time,
      });
    },
    onSuccess: async () => {
      await fetchClockStatus();
      toast.success("You have successfully clocked in");
    },
    onError: (error: any) => {
      const backendMsg = error?.response?.data?.errors?.timelog_type?.[0] || error?.response?.data?.message;
      if (backendMsg && backendMsg.includes("already clocked in")) {
        toast.error("You are already clocked in for today. Please clock out before trying again.");
      } else {
        toast.error("Something went wrong while clocking in.");
      }
      fetchClockStatus();
    },
  });

  const clockOutMutation = useMutation({
    mutationFn: async () => {
      if (!user?.emp_id) throw new Error("User not authenticated");
      const now = new Date();
      const time = now.toTimeString().slice(0, 5);
      await api.post("/timelogs/clock-out", {
        emp_id: user.emp_id,
        timelog_type: "clock_out",
        time,
      });
    },
    onSuccess: async () => {
      await fetchClockStatus();
      toast.success("You have successfully clocked out");
    },
    onError: (error: any) => {
      const backendMsg = error?.response?.data?.errors?.timelog_type?.[0] || error?.response?.data?.message;
      if (backendMsg && backendMsg.includes("must clock in before clocking out")) {
        toast.error("You must clock in before you can clock out today.");
      } else {
        toast.error("Something went wrong while clocking out.");
      }
      fetchClockStatus();
    },
  });

  const isClockLoading = clockInMutation.isPending || clockOutMutation.isPending;

  const clockIn = async () => {
    await clockInMutation.mutateAsync();
  };
  const clockOut = async () => {
    await clockOutMutation.mutateAsync();
  };

  const login = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const { data } = await api.post("/auth/login", values);
      Cookies.set("auth_token", data.token, { expires: 7 });
      return data.user as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/employee/schedule");
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      setIsLoggingOut(true);
      await api.post("/auth/logout");
      Cookies.remove("auth_token");
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onSettled: () => {
      setIsLoggingOut(false);
      router.push("/login");
    },
  });

  return { user, login, logout, isLoggingOut, isClockLoading, clockStatus, fetchClockStatus, clockIn, clockOut, clockInMutation, clockOutMutation };
};
