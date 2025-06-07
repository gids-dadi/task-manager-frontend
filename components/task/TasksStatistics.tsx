import React from "react";

const TasksStatistics = ({ tasks }) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
        <div className="text-gray-600">Total Tasks</div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">
          {tasks.filter((t) => t.status === "inprogress").length}
        </div>
        <div className="text-gray-600">In Progress</div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="text-2xl font-bold text-green-600">
          {tasks.filter((t) => t.status === "completed").length}
        </div>
        <div className="text-gray-600">Completed</div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="text-2xl font-bold text-red-600">
          {tasks.filter((t) => t.priority === "high").length}
        </div>
        <div className="text-gray-600">High Priority</div>
      </div>
    </div>
  );
};

export default TasksStatistics;
