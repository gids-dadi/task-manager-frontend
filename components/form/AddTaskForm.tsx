"use client";
import React, { useEffect, useState } from "react";
import {
  createTask,
  updateTask as updateTaskService,
} from "../../app/api/task.service";

enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

interface Task {
  id?: number;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
}

interface AddTaskFormProps {
  setShowAddTask: (show: boolean) => void;
  setTasks: (tasks: Task[]) => void;
  tasks: Task[];
  taskToEdit: Task | null;
  getAllTasks: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  setShowAddTask,
  setTasks,
  tasks,
  taskToEdit,
  getAllTasks,
}) => {
  const isEditing = !!taskToEdit;

  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: Priority.LOW,
    status: TaskStatus.TODO,
    dueDate: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleSubmit = async () => {
    try {
      if (isEditing && taskToEdit?.id) {
        await updateTaskService(taskToEdit.id, task);
        getAllTasks();
      } else {
        const response = await createTask(task);
        setTasks([...tasks, response]);
      }

      setTask({
        title: "",
        description: "",
        priority: Priority.LOW,
        status: TaskStatus.TODO,
        dueDate: "",
      });
      setShowAddTask(false);
    } catch (error) {
      console.error(
        `Failed to ${isEditing ? "update" : "create"} task:`,
        error,
      );
      alert(
        `Failed to ${isEditing ? "update" : "create"} task. Please try again.`,
      );
    }
  };

  return (
    <div className="mt-6 rounded-lg border bg-gray-50 p-4">
      <h3 className="mb-4 text-lg font-semibold">
        {isEditing ? "Edit Task" : "Add New Task"}
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Task title"
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          rows={2}
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />

        <select
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value as Priority })
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value as TaskStatus })
          }
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>
        <button
          onClick={() => setShowAddTask(false)}
          className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
