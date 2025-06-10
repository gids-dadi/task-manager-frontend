import taskApi from ".";

enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

interface CreateTaskDto {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

export const getTasks = () => taskApi.get("/tasks");

export const createTask = (data: CreateTaskDto) => taskApi.post("/tasks", data);

export const updateTask = (id: number, data: Partial<CreateTaskDto>) =>
  taskApi.patch(`/tasks/${id}`, data);

export const deleteTask = (id: number) => taskApi.delete(`/tasks/${id}`);
