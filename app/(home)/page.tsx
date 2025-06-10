// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// import { RiCheckboxBlankLine } from "react-icons/ri";
// import CustomModal from "../../components/custom/CustomModal";
// import AddTaskForm from "../../components/form/AddTaskForm";
// import TaskCard from "../../components/task/TaskCard";
// import TasksStatistics from "../../components/task/TasksStatistics";
// import TaskPageHead from "../../components/task/TaskPageHead";
// import { getTasks } from "../api/task.service";
// import AuthGuard from "../../components/custom/AuthGuard";

// type Task = {
//   id: number;
//   title: string;
//   description: string;
//   priority: "low" | "medium" | "high";
//   status: "todo" | "in-progress" | "completed";
//   dueDate: string;
// };

// const TaskManager = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [showAddTask, setShowAddTask] = useState(false);
//   const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

//   const getAllTasks = () => {
//     getTasks()
//       .then((data) => setTasks(data))
//       .catch((error) => {
//         console.error("Failed to fetch tasks:", error);
//         alert("Failed to fetch tasks. Please try again later.");
//       });
//   };

//   useEffect(() => {
//     getAllTasks();
//   }, []);

//   const handleEdit = (id: number) => {
//     const task = tasks.find((t) => t.id === id);
//     if (task) {
//       setTaskToEdit(task);
//       setShowAddTask(true);
//     }
//   };

//   const handleAdd = () => {
//     setTaskToEdit(null);
//     setShowAddTask(true);
//   };

//   const [filters, setFilters] = useState({
//     priority: "all",
//     search: "",
//   });

//   const statusColumns = [
//     {
//       id: "todo",
//       title: "To Do",
//       color: "bg-gray-100",
//       headerColor: "bg-gray-200",
//       textColor: "text-gray-700",
//       icon: <RiCheckboxBlankLine className="size-5" />,
//     },
//     {
//       id: "in-progress",
//       title: "In Progress",
//       color: "bg-blue-100",
//       headerColor: "bg-blue-200",
//       textColor: "text-blue-700",
//       icon: <FaClock className="size-5" />,
//     },
//     {
//       id: "completed",
//       title: "Completed",
//       color: "bg-green-100",
//       headerColor: "bg-green-200",
//       textColor: "text-green-700",
//       icon: <FaCheckCircle className="size-5" />,
//     },
//   ];

//   const priorityOrder = { high: 3, medium: 2, low: 1 };

//   const filteredTasks = useMemo(() => {
//     return tasks
//       .filter((task) => {
//         const matchesPriority =
//           filters.priority === "all" || task.priority === filters.priority;
//         const matchesSearch =
//           task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//           task.description.toLowerCase().includes(filters.search.toLowerCase());
//         return matchesPriority && matchesSearch;
//       })
//       .sort((a, b) => {
//         const priorityDiff =
//           priorityOrder[b.priority] - priorityOrder[a.priority];
//         if (priorityDiff !== 0) return priorityDiff;
//         return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
//       });
//   }, [tasks, filters]);

//   const tasksByStatus = useMemo(() => {
//     const grouped = {
//       todo: [] as Task[],
//       "in-progress": [] as Task[],
//       completed: [] as Task[],
//     };

//     filteredTasks.forEach((task) => {
//       if (grouped[task.status]) {
//         grouped[task.status].push(task);
//       }
//     });

//     return grouped;
//   }, [filteredTasks]);

//   return (
//     <AuthGuard>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-8">
//             <h1 className="mb-2 text-4xl font-bold text-gray-900">
//               Task Manager
//             </h1>
//             <p className="text-gray-600">
//               Organize and track your tasks efficiently
//             </p>
//           </div>

//           <TaskPageHead
//             filters={filters}
//             setFilters={setFilters}
//             showAddTask={showAddTask}
//             setShowAddTask={setShowAddTask}
//             handleAdd={handleAdd}
//           />

//           <TasksStatistics tasks={tasks} />

