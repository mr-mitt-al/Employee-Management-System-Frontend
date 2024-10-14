export interface Login {
    email: string;
    password: string;
  }

  export interface VacationRequest {
    id: number;
    employee: number;
    employee_name: string;
    reason: string;
    start_date: string;
    end_date: string;
    leave_status: string;
    leave_requested_at: string;
  }

  export interface ApplyVacation {
    start_date: string;
    end_date: string;
    reason: string;
    attached_file?: File; 
  }