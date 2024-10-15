import React from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";

Modal.setAppElement("#__next"); // Set the app element for accessibility

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

  const handleSave = () => {
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
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">
          {task ? "Edit Task" : "Task Details"}
        </h2>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">
            Task Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
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
            className="border border-gray-300 rounded-md p-2 w-full"
            rows={3}
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
            className="border border-gray-300 rounded-md p-2 w-full"
          />
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
