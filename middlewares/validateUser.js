const { verifyJwt } = require("../auth/utils");
const formatResponseAndSend = require("../utils/formatResponse");

const validateUser = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    try {
        if (!bearerToken) {
            throw new Error('Token not found');
        }

        const token = bearerToken.replace('Bearer ', '');
        const userInfo = verifyJwt(token);

        req.user = userInfo;
        next();

    } catch (err) {
        console.error(err)
        formatResponseAndSend(res, null, null, new Error("User is not authorized"), 401);
        return;
    }

}

module.exports = validateUser;