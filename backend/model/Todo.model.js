import mongoose from "mongoose";

const TodoListSchema = mongoose.Schema({
    todoName: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true
    }
}, {
    timestamp: true,
});

const TodoList = mongoose.model('Todo', TodoListSchema);

export default TodoList;