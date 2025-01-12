const express = require('express');
const fs = require('fs');
const todoRouter = require('./todo/route');
const authRouter = require('./auth/routes');

const validateUser = require('./middlewares/validateUser');
const { connectToDb } = require('./utils/db');
const userRouter = require('./users/user.route');

require('dotenv').config()

const server = express();


server.use(express.json()) // for parsing application/json

server.get('/', (req, res) => {
    res.send('Welcome to my TODO application!');
});


server.use('/auth', authRouter);
server.use('/user', userRouter);
server.use('/todo', validateUser, todoRouter);


server.listen(3000, async () => {
    await connectToDb(
        process.env.DB_USERNAME, process.env.DB_PASSWORD
    );
    console.log('Server is running on port 3000');
});