export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export type TaskList = Task[];

export interface CreateTaskDto {
  title: string;
  description: string;
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
