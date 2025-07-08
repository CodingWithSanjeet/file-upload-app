const { StatusCodes } = require("http-status-codes");

const globalErrorHandler = (err, req, res, next) =>{

    const customError ={
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        status : err.statusCode < 500 ? 'fail' : 'error',
        message : err.message || 'Something went wrong! Please try again later.'
    }
    res.status(customError.statusCode).json({
        status: customError.status,
        message: customError.message,
        error: err
    })
}

module.exports = globalErrorHandler;