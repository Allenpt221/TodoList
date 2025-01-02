let todoList = [];

// Fetch todos from backend when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
});

// Fetch the todo list from the backend
function fetchTodos() {
    fetch('http://localhost:5000/api/tasks') 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                todoList.length = 0;  // Clear current todoList
                todoList.push(...data.data);  // Update with the fetched todos
                renderTodoList();
            } else {
                console.error('Error fetching todos:', data.message);
            }
        })
        .catch(error => console.error('Error fetching todos:', error));
}

// Render the todo list to the page
function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const { todoName, dueDate, _id } = todoList[i]; // Use correct field names

        const html = `
            
                <div class="todo-name">${todoName}</div>
                <div class="todo-due-date">${dueDate}</div>
                <button data-id="${_id}" class="delete-todo-button">Delete</button>
            
        `;

        todoListHTML += html;
    }

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;

    // Attach event listeners for delete buttons
    document.querySelectorAll('.delete-todo-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const todoId = event.target.getAttribute('data-id');
            deleteTodo(todoId);
        });
    });
}

// Add a new todo item
function addList(event) {
    const inputElement = document.querySelector('.js-name-input');
    const todoName = inputElement.value; // Update 'name' to 'todoName'

    const dateElement = document.querySelector('.js-due-date-input');
    const dueDate = dateElement.value;

    if (!todoName || !dueDate) {
        alert('Please provide both name and due date.');
        return;
    }

    const newTodo = { todoName, dueDate }; // Update object to match backend

    fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                todoList.push(data.data); // Add the newly created todo to the list
                renderTodoList();
            } else {
                console.error('Error adding todo:', data.message);
            }
        })
        .catch(error => console.error('Error adding todo:', error));

    // Clear inputs after adding the todo
    inputElement.value = '';
    dateElement.value = '';
}


// Delete a todo item
function deleteTodo(id) {
    // Make a DELETE request to remove the todo item
    fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const index = todoList.findIndex(todo => todo._id === id); // Use _id
                if (index !== -1) {
                    todoList.splice(index, 1); // Remove the todo from the list
                    renderTodoList();
                }
            } else {
                console.error('Error deleting todo:', data.message);
            }
        })
        .catch(error => console.error('Error deleting todo:', error));
}
