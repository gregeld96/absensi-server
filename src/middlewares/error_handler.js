module.exports = function (err, req, res, next) {
    const { error } = err;
    
    let statusCode = 500;
    let errorMessage = [];
    
    switch (err.name) {
        default:
            let message = error.message || 'Internal Server Error';
            errorMessage.push(message);
            statusCode = error.status || statusCode
            break;
    }

    res.status(statusCode).json({
        success: false,
        message: errorMessage.toString()
    });
}