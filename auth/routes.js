const Router = require('express');
const { verifyLoginBody } = require('./validator');
const handleValidation = require('../middlewares/handleValidation');
const { signJwt } = require('./utils');
const formatResponseAndSend = require('../utils/formatResponse');
const { Users } = require('../users/user.model');
const { comparePassword } = require('../users/util');


const authRouter = Router();


authRouter.post('/login', verifyLoginBody(), handleValidation, async (req, res) => {
    const { password, email } = req.body;
    // match password and email

    const user = await Users.findOne({ email: email });

    if (!user) {
        throw new Error('User not found');
    }

    if (user.email === email && await comparePassword(user.password, password)) {
        const token = signJwt({
            id: user.id,
        });
        formatResponseAndSend(res, 'Login successful', { token: token });
    } else {
        formatResponseAndSend(res, null, null, new Error('Login failed because user or password or both are incorrect.'), 400)
    }
});


module.exports = authRouter;