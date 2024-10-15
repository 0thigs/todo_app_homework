// components/TaskItem.tsx

import React from "react";
import { motion } from "framer-motion";

interface TaskItemProps {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  name,
  description,
  dueDate,
  status,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.li
      className="flex flex-col justify-between items-start bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-200 max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-md">
        <p className={"w-full max-w-md"}>{name}</p>
        <p className="text-gray-600">{description}</p>{" "}
        <p className="text-gray-500 text-sm">{dueDate}</p>{" "}
      </div>
      <div className="mt-2 w-full flex justify-end">
        <button
          onClick={onEdit}
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
      </div>
    </motion.li>
  );
};

export default TaskItem;
