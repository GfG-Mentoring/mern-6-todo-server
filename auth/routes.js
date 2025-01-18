const Router = require('express');
const { verifyLoginBody } = require('./validator');
const handleValidation = require('../middlewares/handleValidation');
const { signJwt } = require('./utils');
const formatResponseAndSend = require('../utils/formatResponse');
const { Users } = require('../users/user.model');
const { comparePassword } = require('../users/util');
const validateUser = require('../middlewares/validateUser');


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

authRouter.get('/me', validateUser, async (req, res) => {
    try {

        let user = await Users.findById(req.user.id);
        if (!user) {
            throw new Error('User not found');
        }

        formatResponseAndSend(res, 'Details fetched', {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        });
    } catch (err) {
        formatResponseAndSend(res, null, null, err, 404)
    }
})


module.exports = authRouter;