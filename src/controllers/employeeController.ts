// // src/controllers/employeeController.ts
import { promises as fs } from 'fs';
import { Request, Response } from 'express';
import { Employee } from '../models/Employee';
import { v4 as uuidv4 } from 'uuid';
// import { readTasks } from './taskController';

// const filePath = 'src/data/employees.json';

// async function readData(): Promise<Employee[]> {
//   const data = await fs.readFile(filePath, 'utf-8');
//   return JSON.parse(data);
// }

// async function writeData(employees: Employee[]) {
//   await fs.writeFile(filePath, JSON.stringify(employees, null, 2));
// }

// export const getAllEmployees = async (req: Request, res: Response) => {
//   const employees = await readData();
//   if (!employees) return res.status(404).json({ message: 'No Employees Yet' });
//   res.json(employees);
// };

// export const getEmployeeById = async (req: Request, res: Response) => {
//   const employees = await readData();
//   const employee = employees.find(e => e.id === req.params.id);
//   if (!employee) return res.status(404).json({ message: 'Employee not found' });
//   res.json(employee);
// };

// export const addEmployee = async (req: Request, res: Response) => {
//   const employees = await readData();
//   const newEmployee: Employee = { id: uuidv4(), ...req.body };
//   employees.push(newEmployee);
//   await writeData(employees);
//   res.status(201).json(newEmployee);
// };

// export const updateEmployee = async (req: Request, res: Response) => {
//   const employees = await readData();
//   const index = employees.findIndex(e => e.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Employee not found' });
//   employees[index] = { ...employees[index], ...req.body };
//   await writeData(employees);
//   res.json(employees[index]);
// };

// export const deleteEmployee = async (req: Request, res: Response) => {
//   let employees = await readData();
//   const index = employees.findIndex(e => e.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Employee not found' });
//   employees.splice(index, 1);
//   await writeData(employees);
//   res.status(204).send();
// };

// export const getEmployeeTasks = async (req: Request, res: Response) => {
//   const employeeId = req.params.id;

//   const employees = await readData();
//   const tasks = await readTasks();

//   const employee = employees.find(e => e.id === employeeId);
//   if (!employee) {
//     return res.status(404).json({ message: 'Employee not found' });
//   }

//   const employeeTasks = tasks.filter(task => task.employeeId === employeeId);

//   res.json(employeeTasks);
// };

// export const getEmployeeWithTasks = async (req: Request, res: Response) => {
//   const employeeId = req.params.id;
//   const employees = await readData();     
//   const tasks = await readTasks();         

//   const employee = employees.find(e => e.id === employeeId);
//   if (!employee) {
//     return res.status(404).json({ message: 'Employee not found' });
//   }

//   const employeeTasks = tasks.filter(task => task.employeeId === employeeId);

//   const result = {
//     ...employee,
//     tasks: employeeTasks
//   };

//   res.json(result);
// };

/////////////////////////////////////////////////////////////////////////////////
//using firebase
import db from '../firebase';
const employeesCollection = db.collection('employees');
const tasksCollection = db.collection('tasks');

// Get all employees
export const getAllEmployees = async (req:Request, res:Response) => {
  const snapshot = await employeesCollection.get();
  const employees = snapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }));
  res.json(employees);
};

// Add employee
export const addEmployee = async (req:Request, res:Response) => {
  const newEmployee = req.body;
  const ref = await employeesCollection.add(newEmployee);
  const created = await ref.get();
  res.status(201).json({ id: ref.id, ...created.data() });
};

// Get employee by ID
export const getEmployeeById = async (req:Request, res:Response) => {
  const doc = await employeesCollection.doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ message: 'Employee not found' });
  res.json({ id: doc.id, ...doc.data() });
};

// Update employee
export const updateEmployee = async (req:Request, res:Response) => {
  await employeesCollection.doc(req.params.id).update(req.body);
  const updated = await employeesCollection.doc(req.params.id).get();
  res.json({ id: updated.id, ...updated.data() });
};

// Delete employee
export const deleteEmployee = async (req:Request, res:Response) => {
  await employeesCollection.doc(req.params.id).delete();
  res.status(204).send();
};

// Get employee tasks
export const getEmployeeTasks = async (req:Request, res:Response) => {
  const employeeId = req.params.id;
  const doc = await employeesCollection.doc(employeeId).get();
  if (!doc.exists) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  
  const snapshot = await tasksCollection.where('employeeId', '==', employeeId).get();
  const employeeTasks = snapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }));
  res.json(employeeTasks);
};

// Get employee with tasks
export const getEmployeeWithTasks = async (req:Request, res:Response) => {
  const employeeId = req.params.id;
  const doc = await employeesCollection.doc(employeeId).get();
  if (!doc.exists) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  
  const snapshot = await tasksCollection.where('employeeId', '==', employeeId).get();
  const employeeTasks = snapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }));
  
  const result = {
    id: doc.id,
    ...doc.data(),
    tasks: employeeTasks
  };
  
  res.json(result);
};




/////////////////////////////////////////////////////////////////////////////////























// "dev": "ts-node src/server.ts",
// src/controllers/employeeController.ts

// const fs = require('fs').promises;
// const { Request, Response } = require('express');
// const Employee = require('../models/Employee');
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');


// // Types
// /** @typedef {{ id: string, [key: string]: any }} Employee */

// const filePath = path.join(__dirname, '../data/employees.json');

// async function readData() {
//   const data = await fs.readFile(filePath, 'utf-8');
//   return JSON.parse(data);
// }

// async function writeData(employees: typeof Employee[]) {
//   await fs.writeFile(filePath, JSON.stringify(employees, null, 2));
// }

// const getAllEmployees = async (req:Request, res:Response) => {
//   try{
//     const employees = await readData();
//     res.json(employees);
//   }
//   catch(error){
//     console.log("errrroooorrrr");
    
//   }
// };

// const getEmployeeById = async (req:Request, res:Response) => {
//   const employees = await readData();
//   const employee = employees.find(e => e.id === req.params.id);
//   if (!employee) return res.status(404).json({ message: 'Employee not found' });
//   res.json(employee);
// };

// const addEmployee = async (req:Request, res:Response) => {
//   const employees = await readData();
//   const newEmployee = { id: uuidv4(), ...req.body };
//   employees.push(newEmployee);
//   await writeData(employees);
//   res.status(201).json(newEmployee);
// };

// const updateEmployee = async (req:Request, res:Response) => {
//   const employees = await readData();
//   const index = employees.findIndex(e => e.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Employee not found' });
//   employees[index] = { ...employees[index], ...req.body };
//   await writeData(employees);
//   res.json(employees[index]);
// };

// const deleteEmployee = async (req:Request, res:Response) => {
//   let employees = await readData();
//   const index = employees.findIndex(e => e.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Employee not found' });
//   employees.splice(index, 1);
//   await writeData(employees);
//   res.status(204).send();
// };

// module.exports = {
//   getAllEmployees,
//   getEmployeeById,
//   addEmployee,
//   updateEmployee,
//   deleteEmployee,
// };
