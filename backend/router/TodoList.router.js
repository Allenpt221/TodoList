import express from 'express';
import { createTask, deleteTask, retrieveTask, updateTask } from '../controller/TodoList.controller.js';


const router = express.Router();

router.post('/', createTask);
router.get('/', retrieveTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);


export default router;