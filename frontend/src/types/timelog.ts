export interface Timelog {
  timelog_id: number;
  emp_id: number;
  type: string;
  time: string;
  is_present: boolean;
  is_absent: boolean;
  is_late: boolean;
  hrs_worked: number;
  overtime_hrs: number;
  comment?: string;
  created_at?: string;
}

export interface TimelogInput {
  emp_id: number;
  type: string;
  time: string;
  is_present?: boolean;
  is_absent?: boolean;
  is_late?: boolean;
  hrs_worked?: number;
  overtime_hrs?: number;
}

export interface TimeLogTableProps {
  userId: string;
  filters: {
    logType: string;
    dateRange: {
      from: Date | undefined;
      to: Date | undefined;
    };
    comment: string;
  };
  onEdit?: (log: any) => void;
}

export interface TimeLogFiltersProps {
  filters: {
    logType: string;
    dateRange: {
      from: Date | undefined;
      to: Date | undefined;
    };
    comment: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      logType: string;
      dateRange: {
        from: Date | undefined;
        to: Date | undefined;
      };
      comment: string;
    }>>;
  className?: string;
}

export interface TimeLogDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timelog: any;
  getEmployee: (emp_id: number) => any;
  onEdit: () => void;
  onDelete: () => void;
} 