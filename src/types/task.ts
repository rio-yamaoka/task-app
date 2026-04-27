export type Priority = "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  completed: boolean;
};
