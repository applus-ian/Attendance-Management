export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: string;
  isMovable: boolean;
  status: boolean;
}

export interface DeleteHolidayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  holiday: Holiday;
}

export interface EditHolidayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  holiday: Holiday;
}

export interface AddHolidayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface HolidayFiltersProps {
  filters: {
    search: string;
    type: string;
    movable: string;
    status: string;
    dateRange: {
      from: Date | undefined;
      to: Date | undefined;
    };
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      type: string;
      movable: string;
      status: string;
      dateRange: {
        from: Date | undefined;
        to: Date | undefined;
      };
    }>>;
  className?: string;
} 