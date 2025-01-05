const Router = require('express');
const { verifyLoginBody } = require('./validator');
const handleValidation = require('../middlewares/handleValidation');
const { signJwt } = require('./utils');
const formatResponseAndSend = require('../utils/formatResponse');


const authRouter = Router();


authRouter.post('/login', verifyLoginBody(), handleValidation, (req, res) => {
    const { password, email } = req.body;
    // match password and email
    if (email === 'admin@example.com' && password === 'admin@123') {
        const token = signJwt({ id: '1', name: 'admin' });
        formatResponseAndSend(res, 'Login successful', { token: token });
    } else {
        formatResponseAndSend(res, null, null, new Error('Login failed because user or password or both are incorrect.'), 400)
    }
});


module.exports = authRouter;