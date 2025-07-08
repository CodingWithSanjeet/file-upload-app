class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
    this.name = "App Error";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
