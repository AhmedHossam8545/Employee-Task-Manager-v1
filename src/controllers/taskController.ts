// // src/controllers/taskController.ts
import { Task } from '../models/Task';
import { createTimeTracker } from '../services/timeTracker';
import { promises as fs } from 'fs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// const taskFilePath = 'src/data/tasks.json';
// const timeTracker = createTimeTracker();

// export async function readTasks(): Promise<Task[]> {
//   const data = await fs.readFile(taskFilePath, 'utf-8');
//   return JSON.parse(data);
// }

// async function writeTasks(tasks: Task[]) {
//   await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
// }

// export const getAllTasks = async (req: Request, res: Response) => {
//   const tasks = await readTasks();
//   if (!tasks) return res.status(404).json({ message: 'No Tasks Yet' });
//   res.json(tasks);
// };

// export const getTaskById = async (req: Request, res: Response) => {
//   const tasks = await readTasks();
//   const task = tasks.find(t => t.id === req.params.id);
//   if (!task) return res.status(404).json({ message: 'Task not found' });
//   res.json(task);
// };

// export const getTasksByEmployee = async (req: Request, res: Response) => {
//   const tasks = await readTasks();
//   const employeeTasks = tasks.filter(t => t.employeeId === req.params.employeeId);
//   res.json(employeeTasks);
// };

// export const createTask = async (req: Request, res: Response) => {
//   const tasks = await readTasks();
//   const newTask: Task = { id: uuidv4(), ...req.body, startTime: null, endTime: null };
//   tasks.push(newTask);
//   await writeTasks(tasks);
//   res.status(201).json(newTask);
// };

// export const updateTask = async (req: Request, res: Response) => {
//   const tasks = await readTasks();
//   const index = tasks.findIndex(t => t.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Task not found' });
//   tasks[index] = { ...tasks[index], ...req.body };
//   await writeTasks(tasks);
//   res.json(tasks[index]);
// };

// export const startTask = async (req: Request, res: Response) => {
//   const tasks = await readTasks();
//   const index = tasks.findIndex(t => t.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Task not found' });
//   timeTracker.start();
//   tasks[index].startTime = new Date().toISOString();
//   await writeTasks(tasks);
//   res.json({ message: 'Task started', task: tasks[index] });
// };

// export const stopTask = async (req: Request, res: Response) => {
//   const tasks = await readTasks();
//   const index = tasks.findIndex(t => t.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Task not found' });
//   const duration = timeTracker.stop();
//   tasks[index].endTime = new Date().toISOString();
//   await writeTasks(tasks);
//   res.json({ message: `Task stopped. Duration: ${duration}ms`, task: tasks[index] });
// };

// export const deleteTask = async (req: Request, res: Response) => {
//   let tasks = await readTasks();
//   const index = tasks.findIndex(t => t.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Task not found' });
//   tasks.splice(index, 1);
//   await writeTasks(tasks);
//   res.status(204).send();
// };

//////////////////////////////////////////////////////////////////////////////////
//using firebase


// src/controllers/taskController.js
// const { v4: uuidv4 } = require('uuid');
import db from '../firebase';
const tasksCollection = db.collection('tasks');

export const getAllTasks = async (req:Request, res:Response) => {
  const snapshot = await tasksCollection.get();
  const tasks = snapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }));
  if (tasks.length === 0) return res.status(404).json({ message: 'No Tasks Yet' });
  res.json(tasks);
};

export const getTaskById = async (req:Request, res:Response) => {
  const doc = await tasksCollection.doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ message: 'Task not found' });
  res.json({ id: doc.id, ...doc.data() });
};

export const getTasksByEmployee = async (req:Request, res:Response) => {
  const snapshot = await tasksCollection.where('employeeId', '==', req.params.employeeId).get();
  const employeeTasks = snapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }));
  res.json(employeeTasks);
};

export const createTask = async (req:Request, res:Response) => {
  const newTask = { ...req.body, startTime: null, endTime: null };
  const ref = await tasksCollection.add(newTask);
  const created = await ref.get();
  res.status(201).json({ id: ref.id, ...created.data() });
};

