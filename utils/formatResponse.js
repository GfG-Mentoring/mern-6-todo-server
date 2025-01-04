const formatResponseAndSend = (res, message, data, error, statusCode) => {
    if (error) {
        console.error(error);
        return res.status(statusCode).send({
            message: message || error.message || 'Error occurred. Please try again later.',
            data: null,
        });
    } else {
        res.send({ message, data });
    }
}

module.exports = formatResponseAndSend;