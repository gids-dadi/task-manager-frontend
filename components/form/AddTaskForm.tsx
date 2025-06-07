"use client";
import React from "react";

const AddTaskForm = ({ setShowAddTask, setTasks, tasks }) => {
  const [newTask, setNewTask] = React.useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });

  // const updateTaskStatus = (taskId, newStatus) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === taskId ? { ...task, status: newStatus } : task,
  //     ),
  //   );
  // };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        status: "todo",
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
      setShowAddTask(false);
    }
  };

  return (
    <div className="mt-6 rounded-lg border bg-gray-50 p-4">
      <h3 className="mb-4 text-lg font-semibold">Add New Task</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Task title"
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          value={newTask.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 md:col-span-2"
          rows={2}
          value={newTask.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <select
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          value={newTask.priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setNewTask({ ...newTask, priority: e.target.value })
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
