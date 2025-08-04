
import express from 'express';
import * as taskController from '../controllers/taskController';
const router = express.Router();
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.get('/employee/:employeeId', taskController.getTasksByEmployee);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id/start', taskController.startTask);
router.patch('/:id/stop', taskController.stopTask);
router.delete('/:id', taskController.deleteTask);
export default router;
