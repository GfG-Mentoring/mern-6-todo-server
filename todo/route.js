const Router = require('express');
const { getTodos, getTodoById, createTodo } = require('./services');
const formatResponseAndSend = require('../utils/formatResponse');
const { createListApiValidator, todoIdValidator } = require('./validators');
const { validationResult } = require('express-validator');
const handleValidation = require('../middlewares/handleValidation');

const todoRouter = Router();

// GET LIST OF ALL TODOS
todoRouter.get('/', createListApiValidator(), handleValidation, (req, res) => {
    let limit = req.query.limit || 5;
    let page = req.query.page || 1;
    try {
        const todos = getTodos(limit, page);
        formatResponseAndSend(res, 'TODOs fetched', todos);
    } catch (e) {
        console.error(e);
        formatResponseAndSend(res, null, null, e);
    }
});


// GET TODO BY ITS ID
todoRouter.get('/:id', todoIdValidator(), handleValidation, (req, res) => {

    const todoId = req.params.id;

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
    res.status(501).statusMessage('Method not implemented')
});


// DELETE A TODO
todoRouter.delete('/:id', (req, res) => {
    res.send('Todo router is available');
});



module.exports = todoRouter;
