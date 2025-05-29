import { Timelog } from "./timelog";

export interface Timesheet {
  timesheet_id: number;
  emp_id: number;
  date: string;
  total_hrs_work: number;
  total_overtime_hrs: number;
  total_present: number;
  total_absent: number;
  total_lates: number;
  scheduled_hrs: number;
  timelogs?: Timelog[];
}

export interface TimesheetsFiltersProps {
  filters: {
    date: {
      from: Date | undefined;
      to: Date | undefined;
    };
    employee: string;
    status: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      date: {
        from: Date | undefined;
        to: Date | undefined;
      };
      employee: string;
      status: string;
    }>
  >;
  className?: string;
} 