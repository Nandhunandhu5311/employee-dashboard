export type Department = "IT" | "HR" | "Sales";
export type Status = "Active" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: Department;
  joiningDate: string;
  status: Status;
}