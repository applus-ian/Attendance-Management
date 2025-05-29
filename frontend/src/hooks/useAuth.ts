"use Client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useState } from "react";

type User = {
  id: number;
  user_id?: number;
  emp_id?: number;
  name: string;
  email: string;
  role: "employee" | "admin" | "super_admin";
  is_active?: boolean;
  roles?: string[];
  created_at?: string;
  updated_at?: string;
  employee?: {
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
    assigned_schedule?: any;
  };
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  return { user, login, logout, isLoggingOut };
};
