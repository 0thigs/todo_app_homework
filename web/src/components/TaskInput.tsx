// components/TaskInput.tsx

import React from "react";

interface TaskInputProps {
  name: string;
  description: string;
  dueDate: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setDueDate: (dueDate: string) => void;
  editTaskId: number | null;
  addTask: () => Promise<void>;
  updateTask: (id: number) => Promise<void>;
}

const TaskInput: React.FC<TaskInputProps> = ({
  name,
  description,
  dueDate,
  setName,
  setDescription,
  setDueDate,
  editTaskId,
  addTask,
  updateTask,
}) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-64 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        placeholder="Enter task name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-64 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        placeholder="Enter task description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-64 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      />
      {editTaskId ? (
        <button
          onClick={() => updateTask(editTaskId)}
          className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-200"
        >
          Update Task
        </button>
      ) : (
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Task
        </button>
      )}
    </div>
  );
};

export default TaskInput;
