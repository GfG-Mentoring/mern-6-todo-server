const express = require('express');
const fs = require('fs');
const todoRouter = require('./todo/route');
const authRouter = require('./auth/routes');
const validateUser = require('./middlewares/validateUser');


const server = express();


server.use(express.json()) // for parsing application/json

server.get('/', (req, res) => {
    res.send('Welcome to my TODO application!');
});


server.use('/auth', authRouter);
server.use('/todo', validateUser, todoRouter);


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});