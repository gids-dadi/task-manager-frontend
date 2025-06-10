"use client";
import React from "react";
import { createTask } from "../../app/api/task.service";

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
const AddTaskForm = ({ setShowAddTask, setTasks, tasks }) => {
  const [newTask, setNewTask] = React.useState({
    title: "",
    description: "",
    priority: Priority.LOW,
    status: TaskStatus.TODO,
    dueDate: "",
  });

  const addTask = async () => {
    try {
      const response = await createTask(newTask);
      setTasks([...tasks, response]);
      setNewTask({
        title: "",
        description: "",
        priority: Priority.LOW,
        status: TaskStatus.TODO,
        dueDate: "",
      });
      setShowAddTask(false);
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="mt-6 rounded-lg border bg-gray-50 p-4">
      <h3 className="mb-4 text-lg font-semibold">Add New Task</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Task title"
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          rows={2}
          value={newTask.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <select
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setNewTask({ ...newTask, priority: e.target.value as Priority })
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setNewTask({ ...newTask, status: e.target.value as TaskStatus })
          }
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.dueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTask({ ...newTask, dueDate: e.target.value })
          }
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={addTask}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Add Task
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
