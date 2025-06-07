"use client";
import React, { useState, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { RiCheckboxBlankLine } from "react-icons/ri";
import CustomModal from "../../components/custom/CustomModal";
import AddTaskForm from "../../components/form/AddTaskForm";
import TaskCard from "../../components/task/TaskCard";
import TasksStatistics from "../../components/task/TasksStatistics";
import TaskPageHead from "../../components/task/TaskPageHead";

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project proposal",
      description: "Finalize the Q2 project proposal with budget details",
      priority: "high",
      status: "todo",
      dueDate: "2025-06-10",
      assignee: "John Doe",
    },
    {
      id: 2,
      title: "Review code changes",
      description: "Review pull requests for the authentication module",
      priority: "medium",
      status: "inprogress",
      dueDate: "2025-06-08",
      assignee: "Jane Smith",
    },
    {
      id: 3,
      title: "Update documentation",
      description: "Update API documentation for the new endpoints",
      priority: "low",
      status: "completed",
      dueDate: "2025-06-05",
      assignee: "Mike Johnson",
    },
    {
      id: 4,
      title: "Design system implementation",
      description: "Implement the new design system components",
      priority: "high",
      status: "inprogress",
      dueDate: "2025-06-12",
      assignee: "Sarah Wilson",
    },
    {
      id: 5,
      title: "Bug fixes",
      description: "Fix critical bugs reported by QA team",
      priority: "high",
      status: "todo",
      dueDate: "2025-06-09",
      assignee: "Alex Brown",
    },
  ]);
  const [showAddTask, setShowAddTask] = useState(false);

  const [filters, setFilters] = useState({
    priority: "all",
    search: "",
  });

  // Status columns configuration
  const statusColumns = [
    {
      id: "todo",
      title: "To Do",
      color: "bg-gray-100",
      headerColor: "bg-gray-200",
      textColor: "text-gray-700",
      icon: <RiCheckboxBlankLine className="size-5" />,
    },
    {
      id: "inprogress",
      title: "In Progress",
      color: "bg-blue-100",
      headerColor: "bg-blue-200",
      textColor: "text-blue-700",
      icon: <FaClock className="size-5" />,
    },
    {
      id: "completed",
      title: "Completed",
      color: "bg-green-100",
      headerColor: "bg-green-200",
      textColor: "text-green-700",
      icon: <FaCheckCircle className="size-5" />,
    },
  ];

  // Priority order for sorting
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesPriority =
          filters.priority === "all" || task.priority === filters.priority;
        const matchesSearch =
          task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.description.toLowerCase().includes(filters.search.toLowerCase());
        return matchesPriority && matchesSearch;
      })
      .sort((a, b) => {
        // Sort by priority first, then by due date
        const priorityDiff =
          priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [tasks, filters]);

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    const grouped = {
      todo: [],
      inprogress: [],
      completed: [],
    };

    filteredTasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });

    return grouped;
  }, [filteredTasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Organize and track your tasks efficiently
          </p>
        </div>

        {/* Controls Head */}
        <TaskPageHead
          filters={filters}
          setFilters={setFilters}
          showAddTask={showAddTask}
          setShowAddTask={setShowAddTask}
        />

        {/* Task Stats */}
        <TasksStatistics tasks={tasks} />

        {/* Kanban Board */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {statusColumns.map((column) => (
            <div key={column.id} className="flex flex-col">
              {/* Column Header */}
              <div className={`rounded-t-lg ${column.headerColor} p-4`}>
                <div className={`flex items-center gap-2 ${column.textColor}`}>
                  {column.icon}
                  <h2 className="text-lg font-semibold">{column.title}</h2>
                  <span className="ml-auto rounded-full bg-white px-2 py-1 text-sm font-medium text-gray-700">
                    {tasksByStatus[column.id]?.length || 0}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div
                className={`flex-1 rounded-b-lg ${column.color} min-h-[400px] p-4`}
              >
                {tasksByStatus[column.id]?.length === 0 ? (
                  <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-500">
                    No tasks
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasksByStatus[column.id]?.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        tasks={tasks}
                        setTasks={setTasks}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <CustomModal
          isVisible={showAddTask}
          onCloseModal={() => setShowAddTask(false)}
          title="Add New Task"
        >
          <AddTaskForm
            setShowAddTask={setShowAddTask}
            tasks={tasks}
            setTasks={setTasks}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default TaskManager;
