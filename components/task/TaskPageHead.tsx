"use client";
import React from "react";
import { CiCirclePlus, CiSearch } from "react-icons/ci";

const HandleLogout = () => {
  localStorage.removeItem("access-token");
  window.location.href = "/login";
};

const TaskPageHead = ({
  setFilters,
  filters,
  setShowAddTask,
  showAddTask,
  handleAdd,
}) => {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        {/* Search and Filters */}
        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          {/* Search */}
          <div className="relative">
            <CiSearch className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          {/* Priority Filter */}
          <select
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
            value={filters.priority}
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value })
            }
          >
            <option value="all">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
        >
          <CiCirclePlus className="size-6" />
          Add Task
        </button>

        {/* Logout */}
        <button
          onClick={HandleLogout}
          className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TaskPageHead;
