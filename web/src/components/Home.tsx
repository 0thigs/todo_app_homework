// components/Home.tsx

import React, { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: boolean;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3001/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!name || !description || !dueDate) return;

    await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, dueDate }),
    });

    setName("");
    setDescription("");
    setDueDate("");
    fetchTasks();
  };

  const updateTask = async (id: number) => {
    if (!name || !description || !dueDate) return;

    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, dueDate, status: false }),
    });

    setEditTaskId(null);
    setName("");
    setDescription("");
    setDueDate("");
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (
    id: number,
    name: string,
    description: string,
    dueDate: string
  ) => {
    setEditTaskId(id);
    setName(name);
    setDescription(description);
    setDueDate(dueDate);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditTaskId(null);
    setName("");
    setDescription("");
    setDueDate("");
  };

  const handleModalSave = async (
    name: string,
    description: string,
    dueDate: string
  ) => {
    if (editTaskId) {
      await updateTask(editTaskId);
    } else {
      await addTask();
    }
    handleModalClose();
  };

  return (
    <div className=" w-screen p-6 bg-gray-50 h-screen justify-start items-center flex flex-col">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Thigs Task List
      </h1>
      <TaskInput
        name={name}
        description={description}
        dueDate={dueDate}
        setName={setName}
        setDescription={setDescription}
        setDueDate={setDueDate}
        editTaskId={editTaskId}
        addTask={addTask}
        updateTask={updateTask}
      />
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} />
      <TaskModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        task={
          editTaskId !== null
            ? { id: editTaskId, name, description, dueDate, status: false }
            : undefined
        }
        onSave={handleModalSave}
      />
    </div>
  );
};

export default Home;
