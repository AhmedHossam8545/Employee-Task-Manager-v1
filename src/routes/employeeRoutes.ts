
import express from 'express';
import * as employeeController from '../controllers/employeeController';
const validateEmployee = require('../middleware/validateEmployee');
const router = express.Router();
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', validateEmployee, employeeController.addEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.get('/:id/tasks' , employeeController.getEmployeeTasks); 
router.get('/:id/with-tasks' ,employeeController.getEmployeeWithTasks);
export default router;