//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//             {statusColumns.map((column) => (
//               <div key={column.id} className="flex flex-col">
//                 <div className={`rounded-t-lg ${column.headerColor} p-4`}>
//                   <div
//                     className={`flex items-center gap-2 ${column.textColor}`}
//                   >
//                     {column.icon}
//                     <h2 className="text-lg font-semibold">{column.title}</h2>
//                     <span className="ml-auto rounded-full bg-white px-2 py-1 text-sm font-medium text-gray-700">
//                       {tasksByStatus[column.id]?.length || 0}
//                     </span>
//                   </div>
//                 </div>
//                 <div
//                   className={`flex-1 rounded-b-lg ${column.color} min-h-[400px] p-4`}
//                 >
//                   {tasksByStatus[column.id]?.length === 0 ? (
//                     <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-500">
//                       No tasks
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {tasksByStatus[column.id].map((task) => (
//                         <TaskCard
//                           key={task.id}
//                           task={task}
//                           tasks={tasks}
//                           setTasks={setTasks}
//                           onEdit={() => handleEdit(task.id)}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Add/Edit Task Modal */}
//         {showAddTask && (
//           <CustomModal
//             isVisible={showAddTask}
//             onCloseModal={() => setShowAddTask(false)}
//             title={taskToEdit ? "Edit Task" : "Add New Task"}
//           >
//             <AddTaskForm
//               isEditing={!!taskToEdit}
//               taskToEdit={taskToEdit}
//               setTaskToEdit={setTaskToEdit}
//               setShowAddTask={setShowAddTask}
//               getAllTasks={getAllTasks}
//               // tasks={tasks}
//               // setTasks={setTasks}
//             />
//           </CustomModal>
//         )}
//       </div>
//     </AuthGuard>
//   );
// };

// export default TaskManager;

"use client";
import React, { useState, useMemo, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { RiCheckboxBlankLine } from "react-icons/ri";
import CustomModal from "../../components/custom/CustomModal";
import AddTaskForm from "../../components/form/AddTaskForm";
import TaskCard from "../../components/task/TaskCard";
import TasksStatistics from "../../components/task/TasksStatistics";
import TaskPageHead from "../../components/task/TaskPageHead";
import { getTasks, updateTaskStatus } from "../api/task.service";
import AuthGuard from "../../components/custom/AuthGuard";

// import Task and Priority types from the shared location
import type { Task } from "../../components/form/AddTaskForm";

type TaskStatus = "todo" | "in-progress" | "completed";

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const getAllTasks = () => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
        alert("Failed to fetch tasks. Please try again later.");
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleEdit = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTaskToEdit(task);
      setShowAddTask(true);
    }
  };

  const handleAdd = () => {
    setTaskToEdit(null);
    setShowAddTask(true);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.outerHTML);

    // Add some visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "0.5";
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedTask(null);
    setDragOverColumn(null);

    // Reset opacity
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only remove drag over state if we're leaving the column container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();
    setDragOverColumn(null);

    if (!draggedTask || draggedTask.status === newStatus) {
      return;
    }

    try {
      // Optimistically update the UI
      const updatedTasks = tasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task,
      );
      setTasks(updatedTasks);

      // Call API to update task status
      await updateTaskStatus(draggedTask.id, newStatus);
    } catch (error) {
      console.error("Failed to update task status:", error);
      // Revert the optimistic update on error
      getAllTasks();
      alert("Failed to update task status. Please try again.");
    }
  };

  const [filters, setFilters] = useState({
    priority: "all",
    search: "",
  });

  const statusColumns = [
    {
      id: "todo" as TaskStatus,
      title: "To Do",
      color: "bg-gray-100",
      headerColor: "bg-gray-200",
      textColor: "text-gray-700",
      icon: <RiCheckboxBlankLine className="size-5" />,
    },
    {
      id: "in-progress" as TaskStatus,
      title: "In Progress",
      color: "bg-blue-100",
      headerColor: "bg-blue-200",
      textColor: "text-blue-700",
      icon: <FaClock className="size-5" />,
    },
    {
      id: "completed" as TaskStatus,
      title: "Completed",
      color: "bg-green-100",
      headerColor: "bg-green-200",
      textColor: "text-green-700",
      icon: <FaCheckCircle className="size-5" />,
    },
  ];

  const priorityOrder = { high: 3, medium: 2, low: 1 };

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
        const priorityDiff =
          priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [tasks, filters]);

  const tasksByStatus = useMemo(() => {
    const grouped = {
      todo: [] as Task[],
      "in-progress": [] as Task[],
      completed: [] as Task[],
    };

    filteredTasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });

    return grouped;
  }, [filteredTasks]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              Task Manager
            </h1>
            <p className="text-gray-600">
              Organize and track your tasks efficiently. Drag tasks between
              columns to update their status.
            </p>
          </div>

          <TaskPageHead
            filters={filters}
            setFilters={setFilters}
            showAddTask={showAddTask}
            setShowAddTask={setShowAddTask}
            handleAdd={handleAdd}
          />

          <TasksStatistics tasks={tasks} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {statusColumns.map((column) => (
              <div key={column.id} className="flex flex-col">
                <div className={`rounded-t-lg ${column.headerColor} p-4`}>
                  <div
                    className={`flex items-center gap-2 ${column.textColor}`}
                  >
                    {column.icon}
                    <h2 className="text-lg font-semibold">{column.title}</h2>
                    <span className="ml-auto rounded-full bg-white px-2 py-1 text-sm font-medium text-gray-700">
                      {tasksByStatus[column.id]?.length || 0}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex-1 rounded-b-lg ${column.color} min-h-[400px] p-4 transition-all duration-200 ${
                    dragOverColumn === column.id
                      ? "bg-opacity-70 ring-2 ring-blue-400 ring-opacity-50"
                      : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, column.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  {tasksByStatus[column.id]?.length === 0 ? (
                    <div
                      className={`flex h-32 items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                        dragOverColumn === column.id
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-300"
                      } text-gray-500`}
                    >
                      {dragOverColumn === column.id
                        ? "Drop task here"
                        : "No tasks"}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {tasksByStatus[column.id].map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task)}
                          onDragEnd={handleDragEnd}
                          className="cursor-move transition-transform hover:scale-105 active:scale-95"
                        >
                          <TaskCard
                            task={task}
                            tasks={tasks}
                            setTasks={setTasks}
                            onEdit={() => handleEdit(task.id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Task Modal */}
        {showAddTask && (
          <CustomModal
            isVisible={showAddTask}
            onCloseModal={() => setShowAddTask(false)}
            title={taskToEdit ? "Edit Task" : "Add New Task"}
          >
            <AddTaskForm
              isEditing={!!taskToEdit}
              taskToEdit={taskToEdit}
              setTaskToEdit={setTaskToEdit}
              setShowAddTask={setShowAddTask}
              getAllTasks={getAllTasks}
            />
          </CustomModal>
        )}
      </div>
    </AuthGuard>
  );
};

export default TaskManager;
