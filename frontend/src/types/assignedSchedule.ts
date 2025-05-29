

export interface Employee {
  id: number;
  name: string;
}

export interface CreatedByUpdatedBy {
  id: number;
  email: string;
}

export interface Schedule {
  id: number;
  title: string;
  day: string;
  start: string;
  end: string;
}

export interface AssignedSchedule {
  id: number;
  emp_id: number;
  employee: Employee;
  schedule: Schedule;
  assigned_at: string;
  created_by: CreatedByUpdatedBy | null;
  updated_by: CreatedByUpdatedBy | null;
}

export interface AssignedSchedulesResponse {
  data: AssignedSchedule[];
}
