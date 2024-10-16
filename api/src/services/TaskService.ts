import { Task } from '../models/Task';

class TaskService {
  private tasks: Task[] = [];
  private idCounter: number = 1;

  public getAllTasks(status?: boolean): Task[] {
    if (status !== undefined) {
      return this.tasks.filter(task => task.status === status);
    }
    return this.tasks;
  }

  public addTask(name: string, description: string, dueDate: string): Task | Error {
    if (this.tasks.some(task => task.name === name)) {
      return new Error('A task with this name already exists.');
    }
    const newTask: Task = { id: this.idCounter++, name, description, dueDate, status: false };
    this.tasks.push(newTask);
    return newTask;
  }

  public updateTask(
    id: number,
    name: string,
    description: string,
    dueDate: string,
    status: boolean
  ): Task | Error {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      return new Error('Task not found.');
    }
    if (this.tasks.some(task => task.name === name && task.id !== id)) {
      return new Error('A task with this name already exists.');
    }
    this.tasks[index] = { ...this.tasks[index], name, description, dueDate, status };
    return this.tasks[index];
  }

  public deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}

export default new TaskService();
