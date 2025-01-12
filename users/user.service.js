const { Users } = require("./user.model");
const { hashPassword } = require("./util");


const createUser = async (email, fullName, password) => {
    try {

        console.log(email, fullName, password)
        const newUser = new Users({
            email: email,
            fullName: fullName,
            password: await hashPassword(password)
        });
        await newUser.save();
    } catch (err) {
        throw new Error(err);
    }
}



module.exports = { createUser };