const fs = require('fs');
const path = require('path');
const Todo = require('./todo.model');

// const readTodosFromFile = () => {
//     const todos = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
//     return JSON.parse(todos ?? '[]');
// }


const getTodos = (limit, page, user) => {
    try {
        const offset = (page - 1) * limit;
        const todos = Todo.find({
            createdBy: user.id,
        }, null, { limit: limit, skip: offset });
        return todos;
    } catch (err) {
        console.error(err);
    }

}

const getTodoById = async (id) => {
    // read all the todos
    try {
        const todo = await Todo.findById(id);
        return todo;
    } catch (err) {
        console.error(err);
    }

}


const createTodo = async (todoData, user) => {
    const todo = new Todo({
        title: todoData.title,
        description: todoData.description,
        createdBy: user.id,
    });
    await todo.save();
    return todo;
}


module.exports = {
    getTodos,
    createTodo,
    getTodoById,
};
