import React from "react";
import { motion } from "framer-motion";

interface TaskItemProps {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: boolean;
  onEdit: (id: number) => void;
  onDelete: () => void;
  onToggleStatus: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  name,
  description,
  dueDate,
  status,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  return (
    <motion.li
      className={`flex flex-col justify-between items-start p-4 rounded-md shadow-md transition duration-200 w-96 ${
        status ? "bg-white" : "bg-gray-300 opacity-50 cursor-not-allowed"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md">
        <p className="w-full max-w-md font-semibold">{name}</p>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-500 text-sm">{dueDate}</p>
      </div>
      <div className="mt-2 w-full flex justify-end">
        <button
          onClick={() => onEdit(id)}
          className="bg-yellow-500 text-white p-2 rounded-md mx-1 hover:bg-yellow-600 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
        <button
          onClick={() => onToggleStatus(id)}
          className={`p-2 rounded-md mx-1 transition duration-200 ${
            status
              ? "bg-gray-500 text-white hover:bg-gray-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {status ? "Done Task" : "Enable Task"}
        </button>
      </div>
    </motion.li>
  );
};

export default TaskItem;