export const updateTask = async (req:Request, res:Response) => {
  await tasksCollection.doc(req.params.id).update(req.body);
  const updated = await tasksCollection.doc(req.params.id).get();
  res.json({ id: updated.id, ...updated.data() });
};

export const startTask = async (req:Request, res:Response) => {
  const now = new Date().toISOString();
  await tasksCollection.doc(req.params.id).update({ startTime: now });
  const updated = await tasksCollection.doc(req.params.id).get();
  res.json({ message: 'Task started', task: { id: updated.id, ...updated.data() } });
};

export const stopTask = async (req:Request, res:Response) => {
  const now = new Date().toISOString();
  await tasksCollection.doc(req.params.id).update({ endTime: now });
  const updated = await tasksCollection.doc(req.params.id).get();
  res.json({ message: 'Task stopped', task: { id: updated.id, ...updated.data() } });
};

export const deleteTask = async (req:Request, res:Response) => {
  await tasksCollection.doc(req.params.id).delete();
  res.status(204).send();
};








////////////////////////////////////////////////////////////






// src/controllers/taskController.ts

// const fs = require('fs').promises;
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');

// const { createTimeTracker } = require('../services/timeTracker');
// const taskFilePath = path.join(__dirname, '../data/tasks.json');
// const timeTracker = createTimeTracker();

// // Types
// /** @typedef {{ id: string, employeeId: string, [key: string]: any }} Task */

// async function readTasks() {
//   const data = await fs.readFile(taskFilePath, 'utf-8');
//   return JSON.parse(data);
// }

// async function writeTasks(tasks) {
//   await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
// }

// const getAllTasks = async (req, res) => {
//   const tasks = await readTasks();
//   res.json(tasks);
// };

// const getTaskById = async (req, res) => {
//   const tasks = await readTasks();
//   const task = tasks.find(t => t.id === req.params.id);
//   if (!task) return res.status(404).json({ message: 'Task not found' });
//   res.json(task);
// };

// const getTasksByEmployee = async (req, res) => {
//   const tasks = await readTasks();
//   const employeeTasks = tasks.filter(t => t.employeeId === req.params.employeeId);
//   res.json(employeeTasks);
// };

// const createTask = async (req, res) => {
//   const tasks = await readTasks();
//   const newTask = { id: uuidv4(), ...req.body, startTime: null, endTime: null };
//   tasks.push(newTask);
//   await writeTasks(tasks);
//   res.status(201).json(newTask);
// };

// const updateTask = async (req, res) => {
//   const tasks = await readTasks();
//   const index = tasks.findIndex(t => t.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Task not found' });
//   tasks[index] = { ...tasks[index], ...req.body };
//   await writeTasks(tasks);
//   res.json(tasks[index]);
// };

// const startTask = async (req, res) => {
//   const tasks = await readTasks();
//   const index = tasks.findIndex(t => t.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Task not found' });
//   timeTracker.start();
//   tasks[index].startTime = new Date().toISOString();
//   await writeTasks(tasks);
//   res.json({ message: 'Task started', task: tasks[index] });
// };

// const stopTask = async (req, res) => {
//   const tasks = await readTasks();
//   const index = tasks.findIndex(t => t.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Task not found' });
//   const duration = timeTracker.stop();
//   tasks[index].endTime = new Date().toISOString();
//   await writeTasks(tasks);
//   res.json({ message: `Task stopped. Duration: ${duration}ms`, task: tasks[index] });
// };

// const deleteTask = async (req, res) => {
//   let tasks = await readTasks();
//   const index = tasks.findIndex(t => t.id === req.params.id);
//   if (index === -1) return res.status(404).json({ message: 'Task not found' });
//   tasks.splice(index, 1);
//   await writeTasks(tasks);
//   res.status(204).send();
// };

// module.exports = {
//   getAllTasks,
//   getTaskById,
//   getTasksByEmployee,
//   createTask,
//   updateTask,
//   startTask,
//   stopTask,
//   deleteTask,
// };
