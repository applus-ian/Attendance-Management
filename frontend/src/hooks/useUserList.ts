import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface UserListItem {
  emp_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  profile_pic_url?: string;
}

export function useUserList(search: string = "") {
  return useQuery<UserListItem[]>({
    queryKey: ["user-list", search],
    queryFn: async () => {
      const res = await api.get("/employees");
      let users = res.data.data || res.data;
      if (search) {
        const s = search.toLowerCase();
        users = users.filter((u: UserListItem) =>
          `${u.first_name} ${u.last_name}`.toLowerCase().includes(s)
        );
      }
      return users;
    },
  });
} 