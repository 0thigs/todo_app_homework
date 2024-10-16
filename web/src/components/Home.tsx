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
  const [dueDateError, setDueDateError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const validateDueDate = (date: string): boolean => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today;
  };

  const addTask = async () => {
    setGeneralError(null);
    setDueDateError(null);
    if (!name.trim() || !description.trim() || !dueDate) {
      setGeneralError("Por favor, preencha todos os campos.");
      return;
    }
    if (!validateDueDate(dueDate)) {
      setDueDateError("A data de vencimento deve ser futura.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, dueDate }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setGeneralError(errorData.error || "Erro ao adicionar tarefa.");
        return;
      }
      setName("");
      setDescription("");
      setDueDate("");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setGeneralError("Erro ao adicionar tarefa.");
    }
  };

  const updateTask = async (
    id: number,
    name: string,
    description: string,
    dueDate: string
  ) => {
    setGeneralError(null);
    setDueDateError(null);
    if (!name.trim() || !description.trim() || !dueDate) {
      setGeneralError("Por favor, preencha todos os campos.");
      return;
    }
    if (!validateDueDate(dueDate)) {
      setDueDateError("A data de vencimento deve ser futura.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, dueDate, status: false }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setGeneralError(errorData.error || "Erro ao atualizar tarefa.");
        return;
      }
      setEditTaskId(null);
      setName("");
      setDescription("");
      setDueDate("");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      setGeneralError("Erro ao atualizar tarefa.");
    }
  };

  const handleEdit = (id: number) => {
    setEditTaskId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        fetchTasks();
      } else {
        const errorData = await response.json();
        setGeneralError(errorData.error || "Erro ao deletar tarefa.");
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      setGeneralError("Erro ao deletar tarefa.");
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) {
        console.error("Tarefa não encontrada.");
        return;
      }
      const updatedTask = {
        ...taskToUpdate,
        status: !taskToUpdate.status,
      };
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setGeneralError(
          errorData.error || "Erro ao atualizar status da tarefa."
        );
        return;
      }
      fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
      setGeneralError("Erro ao atualizar status da tarefa.");
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gerenciador de Tarefas</h1>
      {generalError && <p className="text-red-500 mb-2">{generalError}</p>}
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
        dueDateError={dueDateError}
      />
      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          task={
            editTaskId
              ? tasks.find((task) => task.id === editTaskId)
              : undefined
          }
          onSave={(newName, newDescription, newDueDate) =>
            editTaskId
              ? updateTask(editTaskId, newName, newDescription, newDueDate)
              : addTask()
          }
        />
      )}
    </div>
  );
};

export default Home;
