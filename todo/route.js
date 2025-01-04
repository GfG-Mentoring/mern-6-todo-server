const Router = require('express');
const { getTodos, getTodoById, createTodo } = require('./services');
const formatResponseAndSend = require('../utils/formatResponse');

const todoRouter = Router();

// {
//     message: "TODOs creating.",
//     data: null,
// }



// GET LIST OF ALL TODOS
todoRouter.get('/', (req, res) => {

    let limit = 5;
    let page = 1;

    if (req.query.limit) {
        limit = parseInt(req.query.limit);
        if (isNaN(limit) || limit <= 0) {
            formatResponseAndSend(res, null, null, new Error('Limit should be a positive integer'), 400);
        }
    }

    if (req.query.page) {
        page = parseInt(req.query.page);
        if (isNaN(page)) {
            formatResponseAndSend(res, null, null, new Error('Invalid page number'), 400);
            return;
        }
    }
    try {
        const todos = getTodos(limit, page);
        formatResponseAndSend(res, 'TODOs fetched', todos);
    } catch (e) {
        console.error(e);
        formatResponseAndSend(res, null, null, e);
    }
});


// GET TODO BY ITS ID
todoRouter.get('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    if (isNaN(todoId)) {
        formatResponseAndSend(res, null, null, new Error('Invalid todo id'), 400);
        return;
    }
    try {
        const todo = getTodoById(todoId);
        if (todo) {
            formatResponseAndSend(res, 'TODO fetched', todo);
        } else {
            formatResponseAndSend(res, null, null, new Error('Todo not found'), 404);
        }
    } catch (e) {
        console.error(e);
        formatResponseAndSend(res, null, null, e);
    }
});

// CREATE A NEW TODO
todoRouter.post('/', (req, res) => {
    try {
        const todo = req.body;
        const newTodo = createTodo(todo);
        formatResponseAndSend(res, 'Todo created', newTodo);
    } catch (e) {
        console.error(e);
        formatResponseAndSend(res, null, null, e);
    }
});


// UPDATE A TODO
todoRouter.put('/:id', (req, res) => {

});


// DELETE A TODO
todoRouter.delete('/:id', (req, res) => {
    res.send('Todo router is available');
});



module.exports = todoRouter;
