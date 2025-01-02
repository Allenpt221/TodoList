import mongoose from 'mongoose';
import TodoList from '../model/Todo.model.js';

export const createTask = async (req, res) => {
    const { todoName, dueDate } = req.body; // Destructure the fields

    if (!todoName || !dueDate) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const existData = await TodoList.findOne({ todoName, dueDate });
        if (existData) {
            return res.status(400).json({ success: false, message: 'The task already exists' });
        }

        const newTask = new TodoList({ todoName, dueDate });
        await newTask.save();

        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const retrieveTask = async (req, res) => {
    try {
        const dataList = await TodoList.find({});
        console.log('Retrieved Data:', dataList); // Check the structure
        if (dataList.length === 0) {
            res.status(404).json({ success: false, message: 'The database list is empty' });
        } else {
            res.status(200).json({ success: true, data: dataList });
        }
    } catch (error) {
        console.log('Server error in retrieveTask:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const updateTask = async (req, res) => {
    const { id } = req.params;
    const Task = req.body;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'ID not found'});
    }

    try {
        const updatedData = await TodoList.findByIdAndUpdate(id, Task, {new: true});
        
        if (!updatedData) {
            return res.status(404).json({success: false, message: 'Task not found'});
        }

        res.status(200).json({success: true, data: updatedData});
    } catch (error) {
        console.log('Server error in updateTask:', error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'ID not found'});
    }

    try {
        const deleteData = await TodoList.findByIdAndDelete(id);
        
        if (!deleteData) {
            return res.status(404).json({success: false, message: 'Task not found or already deleted'});
        }

        res.status(200).json({success: true, message: 'Successfully deleted', data: deleteData});
    } catch (error) {
        console.log('Server error in deleteTask:', error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};
