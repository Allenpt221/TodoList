import mongoose from "mongoose";

const TodoListSchema = mongoose.Schema({
    todoName: {
        type: String,
        require: true,
    },
    dueDate: {
        type: String,
        require: true
    },
}, {
    timestamp: true,
});

const TodoList = mongoose.model('Todo', TodoListSchema);

export default TodoList;