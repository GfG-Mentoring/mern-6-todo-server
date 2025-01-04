const fs = require('fs');
const path = require('path')

const readTodosFromFile = () => {
    const todos = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    return JSON.parse(todos ?? '[]');
}


const getTodos = (limit, page) => {
    const todos = readTodosFromFile();

    const offset = (page - 1) * limit;

    console.log(offset, limit, offset + limit)

    return todos.slice(offset, offset + limit);

}

const getTodoById = (id) => {
    // read all the todos
    const todos = readTodosFromFile();

    // find the todo using find method by its ID
    return todos.find(todo => todo.id === id);
}


const createTodo = (todo) => {
    // read all the todos
    const todos = readTodosFromFile();

    // find the max id from the todos
    const maxId = todos.reduce((max, todo) => {
        return todo.id > max ? todo.id : max;
    }, 0);

    // assign the next id to the new todo
    todo.id = maxId + 1;

    todo.completed = false;

    // add the new todo to the list
    todos.push(todo);

    // write the updated list to the file
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(todos, null, 2));

    // return the newly created todo
    return todo;
}


module.exports = {
    getTodos,
    createTodo,
    getTodoById,
};
