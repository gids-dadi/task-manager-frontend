import React from "react";
import { FaEdit, FaRegCalendarCheck } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const TaskCard = ({ tasks, setTasks, task, onEdit }) => {
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div
      className={`mb-3 rounded-lg border-l-4 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md ${getPriorityColor(task.priority)} cursor-move`}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => deleteTask(task.id)}
            className="text-xs text-red-500 hover:text-red-700"
          >
            <TiDelete className="size-4" />
          </button>
          <button
            onClick={() => onEdit(task.id)}
            className="text-xs text-red-500 hover:text-red-700"
          >
            <FaEdit className="size-3" />
          </button>
        </div>
      </div>

      <p className="mb-3 line-clamp-1 text-sm text-gray-600">
        {task.description}
      </p>

      <div className="flex items-center gap-4 space-y-1 text-xs text-gray-500">
        <span
          className={`inline-block rounded-full border px-2 py-1 text-xs font-medium ${getPriorityBadge(task.priority)}`}
        >
          {task.priority}
        </span>
        <div className="flex items-center gap-1">
          <FaRegCalendarCheck className="size-3" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
