import { Router } from 'express';
import TaskController from '../controllers/TaskController';

const router = Router();

router.get('/', TaskController.getTasks.bind(TaskController));
router.post('/', TaskController.addTask.bind(TaskController));
router.put('/:id', TaskController.updateTask.bind(TaskController));
router.delete('/:id', TaskController.deleteTask.bind(TaskController));

export default router;
