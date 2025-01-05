const { validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
    const result = validationResult(req);
    if (result.errors.length) {
        const sanitizedResult = result.array().map(val => ({ message: val.msg, field: val.path, providedValue: val.value }));
        res.status(400).send({ errors: sanitizedResult });
        return;
    }
    next();
}

module.exports = handleValidation;