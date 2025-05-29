export interface Schedule {
  id: string;
  name: string;
  days: string;
  hours: string;
  assigned: number;
  break: string;
}

export interface DeleteScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule;
}

export interface AddScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface EditScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule;
}

export interface TimeInputsProps {
  day: string;
} 