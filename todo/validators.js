const { query, param } = require("express-validator");

const createListApiValidator = () => [
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Only positive numbers are allowed'),
    query('page').optional().isInt({ min: 0 }),
]


const todoIdValidator = () => param('id')
    .isMongoId()
    .withMessage('Todo Id must be present and should be valid')



module.exports = { createListApiValidator, todoIdValidator };