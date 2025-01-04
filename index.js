const express = require('express');
const fs = require('fs');
const todoRouter = require('./todo/route');


const server = express();


server.use(express.json()) // for parsing application/json

server.get('/', (req, res) => {
    res.send('Welcome to my TODO application!');
});


server.use('/todo', todoRouter);


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});