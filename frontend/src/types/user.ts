export interface User {
  id: number;
  emp_id: number;
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
}

export interface RemoveScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export interface AssignMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleId: string;
}

export interface NotificationProps {
  id: number;
  title: string;
  description: string;
  type?: "info" | "success" | "error" | "warning";
  onClose: (id: number) => void;
}

export interface UserAccountFiltersProps {
  filters: {
    search: string;
    role: string;
    department: string;
    status: string;
    shiftType: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      role: string;
      department: string;
      status: string;
      shiftType: string;
    }>
  >;
  className?: string;
}

export interface UserListProps {
  selectedUserId: string;
  users?: Array<{ id: string; name: string; position?: string; department?: string }>;
}

export interface SearchProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 