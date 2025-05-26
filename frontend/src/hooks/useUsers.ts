import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export interface User {
  user_id: string;
  name: string;
  email: string;
  department?: string;
  role?: string;
  is_active: boolean;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Fetch all active users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get("/users");
      console.log("User API response:", response.data);
      
      // Check if the data exists and has the expected format
      if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
        console.error("Invalid user data format:", response.data);
        setError("Received invalid data format from API");
        return;
      }
      
      // Filter for active users only
      const activeUsers = response.data.data.filter((user: any) => user.is_active);
      console.log(`Found ${activeUsers.length} active users out of ${response.data.data.length} total users`);
      setUsers(activeUsers);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);  // Assign users to a schedule
  const assignUsersToSchedule = useCallback(async (scheduleId: string | number, userIds: string[]) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate inputs before making the API call
      if (!scheduleId) {
        throw new Error("Schedule ID is required");
      }
      
      if (!userIds || userIds.length === 0) {
        throw new Error("At least one user must be selected");
      }
      
      console.log("Assigning users to schedule with params:", {
        schedule_id: scheduleId,
        user_ids: userIds
      });
      
      // Call the API endpoint for batch assigning users to schedules
      const response = await api.post(`/assigned-schedules/bulk`, {
        sched_id: scheduleId,
        emp_ids: userIds
      });
      
      console.log("Assignment response:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error assigning users to schedule:", err);
      setError(err.response?.data?.message || err.message || "Failed to assign users to schedule");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load users when the hook is first used
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    assignUsersToSchedule
  };
}
