import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";

Modal.setAppElement("#__next");

interface TaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task?: {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    status: boolean;
  };
  onSave: (name: string, description: string, dueDate: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onRequestClose,
  task,
  onSave,
}) => {
  const [name, setName] = React.useState(task ? task.name : "");
  const [description, setDescription] = React.useState(
    task ? task.description : ""
  );
  const [dueDate, setDueDate] = React.useState(task ? task.dueDate : "");
  const [error, setError] = React.useState<string | null>(null);
  const [dueDateError, setDueDateError] = React.useState<string | null>(null);

  const handleSave = () => {
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    let hasError = false;

    setError(null);
    setDueDateError(null);

    if (!name.trim()) {
      setError("Task name is required.");
      hasError = true;
    }

    if (!description.trim()) {
      setError("Task description is required.");
      hasError = true;
    }

    if (!dueDate) {
      setDueDateError("Due date is required.");
      hasError = true;
    } else if (isNaN(selectedDate.getTime())) {
      setDueDateError("Invalid due date format.");
      hasError = true;
    } else if (selectedDate <= today) {
      setDueDateError("Due date must be in the future.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onSave(name, description, dueDate);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">
          {task ? "Edit Task" : "Task Details"}
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">
            Task Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border ${
              error && !name.trim() ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 w-full`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`border ${
              error && !description.trim()
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md p-2 w-full`}
            rows={3}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`border ${
              dueDateError ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 w-full`}
            min={new Date().toISOString().split("T")[0]}
            required
          />
          {dueDateError && (
            <p className="text-red-500 text-sm mt-1">{dueDateError}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onRequestClose}
            className="bg-gray-300 text-white p-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Save
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default TaskModal;
