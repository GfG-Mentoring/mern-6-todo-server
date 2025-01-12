const { body } = require("express-validator");
const { Users } = require("./user.model");


const emailAlreadyExists = async value => {
    const user = await Users.exists({ email: value });
    console.log(user);
    if (user) {
        throw new Error('E-mail already in use');
    }
};


const userCreateValidator = () => [
    body('email').isEmail().custom(emailAlreadyExists),
    body('fullName').isLength({
        min: 3,
    }),
    body('password').isLength({
        min: 8,
    })
];


module.exports = { userCreateValidator };