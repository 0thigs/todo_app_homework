// components/TaskList.tsx

import React from "react";
import { motion } from "framer-motion";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    status: boolean;
  }[];
  onEdit: (
    id: number,
    name: string,
    description: string,
    dueDate: string
  ) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  console.log(tasks);
  return (
    <motion.ul
      className="mt-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          name={task.name}
          description={task.description} // Passing description
          dueDate={task.dueDate} // Passing due date
          status={task.status}
          onEdit={() =>
            onEdit(task.id, task.name, task.description, task.dueDate)
          }
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </motion.ul>
  );
};

export default TaskList;
