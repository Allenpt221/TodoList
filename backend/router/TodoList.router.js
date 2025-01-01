import express from 'express';
import { createTask, retrieveTask } from '../controller/TodoList.controller.js';


const router = express.Router();

router.post('/', createTask);
router.get('/', retrieveTask);
router.put('/:id', retrieveTask);


export default router;