import { Request, Response } from 'express';
import TaskService from '../services/TaskService';

class TaskController {
    public getTasks(req: Request, res: Response): void {
        const { status } = req.query;
        const tasks = TaskService.getAllTasks(status === 'true' ? true : status === 'false' ? false : undefined);
        console.log(tasks);
        res.json(tasks);
    }
    

    public addTask(req: Request, res: Response): void {
        const { name, description, dueDate } = req.body;
        const result = TaskService.addTask(name, description, dueDate);
        if (result instanceof Error) {
            res.status(400).json({ error: result.message });
        } else {
            res.status(201).json(result);
        }
    }

    public updateTask(req: Request, res: Response): void {
        const { id } = req.params;
        const { name, description, dueDate, status } = req.body;
        const result = TaskService.updateTask(Number(id), name, description, dueDate, status);
        if (result instanceof Error) {
            res.status(400).json({ error: result.message });
        } else {
            res.json(result);
        }
    }

    public deleteTask(req: Request, res: Response): void {
        const { id } = req.params;
        const result = TaskService.deleteTask(Number(id));
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Task not found.' });
        }
    }
}

export default new TaskController();
