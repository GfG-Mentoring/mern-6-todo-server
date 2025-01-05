const { body } = require("express-validator");


const verifyLoginBody = () => [
    body('password').notEmpty().withMessage('Please provide valid password.'),
    body('email').notEmpty().isEmail().withMessage('Please provide valid email address')
]

module.exports = { verifyLoginBody }