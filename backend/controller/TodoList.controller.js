import mongoose from 'mongoose';
import TodoList from '../model/Todo.model.js';

export const createTask = async(req, res) => {
    const Task = req.body;
    try {

        if(!Task){
            res.status(400).json({success: false, message: 'all field are required'});
        }

        const existData = await TodoList.findOne(Task);
        if(existData){
            return res.status(400).json({success: false, message: 'The List of Doing is already exist'});
        }

        const NewList = new TodoList(Task);

        await NewList.save();

        res.status(201).json({success: true, data:Task});
    } catch (error) {
        console.log('server error in createTask');
        res.status(500).json({success: false, message: 'Server is error'});
    }
};

export const retrieveTask = async(req, res) => {
    try {
        const dataList = await TodoList.find({});

        if(dataList.length === 0){
            res.status(404).json({success: false, message: 'the database list is empty'});
        }

        res.status(200).json({success:true, data: dataList});
    } catch (error) {
        console.log('server error in retrieveTask');
        res.status(500).json({success: false, message: 'Server is error'});
    }
};

export const updateTask = async (req, res) => {
    const { id } =  req.params;
    const Task = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false, mesage: 'id is not found'});
    }

    try {
        const updatedData = await TodoList.findByIdAndUpdate(id, Task, {new: true});
        if(!updatedData){
            res.status(404).json({success: false, message: 'The data cannot found'});
        }

        res.status(200).json({success: true, data: updatedData});

    } catch (error) {
        console.log('server error in updateTask');
        res.status(500).json({success: false, message: 'Server is error'});
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false, mesage: 'id is not found'});
    }
    try {
        const deleteData = await TodoList.findByIdAndDelete(id);
        if(!deleteData){
            res.status(404).json({success: false, message: 'List already delete'});
        }

        res.status(200).json({success: true, message: 'sucessfully delete', data: deleteData});
    } catch (error) {
        console.log('server error in deleteTask');
        res.status(500).json({success: false, message: 'Server is error'});
    }
};