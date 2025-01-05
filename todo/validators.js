const { query, param } = require("express-validator");

const createListApiValidator = () => [
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Only positive numbers are allowed'),
    query('page').optional().isInt({ min: 0 }),
]


const todoIdValidator = () => param('id')
    .isInt({ min: 1 })
    .withMessage('Todo Id must be present and should be a valid positive integer')



module.exports = { createListApiValidator, todoIdValidator };