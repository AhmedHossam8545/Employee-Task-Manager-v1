
export interface Task {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  startTime: string | null;
  endTime: string | null;
}
