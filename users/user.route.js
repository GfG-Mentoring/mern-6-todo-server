const { Router } = require('express');
const { createUser } = require('./user.service');
const formatResponseAndSend = require('../utils/formatResponse');
const handleValidation = require('../middlewares/handleValidation');
const { userCreateValidator } = require('./validators');

const userRouter = Router();



userRouter.post('/', userCreateValidator(), handleValidation, async function (req, res) {
    try {
        const { fullName, email, password } = req.body;
        const user = await createUser(email, fullName, password);
        formatResponseAndSend(res, 'User created successfully', user, null, 201);
    } catch (err) {
        console.error(err);
        formatResponseAndSend(res, null, null, err, 400);
    }
});

module.exports = userRouter;

