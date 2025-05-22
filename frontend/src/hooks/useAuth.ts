"use Client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string[];
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
        // Flatten the user object so you get { id, name, email, role }
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
