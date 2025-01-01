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

        res.status(200).json({success:true, data: dataList});
    } catch (error) {
        console.log('server error in retrieveTask');
        res.status(500).json({success: false, message: 'Server is error'});
    }
};

export const updateTask = async (req, res) => {
    const { id } =  req.params;
    if(!mongoose.Tp)
    try {
        
    } catch (error) {
        console.log('server error in updateTask');
        res.status(500).json({success: false, message: 'Server is error'});
    }
};