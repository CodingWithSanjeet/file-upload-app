const { StatusCodes } = require("http-status-codes");

const sendSuccessResponse = (res, data, message, statucCode) => {
  res.status(statucCode).json({
    status: "success",
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

module.exports = { sendSuccessResponse };
