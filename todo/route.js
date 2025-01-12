const Router = require('express');
const { getTodos, getTodoById, createTodo } = require('./services');
const formatResponseAndSend = require('../utils/formatResponse');
const { createListApiValidator, todoIdValidator } = require('./validators');
const { validationResult } = require('express-validator');
const handleValidation = require('../middlewares/handleValidation');
const { client } = require('../utils/db');

const todoRouter = Router();

// GET LIST OF ALL TODOS
todoRouter.get('/', createListApiValidator(), handleValidation, async (req, res) => {
    let limit = req.query.limit || 5;
    let page = req.query.page || 1;

    const user = req.user;
    try {
        const todos = await getTodos(limit, page, user);
        formatResponseAndSend(res, 'TODOs fetched', todos);
    }
    catch (e) {
        console.error(e);
        formatResponseAndSend(res, null, null, e);
    }
});


// GET TODO BY ITS ID
todoRouter.get('/:id', todoIdValidator(), handleValidation, async (req, res) => {

    const todoId = req.params.id;

    try {
        const todo = await getTodoById(todoId);
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
todoRouter.post('/', async (req, res) => {
    try {
        const todo = req.body;
        const user = req.user;
        const newTodo = await createTodo(todo, user);
        formatResponseAndSend(res, 'Todo created', newTodo);
    } catch (e) {
        console.error(e);
        formatResponseAndSend(res, null, null, e, 400);
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
