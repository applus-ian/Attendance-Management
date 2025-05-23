import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

export interface EmployeeSchedule {
  id: number;
  title: string;
  date?: string;
  day: string[] | string;  // Accept string or array of strings because data might be inconsistent
  start: string;
  end: string;
}

export function useEmployeeSchedule() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<EmployeeSchedule[]>([]);
  const [upcomingShift, setUpcomingShift] = useState<EmployeeSchedule | null>(null);

  const fetchEmployeeSchedule = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/employee/schedules');

      if (response.data && response.data.success && response.data.data) {
        let schedulesData: EmployeeSchedule[] = response.data.data;

        // Normalize day to array if it's a string
        schedulesData = schedulesData.map(schedule => {
          if (schedule.day && !Array.isArray(schedule.day)) {
            schedule.day = [schedule.day];
          }
          return schedule;
        });

        setSchedules(schedulesData);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayDay = daysOfWeek[today.getDay()];

        const upcoming = schedulesData
          .filter(schedule => {
            if (schedule.date) {
              const scheduleDate = new Date(schedule.date);
              scheduleDate.setHours(0, 0, 0, 0);
              return scheduleDate >= today;
            } else if (Array.isArray(schedule.day) && schedule.day.length > 0) {
              return schedule.day.some(day => day.toLowerCase() === todayDay.toLowerCase());
            }
            return false;
          })
          .sort((a, b) => {
            if (a.date && b.date) {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return 0;
          })[0] || null;

        setUpcomingShift(upcoming);
      } else {
        setError(response.data?.message || 'Failed to fetch schedule data');
      }
    } catch (err: any) {
      console.error('Error fetching employee schedule:', err);
      setError(err.response?.data?.message || err.message || 'An error occurred while fetching your schedule');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployeeSchedule();
  }, [fetchEmployeeSchedule]);

  const refreshSchedule = () => {
    setError(null);
    fetchEmployeeSchedule();
  };

  return { schedules, upcomingShift, loading, error, refreshSchedule };
}
