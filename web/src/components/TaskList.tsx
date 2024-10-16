import React, { useState } from "react";
import { motion } from "framer-motion";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onEdit,
  onToggleStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<
    "all" | "enabled" | "disabled"
  >("all");

  // Filter tasks based on filterStatus
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") {
      return true;
    } else if (filterStatus === "enabled") {
      return task.status === true;
    } else if (filterStatus === "disabled") {
      return task.status === false;
    }
    return false;
  });

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 mr-2 ${
            filterStatus === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus("enabled")}
          className={`px-4 py-2 mr-2 ${
            filterStatus === "enabled"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded`}
        >
          Enabled
        </button>
        <button
          onClick={() => setFilterStatus("disabled")}
          className={`px-4 py-2 ${
            filterStatus === "disabled"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded`}
        >
          Disabled
        </button>
      </div>

      {/* Task List */}
      <motion.ul
        className="mt-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            dueDate={task.dueDate}
            status={task.status}
            onEdit={() => onEdit(task.id)}
            onDelete={() => onDelete(task.id)}
            onToggleStatus={() => onToggleStatus(task.id)}
          />
        ))}
      </motion.ul>
    </div>
  );
};

export default TaskList;
