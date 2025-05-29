export interface ClockInModalProps {
  show: boolean;
  onClose: () => void;
  onClockIn: () => Promise<void>;
  currentTime: string;
  shiftTime: string;
  isClockedIn: boolean;
  userId?: string | number;
  isLoading?: boolean;
} 