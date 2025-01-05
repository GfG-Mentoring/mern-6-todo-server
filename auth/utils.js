const jwt = require('jsonwebtoken');
const jwtSecret = 'super_secret';


const signJwt = (payload) => {
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: '1m'
    });
    return token;
}

const verifyJwt = (token) => {
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    signJwt, verifyJwt
}



