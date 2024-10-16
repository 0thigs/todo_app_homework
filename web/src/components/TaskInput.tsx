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
  updateTask: (
    id: number,
    name: string,
    description: string,
    dueDate: string,
    status: boolean
  ) => Promise<void>;
  dueDateError?: string | null;
}

const TaskInput: React.FC<TaskInputProps> = ({
  name,
  description,
  dueDate,
  setName,
  setDescription,
  setDueDate,
  addTask,
  dueDateError,
}) => {
  const handleSubmit = () => {
    addTask();
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-64 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        placeholder="Digite o nome da tarefa"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-64 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        placeholder="Digite a descrição da tarefa"
      />
      <div className="w-64 mb-2">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`border ${
            dueDateError ? "border-red-500" : "border-gray-300"
          } rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 ${
            dueDateError ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          min={new Date().toISOString().split("T")[0]}
        />
        {dueDateError && (
          <p className="text-red-500 text-sm mt-1">{dueDateError}</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 w-full text-white p-3 rounded-md hover:bg-green-600 transition duration-200"
      >
        Adicionar Tarefa
      </button>
    </div>
  );
};

export default TaskInput;
