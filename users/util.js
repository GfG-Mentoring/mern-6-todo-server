const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

const comparePassword = async (hashedPassword, password) => {
    return await bcrypt.compare(password, hashedPassword)
}


const test = async () => {
    const hashedPassword = await hashPassword('admin@123');
    const result = await comparePassword(hashedPassword, 'admin@123');
    console.log(result)
}


module.exports = {
    comparePassword,
    hashPassword
}